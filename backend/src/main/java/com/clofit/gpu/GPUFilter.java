package com.clofit.gpu;

import jakarta.persistence.Access;
import jakarta.servlet.FilterChain;
import jakarta.servlet.ServletException;
import jakarta.servlet.http.HttpServletRequest;
import jakarta.servlet.http.HttpServletResponse;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.web.filter.OncePerRequestFilter;

import java.io.IOException;

public class GPUFilter extends OncePerRequestFilter {

    @Value("${gpu.access-token}")
    private String ACCESS_KEY;

    //연산의 편의를 위해 Bearer 붙이기
    public GPUFilter() {
        ACCESS_KEY = "Bearer " + ACCESS_KEY;
    }

    @Override
    protected void doFilterInternal(HttpServletRequest request, HttpServletResponse response, FilterChain filterChain) throws ServletException, IOException {
        String keyHeader = request.getHeader("Authorization");
        if(ACCESS_KEY.equals(keyHeader)) {
            filterChain.doFilter(request, response);
        }
    }
}
