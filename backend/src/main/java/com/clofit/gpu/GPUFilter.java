package com.clofit.gpu;

import jakarta.persistence.Access;
import jakarta.servlet.FilterChain;
import jakarta.servlet.ServletException;
import jakarta.servlet.http.HttpServletRequest;
import jakarta.servlet.http.HttpServletResponse;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.core.authority.SimpleGrantedAuthority;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.web.filter.OncePerRequestFilter;

import java.io.IOException;
import java.util.List;

public class GPUFilter extends OncePerRequestFilter {

    private final String ACCESS_KEY;

    private final UsernamePasswordAuthenticationToken authentication = new UsernamePasswordAuthenticationToken(
            "GPU_SERVER", // username
            null, // password
            List.of(new SimpleGrantedAuthority("ROLE_GPU_SERVER")) // 권한 설정
    );

    //연산의 편의를 위해 Bearer 붙이기
    public GPUFilter(String ACCESS_KEY) {
        this.ACCESS_KEY = "Bearer " + ACCESS_KEY;
    }

    // GPU 서버 전용 접근 api를 위한 필터
    @Override
    protected void doFilterInternal(HttpServletRequest request, HttpServletResponse response, FilterChain filterChain) throws ServletException, IOException {
        String keyHeader = request.getHeader("Authorization");

        if(ACCESS_KEY.equals(keyHeader)) {
            SecurityContextHolder.getContext().setAuthentication(authentication);
            filterChain.doFilter(request, response);
        } else {
            response.sendError(HttpServletResponse.SC_UNAUTHORIZED, "Wrong Access Key");
            filterChain.doFilter(request, response);
        }
    }
}
