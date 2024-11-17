package com.clofit.jwt;

import com.clofit.oauth2.dto.CustomOAuth2User;
import com.clofit.oauth2.dto.MemberDTO;
import com.clofit.test.GPUConnectionTestController;
import com.clofit.oauth2.hadler.CustomSuccessHandler;
import jakarta.servlet.FilterChain;
import jakarta.servlet.ServletException;
import jakarta.servlet.http.Cookie;
import jakarta.servlet.http.HttpServletRequest;
import jakarta.servlet.http.HttpServletResponse;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.web.filter.OncePerRequestFilter;

import java.io.IOException;

public class JWTFilter extends OncePerRequestFilter {

    private final Logger logger = LoggerFactory.getLogger(JWTFilter.class);
    private final JWTUtil jwtUtil;
    @Value("${front.react-server}")
    private String FRONT_REACT_SERVER;

    public JWTFilter(JWTUtil jwtUtil) {

        this.jwtUtil = jwtUtil;
    }

    @Override
    protected void doFilterInternal(HttpServletRequest request, HttpServletResponse response, FilterChain filterChain) throws ServletException, IOException {

        //cookie들을 불러온 뒤 Authorization Key에 담긴 쿠키를 찾음
        String authorization = null;
        Cookie[] cookies = request.getCookies();

        if (cookies != null) {
            for (Cookie cookie : cookies) {
                System.out.println(cookie.getName());
                if (cookie.getName().equals("Authorization")) {
                    authorization = cookie.getValue();
                    break;
                }
            }
        }

//         로컬에서 테스트할 때 아래 키 값 넣을 것
        authorization = "eyJhbGciOiJIUzI1NiJ9.eyJ1c2VybmFtZSI6Iuqwle2YhO2bhCIsIm5hbWUiOiLqsJXtmITtm4QiLCJyb2xlIjoiUk9MRV9VU0VSIiwibWVtYmVySWQiOjEsImlhdCI6MTczMTc0NjM2MSwiZXhwIjoxNzMxOTYyMzYxfQ.0W-yoDa2-J_63IQpnKhgAQnaWaxG9VUx_RnNL3ykGlk";

        //Authorization 헤더 검증
        if (authorization == null) {

            logger.warn("token null");
//            response.sendRedirect(FRONT_REACT_SERVER + "/");
            filterChain.doFilter(request, response);

            //조건이 해당되면 메소드 종료 (필수)
            return;
        }

        //토큰
        String token = authorization;

        //토큰 소멸 시간 검증
        if (jwtUtil.isExpired(token)) {
            logger.warn("token expired");
            filterChain.doFilter(request, response);

            //조건이 해당되면 메소드 종료 (필수)
            return;
        }

        //토큰에서 username과 role 획득
        String username = jwtUtil.getUsername(token);
        String name = jwtUtil.getName(token);
        String role = jwtUtil.getRole(token);
        Long memberId = jwtUtil.getMemberId(token);

        logger.info("현재 등록한 유저의 정보\n");
        logger.info("username : " + username + "\nname : " + name + "\nrole : " + role);

        //userDTO를 생성하여 값 set
        MemberDTO memberDTO = new MemberDTO();
        memberDTO.setUsername(username);
        memberDTO.setName(name);
        memberDTO.setRole(role);
        memberDTO.setMemberId(memberId);

        //UserDetails에 회원 정보 객체 담기
        CustomOAuth2User customOAuth2User = new CustomOAuth2User(memberDTO);

        //스프링 시큐리티 인증 토큰 생성
        Authentication authToken = new UsernamePasswordAuthenticationToken(customOAuth2User, null, customOAuth2User.getAuthorities());
        //세션에 사용자 등록
        SecurityContextHolder.getContext().setAuthentication(authToken);

        logger.info("세션 사용자 등록 완료");

        filterChain.doFilter(request, response);
    }
}