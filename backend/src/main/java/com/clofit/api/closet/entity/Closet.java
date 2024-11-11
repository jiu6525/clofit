package com.clofit.api.closet.entity;

import com.clofit.api.clothes.entity.Clothes;
import jakarta.persistence.*;

@Entity
public class Closet {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "closet_id")
    private Long id;

    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "clothes_id")
    private Clothes clothes;

    @Column(name = "reg_closet_dttm")
    private String reg_closet_dttm;
}
