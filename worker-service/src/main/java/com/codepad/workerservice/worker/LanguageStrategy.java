package com.codepad.workerservice.worker;

import java.nio.charset.StandardCharsets;
import java.util.Base64;

public interface LanguageStrategy {

    String getDockerImage();

    String getSourceFileName(String sourceCode);

    String[] getPipelineCommand(String sourceCode);

    String[] getInteractivePipelineCommand(String sourceCode);

    default String buildPipeline(String sourceCode, String sourceFileName, String compileCmd, String runCmd) {
        String b64 = Base64.getEncoder().encodeToString(sourceCode.getBytes(StandardCharsets.UTF_8));
        StringBuilder sb = new StringBuilder();
        sb.append("echo '").append(b64).append("' | base64 -d > /sandbox/").append(sourceFileName).append("; ");

                if (compileCmd != null) {
            sb.append(compileCmd).append("; ");
            sb.append("if [ $? -eq 0 ]; then ");
        }

                sb.append("t=$(date +%s%3N); /usr/bin/time -f \"\\n__MEM__%M\" ").append(runCmd)
          .append("; EXIT_CODE=$?; echo \"\" >&2; echo \"__TIME__$(($(date +%s%3N)-t))\" >&2; ");

                if (compileCmd != null) {
            sb.append("else EXIT_CODE=1; fi; ");
        }

                sb.append("rm -rf /sandbox/*; exit $EXIT_CODE");
        return sb.toString();
    }

    default String buildInteractivePipeline(String sourceCode, String sourceFileName, String compileCmd, String runCmd) {
        String b64 = Base64.getEncoder().encodeToString(sourceCode.getBytes(StandardCharsets.UTF_8));
        StringBuilder sb = new StringBuilder();
        sb.append("echo '").append(b64).append("' | base64 -d > /sandbox/").append(sourceFileName).append("; ");

                if (compileCmd != null) {
            sb.append(compileCmd).append("; if [ $? -ne 0 ]; then rm -rf /sandbox/*; exit 1; fi; ");
        }

                sb.append(runCmd).append("; EXIT_CODE=$?; rm -rf /sandbox/*; exit $EXIT_CODE");
        return sb.toString();
    }
}
