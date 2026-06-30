package com.codepad.workerservice.worker;

import org.springframework.stereotype.Component;

import java.util.EnumMap;
import java.util.Map;


@Component
public class LanguageStrategyFactory {

    private final Map<Language, LanguageStrategy> strategies;

    public LanguageStrategyFactory() {
        this.strategies = new EnumMap<>(Language.class);
        strategies.put(Language.JAVA, new JavaStrategy());
        strategies.put(Language.JAVA_25, new Java25Strategy());
        strategies.put(Language.PYTHON, new PythonStrategy());
        strategies.put(Language.CPP, new CppStrategy());
        strategies.put(Language.C, new CStrategy());
        strategies.put(Language.JAVASCRIPT, new JavaScriptStrategy());
    }

    
    public LanguageStrategy getStrategy(Language language) {
        LanguageStrategy strategy = strategies.get(language);
        if (strategy == null) {
            throw new IllegalArgumentException("No strategy registered for language: " + language);
        }
        return strategy;
    }
}
