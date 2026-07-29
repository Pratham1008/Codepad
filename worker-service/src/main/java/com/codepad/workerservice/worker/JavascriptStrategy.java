package com.codepad.workerservice.worker;
public class JavascriptStrategy implements LanguageStrategy {
    @Override public String getDockerImage() { return "codepad-runtime:latest"; }
    @Override public String sourceFileName() { return "main.js"; }
    @Override public String[] getCompileCommand() { return new String[]{"sh", "-c", "node --check $(find /workspace -name '*.js' | head -n 1)"}; }
    @Override public String[] getRunCommand() {
        String script = "MAIN_FILE=$(find /workspace -name '*.js' | head -n 1); " +
                        "if [ -z \"$MAIN_FILE\" ]; then echo 'No js file found' >&2; exit 1; fi; " +
                        "t=$(date +%s%3N); /usr/bin/time -f \"\\n__MEM__%M\" node $MAIN_FILE; " +
                        "EXIT_CODE=$?; echo \"\" >&2; echo \"__TIME__$(($(date +%s%3N)-t))\" >&2; exit $EXIT_CODE";
        return new String[]{"sh", "-c", script};
    }
    @Override public String[] getInteractiveRunCommand() {
        String script = "MAIN_FILE=$(find /workspace -name '*.js' | head -n 1); " +
                        "if [ -z \"$MAIN_FILE\" ]; then echo 'No js file found' >&2; exit 1; fi; " +
                        "node $MAIN_FILE";
        return new String[]{"sh", "-c", script};
    }
    @Override public String[] getDiagnosticsCommand() { return new String[]{"sh", "-c", "find /workspace -name '*.js' -exec node --check {} +"}; }
    @Override public String getResidentCheckerLoopScript(String delimiter) { return ""; }
}
