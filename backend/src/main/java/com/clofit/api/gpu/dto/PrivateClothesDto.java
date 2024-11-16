package com.clofit.api.gpu.dto;

import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.Setter;

@AllArgsConstructor
@Getter
@Setter
public class PrivateClothesDto {
    Long memberId;
    Integer colorId;
    Double confidence;
    String clothesType;
    Integer clothesTypeId;
    String clothes_type_bottom_top;
    String originalImage;
    String maskedImage;
}
