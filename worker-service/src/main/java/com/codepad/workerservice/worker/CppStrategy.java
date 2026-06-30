package com.codepad.workerservice.worker;

public class CppStrategy implements LanguageStrategy {

    @Override
    public String getDockerImage() {
        return "judge-cpp:latest";
    }

    @Override
    public String getSourceFileName(String sourceCode) {
        return "main.cpp";
    }

    @Override
    public String[] getPipelineCommand(String sourceCode) {
        String fileName = getSourceFileName(sourceCode);
        String compileCmd = "g++ -O2 -Wall -std=c++17 /sandbox/" + fileName + " -o /sandbox/a.out";
        String runCmd = "/sandbox/a.out";
        return new String[]{"sh", "-c", buildPipeline(sourceCode, fileName, compileCmd, runCmd)};
    }

    @Override
    public String[] getInteractivePipelineCommand(String sourceCode) {
        String fileName = getSourceFileName(sourceCode);
        String compileCmd = "g++ -O2 -Wall -std=c++17 /sandbox/" + fileName + " -o /sandbox/a.out";
        String runCmd = "/sandbox/a.out";
        return new String[]{"sh", "-c", buildInteractivePipeline(sourceCode, fileName, compileCmd, runCmd)};
    }
}
