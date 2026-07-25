package com.codepad.workerservice.worker;

public interface LanguageStrategy {
    String getDockerImage();
    String sourceFileName();
    String[] getCompileCommand();
    String[] getRunCommand();
    String[] getDiagnosticsCommand();
    String getResidentCheckerLoopScript(String delimiter);
}
