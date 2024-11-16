package com.clofit.api.likelog.repository;

import com.clofit.api.likelog.entity.LikeLog;
import com.clofit.api.fitting.entity.Fitting;
import com.clofit.api.member.entity.Member;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;

import java.util.List;
import java.util.Optional;

public interface LikeLogRepository extends JpaRepository<LikeLog, Long> {
    Optional<LikeLog> findByMemberAndFitting(Member member, Fitting fitting);

    boolean existsByMemberAndFitting(Member member, Fitting fitting);

    void deleteByMemberAndFitting(Member member, Fitting fitting);

    @Query("SELECT l.fitting FROM LikeLog l WHERE l.member.id = :memberId AND l.fitting.publicYn = 'Y'")
    List<Fitting> findLikedFittingsByMemberId(@Param("memberId") Long memberId);

    @Query("SELECT l FROM LikeLog l WHERE l.member = :member AND l.fitting.publicYn = 'Y'")
    List<LikeLog> findByMemberAndPublicFitting(@Param("member") Member member);

    List<LikeLog> findByMember(Member member);
}
