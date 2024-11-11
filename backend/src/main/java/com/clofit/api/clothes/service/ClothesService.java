package com.clofit.api.clothes.service;

import com.clofit.api.brand.entity.Brand;
import com.clofit.api.brand.repository.BrandRepository;
import com.clofit.api.clothes.entity.Clothes;
import com.clofit.api.clothes.repository.ClothesRepository;
import com.clofit.api.clothes.request.ClothesRegisterRequest;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.List;

@Service
@Transactional
@RequiredArgsConstructor
public class ClothesService {
    private final ClothesRepository clothesRepository;
    private final BrandRepository brandRepository;

    public List<Clothes> getAllClothes() {
        return clothesRepository.findAll();
    }

    public List<Clothes> getTopClothes() {
        return clothesRepository.findAll(); // 상의만 검색으로 수정 필요
    }

    public List<Clothes> getBottomClothes() {
        return clothesRepository.findAll(); // 하의만 검색으로 수정 필요
    }

    public Clothes getDetailClothes(Long memberId) { // memberId로 검색하는게 맞는지 확인 필요
        return clothesRepository.findById(memberId).orElse(null);
    }

    public void registClothes(ClothesRegisterRequest clothesRegisterRequest) {
        Clothes clothes = new Clothes();
        Brand brand = brandRepository.findById(clothesRegisterRequest.getBrandId())
                .orElseThrow(() -> new IllegalArgumentException("Invalid brand ID"));
        clothes.setBrand(brand);
        clothes.setTextile(clothesRegisterRequest.getTextile());
        clothes.setItem(clothesRegisterRequest.getItem());
        clothes.setPrice(clothesRegisterRequest.getPrice());
        clothes.setImgPath(clothesRegisterRequest.getImgPath());
        clothes.setStyle(clothesRegisterRequest.getStyle());
        clothes.setSeason(clothesRegisterRequest.getSeason());
        clothes.setCategory(clothesRegisterRequest.getCategory());
        clothes.setItemUrl(clothesRegisterRequest.getItemUrl());
        clothes.setMainColor(clothesRegisterRequest.getMainColor());

        clothesRepository.save(clothes);
    }
}
