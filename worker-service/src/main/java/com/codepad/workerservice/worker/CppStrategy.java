package com.codepad.workerservice.worker;

public class CppStrategy implements LanguageStrategy {
    @Override public String getDockerImage() { return "codepad-runtime:latest"; }
    @Override public String sourceFileName() { return "solution.cpp"; }

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
        return new String[]{"sh", "-c", "g++ -fsyntax-only -std=c++17 -Wall -Wextra $(find /workspace -name '*.cpp' -o -name '*.c')"};
    }


    @Override
    public String getResidentCheckerLoopScript(String delimiter) {
        return "python3 -c \"import sys, subprocess\\n" +
               "delim = sys.argv[1]\\n" +
               "while True:\\n" +
               "    src = ''\\n" +
               "    while True:\\n" +
               "        line = sys.stdin.readline()\\n" +
               "        if not line: sys.exit(0)\\n" +
               "        if line.strip() == delim: break\\n" +
               "        src += line\\n" +
               "    p = subprocess.run(['g++', '-fsyntax-only', '-std=c++17', '-x', 'c++', '-'], input=src.encode('utf-8'), capture_output=True)\\n" +
               "    if p.stderr: sys.stderr.buffer.write(p.stderr)\\n" +
               "    print(delim)\\n" +
               "    sys.stdout.flush()\\n" +
               "    sys.stderr.flush()\\n" +
               "\" \"" + delimiter + "\"";
    }
}
