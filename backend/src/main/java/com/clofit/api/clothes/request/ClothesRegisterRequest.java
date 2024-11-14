package com.clofit.api.clothes.request;

import com.clofit.api.brand.entity.Brand;
import jakarta.persistence.Column;
import jakarta.persistence.FetchType;
import jakarta.persistence.JoinColumn;
import jakarta.persistence.ManyToOne;
import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.Setter;

@Getter
@Setter
@AllArgsConstructor
public class ClothesRegisterRequest {

//    private Long brandId;
    private String textile;
    private String item;
    private Integer price;
    private String imgPath;
    private String style;
    private String season;
    private String category;
    private String itemUrl;
    private Long colorId;
//    private String mainColor;

//    public ClothesRegisterRequest(Long brandId, String textile, String item, Integer price, String imgPath, String style, String season, String category, String itemUrl, String mainColor) {
//        this.brandId = brandId;
//        this.textile = textile;
//        this.item = item;
//        this.price = price;
//        this.imgPath = imgPath;
//        this.style = style;
//        this.season = season;
//        this.category = category;
//        this.itemUrl = itemUrl;
//        this.mainColor = mainColor;
//    }
}
