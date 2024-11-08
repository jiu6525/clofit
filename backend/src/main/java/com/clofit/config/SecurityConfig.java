package com.clofit.config;

import com.clofit.gpu.GPUFilter;
import com.clofit.jwt.JWTFilter;
import com.clofit.jwt.JWTUtil;
import com.clofit.oauth2.hadler.CustomSuccessHandler;
import com.clofit.oauth2.service.CustomOAuth2UserService;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.core.annotation.Order;
import org.springframework.security.config.annotation.web.builders.HttpSecurity;
import org.springframework.security.config.annotation.web.configuration.EnableWebSecurity;
import org.springframework.security.config.annotation.web.configuration.WebSecurityCustomizer;
import org.springframework.security.config.annotation.web.configurers.AbstractHttpConfigurer;
import org.springframework.security.config.http.SessionCreationPolicy;
import org.springframework.security.web.SecurityFilterChain;
import org.springframework.security.web.authentication.UsernamePasswordAuthenticationFilter;
import org.springframework.web.cors.CorsConfiguration;

import java.util.Arrays;
import java.util.List;

@Configuration
@EnableWebSecurity
public class SecurityConfig {

    @Value("${front.react-server}")
    private String reactServer;

    private final CustomOAuth2UserService customOAuth2UserService;
    private final CustomSuccessHandler customSuccessHandler;
    private final JWTUtil jwtUtil;
    private final String ACCESS_KEY;

    public SecurityConfig(CustomOAuth2UserService customOAuth2UserService, CustomSuccessHandler customSuccessHandler, JWTUtil jwtUtil, @Value("${gpu.access-key}") String ACCESS_KEY) {
        this.customOAuth2UserService = customOAuth2UserService;
        this.customSuccessHandler = customSuccessHandler;
        this.jwtUtil = jwtUtil;
        this.ACCESS_KEY = ACCESS_KEY;
    }
    @Order(1)
    @Bean
    public SecurityFilterChain filterChainJWT(HttpSecurity http) throws Exception {
        http
                .cors(corsCustomizer -> corsCustomizer.configurationSource(request -> {
                    CorsConfiguration configuration = new CorsConfiguration();

                    // 허용할 Origin 설정
                    configuration.setAllowedOrigins(Arrays.asList(
                            reactServer
                    ));

                    // 허용할 HTTP 메소드 설정
                    configuration.setAllowedMethods(Arrays.asList("GET", "POST", "PUT", "DELETE", "OPTIONS"));

                    // 헤더와 인증 정보 허용
                    configuration.setAllowedHeaders(List.of("*"));
                    configuration.setAllowCredentials(true);

                    // preflight 요청 캐시 시간 설정
                    configuration.setMaxAge(3600L);

                    // 노출할 헤더 설정
                    configuration.setExposedHeaders(Arrays.asList("Set-Cookie", "Authorization"));

                    return configuration;
                }));

        // CSRF 비활성화
        http.csrf(AbstractHttpConfigurer::disable);

        // From 로그인 방식 비활성화
        http.formLogin(AbstractHttpConfigurer::disable);

        // HTTP Basic 인증 방식 비활성화
        http.httpBasic(AbstractHttpConfigurer::disable);

        // JWT 필터 추가
        http.addFilterBefore(new JWTFilter(jwtUtil), UsernamePasswordAuthenticationFilter.class);

        // OAuth2 로그인 설정
        http.oauth2Login(oauth2 -> oauth2
                .userInfoEndpoint(userInfoEndpointConfig -> userInfoEndpointConfig.userService(customOAuth2UserService))
                .successHandler(customSuccessHandler)
        );

        // 세션 설정: STATELESS
        http.sessionManagement(session -> session.sessionCreationPolicy(SessionCreationPolicy.STATELESS));
        
        //ignore를 제외한 모든 경로에 대해 인증 요구
        //ORDER로 인해 GPU 설정이 우선된다.
//        http.authorizeHttpRequests(auth -> auth.requestMatchers("/api/oauth2/authorization/**", "oauth2/authorization/**").permitAll().anyRequest().authenticated());
        http.authorizeHttpRequests(auth -> auth.requestMatchers("/**").authenticated().anyRequest().permitAll());

        return http.build();
    }

    @Order(2)
    @Bean
    public SecurityFilterChain filterChainGPU(HttpSecurity http) throws Exception {

        http.csrf(AbstractHttpConfigurer::disable);

        // GPU 필터 추가
        http.addFilterBefore(new GPUFilter(ACCESS_KEY), UsernamePasswordAuthenticationFilter.class);

        // 세션 설정: STATELESS
        http.sessionManagement(session -> session.sessionCreationPolicy(SessionCreationPolicy.STATELESS));

        http.authorizeHttpRequests(auth -> auth.requestMatchers("/gpu/**").hasRole("GPU_SERVER"));
//        http.authorizeHttpRequests(auth -> auth.requestMatchers("/gpu").hasRole("GPU_SERVER").anyRequest().authenticated());

        return http.build();
    }
    /**
     * Security 예외 PATH
     * 개발 단계에서는 모든 경로 허용
     * 추후 /** 제거로 시큐리티 적용바랍니다
     */
    @Bean
    public WebSecurityCustomizer webSecurityCustomizer() {
        return web -> web.ignoring().requestMatchers(
                "/error",
                "/swagger-ui/**",
                "/swagger-resources/**",
                "/v3/api-docs/**",
                "/test/**"
//                "/oauth2/authorization/kakao"
                ,"/**"
        );
    }
}
