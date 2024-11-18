package com.clofit.api.fitting.controller;

import com.clofit.config.SseEmitterManager;
import com.clofit.oauth2.dto.CustomOAuth2User;
import lombok.RequiredArgsConstructor;
import org.springframework.security.core.annotation.AuthenticationPrincipal;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;
import org.springframework.web.servlet.mvc.method.annotation.SseEmitter;

@RestController
@RequiredArgsConstructor
@RequestMapping("/sse")
public class SseController {

    private final SseEmitterManager sseEmitterManager;

    @GetMapping("/connect")
    public SseEmitter connect(@AuthenticationPrincipal CustomOAuth2User customOAuth2User) {
        Long memberId = customOAuth2User.getmemberId();
        return sseEmitterManager.createEmitter(memberId);
    }
}
