package com.clofit.jwt.execption;

import jakarta.servlet.ServletException;
import jakarta.servlet.http.HttpServletRequest;
import jakarta.servlet.http.HttpServletResponse;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.http.HttpStatus;
import org.springframework.security.core.AuthenticationException;
import org.springframework.security.web.AuthenticationEntryPoint;

import java.io.IOException;

public class CustomAuthenticationEntryPoint implements AuthenticationEntryPoint {

    @Value("${front.react-server}")
    private String FRONT_REACT_SERVER;

    @Override
    public void commence(HttpServletRequest request, HttpServletResponse response, AuthenticationException authException) throws IOException, ServletException {
        String exception = (String)request.getAttribute("exception");
        HttpStatus errorCode;

        response.setStatus(HttpStatus.UNAUTHORIZED.value());
        response.sendRedirect(FRONT_REACT_SERVER + '/');

//        /**
//         * 토큰 없는 경우
//         */
//        if(exception == null) {
////            errorCode = ErrorCode.NON_LOGIN;
////            errorCode = HttpStatus.UNAUTHORIZED;
////            setResponse(response, errorCode);
//            response.setStatus(HttpStatus.UNAUTHORIZED.value());
//            response.sendRedirect(FRONT_REACT_SERVER + '/');
//            return;
//        }
//
//        /**
//         * 토큰 만료된 경우
//         */
//        if(exception.equals(ErrorCode.EXPIRED_TOKEN.getCode())) {
//            errorCode = ErrorCode.EXPIRED_TOKEN;
//            setResponse(response, errorCode);
//            return;
//        }
//
//        /**
//         * 토큰 시그니처가 다른 경우
//         */
//        if(exception.equals(ErrorCode.INVALID_TOKEN.getCode())) {
//            errorCode = ErrorCode.INVALID_TOKEN;
//            setResponse(response, errorCode);
//        }
    }
}
