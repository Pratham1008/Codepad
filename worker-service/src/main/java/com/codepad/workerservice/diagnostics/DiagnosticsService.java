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
            containerId = containerPool.borrowContainer(language, 1500);
            if (containerId == null) {
                containerId = dockerExecutor.coldStartContainer(strategy.getDockerImage());
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
            if (containerId != null) dockerExecutor.returnContainerSafely(language, containerId, false);
        }
    }

    private Map<String, List<DiagnosticEntry>> parseDiagnostics(Language language, String stderr) {
        Map<String, List<DiagnosticEntry>> map = new HashMap<>();
        if (stderr == null || stderr.isEmpty()) return map;

        if (language == Language.JAVA) {
            Pattern p = Pattern.compile("^\\/workspace\\/(.*?):(\\d+): (error|warning): (.*)$", Pattern.MULTILINE);
            Matcher m = p.matcher(stderr);
            while (m.find()) {
                String file = m.group(1);
                int line = Integer.parseInt(m.group(2));
                String severity = m.group(3);
                String msg = m.group(4);
                map.computeIfAbsent(file, k -> new ArrayList<>()).add(new DiagnosticEntry(line, 0, msg, severity));
            }
        } else if (language == Language.PYTHON) {
            Pattern p = Pattern.compile("File \"\\/workspace\\/(.*?)\", line (\\d+)");
            Matcher m = p.matcher(stderr);
            if (m.find()) {
                String file = m.group(1);
                int line = Integer.parseInt(m.group(2));
                map.computeIfAbsent(file, k -> new ArrayList<>()).add(new DiagnosticEntry(line, 0, "Syntax Error", "error"));
            }
        }
        return map;
    }
}
