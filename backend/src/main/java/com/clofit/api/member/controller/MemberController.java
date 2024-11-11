package com.clofit.api.member.controller;

import com.clofit.api.member.request.MemberInfoRequest;
import com.clofit.api.member.response.MemberInfoResponse;
import com.clofit.api.member.service.MemberService;
import com.clofit.oauth2.dto.CustomOAuth2User;
import io.swagger.v3.oas.annotations.responses.ApiResponse;
import io.swagger.v3.oas.annotations.responses.ApiResponses;
import jakarta.servlet.http.Cookie;
import jakarta.servlet.http.HttpServletRequest;
import jakarta.servlet.http.HttpServletResponse;
import lombok.RequiredArgsConstructor;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.boot.autoconfigure.web.servlet.MultipartProperties;
import org.springframework.http.ResponseEntity;
import org.springframework.security.core.annotation.AuthenticationPrincipal;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.multipart.MultipartFile;

import java.io.IOException;
import java.util.Map;

@RestController
@RequestMapping("/member")
@RequiredArgsConstructor
public class MemberController {

    private static final Logger log = LoggerFactory.getLogger(MemberController.class);
    private final MemberService memberService;
    private final MultipartProperties multipartProperties;

    @ApiResponses(value = {
            @ApiResponse(responseCode = "200", description = "Success"),
            @ApiResponse(responseCode = "400", description = "Bad Request"),})
    @PostMapping("logout")
    public ResponseEntity<String> logout(HttpServletRequest request, HttpServletResponse response){
        System.out.println("로그아웃 관련 처리");
        Cookie[] cookies = request.getCookies();
        if (cookies != null) {
            for (Cookie cookie : cookies) {
                System.out.println(cookie);
                if ("customUserDetails".equals(cookie.getName())) {
                    cookie.setValue(null);
                    cookie.setMaxAge(0);
                    cookie.setPath("/");
                    response.addCookie(cookie);
                    return ResponseEntity.ok("로그아웃 되었습니다");
                }
            }
        }
        return ResponseEntity.status(400).body("잘못된 접근입니다");
    }


    @PutMapping("resign/{memberId}")
    public ResponseEntity<String> resign(@PathVariable("memberId") Long member_id) {
        System.out.println("회원탈퇴 관련 처리");
        boolean isDeleted = memberService.deleteMember(member_id);

        if (isDeleted) {
            return ResponseEntity.ok("회원 탈퇴 처리 완료");
        } else {
            return ResponseEntity.status(400).body("잘못된 접근입니다");
        }
    }

    // 프로필 이미지 업로드
    @PutMapping("/profile-image")
    public ResponseEntity<String> uploadProfileImage(
            @RequestParam("file") MultipartFile file,
            @RequestParam("memberId") Long memberId) {
        try {
            String fileUrl = memberService.uploadMemberProfileImage(memberId, file);
            return ResponseEntity.ok("프로필 이미지 업로드 완료: " + fileUrl);
        } catch (IOException e) {
            return ResponseEntity.status(500).body("프로필 이미지 업로드 실패: " + e.getMessage());
        } catch (IllegalArgumentException e) {
            return ResponseEntity.badRequest().body("요청이 잘못되었습니다: " + e.getMessage());
        }
    }
    
    // 마이페이지 정보
    @GetMapping("/my/{memberId}")
    public ResponseEntity<MemberInfoResponse> getMemberInfo(@PathVariable Long memberId) {
        MemberInfoResponse memberInfoResponse = memberService.getMemberInfo(memberId);
        return ResponseEntity.ok(memberInfoResponse);
    }
}