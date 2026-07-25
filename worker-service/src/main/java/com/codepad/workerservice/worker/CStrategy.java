package com.codepad.workerservice.worker;
public class CStrategy implements LanguageStrategy {
    @Override public String getDockerImage() { return "codepad-runtime:latest"; }
    @Override public String sourceFileName() { return "main.c"; }
    @Override public String[] getCompileCommand() { return new String[]{"gcc", "-O2", "/workspace/main.c", "-o", "/workspace/main", "-lm"}; }
    @Override public String[] getRunCommand() {
        String script = "if [ ! -f /workspace/main ]; then echo 'Executable not found' >&2; exit 1; fi; " +
                        "t=$(date +%s%3N); /usr/bin/time -f \"\\n__MEM__%M\" /workspace/main; " +
                        "EXIT_CODE=$?; echo \"\" >&2; echo \"__TIME__$(($(date +%s%3N)-t))\" >&2; exit $EXIT_CODE";
        return new String[]{"sh", "-c", script};
    }
    @Override public String[] getDiagnosticsCommand() { return new String[]{"sh", "-c", "gcc -fsyntax-only -Wall $(find /workspace -name '*.c')"}; }
    @Override public String getResidentCheckerLoopScript(String delimiter) { return ""; }
}
