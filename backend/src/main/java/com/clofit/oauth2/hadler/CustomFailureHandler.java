package com.clofit.oauth2.hadler;

import jakarta.servlet.ServletException;
import jakarta.servlet.http.HttpServletRequest;
import jakarta.servlet.http.HttpServletResponse;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.security.core.AuthenticationException;
import org.springframework.security.web.authentication.SimpleUrlAuthenticationFailureHandler;
import org.springframework.stereotype.Component;

import java.io.IOException;

@Component
public class CustomFailureHandler extends SimpleUrlAuthenticationFailureHandler {

    @Value("${front.react-server}")
    private String FRONT_REACT_SERVER;

    @Override
    public void onAuthenticationFailure(HttpServletRequest request,
                                        HttpServletResponse response,
                                        AuthenticationException exception) throws IOException, ServletException {
        response.setStatus(HttpServletResponse.SC_UNAUTHORIZED);
        response.sendRedirect(FRONT_REACT_SERVER + "/");
    }


//    @Override
//    public void onAuthenticationFailure(HttpServletRequest request, HttpServletResponse response, AuthenticationException exception) throws IOException, ServletException {
//
//        String errorMessage = "Invalid Username or Password";
//
//        if(exception instanceof BadCredentialsException){
//            errorMessage = "Invalid Username or Password";
//        }else if(exception instanceof InsufficientAuthenticationException){
//            errorMessage = "Invalid Secret Key";
//        }
//
//        setDefaultFailureUrl("/login?error=true&exception=" + exception.getMessage());
//
//        super.onAuthenticationFailure(request, response, exception);
//    }
}