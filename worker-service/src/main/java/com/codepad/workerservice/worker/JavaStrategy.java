package com.codepad.workerservice.worker;

public class JavaStrategy implements LanguageStrategy {
    @Override public String getDockerImage() { return "codepad-runtime:latest"; }
    @Override public String sourceFileName() { return "Solution.java"; }

    @Override
    public String[] getCompileCommand() {
        return new String[]{"sh", "-c", "find /workspace -name '*.java' > /workspace/sources.txt && javac -d /workspace @/workspace/sources.txt"};
    }

    @Override
    public String[] getRunCommand() {
        // Auto-detect entrypoint using grep and execute, but default to Main if Main.class exists
        String script = "if [ -f /workspace/Main.class ]; then MAIN_CLASS=Main; else MAIN_CLASS=$(grep -rl 'public static void main' /workspace | grep '\\.java$' | head -n 1 | xargs basename -s .java); fi; " +
                        "if [ -z \"$MAIN_CLASS\" ]; then echo 'No main class found' >&2; exit 1; fi; " +
                        "t=$(date +%s%3N); /usr/bin/time -f \"\\n__MEM__%M\" java -Xms32m -Xmx160m -XX:TieredStopAtLevel=1 -cp /workspace $MAIN_CLASS; " +
                        "EXIT_CODE=$?; echo \"\" >&2; echo \"__TIME__$(($(date +%s%3N)-t))\" >&2; exit $EXIT_CODE";
        return new String[]{"sh", "-c", script};
    }

    @Override
    public String[] getDiagnosticsCommand() {
        return new String[]{"sh", "-c", "mkdir -p /workspace/out && find /workspace -name '*.java' > /workspace/sources.txt && javac -Xlint -d /workspace/out @/workspace/sources.txt"};
    }

    @Override
    public String getResidentCheckerLoopScript(String delimiter) {
        return ""; // Java uses in-process checker, this is never called.
    }
}
