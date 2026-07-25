package com.codepad.apiservice.config;

import org.springframework.beans.factory.annotation.Value;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.scheduling.concurrent.ThreadPoolTaskExecutor;

@Configuration
public class ExecutorConfig {
    @Bean
    public ThreadPoolTaskExecutor judgeExecutor(@Value("${app.judge.pool-size:9}") int containerPoolSize) {
        ThreadPoolTaskExecutor exec = new ThreadPoolTaskExecutor();
        exec.setCorePoolSize(containerPoolSize);
        exec.setMaxPoolSize(containerPoolSize);
        exec.setQueueCapacity(200);
        exec.setThreadNamePrefix("judge-");
        exec.initialize();
        return exec;
    }
}
