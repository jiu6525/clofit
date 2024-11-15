package com.clofit.api.clothes.repository;

import com.clofit.api.clothes.entity.Clothes;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;

import java.util.List;

public interface ClothesRepository extends JpaRepository<Clothes, Long> {
    @Query("SELECT c FROM Clothes c")
    List<Clothes> findAllClothes();

    @Query("SELECT c FROM Clothes c WHERE c.category = '0' ")
    List<Clothes> findTopClothes();

    @Query("SELECT c FROM Clothes c WHERE c.category = '1' ")
    List<Clothes> findBottomClothes();

    @Query("SELECT c FROM Clothes c WHERE c.id = :clothesId")
    Clothes findDetailClothes(@Param("clothesId") Long clothesId);
}
