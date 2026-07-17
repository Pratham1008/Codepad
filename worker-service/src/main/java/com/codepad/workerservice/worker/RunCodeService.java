package com.codepad.workerservice.worker;

import com.codepad.workerservice.worker.dto.RunCodeRequest;
import com.codepad.workerservice.worker.dto.RunCodeResponse;
import com.codepad.workerservice.file.ProjectFileService;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.stereotype.Service;

import java.io.IOException;
import java.io.OutputStream;
import java.nio.charset.StandardCharsets;
import java.util.concurrent.TimeUnit;

@Slf4j
@Service
@RequiredArgsConstructor
public class RunCodeService {
    private final ContainerPool containerPool;
    private final LanguageStrategyFactory languageStrategyFactory;
    private final DockerExecutor dockerExecutor;
    private final ProjectFileService projectFileService;
    private final com.codepad.workerservice.submission_service.MonolithPlayground monolithPlayground;

    private static final long CONTAINER_BORROW_TIMEOUT_MS = 1500;
    private static final long RUN_TIMEOUT_MS = 10_000;

    public RunCodeResponse runCode(RunCodeRequest request) {
        Language language = Language.valueOf(request.language().toUpperCase());
        LanguageStrategy strategy = languageStrategyFactory.getStrategy(language);
        
        String containerId = null;
        boolean coldStarted = false;
        try {
            containerId = containerPool.borrowContainer(language, CONTAINER_BORROW_TIMEOUT_MS);
            if (containerId == null) {
                containerId = dockerExecutor.coldStartContainer(strategy.getDockerImage());
                coldStarted = true;
                if (containerId == null) return new RunCodeResponse("", "Failed to start execution container", 1, 0, 0);
            }

            dockerExecutor.tarCopyIn(containerId, projectFileService.projectRoot(request.projectId()));

            String[] compileCmd = strategy.getCompileCommand();
            if (compileCmd != null) {
                DockerExecutor.ExecutionResult compileRes = dockerExecutor.dockerExec(containerId, compileCmd, null, RUN_TIMEOUT_MS);
                if (compileRes.exitCode() != 0 || compileRes.timedOut()) {
                    return new RunCodeResponse(compileRes.stdout(), compileRes.stderr(), compileRes.exitCode(), compileRes.durationMs(), compileRes.memoryKb());
                }
            }

            DockerExecutor.ExecutionResult execResult = dockerExecutor.dockerExec(containerId, strategy.getRunCommand(), request.stdin(), RUN_TIMEOUT_MS);
            if (execResult.timedOut()) {
                return new RunCodeResponse(execResult.stdout(), "Execution timed out (limit: " + RUN_TIMEOUT_MS + "ms)", 137, execResult.durationMs(), 0);
            }

            return new RunCodeResponse(execResult.stdout(), execResult.stderr(), execResult.exitCode(), execResult.durationMs(), execResult.memoryKb());
        } catch (Exception e) {
            log.error("Exception during run code", e);
            return new RunCodeResponse("", "Internal error: " + e.getMessage(), 1, 0, 0);
        } finally {
            if (containerId != null) dockerExecutor.returnContainerSafely(language, containerId, coldStarted);
        }
    }

    public void runCodeStreaming(RunCodeRequest request, String sessionId) {
        Language language = Language.valueOf(request.language().toUpperCase());
        LanguageStrategy strategy = languageStrategyFactory.getStrategy(language);

        String containerId = null;
        boolean coldStarted = false;
        try {
            containerId = containerPool.borrowContainer(language, CONTAINER_BORROW_TIMEOUT_MS);
            if (containerId == null) {
                containerId = dockerExecutor.coldStartContainer(strategy.getDockerImage());
                coldStarted = true;
                if (containerId == null) {
                    monolithPlayground.sendOutput(sessionId, "Failed to start container", "error");
                    monolithPlayground.complete(sessionId);
                    return;
                }
            }

            dockerExecutor.tarCopyIn(containerId, projectFileService.projectRoot(request.projectId()));

            String[] compileCmd = strategy.getCompileCommand();
            if (compileCmd != null) {
                DockerExecutor.ExecutionResult compileRes = dockerExecutor.dockerExec(containerId, compileCmd, null, RUN_TIMEOUT_MS);
                if (compileRes.exitCode() != 0 || compileRes.timedOut()) {
                    monolithPlayground.sendOutput(sessionId, compileRes.stderr(), "stderr");
                    monolithPlayground.complete(sessionId);
                    return;
                }
            }

            String[] runCmd = strategy.getRunCommand();
            java.util.List<String> fullCmd = new java.util.ArrayList<>();
            fullCmd.addAll(java.util.List.of("docker", "exec", "-i", "-w", "/workspace", containerId));
            fullCmd.addAll(java.util.List.of(runCmd));

            ProcessBuilder pb = new ProcessBuilder(fullCmd);
            pb.redirectErrorStream(false);
            Process process = pb.start();

            Thread stdoutReader = Thread.ofVirtual().start(() -> {
                try (java.io.InputStream is = process.getInputStream()) {
                    byte[] buffer = new byte[1024]; int len;
                    while ((len = is.read(buffer)) != -1) monolithPlayground.sendOutput(sessionId, new String(buffer, 0, len, StandardCharsets.UTF_8), "stdout");
                } catch (IOException ignored) {}
            });

            Thread stderrReader = Thread.ofVirtual().start(() -> {
                try (java.io.InputStream is = process.getErrorStream()) {
                    byte[] buffer = new byte[1024]; int len;
                    while ((len = is.read(buffer)) != -1) monolithPlayground.sendOutput(sessionId, new String(buffer, 0, len, StandardCharsets.UTF_8), "stderr");
                } catch (IOException ignored) {}
            });

            OutputStream processStdin = process.getOutputStream();
            Thread stdinRelay = Thread.ofVirtual().start(() -> {
                try {
                    while (process.isAlive()) {
                        String input = monolithPlayground.awaitStdin(sessionId);
                        if (input == null) { Thread.sleep(200); continue; }
                        processStdin.write((input + "\n").getBytes(StandardCharsets.UTF_8));
                        processStdin.flush();
                    }
                } catch (IOException | InterruptedException ignored) {}
            });

            if (!process.waitFor(300, TimeUnit.SECONDS)) process.destroyForcibly();

            stdoutReader.join(3000); stderrReader.join(3000); stdinRelay.interrupt();
            monolithPlayground.complete(sessionId);
        } catch (Exception e) {
            log.error("Streaming run error", e);
            monolithPlayground.sendOutput(sessionId, "Internal error: " + e.getMessage(), "error");
            monolithPlayground.complete(sessionId);
        } finally {
            if (containerId != null) dockerExecutor.returnContainerSafely(language, containerId, coldStarted);
        }
    }
}
