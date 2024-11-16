package com.clofit.api.likelog.controller;

import com.clofit.api.fitting.entity.Fitting;
import com.clofit.api.likelog.request.LikeLogRequest;
import com.clofit.api.likelog.response.LikeLogResponse;
import com.clofit.api.likelog.service.LikeLogService;
import com.clofit.oauth2.dto.CustomOAuth2User;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.security.core.annotation.AuthenticationPrincipal;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/likes")
public class LikeLogController {

    @Autowired
    private LikeLogService likeLogService;

    @PostMapping("/like")
    public ResponseEntity<String> likeFitting(@RequestBody LikeLogRequest request) {
        likeLogService.likeFitting(request.getMemberId(), request.getFittingId());
        return ResponseEntity.ok("좋아요가 추가되었습니다.");
    }

    @DeleteMapping("/like")
    public ResponseEntity<String> unlikeFitting(@RequestBody LikeLogRequest request) {
        likeLogService.unlikeFitting(request.getMemberId(), request.getFittingId());
        return ResponseEntity.ok("좋아요가 취소되었습니다.");
    }

    @GetMapping("/my")
    public ResponseEntity<List<LikeLogResponse>> getLikesByMember(@AuthenticationPrincipal CustomOAuth2User customOAuth2User) {
        // CustomOAuth2User에서 memberId를 가져옴
        Long memberId = customOAuth2User.getmemberId();
        //Long memberId = 1l;

        List<LikeLogResponse> responses = likeLogService.getLikesByMemberId(memberId);
        return ResponseEntity.ok(responses);
    }

}
