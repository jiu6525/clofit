//package com.clofit.api.brand.entity;
//
//import com.clofit.api.clothes.entity.Clothes;
//import com.fasterxml.jackson.annotation.JsonBackReference;
//import jakarta.persistence.*;
//
//import java.util.List;
//
//@Entity
//public class Brand {
//
//    @Id
//    @GeneratedValue(strategy = GenerationType.IDENTITY)
//    @Column(name = "brand_id")
//    private Long id;
//
//    @OneToMany(mappedBy = "brand", fetch = FetchType.LAZY)
//    @JsonBackReference
//    private List<Clothes> clothes;
//
//    @Column(name = "brand_img_path")
//    private String brandImgPath;
//
//    @Column(name = "brand_name")
//    private String brandName;
//}
