package com.clofit.api.brand.entity;

import jakarta.persistence.*;

@Entity
public class Brand {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "brand_id")
    private Long id;

    @Column(name = "brand_img_path")
    private String brandImgPath;

    @Column(name = "brand_name")
    private String brandName;
}
