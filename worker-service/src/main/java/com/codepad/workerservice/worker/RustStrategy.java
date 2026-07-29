package com.codepad.workerservice.worker;
public class RustStrategy implements LanguageStrategy {
    @Override public String getDockerImage() { return "codepad-runtime:latest"; }
    @Override public String sourceFileName() { return "main.rs"; }
    @Override public String[] getCompileCommand() { return new String[]{"sh", "-c", "rustc -O $(find /workspace -name '*.rs' | head -n 1) -o /workspace/main"}; }
    @Override public String[] getRunCommand() {
        String script = "if [ ! -f /workspace/main ]; then echo 'Executable not found' >&2; exit 1; fi; " +
                        "t=$(date +%s%3N); /usr/bin/time -f \"\\n__MEM__%M\" /workspace/main; " +
                        "EXIT_CODE=$?; echo \"\" >&2; echo \"__TIME__$(($(date +%s%3N)-t))\" >&2; exit $EXIT_CODE";
        return new String[]{"sh", "-c", script};
    }
    @Override public String[] getInteractiveRunCommand() {
        return new String[]{"sh", "-c", "if [ ! -f /workspace/main ]; then echo 'Executable not found' >&2; exit 1; fi; /workspace/main"};
    }
    @Override public String[] getDiagnosticsCommand() { return new String[]{"sh", "-c", "rustc --edition 2021 --emit=metadata -o /dev/null $(find /workspace -name '*.rs')"}; }
    @Override public String getResidentCheckerLoopScript(String delimiter) { return ""; }
}
