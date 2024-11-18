package com.clofit.api.clothes.service;

import com.clofit.api.clothes.entity.Clothes;
import com.clofit.api.clothes.repository.ClothesRepository;
import com.clofit.api.clothes.request.ClothesRegisterRequest;
import com.clofit.api.clothes.request.ClothesUpdateRequest;
import com.clofit.api.clothes.response.ClothesUploadResponse;
import com.clofit.api.color.entity.Color;
import com.clofit.api.color.repository.ColorRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.List;

@Service
@Transactional
@RequiredArgsConstructor
public class ClothesService {
    private final ClothesRepository clothesRepository;
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

    public Page<Clothes> getPublicClothesList(Pageable pageable) { return clothesRepository.findAllPublicClothes(pageable); }

    public Page<Clothes> getPublicClothesListByColor(Long colorId, Pageable pageable) { return clothesRepository.findAllPublicClothesByColor(colorId, pageable); }

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

    public ClothesUploadResponse uploadClothes(String imgPath, String maskedPath, Long colorId, String category, String clothes_type) {
        Color color = colorRepository.findById(colorId)
                .orElseThrow(() -> new IllegalArgumentException("Invalid color id"));

        Clothes clothes = new Clothes();
        clothes.setImgPath(imgPath);
        clothes.setMaskedPath(maskedPath);
        clothes.setColor(color);
        clothes.setCategory(category);
        clothes.setMyClothesYn('Y');
        clothes.setStyle(clothes_type);

        clothes = clothesRepository.save(clothes);

        return new ClothesUploadResponse(clothes.getId(), clothes.getImgPath(), clothes.getMaskedPath(), clothes.getCategory(), clothes.getStyle(), clothes.getColor().getId());
    }

    public void updateClothes(Long clothesId, ClothesUpdateRequest clothesUpdateRequest) {
        Clothes clothes = clothesRepository.findById(clothesId)
                .orElseThrow(() -> new IllegalArgumentException("Invalid clothes id"));

        if(clothesUpdateRequest.getColorId() != null){
            Color color = colorRepository.findById(clothesUpdateRequest.getColorId())
                    .orElseThrow(() -> new IllegalArgumentException("Invalid color id"));
            clothes.setColor(color);
        }

        if(clothesUpdateRequest.getCategory() != null){
            clothes.setCategory(clothesUpdateRequest.getCategory());
        }

        if(clothesUpdateRequest.getStyle() != null){
            clothes.setStyle(clothesUpdateRequest.getStyle());
        }
    }
}
