package com.clofit.jwt.execption;

import jakarta.servlet.ServletException;
import jakarta.servlet.http.HttpServletRequest;
import jakarta.servlet.http.HttpServletResponse;
import org.springframework.security.authentication.BadCredentialsException;
import org.springframework.security.authentication.InsufficientAuthenticationException;
import org.springframework.security.web.authentication.SimpleUrlAuthenticationFailureHandler;
import org.springframework.stereotype.Component;

import javax.naming.AuthenticationException;
import java.io.IOException;

@Component
public class CustomAuthenticationFailureHandler extends SimpleUrlAuthenticationFailureHandler {

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