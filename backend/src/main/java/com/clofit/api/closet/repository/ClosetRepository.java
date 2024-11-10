package com.clofit.api.closet.repository;

import com.clofit.api.closet.entity.Closet;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.List;

public interface ClosetRepository extends JpaRepository<Closet, Long> {
    List<Closet> findAllByMemberId(Long memberId);

}