package com.clofit.api.clothes.request;

import jakarta.persistence.Column;
import jakarta.persistence.FetchType;
import jakarta.persistence.JoinColumn;
import jakarta.persistence.ManyToOne;
import lombok.Getter;
import lombok.Setter;

@Getter
@Setter
public class ClothesRegisterRequest {

    private String textile;
    private String item;
    private Integer price;
    private String imgPath;
    private String style;
    private String season;
    private String category;
    private String itemUrl;
    private String mainColor;

    public ClothesRegisterRequest(String textile, String item, Integer price, String imgPath, String style, String season, String category, String itemUrl, String mainColor) {
        this.textile = textile;
        this.item = item;
        this.price = price;
        this.imgPath = imgPath;
        this.style = style;
        this.season = season;
        this.category = category;
        this.itemUrl = itemUrl;
        this.mainColor = mainColor;
    }
}
