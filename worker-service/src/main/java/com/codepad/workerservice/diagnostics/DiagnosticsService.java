package com.codepad.workerservice.diagnostics;

import com.codepad.workerservice.file.ProjectFileService;
import com.codepad.workerservice.worker.ContainerPool;
import com.codepad.workerservice.worker.DockerExecutor;
import com.codepad.workerservice.worker.Language;
import com.codepad.workerservice.worker.LanguageStrategy;
import com.codepad.workerservice.worker.LanguageStrategyFactory;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.stereotype.Service;

import java.util.*;
import java.util.regex.Matcher;
import java.util.regex.Pattern;

@Slf4j
@Service
@RequiredArgsConstructor
public class DiagnosticsService {
    private final ContainerPool containerPool;
    private final DockerExecutor dockerExecutor;
    private final LanguageStrategyFactory languageStrategyFactory;
    private final ProjectFileService projectFileService;

    public Map<String, List<DiagnosticEntry>> getDiagnostics(UUID projectId, String languageStr, String activeFile, String content) {
        Language language = Language.valueOf(languageStr.toUpperCase());
        LanguageStrategy strategy = languageStrategyFactory.getStrategy(language);
        
        String containerId = null;
        try {
            containerId = containerPool.borrowContainer(1500);
            if (containerId == null) {
                containerId = dockerExecutor.coldStartContainer("codepad-runtime:latest");
                if (containerId == null) return Map.of();
            }

            dockerExecutor.tarCopyIn(containerId, projectFileService.projectRoot(projectId));
            dockerExecutor.overwriteFileInContainer(containerId, activeFile, content);

            String[] cmd = strategy.getDiagnosticsCommand();
            if (cmd == null) return Map.of(); // e.g. python might skip this if we wanted, but we have py_compile
            
            DockerExecutor.ExecutionResult res = dockerExecutor.dockerExec(containerId, cmd, null, 5000);
            
            return parseDiagnostics(language, res.stderr());
        } catch (Exception e) {
            log.error("Diagnostics error", e);
            return Map.of();
        } finally {
            if (containerId != null) containerPool.returnContainer(containerId);
        }
    }

    private Map<String, List<DiagnosticEntry>> parseDiagnostics(Language language, String stderr) {
        Map<String, List<DiagnosticEntry>> map = new HashMap<>();
        if (stderr == null || stderr.isEmpty()) return map;

        if (language == Language.JAVA) {
            Pattern p = Pattern.compile("^(?:\\/?workspace\\/)?(.*?):(\\d+): (error|warning): (.*)$", Pattern.MULTILINE);
            Matcher m = p.matcher(stderr);
            while (m.find()) {
                String file = m.group(1);
                int line = Integer.parseInt(m.group(2));
                String severity = m.group(3);
                String msg = m.group(4);
                map.computeIfAbsent(file, k -> new ArrayList<>()).add(new DiagnosticEntry(line, 0, msg, severity));
            }
        } else if (language == Language.PYTHON) {
            Pattern p = Pattern.compile("File \"(?:\\/?workspace\\/)?(.*?)\", line (\\d+)");
            Matcher m = p.matcher(stderr);
            if (m.find()) {
                String file = m.group(1);
                int line = Integer.parseInt(m.group(2));
                map.computeIfAbsent(file, k -> new ArrayList<>()).add(new DiagnosticEntry(line, 0, "Syntax Error", "error"));
            }
        } else if (language == Language.CPP || language == Language.C) {
            Pattern p = Pattern.compile("^(?:\\/?workspace\\/)?(.*?):(\\d+):(\\d+): (error|warning|fatal error): (.*)$", Pattern.MULTILINE);
            Matcher m = p.matcher(stderr);
            while (m.find()) {
                String file = m.group(1);
                int line = Integer.parseInt(m.group(2));
                int col = Integer.parseInt(m.group(3));
                String severity = m.group(4).contains("error") ? "error" : "warning";
                String msg = m.group(5);
                map.computeIfAbsent(file, k -> new ArrayList<>()).add(new DiagnosticEntry(line, col, msg, severity));
            }
        } else if (language == Language.RUST) {
            // rustc: error[E0308]: mismatched types --> /workspace/main.rs:3:26
            Pattern p = Pattern.compile("^(error|warning)(?:\\[E\\d+\\])?: (.*)$", Pattern.MULTILINE);
            Pattern loc = Pattern.compile("^\\s*--> (?:\\/?workspace\\/)?(.*?):(\\d+):(\\d+)$", Pattern.MULTILINE);
            Matcher mErr = p.matcher(stderr);
            Matcher mLoc = loc.matcher(stderr);
            while (mErr.find()) {
                String severity = mErr.group(1);
                String msg = mErr.group(2);
                if (mLoc.find(mErr.end())) {
                    String file = mLoc.group(1);
                    int line = Integer.parseInt(mLoc.group(2));
                    int col = Integer.parseInt(mLoc.group(3));
                    map.computeIfAbsent(file, k -> new ArrayList<>()).add(new DiagnosticEntry(line, col, msg, severity));
                }
            }
        } else if (language == Language.TYPESCRIPT) {
            // tsc: main.ts(3,5): error TS1005: ';' expected.
            Pattern p = Pattern.compile("^(?:\\/?workspace\\/)?(.*?)\\((\\d+),(\\d+)\\): (error|warning) TS\\d+: (.*)$", Pattern.MULTILINE);
            Matcher m = p.matcher(stderr);
            while (m.find()) {
                String file = m.group(1);
                int line = Integer.parseInt(m.group(2));
                int col = Integer.parseInt(m.group(3));
                String severity = m.group(4);
                String msg = m.group(5);
                map.computeIfAbsent(file, k -> new ArrayList<>()).add(new DiagnosticEntry(line, col, msg, severity));
            }
        } else if (language == Language.JAVASCRIPT) {
            // node --check: /workspace/main.js:3 ... SyntaxError: ...
            Pattern p = Pattern.compile("^(?:\\/?workspace\\/)?(.*?):(\\d+)$", Pattern.MULTILINE);
            Matcher m = p.matcher(stderr);
            if (m.find()) {
                String file = m.group(1);
                int line = Integer.parseInt(m.group(2));
                // Grab the SyntaxError message
                Pattern errP = Pattern.compile("SyntaxError: (.*)$", Pattern.MULTILINE);
                Matcher errM = errP.matcher(stderr);
                String msg = errM.find() ? errM.group(1) : "Syntax Error";
                map.computeIfAbsent(file, k -> new ArrayList<>()).add(new DiagnosticEntry(line, 0, msg, "error"));
            }
        } else if (language == Language.KOTLIN) {
            // kotlinc: /workspace/Solution.kt:3:5: error: expecting ';'
            Pattern p = Pattern.compile("^(?:\\/?workspace\\/)?(.*?):(\\d+):(\\d+): (error|warning): (.*)$", Pattern.MULTILINE);
            Matcher m = p.matcher(stderr);
            while (m.find()) {
                String file = m.group(1);
                int line = Integer.parseInt(m.group(2));
                int col = Integer.parseInt(m.group(3));
                String severity = m.group(4);
                String msg = m.group(5);
                map.computeIfAbsent(file, k -> new ArrayList<>()).add(new DiagnosticEntry(line, col, msg, severity));
            }
        }
        return map;
    }



    public static List<DiagnosticEntry> parseFastDiagnosticsStatic(Language language, String stderr) {
        List<DiagnosticEntry> entries = new ArrayList<>();
        if (stderr == null || stderr.isEmpty()) return entries;

        if (language == Language.JAVA) {
            Pattern p = Pattern.compile("^\\/workspace\\/([^:]+):(\\d+): (error|warning): (.*)$", Pattern.MULTILINE);
            Matcher m = p.matcher(stderr);
            while (m.find()) {
                entries.add(new DiagnosticEntry(Integer.parseInt(m.group(2)), 0, m.group(4), m.group(3)));
            }
        } else if (language == Language.PYTHON) {
            Pattern p = Pattern.compile("line (\\d+)");
            Matcher m = p.matcher(stderr);
            if (m.find()) {
                entries.add(new DiagnosticEntry(Integer.parseInt(m.group(1)), 0, "Syntax Error", "error"));
            }
        } else if (language == Language.CPP || language == Language.C) {
            Pattern p = Pattern.compile("^(?:<stdin>|/workspace/[^:]+):(\\d+):(\\d+): (error|warning|fatal error): (.*)$", Pattern.MULTILINE);
            Matcher m = p.matcher(stderr);
            while (m.find()) {
                entries.add(new DiagnosticEntry(Integer.parseInt(m.group(1)), Integer.parseInt(m.group(2)), m.group(4), m.group(3).contains("error") ? "error" : "warning"));
            }
        } else if (language == Language.RUST) {
            // rustc: error[E0308]: expected `i32`, found `&str` --> src/main.rs:3:5
            Pattern p = Pattern.compile("^(error|warning)(?:\\[E\\d+\\])?: (.*)$", Pattern.MULTILINE);
            Matcher m = p.matcher(stderr);
            Pattern lineP = Pattern.compile("--> (?:[^:]+):(\\d+):(\\d+)");
            Matcher lineM = lineP.matcher(stderr);
            while (m.find()) {
                int line = 1, col = 0;
                if (lineM.find()) { line = Integer.parseInt(lineM.group(1)); col = Integer.parseInt(lineM.group(2)); }
                entries.add(new DiagnosticEntry(line, col, m.group(2), m.group(1)));
            }
        } else if (language == Language.KOTLIN) {
            // kotlinc: file.kt:3:5: error: ...
            Pattern p = Pattern.compile("^[^:]+:(\\d+):(\\d+): (error|warning): (.*)$", Pattern.MULTILINE);
            Matcher m = p.matcher(stderr);
            while (m.find()) {
                entries.add(new DiagnosticEntry(Integer.parseInt(m.group(1)), Integer.parseInt(m.group(2)), m.group(4), m.group(3)));
            }
        } else if (language == Language.JAVASCRIPT || language == Language.TYPESCRIPT) {
            // Node.js / tsc errors: file.ts(3,5): error TS1005: ... OR SyntaxError style
            Pattern p = Pattern.compile("^[^(]+\\((\\d+),(\\d+)\\): (error|warning) \\w+: (.*)$", Pattern.MULTILINE);
            Matcher m = p.matcher(stderr);
            if (m.find()) {
                do {
                    entries.add(new DiagnosticEntry(Integer.parseInt(m.group(1)), Integer.parseInt(m.group(2)), m.group(4), m.group(3)));
                } while (m.find());
            } else {
                // Fallback: SyntaxError at line N
                Pattern fallback = Pattern.compile("(?:SyntaxError|TypeError|ReferenceError): (.*)");
                Matcher fm = fallback.matcher(stderr);
                if (fm.find()) {
                    entries.add(new DiagnosticEntry(1, 0, fm.group(1), "error"));
                }
            }
        }
        return entries;
    }
}
