package com.codepad.workerservice.worker;

public class PythonStrategy implements LanguageStrategy {

    @Override
    public String getDockerImage() {
        return "judge-python:latest";
    }

    @Override
    public String getSourceFileName(String sourceCode) {
        return "main.py";
    }

    @Override
    public String[] getPipelineCommand(String sourceCode) {
        String fileName = getSourceFileName(sourceCode);
        String runCmd = "python3 -u /sandbox/" + fileName;
        return new String[]{"sh", "-c", buildPipeline(sourceCode, fileName, null, runCmd)};
    }

    @Override
    public String[] getInteractivePipelineCommand(String sourceCode) {
        String fileName = getSourceFileName(sourceCode);
        String runCmd = "python3 -u /sandbox/" + fileName;
        return new String[]{"sh", "-c", buildInteractivePipeline(sourceCode, fileName, null, runCmd)};
    }
}
