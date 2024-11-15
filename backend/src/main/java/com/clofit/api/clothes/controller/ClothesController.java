package com.clofit.api.clothes.controller;

import com.clofit.api.clothes.entity.Clothes;
import com.clofit.api.clothes.request.ClothesRegisterRequest;
import com.clofit.api.clothes.request.ClothesUploadRequest;
import com.clofit.api.clothes.service.ClothesService;
import com.clofit.api.gpu.service.GPUService;
import io.swagger.v3.oas.annotations.Operation;
import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.multipart.MultipartFile;

import java.util.*;

@RestController
@RequestMapping("/clothes")
@RequiredArgsConstructor
public class ClothesController {
    private final ClothesService clothesService;
    private final GPUService s3Service;

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
    public ResponseEntity<Clothes> getDetailClothes(@PathVariable("clothesId") Long clothesId) {
        Clothes clothes = clothesService.getDetailClothes(clothesId);
        return ResponseEntity.ok(clothes);
    }

    @PostMapping
    @Operation(summary = "의류 등록")
    public ResponseEntity<Void> registClothes(@RequestBody ClothesRegisterRequest clothesRegisterRequest) {
        clothesService.registClothes(clothesRegisterRequest);
        return ResponseEntity.ok().build();
    }

    @PostMapping("/upload")
    @Operation(summary = "개인 의류 등록")
    public ResponseEntity<Void> uploadClothes(@RequestParam("file") MultipartFile file,
                                              @RequestParam("memberId") Long memberId) {
        String uuid = UUID.randomUUID().toString();
        String fileName = "member-clothes/" + memberId + "/" + uuid + ".png";
        String imgPath = s3Service.upload(fileName, file);
        String maskedPath = "masked_path";
        String color_id = "color_id";
        String category = "category";

        clothesService.uploadClothes(imgPath, maskedPath, color_id, category);
        return ResponseEntity.ok().build();
    }

}
