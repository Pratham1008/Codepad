package com.codepad.workerservice.worker;

import jakarta.annotation.PostConstruct;
import jakarta.annotation.PreDestroy;
import lombok.extern.slf4j.Slf4j;
import org.springframework.stereotype.Component;

import java.io.IOException;
import java.util.Collection;
import java.util.EnumMap;
import java.util.Map;
import java.util.concurrent.ArrayBlockingQueue;
import java.util.concurrent.BlockingQueue;
import java.util.concurrent.TimeUnit;

@Slf4j
@Component
public class ContainerPool {
    private final BlockingQueue<String> pool;
    private final int poolSize;
    private final int maxContainers;
    private final java.util.concurrent.atomic.AtomicInteger activeContainers = new java.util.concurrent.atomic.AtomicInteger(0);

    public ContainerPool(@org.springframework.beans.factory.annotation.Value("${app.judge.pool-size:9}") int poolSize) {
        this.poolSize = poolSize;
        this.maxContainers = poolSize * 2;
        this.pool = new ArrayBlockingQueue<>(poolSize);
    }

    @PostConstruct
    public void initialize() {
        var tasks = new java.util.ArrayList<Thread>();
        for (int i = 0; i < poolSize; i++) {
            tasks.add(Thread.ofVirtual().start(() -> {
                String containerId = spawnWarmContainer();
                if (containerId != null) pool.offer(containerId);
            }));
        }
        for (Thread t : tasks) {
            try { t.join(); } catch (InterruptedException ignored) {}
        }
        log.info("Initialized container pool: {}/{} containers ready", pool.size(), poolSize);
    }

    public String borrowContainer(long timeoutMs) throws InterruptedException {
        String containerId = pool.poll(timeoutMs, TimeUnit.MILLISECONDS);
        if (containerId == null) {
            if (activeContainers.get() >= maxContainers) {
                throw new RuntimeException("Container pool and cold-start limits exhausted");
            }
            log.warn("Container pool exhausted — falling back to cold start");
            containerId = spawnWarmContainer();
        }
        return containerId;
    }

    public boolean returnContainer(String containerId) {
        if (containerId != null) {
            boolean offered = pool.offer(containerId);
            if (!offered) {
                activeContainers.decrementAndGet();
                try { new ProcessBuilder("docker", "rm", "-f", containerId).start().waitFor(); } catch (Exception ignored) {}
            }
            return offered;
        }
        return false;
    }

    private String spawnWarmContainer() {
        if (activeContainers.incrementAndGet() > maxContainers) {
            activeContainers.decrementAndGet();
            return null;
        }
        try {
            ProcessBuilder pb = new ProcessBuilder(
                    "docker", "run", "-d", "--network", "none", "--memory=256m", "--cpus=1.0", "--pids-limit=128",
                    "--read-only", "--tmpfs", "/workspace:rw,size=256m,exec", "--security-opt", "no-new-privileges",
                    "codepad-runtime:latest", "sleep", "infinity"
            );
            Process p = pb.start();
            String output = new String(p.getInputStream().readAllBytes()).trim();
            if (p.waitFor() == 0 && !output.isEmpty()) return output;
        } catch (Exception e) {
            log.error("Exception spawning container: {}", e.getMessage());
        }
        activeContainers.decrementAndGet();
        return null;
    }

    @PreDestroy
    public void shutdown() {
        log.info("Shutting down container pool...");
        pool.forEach(id -> {
            try { new ProcessBuilder("docker", "rm", "-f", id).start().waitFor(); } catch (Exception ignored) {}
        });
    }
}
