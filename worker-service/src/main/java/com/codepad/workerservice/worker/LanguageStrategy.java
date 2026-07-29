package com.codepad.workerservice.worker;

public interface LanguageStrategy {
    String getDockerImage();
    String sourceFileName();
    String[] getCompileCommand();
    String[] getRunCommand();
    /** Returns the run command without time/memory metrics wrapper, for interactive/streaming mode. */
    default String[] getInteractiveRunCommand() { return getRunCommand(); }
    String[] getDiagnosticsCommand();
    String getResidentCheckerLoopScript(String delimiter);
}
