package com.clofit.oauth2.hadler;

import com.clofit.api.member.entity.Member;
import com.clofit.api.member.repository.MemberRepository;
import com.clofit.jwt.JWTFilter;
import com.clofit.jwt.JWTUtil;
import com.clofit.oauth2.dto.CustomOAuth2User;
import com.fasterxml.jackson.databind.ObjectMapper;
import com.fasterxml.jackson.datatype.jsr310.JavaTimeModule;
import jakarta.servlet.ServletException;
import jakarta.servlet.http.Cookie;
import jakarta.servlet.http.HttpServletRequest;
import jakarta.servlet.http.HttpServletResponse;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.GrantedAuthority;
import org.springframework.security.web.authentication.SimpleUrlAuthenticationSuccessHandler;
import org.springframework.stereotype.Component;

import java.io.IOException;
import java.net.URLEncoder;
import java.util.Collection;
import java.util.Iterator;

@Component
public class CustomSuccessHandler extends SimpleUrlAuthenticationSuccessHandler {

    private final Logger logger = LoggerFactory.getLogger(CustomSuccessHandler.class);
    private final MemberRepository memberRepository;

    @Value("${front.react-server}")
    private String reactServer;

    private final JWTUtil jwtUtil;

    public CustomSuccessHandler(JWTUtil jwtUtil, MemberRepository memberRepository, ObjectMapper objectMapper) {

        this.jwtUtil = jwtUtil;
        this.memberRepository = memberRepository;
    }

    @Override
    public void onAuthenticationSuccess(HttpServletRequest request, HttpServletResponse response, Authentication authentication) throws IOException, ServletException {

        //OAuth2User
        CustomOAuth2User customUserDetails = (CustomOAuth2User) authentication.getPrincipal();
        String email = customUserDetails.getEmail();
        String memberName = customUserDetails.getUsername();
        String name = customUserDetails.getName();
        Member isExistingUser = memberRepository.findByEmail(email);
        logger.info("isExistingUser" + isExistingUser);

        Collection<? extends GrantedAuthority> authorities = authentication.getAuthorities();
        Iterator<? extends GrantedAuthority> iterator = authorities.iterator();
        GrantedAuthority auth = iterator.next();
        String role = auth.getAuthority();

        String token = jwtUtil.createJwt(memberName,name, role, 60*60*60L);

        response.addCookie(createCookie("Authorization", token));
        ObjectMapper objectMapper = new ObjectMapper();
        objectMapper.registerModule(new JavaTimeModule());

        String customUserDetailsJson = objectMapper.writeValueAsString(isExistingUser);
        Cookie userCookie = new Cookie("customUserDetails", URLEncoder.encode(customUserDetailsJson, "UTF-8"));
        userCookie.setMaxAge(60 * 60 * 24);
        userCookie.setPath("/");
        response.addCookie(userCookie);

        response.sendRedirect(reactServer + "/");
    }

    private Cookie createCookie(String key, String value) {

        Cookie cookie = new Cookie(key, value);
        cookie.setMaxAge(60*60*60);
        cookie.setSecure(true);
        cookie.setPath("/");
//        cookie.setHttpOnly(true);

        return cookie;
    }
}