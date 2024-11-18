package com.clofit.api.clothes.response;

import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

@Getter
@Setter
@AllArgsConstructor
@NoArgsConstructor
public class ClothesUploadResponse {
    private Long clothesId;
    private String imagePath;
    private String maskedPath;
    private String category;
    private String style;
    private Long colorId;
}
