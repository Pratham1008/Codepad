package com.codepad.workerservice.diagnostics;

import javax.tools.*;
import java.io.OutputStream;
import java.net.URI;
import java.util.*;
import java.util.regex.Matcher;
import java.util.regex.Pattern;

public class InProcessJavaChecker {
    private static final Pattern PUBLIC_CLASS = Pattern.compile("public\\s+(?:final\\s+)?class\\s+(\\w+)");

    public static List<DiagnosticEntry> check(String source) {
        String className = extractClassName(source);
        JavaCompiler compiler = ToolProvider.getSystemJavaCompiler();
        if (compiler == null) {
            return List.of(new DiagnosticEntry(1, 1, "System JavaCompiler is not available. Please ensure the backend is running with a JDK, not a JRE.", "warning"));
        }
        DiagnosticCollector<JavaFileObject> diagnostics = new DiagnosticCollector<>();

        JavaFileObject file = new SimpleJavaFileObject(URI.create("string:///" + className + ".java"), JavaFileObject.Kind.SOURCE) {
            @Override public CharSequence getCharContent(boolean ignoreEncodingErrors) { return source; }
        };

        StandardJavaFileManager stdFm = compiler.getStandardFileManager(diagnostics, null, null);
        ForwardingJavaFileManager<StandardJavaFileManager> fm = new ForwardingJavaFileManager<>(stdFm) {
            @Override
            public JavaFileObject getJavaFileForOutput(Location loc, String name, JavaFileObject.Kind kind, FileObject sibling) {
                return new SimpleJavaFileObject(URI.create("mem:///" + name + kind.extension), kind) {
                    @Override public OutputStream openOutputStream() { return OutputStream.nullOutputStream(); }
                };
            }
        };

        // -proc:none disables annotation processing
        List<String> options = List.of("-Xlint:all", "-proc:none", "-nowarn");
        compiler.getTask(null, fm, diagnostics, options, null, List.of(file)).call();

        List<DiagnosticEntry> entries = new ArrayList<>();
        for (Diagnostic<? extends JavaFileObject> d : diagnostics.getDiagnostics()) {
            entries.add(new DiagnosticEntry(
                (int) d.getLineNumber(), (int) Math.max(1, d.getColumnNumber()),
                d.getMessage(null),
                d.getKind() == Diagnostic.Kind.ERROR ? "error" : "warning"));
        }
        return entries;
    }

    private static String extractClassName(String source) {
        Matcher m = PUBLIC_CLASS.matcher(source);
        return m.find() ? m.group(1) : "Scratch"; 
    }
}
