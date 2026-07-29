package com.codepad.workerservice.worker;
public class TypescriptStrategy implements LanguageStrategy {
    @Override public String getDockerImage() { return "codepad-runtime:latest"; }
    @Override public String sourceFileName() { return "main.ts"; }
    @Override public String[] getCompileCommand() {
        String script = "MAIN_FILE=$(find /workspace -name '*.ts' | head -n 1); " +
                        "esbuild \"$MAIN_FILE\" --target=es2022 --format=cjs --outfile=/tmp/main.js --log-level=error";
        return new String[]{"sh", "-c", script};
    }
    @Override public String[] getRunCommand() {
        String script = "t=$(date +%s%3N); /usr/bin/time -f \"\\n__MEM__%M\" node /tmp/main.js; " +
                        "EXIT_CODE=$?; echo \"\" >&2; echo \"__TIME__$(($(date +%s%3N)-t))\" >&2; exit $EXIT_CODE";
        return new String[]{"sh", "-c", script};
    }
    @Override public String[] getInteractiveRunCommand() {
        return new String[]{"sh", "-c", "node /tmp/main.js"};
    }
    @Override public String[] getDiagnosticsCommand() { return new String[]{"sh", "-c", "tsc --typeRoots /usr/local/lib/node_modules/@types --target ES2022 --module NodeNext --moduleResolution NodeNext --esModuleInterop --noEmit $(find /workspace -name '*.ts')"}; }
    @Override public String getResidentCheckerLoopScript(String delimiter) { return ""; }
}
