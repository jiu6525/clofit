package com.clofit.api.clothes.controller;

import com.clofit.api.clothes.entity.Clothes;
import com.clofit.api.clothes.request.ClothesRegisterRequest;
import com.clofit.api.clothes.service.ClothesService;
import io.swagger.v3.oas.annotations.Operation;
import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/clothes")
@RequiredArgsConstructor
public class ClothesController {
    private final ClothesService clothesService;

    @GetMapping
    @Operation(summary = "의류 검색")
    public ResponseEntity<List<Clothes>> getAllClothes() {
        List<Clothes> list = clothesService.getAllClothes();
        return ResponseEntity.ok(list);
    }

    @GetMapping("/top")
    @Operation(summary = "상의 조회")
    public ResponseEntity<List<Clothes>> getTopClothes() {
        List<Clothes> list = clothesService.getTopClothes();
        return ResponseEntity.ok(list);
    }

    @GetMapping("/bottom")
    @Operation(summary = "하의 조회")
    public ResponseEntity<List<Clothes>> getBottomClothes() {
        List<Clothes> list = clothesService.getBottomClothes();
        return ResponseEntity.ok(list);
    }

    @GetMapping("/{clothesId}")
    @Operation(summary = "의류 상세 조회")
    public ResponseEntity<Clothes> getDetailClothes(@PathVariable Long clothesId) {
        Clothes clothes = clothesService.getDetailClothes(clothesId);
        return ResponseEntity.ok(clothes);
    }

    @PostMapping
    @Operation(summary = "의류 등록")
    public ResponseEntity<Void> registClothes(@RequestBody ClothesRegisterRequest clothesRegisterRequest) {
        clothesService.registClothes(clothesRegisterRequest);
        return ResponseEntity.ok().build();
    }

}
