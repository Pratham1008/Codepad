package com.codepad.workerservice.file;

import com.codepad.workerservice.config.WorkerConfig;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.stereotype.Service;

import java.io.IOException;
import java.nio.charset.StandardCharsets;
import java.nio.file.*;
import java.nio.file.attribute.BasicFileAttributes;
import java.util.*;

@Slf4j
@Service
@RequiredArgsConstructor
public class ProjectFileService {
    private static final long MAX_FILE_SIZE_BYTES = 1_000_000; // 1 MB
    private static final long MAX_PROJECT_SIZE_BYTES = 10_000_000; // 10 MB
    private static final int MAX_FILE_COUNT = 50;

    private final WorkerConfig config;

    public Path projectRoot(UUID projectId) {
        return Paths.get(config.getProjectsRoot(), projectId.toString()).normalize().toAbsolutePath();
    }

    private Path resolveAndValidate(UUID projectId, String relativePath) {
        PathValidator.validatePath(relativePath);
        Path root = projectRoot(projectId);
        Path resolved = root.resolve(relativePath).normalize().toAbsolutePath();
        if (!resolved.startsWith(root)) {
            throw new IllegalArgumentException("Path traversal attempt detected");
        }
        return resolved;
    }

    public void initProject(UUID projectId, String language) throws IOException {
        Path root = projectRoot(projectId);
        if (Files.exists(root)) return;
        Files.createDirectories(root);
        
        String starterFile = switch (language.toUpperCase()) {
            case "JAVA" -> "Main.java";
            case "PYTHON" -> "main.py";
            case "CPP" -> "main.cpp";
            default -> "main.txt";
        };
        Files.writeString(root.resolve(starterFile), "// Starter code for " + language);
    }

    public void deleteProject(UUID projectId) throws IOException {
        Path root = projectRoot(projectId);
        if (!Files.exists(root)) return;
        Files.walkFileTree(root, new SimpleFileVisitor<>() {
            @Override public FileVisitResult visitFile(Path file, BasicFileAttributes attrs) throws IOException { Files.delete(file); return FileVisitResult.CONTINUE; }
            @Override public FileVisitResult postVisitDirectory(Path dir, IOException exc) throws IOException { Files.delete(dir); return FileVisitResult.CONTINUE; }
        });
    }

    public Map<String, Object> getTree(UUID projectId) throws IOException {
        Path root = projectRoot(projectId);
        if (!Files.exists(root)) return Map.of();
        return buildNode(root, root);
    }

    private Map<String, Object> buildNode(Path path, Path root) throws IOException {
        Map<String, Object> node = new HashMap<>();
        node.put("name", path.getFileName().toString());
        node.put("path", root.relativize(path).toString().replace("\\", "/"));
        node.put("type", Files.isDirectory(path) ? "folder" : "file");
        if (Files.isDirectory(path)) {
            List<Map<String, Object>> children = new ArrayList<>();
            try (DirectoryStream<Path> stream = Files.newDirectoryStream(path)) {
                for (Path child : stream) children.add(buildNode(child, root));
            }
            node.put("children", children);
        }
        return node;
    }

    public String readFile(UUID projectId, String path) throws IOException {
        Path target = resolveAndValidate(projectId, path);
        if (!Files.exists(target) || Files.isDirectory(target)) throw new IllegalArgumentException("File not found");
        return Files.readString(target, StandardCharsets.UTF_8);
    }

    public void writeFile(UUID projectId, String path, String content) throws IOException {
        Path target = resolveAndValidate(projectId, path);
        byte[] bytes = content.getBytes(StandardCharsets.UTF_8);
        if (bytes.length > MAX_FILE_SIZE_BYTES) throw new IllegalArgumentException("File too large");
        
        Path root = projectRoot(projectId);
        long currentSize = calculateProjectSize(root);
        long sizeDiff = bytes.length - (Files.exists(target) ? Files.size(target) : 0);
        if (currentSize + sizeDiff > MAX_PROJECT_SIZE_BYTES) throw new IllegalArgumentException("Project size limit exceeded");
        
        Files.write(target, bytes);
    }

    public void createFile(UUID projectId, String path, String type) throws IOException {
        Path target = resolveAndValidate(projectId, path);
        Path root = projectRoot(projectId);
        
        if (countFiles(root) >= MAX_FILE_COUNT) throw new IllegalArgumentException("File count limit exceeded");
        
        if ("folder".equals(type)) {
            Files.createDirectories(target);
        } else {
            Files.createDirectories(target.getParent());
            Files.createFile(target);
        }
    }

    public void renameFile(UUID projectId, String oldPath, String newPath) throws IOException {
        Path oldTarget = resolveAndValidate(projectId, oldPath);
        Path newTarget = resolveAndValidate(projectId, newPath);
        Files.move(oldTarget, newTarget, StandardCopyOption.REPLACE_EXISTING);
    }

    public void deleteFile(UUID projectId, String path) throws IOException {
        Path target = resolveAndValidate(projectId, path);
        if (Files.isDirectory(target)) {
            Files.walkFileTree(target, new SimpleFileVisitor<>() {
                @Override public FileVisitResult visitFile(Path file, BasicFileAttributes attrs) throws IOException { Files.delete(file); return FileVisitResult.CONTINUE; }
                @Override public FileVisitResult postVisitDirectory(Path dir, IOException exc) throws IOException { Files.delete(dir); return FileVisitResult.CONTINUE; }
            });
        } else {
            Files.deleteIfExists(target);
        }
    }

    private long calculateProjectSize(Path root) throws IOException {
        if (!Files.exists(root)) return 0;
        try (var stream = Files.walk(root)) {
            return stream.filter(Files::isRegularFile).mapToLong(p -> {
                try { return Files.size(p); } catch (IOException e) { return 0; }
            }).sum();
        }
    }
    
    private int countFiles(Path root) throws IOException {
        if (!Files.exists(root)) return 0;
        try (var stream = Files.walk(root)) {
            return (int) stream.count();
        }
    }
}
