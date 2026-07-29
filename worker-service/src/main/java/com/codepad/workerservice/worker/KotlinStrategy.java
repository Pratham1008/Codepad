package com.codepad.workerservice.worker;
public class KotlinStrategy implements LanguageStrategy {
    @Override public String getDockerImage() { return "codepad-runtime:latest"; }
    @Override public String sourceFileName() { return "Solution.kt"; }
    @Override public String[] getCompileCommand() { return new String[]{"sh", "-c", "kotlinc $(find /workspace -name '*.kt' | head -n 1) -include-runtime -d /workspace/Solution.jar"}; }
    @Override public String[] getRunCommand() {
        String script = "if [ ! -f /workspace/Solution.jar ]; then echo 'Executable not found' >&2; exit 1; fi; " +
                        "t=$(date +%s%3N); /usr/bin/time -f \"\\n__MEM__%M\" java -Xms32m -Xmx160m -jar /workspace/Solution.jar; " +
                        "EXIT_CODE=$?; echo \"\" >&2; echo \"__TIME__$(($(date +%s%3N)-t))\" >&2; exit $EXIT_CODE";
        return new String[]{"sh", "-c", script};
    }
    @Override public String[] getInteractiveRunCommand() {
        return new String[]{"sh", "-c", "if [ ! -f /workspace/Solution.jar ]; then echo 'Executable not found' >&2; exit 1; fi; java -Xms32m -Xmx160m -jar /workspace/Solution.jar"};
    }
    @Override public String[] getDiagnosticsCommand() { return new String[]{"sh", "-c", "kotlinc $(find /workspace -name '*.kt') -include-runtime -d /workspace/out.jar 2>&1; rm -f /workspace/out.jar"}; }
    @Override public String getResidentCheckerLoopScript(String delimiter) { return ""; }
}
