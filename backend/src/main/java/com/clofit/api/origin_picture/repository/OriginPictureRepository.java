package com.clofit.api.origin_picture.repository;

import com.clofit.api.origin_picture.entity.OriginPicture;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.List;

public interface OriginPictureRepository extends JpaRepository<OriginPicture, Long> {
    int countByMemberIdAndDelPicYn(Long memberId, char delPicYn);
    List<OriginPicture> findAllByMemberIdAndDelPicYn(Long memberId, char delPicYn);
}
