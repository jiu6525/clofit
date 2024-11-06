package com.clofit.config;

import com.clofit.gpu.GPUFilter;
import com.clofit.jwt.JWTFilter;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.core.annotation.Order;
import org.springframework.security.config.annotation.web.builders.HttpSecurity;
import org.springframework.security.config.annotation.web.configuration.EnableWebSecurity;
import org.springframework.security.config.annotation.web.configurers.AbstractHttpConfigurer;
import org.springframework.security.config.http.SessionCreationPolicy;
import org.springframework.security.web.SecurityFilterChain;
import org.springframework.security.web.authentication.AuthenticationFilter;
import org.springframework.security.web.authentication.UsernamePasswordAuthenticationFilter;
import org.springframework.web.cors.CorsConfiguration;

import java.util.Arrays;
import java.util.List;

@Configuration
@EnableWebSecurity
public class GPUSecurityConfig {

    @Order(2)
    @Bean
    public SecurityFilterChain filterChainGPU(HttpSecurity http) throws Exception {
//        http.authorizeHttpRequests().requestMatchers("/gpu/**").authenticated().and().addFilterBefore(new GPUFilter(), AuthenticationFilter.class);
        http.authorizeHttpRequests(auth -> auth.requestMatchers("/gpu/**").authenticated().anyRequest().permitAll());

        http.addFilterBefore(new GPUFilter(), UsernamePasswordAuthenticationFilter.class);

//        http.authorizeHttpRequests(auth -> auth.anyRequest().permitAll());

        return http.build();
    }

}
