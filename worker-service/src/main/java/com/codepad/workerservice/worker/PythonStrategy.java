package com.codepad.workerservice.worker;

public class PythonStrategy implements LanguageStrategy {
    @Override public String getDockerImage() { return "judge-python:latest"; }

    @Override
    public String[] getCompileCommand() {
        return null;
    }

    @Override
    public String[] getRunCommand() {
        String script = "MAIN_FILE=$(grep -rl 'if __name__ == \"__main__\"' /workspace | grep '\\.py$' | head -n 1); " +
                        "[ -z \"$MAIN_FILE\" ] && MAIN_FILE=$(find /workspace -name \"main.py\" | head -n 1); " +
                        "[ -z \"$MAIN_FILE\" ] && MAIN_FILE=$(find /workspace -name \"*.py\" | head -n 1); " +
                        "if [ -z \"$MAIN_FILE\" ]; then echo 'No python file found' >&2; exit 1; fi; " +
                        "t=$(date +%s%3N); /usr/bin/time -f \"\\n__MEM__%M\" python3 -u $MAIN_FILE; " +
                        "EXIT_CODE=$?; echo \"\" >&2; echo \"__TIME__$(($(date +%s%3N)-t))\" >&2; exit $EXIT_CODE";
        return new String[]{"sh", "-c", script};
    }

    @Override
    public String[] getDiagnosticsCommand() {
        return new String[]{"sh", "-c", "python3 -m py_compile $(find /workspace -name '*.py')"};
    }
}
