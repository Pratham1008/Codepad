package com.codepad.workerservice.worker;

public class PythonStrategy implements LanguageStrategy {
    @Override public String getDockerImage() { return "codepad-runtime:latest"; }
    @Override public String sourceFileName() { return "solution.py"; }
    
    @Override
    public String[] getCompileCommand() {
        return new String[]{"python3", "-m", "py_compile", "/workspace/main.py"};
    }

    @Override
    public String[] getRunCommand() {
        // Find python file and execute
        String script = "MAIN_FILE=$(find /workspace -name '*.py' | head -n 1); " +
                        "if [ -z \"$MAIN_FILE\" ]; then echo 'No python file found' >&2; exit 1; fi; " +
                        "t=$(date +%s%3N); /usr/bin/time -f \"\\n__MEM__%M\" python3 $MAIN_FILE; " +
                        "EXIT_CODE=$?; echo \"\" >&2; echo \"__TIME__$(($(date +%s%3N)-t))\" >&2; exit $EXIT_CODE";
        return new String[]{"sh", "-c", script};
    }

    @Override
    public String[] getDiagnosticsCommand() {
        return new String[]{"sh", "-c", "find /workspace -name '*.py' -exec python3 -m py_compile {} +"};
    }


    @Override
    public String getResidentCheckerLoopScript(String delimiter) {
        return "python3 -c \"import sys, ast\\n" +
               "delim = sys.argv[1]\\n" +
               "while True:\\n" +
               "    src = ''\\n" +
               "    while True:\\n" +
               "        line = sys.stdin.readline()\\n" +
               "        if not line: sys.exit(0)\\n" +
               "        if line.strip() == delim: break\\n" +
               "        src += line\\n" +
               "    try:\\n" +
               "        ast.parse(src)\\n" +
               "    except SyntaxError as e:\\n" +
               "        print(f'line {e.lineno}', file=sys.stderr)\\n" +
               "    except Exception:\\n" +
               "        pass\\n" +
               "    print(delim)\\n" +
               "    sys.stdout.flush()\\n" +
               "\" \"" + delimiter + "\"";
    }
}
