package com.clofit.api.clothes.repository;

import com.clofit.api.brand.entity.Brand;
import com.clofit.api.clothes.entity.Clothes;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;

import java.util.List;

public interface ClothesRepository extends JpaRepository<Clothes, Long> {
    @Query("SELECT DISTINCT c FROM Clothes c JOIN FETCH c.brand")
    List<Clothes> findAllClothes();

    @Query("SELECT DISTINCT c FROM Clothes c JOIN FETCH c.brand WHERE c.category = '0' ")
    List<Clothes> findTopClothes();

    @Query("SELECT DISTINCT c FROM Clothes c JOIN FETCH c.brand WHERE c.category = '1' ")
    List<Clothes> findBottomClothes();

    @Query("SELECT DISTINCT c FROM Clothes c JOIN FETCH c.brand WHERE c.id = :clothesId")
    Clothes findDetailClothes(@Param("clothesId") Long clothesId);
}
