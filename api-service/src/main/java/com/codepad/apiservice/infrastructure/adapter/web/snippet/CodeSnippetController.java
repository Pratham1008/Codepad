package com.codepad.apiservice.infrastructure.adapter.web.snippet;

import com.codepad.apiservice.core.ManageSnippetUseCase;
import com.codepad.apiservice.core.port.in.dto.SaveSnippetRequest;
import com.codepad.apiservice.core.SnippetResponse;
import com.codepad.apiservice.core.UpdateSnippetRequest;
import io.swagger.v3.oas.annotations.tags.Tag;
import jakarta.validation.Valid;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.data.domain.Page;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.web.bind.annotation.*;

import java.util.UUID;

@RestController
@RequestMapping("/api/snippets")
@RequiredArgsConstructor
@Slf4j
@Tag(name = "Snippets", description = "Code snippet history management")
public class CodeSnippetController {

    private final ManageSnippetUseCase manageSnippetUseCase;

    private UUID currentUserId() {
        var auth = SecurityContextHolder.getContext().getAuthentication();

        assert auth != null;
        return UUID.fromString(auth.getName());
    }

    @PostMapping
    public ResponseEntity<SnippetResponse> save(@Valid @RequestBody SaveSnippetRequest req) {
        return ResponseEntity.status(HttpStatus.CREATED)
                .body(manageSnippetUseCase.saveSnippet(currentUserId(), req));
    }

    @GetMapping
    public ResponseEntity<Page<SnippetResponse>> getHistory(
            @RequestParam(defaultValue = "0") int page,
            @RequestParam(defaultValue = "20") int size) {
        return ResponseEntity.ok(manageSnippetUseCase.getSnippetHistory(currentUserId(), page, Math.min(size, 50)));
    }

    @GetMapping("/{snippetId}")
    public ResponseEntity<SnippetResponse> getById(@PathVariable UUID snippetId) {
        return ResponseEntity.ok(manageSnippetUseCase.getSnippetById(currentUserId(), snippetId));
    }

    @PatchMapping("/{snippetId}")
    public ResponseEntity<SnippetResponse> update(@PathVariable UUID snippetId,
                                                   @RequestBody UpdateSnippetRequest req) {
        return ResponseEntity.ok(manageSnippetUseCase.updateSnippet(currentUserId(), snippetId, req));
    }

    @DeleteMapping("/{snippetId}")
    @ResponseStatus(HttpStatus.NO_CONTENT)
    public void delete(@PathVariable UUID snippetId) {
        manageSnippetUseCase.deleteSnippet(currentUserId(), snippetId);
    }
}
