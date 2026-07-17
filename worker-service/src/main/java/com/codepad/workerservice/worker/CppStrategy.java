package com.codepad.workerservice.worker;

public class CppStrategy implements LanguageStrategy {
    @Override public String getDockerImage() { return "judge-cpp:latest"; }

    @Override
    public String[] getCompileCommand() {
        return new String[]{"sh", "-c", "g++ -O2 -Wall -std=c++17 $(find /workspace -name '*.cpp') -o /workspace/a.out"};
    }

    @Override
    public String[] getRunCommand() {
        String script = "t=$(date +%s%3N); /usr/bin/time -f \"\\n__MEM__%M\" /workspace/a.out; " +
                        "EXIT_CODE=$?; echo \"\" >&2; echo \"__TIME__$(($(date +%s%3N)-t))\" >&2; exit $EXIT_CODE";
        return new String[]{"sh", "-c", script};
    }

    @Override
    public String[] getDiagnosticsCommand() {
        return new String[]{"sh", "-c", "g++ -fsyntax-only -fdiagnostics-format=json -std=c++17 $(find /workspace -name '*.cpp')"};
    }
}
