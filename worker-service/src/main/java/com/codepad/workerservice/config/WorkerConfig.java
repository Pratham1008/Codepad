package com.codepad.workerservice.config;

import org.springframework.beans.factory.annotation.Value;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;

import java.util.concurrent.ExecutorService;
import java.util.concurrent.Executors;
import lombok.Getter;

@Configuration
@Getter
public class WorkerConfig {
    @Value("${app.projects.root:/data/projects}")
    private String projectsRoot;

    @Bean
    public ExecutorService judgeExecutor() {
        return Executors.newVirtualThreadPerTaskExecutor();
    }
}
