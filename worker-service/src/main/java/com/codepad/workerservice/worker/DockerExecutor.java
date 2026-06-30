package com.codepad.workerservice.worker;

import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.stereotype.Component;

import java.io.IOException;
import java.io.OutputStream;
import java.nio.charset.StandardCharsets;
import java.util.concurrent.TimeUnit;

@Slf4j
@Component
@RequiredArgsConstructor
public class DockerExecutor {

    private final ContainerPool containerPool;



    
    public ExecutionResult dockerExec(String containerId, String[] command,
                                       String stdin, long timeoutMs) throws IOException, InterruptedException {
        String[] fullCmd;
        if (stdin != null) {
            fullCmd = new String[6 + command.length];
            fullCmd[0] = "docker";
            fullCmd[1] = "exec";
            fullCmd[2] = "-w";
            fullCmd[3] = "/sandbox";
            fullCmd[4] = "-i";
            fullCmd[5] = containerId;
            System.arraycopy(command, 0, fullCmd, 6, command.length);
        } else {
            fullCmd = new String[5 + command.length];
            fullCmd[0] = "docker";
            fullCmd[1] = "exec";
            fullCmd[2] = "-w";
            fullCmd[3] = "/sandbox";
            fullCmd[4] = containerId;
            System.arraycopy(command, 0, fullCmd, 5, command.length);
        }

        ProcessBuilder pb = new ProcessBuilder(fullCmd);
        long startTime = System.currentTimeMillis();
        Process process = pb.start();

        java.io.ByteArrayOutputStream stdoutStream = new java.io.ByteArrayOutputStream();
        java.io.ByteArrayOutputStream stderrStream = new java.io.ByteArrayOutputStream();

        Thread outThread = Thread.ofVirtual().start(() -> {
            try { process.getInputStream().transferTo(stdoutStream); } catch (Exception ignored) {}
        });
        Thread errThread = Thread.ofVirtual().start(() -> {
            try { process.getErrorStream().transferTo(stderrStream); } catch (Exception ignored) {}
        });

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
            outThread.interrupt();
            errThread.interrupt();
            return new ExecutionResult("", "", -1, wallClockDurationMs, true, 0);
        }

        outThread.join();
        errThread.join();

        String stdout = stdoutStream.toString(StandardCharsets.UTF_8);
        String stderr = stderrStream.toString(StandardCharsets.UTF_8);
        int exitCode = process.exitValue();

        long preciseDurationMs = wallClockDurationMs;
        if (stderr.contains("__TIME__")) {
            for (String line : stderr.split("\n")) {
                if (line.trim().startsWith("__TIME__")) {
                    try {
                        preciseDurationMs = Long.parseLong(line.trim().substring(8));
                    } catch (NumberFormatException ignored) {}
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
                    try {
                        peakMemKb = Long.parseLong(line.trim().substring(7));
                    } catch (NumberFormatException ignored) {}
                }
            }
            stderr = stderr.replaceAll("(?m)^__MEM__\\d+\\s*$", "").trim();
        }

        return new ExecutionResult(stdout, stderr, exitCode, preciseDurationMs, false, peakMemKb);
    }

    
    private long getContainerMemoryUsageKb(String containerId) {
        try {
            ProcessBuilder pb = new ProcessBuilder(
                    "docker", "stats", "--no-stream", "--format", "{{.MemUsage}}", containerId
            );
            Process p = pb.start();
            String output = new String(p.getInputStream().readAllBytes(), StandardCharsets.UTF_8).trim();
            
            boolean completed = p.waitFor(2, TimeUnit.SECONDS);
            if (!completed) {
                p.destroyForcibly();
                return 0;
            }

            if (!output.isEmpty()) {
                String usagePart = output.split("/")[0].trim();
                if (usagePart.endsWith("GiB")) {
                    return (long) (Double.parseDouble(usagePart.replace("GiB", "").trim()) * 1024 * 1024);
                } else if (usagePart.endsWith("MiB")) {
                    return (long) (Double.parseDouble(usagePart.replace("MiB", "").trim()) * 1024);
                } else if (usagePart.endsWith("KiB")) {
                    return (long) Double.parseDouble(usagePart.replace("KiB", "").trim());
                } else if (usagePart.endsWith("B")) {
                    return (long) (Double.parseDouble(usagePart.replace("B", "").trim()) / 1024);
                }
            }
        } catch (Exception e) {
            log.debug("Could not get docker stats for container {}: {}", containerId.substring(0, 12), e.getMessage());
        }
        return 0;
    }

    
    public void returnContainerSafely(Language language, String containerId, boolean coldStarted) {
        try {
            if (coldStarted) {
                ProcessBuilder pb = new ProcessBuilder("docker", "rm", "-f", containerId);
                pb.start().waitFor();
                log.debug("Destroyed cold-started container {}", containerId.substring(0, 12));
            } else {
                containerPool.returnContainer(language, containerId);
            }
        } catch (Exception e) {
            log.error("Failed to return/destroy container {}: {}", containerId.substring(0, 12), e.getMessage());
        }
    }

    
    public String coldStartContainer(String dockerImage) {
        try {
            ProcessBuilder pb = new ProcessBuilder(
                    "docker", "run", "-d",
                    "--network", "none",
                    "--memory=256m",
                    "--cpus=0.5",
                    "--pids-limit=64",
                    "--read-only",
                    "--tmpfs", "/sandbox:rw,size=64m,exec",
                    "--security-opt", "no-new-privileges",
                    dockerImage,
                    "sleep", "infinity"
            );
            Process p = pb.start();
            String output = new String(p.getInputStream().readAllBytes(), StandardCharsets.UTF_8).trim();
            int exitCode = p.waitFor();
            if (exitCode == 0 && !output.isEmpty()) {
                log.info("Cold-started container {} with image {}", output.substring(0, 12), dockerImage);
                return output;
            } else {
                String error = new String(p.getErrorStream().readAllBytes(), StandardCharsets.UTF_8).trim();
                log.error("Cold start failed for image {}: {}", dockerImage, error);
                return null;
            }
        } catch (IOException | InterruptedException e) {
            log.error("Exception during cold start for image {}: {}", dockerImage, e.getMessage());
            return null;
        }
    }

    public record ExecutionResult(
            String stdout,
            String stderr,
            int exitCode,
            long durationMs,
            boolean timedOut,
            long memoryKb
    ) {}
}
