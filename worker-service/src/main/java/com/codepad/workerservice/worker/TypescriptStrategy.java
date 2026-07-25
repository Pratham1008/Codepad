package com.codepad.workerservice.worker;
public class TypescriptStrategy implements LanguageStrategy {
    @Override public String getDockerImage() { return "codepad-runtime:latest"; }
    @Override public String sourceFileName() { return "main.ts"; }
    @Override public String[] getCompileCommand() { return new String[]{"tsc", "--noEmit", "/workspace/main.ts"}; }
    @Override public String[] getRunCommand() {
        String script = "t=$(date +%s%3N); /usr/bin/time -f \"\\n__MEM__%M\" ts-node /workspace/main.ts; " +
                        "EXIT_CODE=$?; echo \"\" >&2; echo \"__TIME__$(($(date +%s%3N)-t))\" >&2; exit $EXIT_CODE";
        return new String[]{"sh", "-c", script};
    }
    @Override public String[] getDiagnosticsCommand() { return new String[]{"sh", "-c", "tsc --noEmit $(find /workspace -name '*.ts')"}; }
    @Override public String getResidentCheckerLoopScript(String delimiter) { return ""; }
}
