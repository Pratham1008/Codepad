package com.codepad.workerservice.worker;

public class JavaStrategy implements LanguageStrategy {

    @Override
    public String getDockerImage() {
        return "judge-java:latest";
    }

    private String extractClassName(String sourceCode) {
        if (sourceCode == null) return "Main";
        java.util.regex.Matcher m = java.util.regex.Pattern.compile("class\\s+([a-zA-Z_$][a-zA-Z\\d_$]*)\\s*\\{?").matcher(sourceCode);
        if (m.find()) return m.group(1);
        return "Main";
    }

    @Override
    public String getSourceFileName(String sourceCode) {
        return extractClassName(sourceCode) + ".java";
    }

    @Override
    public String[] getPipelineCommand(String sourceCode) {
        String fileName = getSourceFileName(sourceCode);
        String className = extractClassName(sourceCode);
        String compileCmd = "javac /sandbox/" + fileName;
        String runCmd = "java -Xms64m -Xmx256m -XX:TieredStopAtLevel=1 -cp /sandbox " + className;
        return new String[]{"sh", "-c", buildPipeline(sourceCode, fileName, compileCmd, runCmd)};
    }

    @Override
    public String[] getInteractivePipelineCommand(String sourceCode) {
        String fileName = getSourceFileName(sourceCode);
        String className = extractClassName(sourceCode);
        String compileCmd = "javac /sandbox/" + fileName;
        String runCmd = "java -Xms64m -Xmx256m -XX:TieredStopAtLevel=1 -cp /sandbox " + className;
        return new String[]{"sh", "-c", buildInteractivePipeline(sourceCode, fileName, compileCmd, runCmd)};
    }
}
