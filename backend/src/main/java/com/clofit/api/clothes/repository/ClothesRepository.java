package com.clofit.api.clothes.repository;

import com.clofit.api.clothes.entity.Clothes;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;

import java.util.List;

public interface ClothesRepository extends JpaRepository<Clothes, Long> {
//    @Query("SELECT DISTINCT c FROM Clothes c JOIN FETCH c.brand")
    @Query("SELECT DISTINCT c FROM Clothes c JOIN FETCH c.color")
    List<Clothes> findAllClothes();

//    @Query("SELECT DISTINCT c FROM Clothes c JOIN FETCH c.brand WHERE c.category = '0' ")
    @Query("SELECT DISTINCT c FROM Clothes c JOIN FETCH c.color WHERE c.category = 'top' ")
    List<Clothes> findTopClothes();

//    @Query("SELECT DISTINCT c FROM Clothes c JOIN FETCH c.brand WHERE c.category = '1' ")
    @Query("SELECT DISTINCT c FROM Clothes c JOIN FETCH c.color WHERE c.category = 'bottom' ")
    List<Clothes> findBottomClothes();

    @Query("SELECT c FROM Clothes c JOIN FETCH c.color WHERE c.category = 'top' AND c.id = :top")
    Clothes findTopClothe(@Param("top") String top);

    @Query("SELECT c FROM Clothes c JOIN FETCH c.color WHERE c.category = 'bottom' AND c.id = :bottom")
    Clothes findBottomClothe(@Param("bottom") String bottom);

    @Query("SELECT c FROM Clothes c WHERE c.item = 'null_clothes' AND c.category = 'top'")
    Clothes findTopNullColor();

    @Query("SELECT c FROM Clothes c WHERE c.item = 'null_clothes' AND c.category = 'bottom'")
    Clothes findBottomNullColor();

//    @Query("SELECT DISTINCT c FROM Clothes c JOIN FETCH c.brand WHERE c.id = :clothesId")
    @Query("SELECT DISTINCT c FROM Clothes c JOIN FETCH c.color WHERE c.id = :clothesId")
    Clothes findDetailClothes(@Param("clothesId") Long clothesId);

    @Query("SELECT DISTINCT c FROM Clothes c JOIN FETCH c.color WHERE c.myClothesYn = 'N' ")
    Page<Clothes> findAllPublicClothes(Pageable pageable);

    @Query("SELECT DISTINCT c FROM Clothes c JOIN FETCH c.color WHERE c.myClothesYn = 'N' AND c.color.id = :colorId ")
    Page<Clothes> findAllPublicClothesByColor(@Param("colorId") Long colorId, Pageable pageable);
}
