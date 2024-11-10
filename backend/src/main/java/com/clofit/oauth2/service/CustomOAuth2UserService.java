package com.clofit.oauth2.service;

import com.clofit.api.fitting.service.AwsS3ServiceImpl;
import com.clofit.api.member.entity.Member;
import com.clofit.api.member.repository.MemberRepository;
import com.clofit.oauth2.dto.CustomOAuth2User;
import com.clofit.oauth2.dto.KakaoResponse;
import com.clofit.oauth2.dto.OAuth2Response;
import com.clofit.oauth2.dto.MemberDTO;
import com.clofit.oauth2.hadler.CustomSuccessHandler;
import lombok.RequiredArgsConstructor;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.security.oauth2.client.userinfo.DefaultOAuth2UserService;
import org.springframework.security.oauth2.client.userinfo.OAuth2UserRequest;
import org.springframework.security.oauth2.core.OAuth2AuthenticationException;
import org.springframework.security.oauth2.core.user.OAuth2User;
import org.springframework.stereotype.Service;

import java.util.Map;

@Service
@RequiredArgsConstructor
public class CustomOAuth2UserService extends DefaultOAuth2UserService {

    private final Logger logger = LoggerFactory.getLogger(CustomOAuth2UserService.class);
    private final MemberRepository memberRepository;

    @Override
    public OAuth2User loadUser(OAuth2UserRequest userRequest) throws OAuth2AuthenticationException {

        OAuth2User oAuth2User = super.loadUser(userRequest);
        logger.info("oAuth2User = {}", oAuth2User);

        String registrationId = userRequest.getClientRegistration().getRegistrationId();
        logger.info("registrationId = {}", registrationId);

        OAuth2Response oAuth2Response;
        Map<String, String> profile;
        if (registrationId.equals("kakao")) {
            logger.info("카카오 로그인 요청");
            profile = new KakaoResponse(oAuth2User.getAttributes()).getProfile();
            oAuth2Response = new KakaoResponse(oAuth2User.getAttributes());

            logger.info("profile = {}", profile);
            logger.info("oAuth2Response = {}", oAuth2Response);
        }
        else {
            return null;
        }

        String name;

        oAuth2User.getName();
        name = profile.get("nickname");

        String memberName = name;
        String email = oAuth2Response.getEmail();

        Member existData = memberRepository.findByEmail(email);
        if (existData == null) {

            Member member = new Member();
            member.setMemberName(memberName);
            member.setEmail(oAuth2Response.getEmail());
            member.setEmail(email);
            member.setRole("ROLE_USER");

            memberRepository.save(member);

            MemberDTO memberDTO = new MemberDTO();
            memberDTO.setUsername(memberName);
            memberDTO.setName(name);
            memberDTO.setEmail(email);
            memberDTO.setRole("ROLE_USER");


            return new CustomOAuth2User(memberDTO);
        }
        else {
            MemberDTO memberDTO = new MemberDTO();
            memberDTO.setUsername(existData.getMemberName());
            memberDTO.setEmail(email);
            memberDTO.setName(name);
            memberDTO.setRole(existData.getRole());

            return new CustomOAuth2User(memberDTO);
        }
    }
}