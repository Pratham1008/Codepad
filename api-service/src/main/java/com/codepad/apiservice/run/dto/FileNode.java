package com.codepad.apiservice.run.dto;
import java.util.List;
public record FileNode(String name, String path, String type, List<FileNode> children) {}
