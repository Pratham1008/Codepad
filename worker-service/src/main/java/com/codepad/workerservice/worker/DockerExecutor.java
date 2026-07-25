package com.codepad.workerservice.worker;

import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.stereotype.Component;

import java.io.IOException;
import java.io.OutputStream;
import java.nio.charset.StandardCharsets;
import java.nio.file.Path;
import java.util.concurrent.TimeUnit;

@Slf4j
@Component
@RequiredArgsConstructor
public class DockerExecutor {
    private final ContainerPool containerPool;

    public void tarCopyIn(String containerId, Path projectDir) throws IOException, InterruptedException {
        String cmd = "tar -cf - -C " + projectDir.toAbsolutePath() + " . | docker exec -i " + containerId + " tar -xf - -C /workspace";
        Process p = new ProcessBuilder("sh", "-c", cmd).start();
        p.waitFor();
    }
    
    public void overwriteFileInContainer(String containerId, String path, String content) throws IOException, InterruptedException {
        ProcessBuilder pb = new ProcessBuilder("docker", "exec", "-i", containerId, "sh", "-c", "cat > /workspace/" + path);
        Process p = pb.start();
        try (OutputStream os = p.getOutputStream()) {
            os.write(content.getBytes(StandardCharsets.UTF_8));
        }
        p.waitFor();
    }

    public void cleanWorkspace(String containerId) {
        try {
            new ProcessBuilder("docker", "exec", containerId, "sh", "-c", "rm -rf /workspace/*").start().waitFor();
        } catch (Exception e) {
            log.error("Failed to clean workspace in container {}: {}", containerId, e.getMessage());
        }
    }

    public ExecutionResult dockerExec(String containerId, String[] command, String stdin, long timeoutMs) throws IOException, InterruptedException {
        String[] fullCmd;
        if (stdin != null) {
            fullCmd = new String[6 + command.length];
            fullCmd[0] = "docker"; fullCmd[1] = "exec"; fullCmd[2] = "-w"; fullCmd[3] = "/workspace"; fullCmd[4] = "-i"; fullCmd[5] = containerId;
            System.arraycopy(command, 0, fullCmd, 6, command.length);
        } else {
            fullCmd = new String[5 + command.length];
            fullCmd[0] = "docker"; fullCmd[1] = "exec"; fullCmd[2] = "-w"; fullCmd[3] = "/workspace"; fullCmd[4] = containerId;
            System.arraycopy(command, 0, fullCmd, 5, command.length);
        }

        ProcessBuilder pb = new ProcessBuilder(fullCmd);
        long startTime = System.currentTimeMillis();
        Process process = pb.start();

        java.io.ByteArrayOutputStream stdoutStream = new java.io.ByteArrayOutputStream();
        java.io.ByteArrayOutputStream stderrStream = new java.io.ByteArrayOutputStream();

        Thread outThread = Thread.ofVirtual().start(() -> { try { process.getInputStream().transferTo(stdoutStream); } catch (Exception ignored) {} });
        Thread errThread = Thread.ofVirtual().start(() -> { try { process.getErrorStream().transferTo(stderrStream); } catch (Exception ignored) {} });

        if (stdin != null) {
            try (OutputStream os = process.getOutputStream()) {
                os.write(stdin.getBytes(StandardCharsets.UTF_8));
                os.flush();
            }
        }

        boolean finished = process.waitFor(timeoutMs, TimeUnit.MILLISECONDS);
        long wallClockDurationMs = System.currentTimeMillis() - startTime;

        if (!finished) {
            process.destroyForcibly();
            process.waitFor(5, TimeUnit.SECONDS);
            outThread.interrupt(); errThread.interrupt();
            return new ExecutionResult("", "", -1, wallClockDurationMs, true, 0);
        }

        outThread.join(); errThread.join();

        String stdout = stdoutStream.toString(StandardCharsets.UTF_8);
        String stderr = stderrStream.toString(StandardCharsets.UTF_8);
        int exitCode = process.exitValue();

        long preciseDurationMs = wallClockDurationMs;
        if (stderr.contains("__TIME__")) {
            for (String line : stderr.split("\n")) {
                if (line.trim().startsWith("__TIME__")) {
                    try { preciseDurationMs = Long.parseLong(line.trim().substring(8)); } catch (Exception ignored) {}
                }
            }
            stderr = stderr.replaceAll("(?m)^__TIME__\\d+\\s*$", "").trim();
        } else {
            preciseDurationMs = Math.max(1, wallClockDurationMs - 50);
        }

        long peakMemKb = 0;
        if (stderr.contains("__MEM__")) {
            for (String line : stderr.split("\n")) {
                if (line.trim().startsWith("__MEM__")) {
                    try { peakMemKb = Long.parseLong(line.trim().substring(7)); } catch (Exception ignored) {}
                }
            }
            stderr = stderr.replaceAll("(?m)^__MEM__\\d+\\s*$", "").trim();
        }

        return new ExecutionResult(stdout, stderr, exitCode, preciseDurationMs, false, peakMemKb);
    }

    public void returnContainerSafely(Language language, String containerId, boolean coldStarted) {
        cleanWorkspace(containerId);
        try {
            if (coldStarted) {
                new ProcessBuilder("docker", "rm", "-f", containerId).start().waitFor();
                log.debug("Destroyed cold-started container {}", containerId.substring(0, 12));
            } else {
                containerPool.returnContainer(containerId);
            }
        } catch (Exception e) {
            log.error("Failed to return container {}: {}", containerId.substring(0, 12), e.getMessage());
        }
    }

    public String coldStartContainer(String dockerImage) {
        try {
            ProcessBuilder pb = new ProcessBuilder(
                    "docker", "run", "-d", "--network", "none", "--memory=256m", "--cpus=0.5", "--pids-limit=64",
                    "--read-only", "--tmpfs", "/workspace:rw,size=128m,exec", "--security-opt", "no-new-privileges",
                    dockerImage, "sleep", "infinity"
            );
            Process p = pb.start();
            String output = new String(p.getInputStream().readAllBytes(), StandardCharsets.UTF_8).trim();
            int exitCode = p.waitFor();
            if (exitCode == 0 && !output.isEmpty()) {
                log.info("Cold-started container {}", output.substring(0, 12));
                return output;
            } else {
                log.error("Cold start failed for image {}", dockerImage);
                return null;
            }
        } catch (Exception e) {
            log.error("Exception during cold start for image {}: {}", dockerImage, e.getMessage());
            return null;
        }
    }

    public record ExecutionResult(String stdout, String stderr, int exitCode, long durationMs, boolean timedOut, long memoryKb) {}
}
