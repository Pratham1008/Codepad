package com.codepad.workerservice.worker;

public class Java25Strategy implements LanguageStrategy {

    @Override
    public String getDockerImage() {
        return "judge-java25:latest";
    }

    @Override
    public String getSourceFileName(String sourceCode) {
        return "Main.java";
    }

    @Override
    public String[] getPipelineCommand(String sourceCode) {
        String fileName = getSourceFileName(sourceCode);
        String runCmd = "java -Xms64m -Xmx256m -XX:TieredStopAtLevel=1 --enable-preview /sandbox/" + fileName;
        return new String[]{"sh", "-c", buildPipeline(sourceCode, fileName, null, runCmd)};
    }

    @Override
    public String[] getInteractivePipelineCommand(String sourceCode) {
        String fileName = getSourceFileName(sourceCode);
        String runCmd = "java -Xms64m -Xmx256m -XX:TieredStopAtLevel=1 --enable-preview /sandbox/" + fileName;
        return new String[]{"sh", "-c", buildInteractivePipeline(sourceCode, fileName, null, runCmd)};
    }
}
