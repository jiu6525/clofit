package com.clofit.api.clothes.controller;

import com.clofit.api.clothes.entity.Clothes;
import com.clofit.api.clothes.request.ClothesRegisterRequest;
import com.clofit.api.clothes.request.ClothesUpdateRequest;
import com.clofit.api.clothes.request.ClothesUploadRequest;
import com.clofit.api.clothes.response.ClothesUploadResponse;
import com.clofit.api.clothes.service.ClothesService;
import com.clofit.api.gpu.service.GPUService;
import com.clofit.oauth2.dto.CustomOAuth2User;
import io.swagger.v3.oas.annotations.Operation;
import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.security.core.annotation.AuthenticationPrincipal;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.multipart.MultipartFile;

import java.util.*;

@RestController
@RequestMapping("/clothes")
@RequiredArgsConstructor
public class ClothesController {
    private final ClothesService clothesService;
    private final GPUService gpuService;

    private static final String FILETYPE = ".png";
    private static final String BASEPATH = "member-clothes/";


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

    public ResponseEntity<ClothesUploadResponse> uploadClothes(
            @AuthenticationPrincipal CustomOAuth2User customOAuth2User,
            @RequestParam("file") MultipartFile file
//            @RequestBody ClothesUploadRequest clothesUploadRequest
    ) {
        Long memberId = customOAuth2User.getmemberId();
//        Long memberId = 1L;

        String uuid = UUID.randomUUID().toString();
        String imgPath = BASEPATH + memberId + "/" + uuid;

        ClothesUploadResponse res = gpuService.upload2(memberId, imgPath, FILETYPE, file);

//        String maskedPath = "masked_path";
//        String color_id = "color_id";
//        String category = "category";
//
//        clothesService.uploadClothes(imgPath, maskedPath, color_id, category);
        return ResponseEntity.ok(res);
    }

    @PutMapping("/{clothesId}")
    @Operation(summary = "의류 정보 수정")
    public ResponseEntity<Void> updateClothes(@PathVariable("clothesId") Long clothesId, @RequestBody ClothesUpdateRequest clothesUpdateRequest) {
        clothesService.updateClothes(clothesId, clothesUpdateRequest);
        return ResponseEntity.ok().build();
    }

}
