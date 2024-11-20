package com.clofit.api.likelog.service;

import com.clofit.api.fitting.entity.Fitting;
import com.clofit.api.fitting.repository.FittingRepository;
import com.clofit.api.likelog.entity.LikeLog;
import com.clofit.api.likelog.repository.LikeLogRepository;
import com.clofit.api.likelog.response.LikeLogResponse;
import com.clofit.api.member.entity.Member;
import com.clofit.api.member.repository.MemberRepository;
import jakarta.transaction.Transactional;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Optional;
import java.util.stream.Collectors;

@Service
public class LikeLogService {

    @Autowired
    private LikeLogRepository likeLogRepository;

    @Autowired
    private MemberRepository memberRepository;

    @Autowired
    private FittingRepository fittingRepository;

    @Transactional
    public void likeFitting(Long memberId, Long fittingId) {
        Member member = memberRepository.findById(memberId)
                .orElseThrow(() -> new IllegalStateException("Member not found"));
        Fitting fitting = fittingRepository.findById(fittingId)
                .orElseThrow(() -> new IllegalStateException("Fitting not found"));

        boolean exists = likeLogRepository.existsByMemberAndFitting(member, fitting);
        if (exists) {
            throw new IllegalStateException("이미 좋아요를 누름");
        }

        LikeLog likeLog = new LikeLog();
        likeLog.setMember(member);
        likeLog.setFitting(fitting);
        likeLogRepository.save(likeLog);
    }

    @Transactional
    public void unlikeFitting(Long memberId, Long fittingId) {
        Member member = memberRepository.findById(memberId)
                .orElseThrow(() -> new IllegalStateException("Member not found"));
        Fitting fitting = fittingRepository.findById(fittingId)
                .orElseThrow(() -> new IllegalStateException("Fitting not found"));

        Optional<LikeLog> likeLog = likeLogRepository.findByMemberAndFitting(member, fitting);
        if (likeLog.isEmpty()) {
            throw new IllegalStateException("좋아요 안눌렀음.");
        }

        likeLogRepository.delete(likeLog.get());
    }

    public List<LikeLogResponse> getLikesByMemberId(Long memberId) {
        Member member = memberRepository.findById(memberId)
                .orElseThrow(() -> new IllegalStateException("Member not found"));

        // 공개 상태인 피팅만 조회
        List<LikeLog> likeLogs = likeLogRepository.findByMemberAndPublicFitting(member);

        return likeLogs.stream()
                .map(likeLog -> new LikeLogResponse(
                        likeLog.getFitting().getId(),
                        likeLog.getFitting().getImgPath()
                ))
                .collect(Collectors.toList());
    }

}
