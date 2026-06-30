package com.codepad.workerservice.worker;

public class JavaScriptStrategy implements LanguageStrategy {

    @Override
    public String getDockerImage() {
        return "judge-javascript:latest";
    }

    @Override
    public String getSourceFileName(String sourceCode) {
        return "main.js";
    }

    @Override
    public String[] getPipelineCommand(String sourceCode) {
        String fileName = getSourceFileName(sourceCode);
        String runCmd = "node /sandbox/" + fileName;
        return new String[]{"sh", "-c", buildPipeline(sourceCode, fileName, null, runCmd)};
    }

    @Override
    public String[] getInteractivePipelineCommand(String sourceCode) {
        String fileName = getSourceFileName(sourceCode);
        String runCmd = "node /sandbox/" + fileName;
        return new String[]{"sh", "-c", buildInteractivePipeline(sourceCode, fileName, null, runCmd)};
    }
}
