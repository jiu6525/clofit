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
import org.springframework.beans.factory.annotation.Value;
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

    private static final Logger logger = LoggerFactory.getLogger(MemberController.class);
    private final MemberService memberService;
    private final MultipartProperties multipartProperties;

    @Value("${front.react-server}")
    private String FRONT_REACT_SERVER;

    @ApiResponses(value = {
            @ApiResponse(responseCode = "200", description = "Success"),
            @ApiResponse(responseCode = "400", description = "Bad Request"),})
    @PostMapping("logout")
    public ResponseEntity<String> logout(HttpServletRequest request, HttpServletResponse response){
//        System.out.println("로그아웃 관련 처리");
        logger.info("logout");
        Cookie[] cookies = request.getCookies();
        if (cookies != null) {
            for (Cookie cookie : cookies) {
//                System.out.println(cookie);
                if ("Authorization".equals(cookie.getName())) {
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


    @PutMapping("resign")
    public ResponseEntity<String> resign(@AuthenticationPrincipal CustomOAuth2User customOAuth2User, HttpServletRequest request, HttpServletResponse response) {
//        System.out.println("회원탈퇴 관련 처리");
        logger.info("resign");
        Long memberId = customOAuth2User.getmemberId();
        boolean isDeleted = memberService.deleteMember(memberId);

        Cookie[] cookies = request.getCookies();
        if (cookies != null) {
            for (Cookie cookie : cookies) {
//                System.out.println(cookie);
                if ("Authorization".equals(cookie.getName())) {
                    cookie.setValue(null);
                    cookie.setMaxAge(0);
                    cookie.setPath("/");
                    response.addCookie(cookie);
                }
            }
        }

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
            @AuthenticationPrincipal CustomOAuth2User customOAuth2User) {
        Long memberId = customOAuth2User.getmemberId();
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
    @GetMapping("/mypage")
    public ResponseEntity<MemberInfoResponse> getMemberInfo(@AuthenticationPrincipal CustomOAuth2User customOAuth2User) {
        Long memberId = customOAuth2User.getmemberId();

        MemberInfoResponse memberInfoResponse = memberService.getMemberInfo(memberId);
        return ResponseEntity.ok(memberInfoResponse);
    }

    @PutMapping("/personal-color/{color_id}")
    public ResponseEntity<Void> setPersonalColor(@AuthenticationPrincipal CustomOAuth2User principal, @PathVariable("color_id") String color_id) {
        Long memberId = principal.getmemberId();
//        Long memberId = 4L;
        memberService.setColor(memberId, color_id);
        return ResponseEntity.ok().build();
    }

    @GetMapping("/loginpage")
    public void redirectLoginPage(HttpServletRequest request, HttpServletResponse response) throws IOException {
        response.sendRedirect(FRONT_REACT_SERVER + '/');
    }
}