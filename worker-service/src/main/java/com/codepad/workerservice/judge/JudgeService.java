package com.codepad.workerservice.judge;

import com.codepad.workerservice.judge.dto.JudgeRequestDto;
import com.codepad.workerservice.judge.dto.SubmissionResultDto;
import com.codepad.workerservice.judge.dto.TestCaseDto;
import com.codepad.workerservice.judge.dto.TestCaseResultDto;
import com.codepad.workerservice.session.WorkspaceSession;
import com.codepad.workerservice.session.WorkspaceSessionKey;
import com.codepad.workerservice.session.WorkspaceSessionManager;
import com.codepad.workerservice.worker.DockerExecutor;
import com.codepad.workerservice.worker.Language;
import com.codepad.workerservice.worker.LanguageStrategy;
import com.codepad.workerservice.worker.LanguageStrategyFactory;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.stereotype.Service;

import java.util.ArrayList;
import java.util.List;
import java.util.regex.Matcher;
import java.util.regex.Pattern;
import com.fasterxml.jackson.databind.ObjectMapper;
import org.springframework.web.socket.TextMessage;
import java.util.Map;

@Slf4j
@Service
@RequiredArgsConstructor
public class JudgeService {
    private final WorkspaceSessionManager sessionManager;
    private final LanguageStrategyFactory strategyFactory;
    private final DockerExecutor dockerExecutor;
    private final ObjectMapper mapper = new ObjectMapper();

    public SubmissionResultDto judge(JudgeRequestDto req) {
        WorkspaceSessionKey sessionKey = WorkspaceSessionKey.forSolve(req.userId(), req.problemId(), req.language());
        WorkspaceSession session = sessionManager.getOrCreate(sessionKey, req.language());
        LanguageStrategy strategy = strategyFactory.getStrategy(Language.valueOf(req.language().toUpperCase()));

        String containerId = session.containerId;
        if (containerId == null && session.language != Language.JAVA) {
            return new SubmissionResultDto("SYSTEM_ERROR", "No container", null, 0, 0, 0, 0);
        }

        session.sessionLock.lock();
        try {
            // Clean workspace and write source code
            dockerExecutor.cleanWorkspace(containerId);
            dockerExecutor.overwriteFileInContainer(containerId, strategy.sourceFileName(), req.sourceCode());

            // Compile
            String[] compileCmd = strategy.getCompileCommand();
            if (compileCmd != null) {
                DockerExecutor.ExecutionResult compileRes = dockerExecutor.dockerExec(containerId, compileCmd, null, 10000);
                if (compileRes.exitCode() != 0) {
                    String err = (compileRes.stdout() + "\n" + compileRes.stderr()).trim();
                    return new SubmissionResultDto("COMPILE_ERROR", err, null, 0, 0, 0, req.testCases().size());
                }
            }

            // Run test cases
            List<TestCaseResultDto> results = new ArrayList<>();
            int maxTimeMs = 0;
            int maxMemoryKb = 0;
            int passedCount = 0;
            String finalVerdict = "AC";
            String[] runCmd = strategy.getRunCommand();

            for (TestCaseDto tc : req.testCases()) {
                DockerExecutor.ExecutionResult runRes = dockerExecutor.dockerExec(containerId, runCmd, tc.input(), req.timeLimitMs() + 2000);

                // Memory and time are already extracted by DockerExecutor
                int timeMs = (int) runRes.durationMs();
                int memKb = (int) runRes.memoryKb();
                
                maxTimeMs = Math.max(maxTimeMs, timeMs);
                maxMemoryKb = Math.max(maxMemoryKb, memKb);

                String tcVerdict;
                if (runRes.timedOut() || timeMs > req.timeLimitMs()) {
                    tcVerdict = "TLE";
                } else if (memKb > req.memoryLimitKb()) {
                    tcVerdict = "MLE";
                } else if (runRes.exitCode() != 0) {
                    tcVerdict = "RE";
                } else if (tc.expectedOutput().trim().equals(runRes.stdout().trim())) {
                    tcVerdict = "AC";
                    passedCount++;
                } else {
                    tcVerdict = "WA";
                }

                String actualOut = runRes.stdout() != null ? runRes.stdout().trim() : "";
                String actualErr = runRes.stderr() != null ? runRes.stderr().trim() : "";
                String combinedOutput = actualOut;
                if (!actualErr.isEmpty()) {
                    combinedOutput = combinedOutput.isEmpty() ? actualErr : combinedOutput + "\n" + actualErr;
                }

                TestCaseResultDto tcResult = new TestCaseResultDto(tc.testCaseId(), tcVerdict, timeMs, memKb, combinedOutput);
                results.add(tcResult);

                if (session.getWebSocketSession() != null && session.getWebSocketSession().isOpen()) {
                    try {
                        session.getWebSocketSession().sendMessage(new TextMessage(mapper.writeValueAsString(
                                Map.of("type", "testCaseResult", "data", tcResult))));
                    } catch (Exception e) {
                        log.warn("Failed to push intermediate result: {}", e.getMessage());
                    }
                }

                if (!tcVerdict.equals("AC")) {
                    finalVerdict = tcVerdict;
                    if (!tc.isSample()) {
                        break; // fail fast on hidden tests
                    }
                }
            }
            
            if (passedCount == req.testCases().size() && finalVerdict.equals("AC")) {
                finalVerdict = "AC";
            } else if (finalVerdict.equals("AC")) {
                // If it was AC but we failed fast and didn't process all (shouldn't happen here since finalVerdict would be changed)
                // Actually if it's sample, it doesn't fail fast, so we might have some WAs and finalVerdict might be the last WA
                finalVerdict = passedCount == req.testCases().size() ? "AC" : results.stream().filter(r -> !r.verdict().equals("AC")).findFirst().map(TestCaseResultDto::verdict).orElse("WA");
            }

            return new SubmissionResultDto(finalVerdict, null, results, maxTimeMs, maxMemoryKb, passedCount, req.testCases().size());

        } catch (Exception e) {
            log.error("Judge error", e);
            return new SubmissionResultDto("SYSTEM_ERROR", e.getMessage(), null, 0, 0, 0, req.testCases().size());
        } finally {
            session.sessionLock.unlock();
        }
    }
}
