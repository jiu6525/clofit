package com.clofit.api.clothes.service;

import com.clofit.api.brand.entity.Brand;
import com.clofit.api.brand.repository.BrandRepository;
import com.clofit.api.clothes.entity.Clothes;
import com.clofit.api.clothes.repository.ClothesRepository;
import com.clofit.api.clothes.request.ClothesRegisterRequest;
import com.clofit.api.color.entity.Color;
import com.clofit.api.color.repository.ColorRepository;
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
    private final ColorRepository colorRepository;

    public List<Clothes> getAllClothes() {
        return clothesRepository.findAllClothes();
    }

    public List<Clothes> getTopClothes() {
        return clothesRepository.findTopClothes(); // 상의만 검색
    }

    public List<Clothes> getBottomClothes() {
        return clothesRepository.findBottomClothes(); // 하의만 검색
    }

    public Clothes getDetailClothes(Long clothesId) {
        return clothesRepository.findDetailClothes(clothesId);
    }

    public List<Clothes> getPublicClothesList() { return clothesRepository.findAllPublicClothes(); }

    public List<Clothes> getPublicClothesListByColor(Long colorId) { return clothesRepository.findAllPublicClothesByColor(colorId); }

    public void registClothes(ClothesRegisterRequest clothesRegisterRequest) {
        Clothes clothes = new Clothes();
//        Brand brand = brandRepository.findById(clothesRegisterRequest.getBrandId())
//                .orElseThrow(() -> new IllegalArgumentException("Invalid brand ID"));
//        clothes.setBrand(brand);
        Color color = colorRepository.findById(clothesRegisterRequest.getColorId())
                        .orElseThrow(() -> new IllegalArgumentException("Invalid color id"));
        clothes.setColor(color);
        clothes.setTextile(clothesRegisterRequest.getTextile());
        clothes.setItem(clothesRegisterRequest.getItem());
        clothes.setPrice(clothesRegisterRequest.getPrice());
        clothes.setImgPath(clothesRegisterRequest.getImgPath());
        clothes.setStyle(clothesRegisterRequest.getStyle());
        clothes.setSeason(clothesRegisterRequest.getSeason());
        clothes.setCategory(clothesRegisterRequest.getCategory());
        clothes.setItemUrl(clothesRegisterRequest.getItemUrl());

//        clothes.setMainColor(clothesRegisterRequest.getMainColor());

        clothesRepository.save(clothes);
    }
}
