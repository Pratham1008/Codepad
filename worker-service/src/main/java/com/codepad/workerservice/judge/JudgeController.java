package com.codepad.workerservice.judge;

import com.codepad.workerservice.judge.dto.JudgeRequestDto;
import com.codepad.workerservice.judge.dto.SubmissionResultDto;
import lombok.RequiredArgsConstructor;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

@RestController
@RequestMapping("/internal/judge")
@RequiredArgsConstructor
public class JudgeController {
    private final JudgeService judgeService;

    @PostMapping
    public SubmissionResultDto judge(@RequestBody JudgeRequestDto request) {
        return judgeService.judge(request);
    }
}
