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

    private final Map<Language, BlockingQueue<String>> pools = new EnumMap<>(Language.class);
    private final int poolSizePerLanguage;

    public ContainerPool(@org.springframework.beans.factory.annotation.Value("${app.judge.pool-size-per-language:2}") int poolSizePerLanguage) {
        this.poolSizePerLanguage = poolSizePerLanguage;
    }

    @PostConstruct
    public void initialize() {
        for (Language lang : Language.values()) {
            BlockingQueue<String> queue = new ArrayBlockingQueue<>(poolSizePerLanguage);
            for (int i = 0; i < poolSizePerLanguage; i++) {
                String containerId = spawnWarmContainer(lang);
                if (containerId != null) {
                    queue.offer(containerId);
                }
            }
            pools.put(lang, queue);
            log.info("Initialized container pool for {}: {}/{} containers ready", lang, queue.size(), poolSizePerLanguage);
        }
    }

    public String borrowContainer(Language lang, long timeoutMs) throws InterruptedException {
        String containerId = pools.get(lang).poll(timeoutMs, TimeUnit.MILLISECONDS);
        if (containerId != null) {
            log.debug("Borrowed container {} for {}", containerId.substring(0, 12), lang);
        } else {
            log.warn("Container pool exhausted for {} — falling back to cold start", lang);
        }
        return containerId;
    }

    public void returnContainer(Language lang, String containerId) {
        pools.get(lang).offer(containerId);
        log.debug("Returned container {} to {} pool", containerId.substring(0, 12), lang);
    }

    private String spawnWarmContainer(Language lang) {
        String langName = lang.name().toLowerCase().replace("_", "");
        String imageName = "judge-" + langName + ":latest";
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
                    imageName,
                    "sleep", "infinity"
            );
            Process p = pb.start();
            String output = new String(p.getInputStream().readAllBytes()).trim();
            int exitCode = p.waitFor();
            if (exitCode == 0 && !output.isEmpty()) {
                log.info("Spawned warm container {} for {}", output.substring(0, 12), lang);
                return output;
            } else {
                String error = new String(p.getErrorStream().readAllBytes()).trim();
                log.error("Failed to spawn container for {}: {}", lang, error);
                return null;
            }
        } catch (IOException | InterruptedException e) {
            log.error("Exception spawning container for {}: {}", lang, e.getMessage());
            return null;
        }
    }



    @PreDestroy
    public void shutdown() {
        log.info("Shutting down container pools...");
        pools.values().stream()
                .flatMap(Collection::stream)
                .forEach(id -> {
                    try {
                        new ProcessBuilder("docker", "rm", "-f", id).start().waitFor();
                        log.info("Removed container {}", id.substring(0, 12));
                    } catch (IOException | InterruptedException ignored) {}
                });
    }
}
