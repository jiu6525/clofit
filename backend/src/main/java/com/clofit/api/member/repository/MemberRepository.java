package com.clofit.api.member.repository;

import com.clofit.api.member.entity.Member;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;

public interface MemberRepository extends JpaRepository<Member, Long> {
    Member findByEmail(String email);

    @Query("SELECT m.personalColor FROM Member m WHERE m.id = :memberId")
    String getPersonalColor(@Param("memberId") Long memberId);

    @Query("UPDATE Member m SET m.personalColor = :color WHERE m.id = :id ")
    void setPersonalColor(@Param("id") Long id, @Param("color") String color);
}
