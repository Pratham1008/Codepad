package com.codepad.workerservice.diagnostics.session;

import com.codepad.workerservice.worker.LanguageStrategy;
import lombok.extern.slf4j.Slf4j;

import java.io.*;
import java.nio.charset.StandardCharsets;
import java.util.concurrent.locks.ReentrantLock;

@Slf4j
public class PersistentExecPipe {
    private static final String DELIM = "__CHECK_DONE_DELIMITER__";
    private final Process process;
    private final BufferedWriter stdin;
    private final BufferedReader stdout;
    private final ReentrantLock lock = new ReentrantLock();

    public PersistentExecPipe(String containerId, LanguageStrategy strategy) {
        try {
            String[] cmd = {"docker", "exec", "-i", "-w", "/workspace", containerId,
                "sh", "-c", strategy.getResidentCheckerLoopScript(DELIM)};
            ProcessBuilder pb = new ProcessBuilder(cmd);
            pb.redirectErrorStream(true);
            this.process = pb.start();
            this.stdin = new BufferedWriter(new OutputStreamWriter(process.getOutputStream(), StandardCharsets.UTF_8));
            this.stdout = new BufferedReader(new InputStreamReader(process.getInputStream(), StandardCharsets.UTF_8));
        } catch (IOException e) {
            throw new RuntimeException("Failed to start persistent exec pipe", e);
        }
    }

    public String check(String content) {
        lock.lock();
        try {
            stdin.write(content.replace("\u0000", ""));
            stdin.write("\n" + DELIM + "\n");
            stdin.flush();

            StringBuilder out = new StringBuilder();
            String line;
            while ((line = stdout.readLine()) != null) {
                if (line.contains(DELIM)) break;
                out.append(line).append("\n");
            }
            return out.toString();
        } catch (IOException e) {
            log.error("Persistent exec pipe error", e);
            return "";
        } finally {
            lock.unlock();
        }
    }

    public void close() {
        try { process.destroyForcibly(); } catch (Exception ignored) {}
    }
}
