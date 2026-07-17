package com.codepad.workerservice.worker;

public interface LanguageStrategy {
    String getDockerImage();
    String[] getCompileCommand();
    String[] getRunCommand();
    String[] getDiagnosticsCommand();
}
