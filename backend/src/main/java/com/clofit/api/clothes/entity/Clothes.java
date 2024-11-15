package com.clofit.api.clothes.entity;

import com.clofit.api.closet.entity.Closet;
import com.fasterxml.jackson.annotation.JsonBackReference;
import com.fasterxml.jackson.annotation.JsonIgnore;
import com.fasterxml.jackson.annotation.JsonManagedReference;
import jakarta.persistence.*;
import lombok.Getter;
import lombok.Setter;

import java.util.List;

@Entity
@Getter
@Setter
public class Clothes {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "clothes_id")
    private Long id;

    @OneToMany(mappedBy = "clothes", fetch = FetchType.LAZY)
    @JsonBackReference
    private List<Closet> closet;

//    @ManyToOne(fetch = FetchType.LAZY)
//    @JoinColumn(name = "brand_id")
//    @JsonManagedReference
//    private Brand brand;

    @Column(name = "textile")
    private String textile;

    @Column(name = " item")
    private String item;

    @Column(name = "price")
    private Integer price;

    @Column(name = "img_path")
    private String imgPath;

    @Column(name = "masked_path")
    private String maskedPath;

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
