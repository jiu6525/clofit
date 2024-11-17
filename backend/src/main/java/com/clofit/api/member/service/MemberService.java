package com.clofit.api.member.service;

import com.clofit.api.member.entity.Member;
import com.clofit.api.member.repository.MemberRepository;
import com.clofit.api.member.response.MemberInfoResponse;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;
import org.springframework.web.multipart.MultipartFile;

import java.io.IOException;
import java.time.LocalDateTime;
import java.util.Optional;


@Service
@RequiredArgsConstructor
public class MemberService {

    private final MemberRepository memberRepository;
    private final FileService fileService;

    public Member findMemberById(Long memberId) {
        Optional<Member> member = memberRepository.findById(memberId);
        return member.orElse(null);
    }

    public boolean deleteMember(Long memberId) {
        Member member = findMemberById(memberId);
        if (member != null) {
            member.setDelMemberYn('Y'); // 탈퇴 여부 Y 설정
            member.setDelMemberDttm(LocalDateTime.now()); // 탈퇴 일자 dttm
            memberRepository.save(member);
            return true;
        }
        return false;
    }

    public String uploadMemberProfileImage(Long memberId, MultipartFile file) throws IOException {
        Member member = findMemberById(memberId);
        if (member == null) {
            throw new IllegalArgumentException("멤버를 찾을 수 없습니다.");
        }

        // S3에 파일 업로드
        String fileUrl = fileService.uploadFile(memberId, file);

        // 멤버 엔티티에 파일 URL 저장
        member.setProfileFilePath(fileUrl);
        member.setProfileFileName(file.getOriginalFilename());
        memberRepository.save(member);

        return fileUrl;
    }

    public MemberInfoResponse getMemberInfo(Long memberId) {
        Member member = findMemberById(memberId);
        return new MemberInfoResponse(
                member.getMemberName(),
                member.getPersonalColor(),
                member.getProfileFilePath()
        );
    }

    public String getColor(Long memberId) {
        return memberRepository.getPersonalColor(memberId);

    }

    public void setColor(Long memberId, String color) {
        memberRepository.setPersonalColor(memberId, color);
    }

}
