package com.clofit.api.fitting.repository;

import com.clofit.api.fitting.entity.Fitting;

import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;

import java.util.List;

public interface FittingRepository extends JpaRepository<Fitting, Long> {
    @Query("SELECT DISTINCT f FROM Fitting f JOIN FETCH f.top JOIN FETCH f.bottom WHERE f.publicYn = 'Y' ")
    Page<Fitting> findAllPublicYn(Pageable pageable);

    // TODO: 만약 top, bottom 중 하나가 개인 의류라면 null_clothes인 의류의 데이터를 보여주기
    // 처음부터 개인의류라면 널 의류를 참조하도록 하는 것도 방법이다.
    @Query("SELECT DISTINCT f FROM Fitting f JOIN FETCH f.member JOIN FETCH f.top JOIN FETCH f.bottom WHERE f.publicYn = 'Y' AND f.top.color.id = :colorId OR f.bottom.color.id = :colorId ")
    Page<Fitting> findAllPublicYnByColorId(@Param("colorId") Long colorId, Pageable pageable);

    List<Fitting> findByMemberId(Long memberId);
}
