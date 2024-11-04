package com.clofit.api.clothes.entity;

import com.clofit.api.brand.entity.Brand;
import jakarta.persistence.*;

@Entity
public class Clothes {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "clothes_id")
    private Long id;

    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "brand_id")
    private Brand brand;

    @Column(name = "textile")
    private String textile;

    @Column(name = " item")
    private String item;

    @Column(name = "price")
    private Integer price;

    @Column(name = "img_path")
    private String imgPath;

    @Column(name = "style")
    private String style;

    @Column(name = "season")
    private String season;

    @Column(name = "category")
    private String category;

    @Column(name = "item_url")
    private String itemUrl;

    @Column(name = "main_color")
    private String mainColor;

    @Column(name = "my_clotes_yn")
    private char myClothesYn;

    @Column(name = "del_clothes_yn")
    private char delClothesYn;
}
