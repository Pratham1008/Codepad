package com.codepad.workerservice.worker;

import com.codepad.workerservice.worker.dto.RunCodeRequest;
import com.codepad.workerservice.worker.dto.RunCodeResponse;
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
    private final com.codepad.workerservice.submission_service.MonolithPlayground monolithPlayground;

    private static final long CONTAINER_BORROW_TIMEOUT_MS = 1500;
    private static final long RUN_TIMEOUT_MS = 10_000;

    
    public RunCodeResponse runCode(RunCodeRequest request) {
        log.info("Run code request: language={}", request.language());

        
        Language language = Language.valueOf(request.language().toUpperCase());
        LanguageStrategy strategy = languageStrategyFactory.getStrategy(language);
        log.debug("Using strategy for language={}, image={}", language, strategy.getDockerImage());

        
        String containerId = null;
        boolean coldStarted = false;
        try {
            containerId = containerPool.borrowContainer(language, CONTAINER_BORROW_TIMEOUT_MS);
            if (containerId == null) {
                log.info("Pool exhausted for {} — performing cold start", language);
                containerId = dockerExecutor.coldStartContainer(strategy.getDockerImage());
                coldStarted = true;
                if (containerId == null) {
                    log.error("Failed to start container for language={}", language);
                    return new RunCodeResponse("", "Failed to start execution container", 1, 0, 0);
                }
            }

            String[] pipelineCmd = strategy.getPipelineCommand(request.sourceCode());
            log.info("Executing pipeline in container {}: {}", containerId.substring(0, 12), String.join(" ", pipelineCmd));

            DockerExecutor.ExecutionResult execResult = dockerExecutor.dockerExec(containerId, pipelineCmd, request.stdin(), RUN_TIMEOUT_MS);

            if (execResult.timedOut()) {
                log.warn("Execution timed out after {}ms", RUN_TIMEOUT_MS);
                return new RunCodeResponse(
                        execResult.stdout(),
                        "Execution timed out (limit: " + RUN_TIMEOUT_MS + "ms)",
                        137,
                        execResult.durationMs(),
                        0
                );
            }

            log.info("Execution completed: exitCode={}, duration={}ms, memory={}KB", execResult.exitCode(), execResult.durationMs(), execResult.memoryKb());
            return new RunCodeResponse(
                    execResult.stdout(),
                    execResult.stderr(),
                    execResult.exitCode(),
                    execResult.durationMs(),
                    execResult.memoryKb()
            );

        } catch (IllegalArgumentException e) {
            log.error("Invalid language: {}", request.language());
            return new RunCodeResponse("", "Unsupported language: " + request.language(), 1, 0, 0);
        } catch (Exception e) {
            log.error("Exception during run code: {}", e.getMessage(), e);
            return new RunCodeResponse("", "Internal error: " + e.getMessage(), 1, 0, 0);
        } finally {
            if (containerId != null) {
                dockerExecutor.returnContainerSafely(language, containerId, coldStarted);
            }
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

            String[] pipelineCmd = strategy.getInteractivePipelineCommand(request.sourceCode());
            java.util.List<String> fullCmd = new java.util.ArrayList<>();
            fullCmd.addAll(java.util.List.of("docker", "exec", "-i", "-w", "/sandbox", containerId));
            fullCmd.addAll(java.util.List.of(pipelineCmd));

            ProcessBuilder pb = new ProcessBuilder(fullCmd);
            pb.redirectErrorStream(false);
            Process process = pb.start();

            Thread stdoutReader = Thread.ofVirtual().start(() -> {
                try (java.io.InputStream is = process.getInputStream()) {
                    byte[] buffer = new byte[1024];
                    int len;
                    while ((len = is.read(buffer)) != -1) {
                        monolithPlayground.sendOutput(sessionId, new String(buffer, 0, len, StandardCharsets.UTF_8), "stdout");
                    }
                } catch (IOException ignored) {}
            });

            Thread stderrReader = Thread.ofVirtual().start(() -> {
                try (java.io.InputStream is = process.getErrorStream()) {
                    byte[] buffer = new byte[1024];
                    int len;
                    while ((len = is.read(buffer)) != -1) {
                        monolithPlayground.sendOutput(sessionId, new String(buffer, 0, len, StandardCharsets.UTF_8), "stderr");
                    }
                } catch (IOException ignored) {}
            });

            OutputStream processStdin = process.getOutputStream();
            Thread stdinRelay = Thread.ofVirtual().start(() -> {
                try {
                    while (process.isAlive()) {
                        String input = monolithPlayground.awaitStdin(sessionId);
                        if (input == null) {
                            Thread.sleep(200);
                            continue;
                        }
                        processStdin.write((input + "\n").getBytes(StandardCharsets.UTF_8));
                        processStdin.flush();
                    }
                } catch (IOException | InterruptedException ignored) {}
            });

            boolean finished = process.waitFor(300, TimeUnit.SECONDS);
            if (!finished) process.destroyForcibly();

            stdoutReader.join(3000);
            stderrReader.join(3000);
            stdinRelay.interrupt();

            monolithPlayground.complete(sessionId);

        } catch (Exception e) {
            log.error("Streaming run error: {}", e.getMessage(), e);
            monolithPlayground.sendOutput(sessionId, "Internal error: " + e.getMessage(), "error");
            monolithPlayground.complete(sessionId);
        } finally {
            if (containerId != null) {
                dockerExecutor.returnContainerSafely(language, containerId, coldStarted);
            }
        }
    }
}
