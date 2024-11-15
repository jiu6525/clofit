package com.clofit.api.fitting.entity;

import com.clofit.api.clothes.entity.Clothes;
import com.clofit.api.member.entity.Member;
import jakarta.persistence.*;
import lombok.Getter;
import lombok.Setter;
import lombok.ToString;


@Getter
@Setter
@Entity
@Table(name = "fitting")
@ToString
public class Fitting {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "fitting_id")
    private Long id;

    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "member_id")
    private Member member;

    @Column(name = "img_path")
    private String imgPath;

    @Column(name = "reg_fitting_dttm")
    private String regFittingDttm;

    @Column(name = "favorite_yn")
    private char favoriteYn;

    @Column(name = "fitting_name")
    private String fittingName;

    @Column(name = "public_yn")
    private char publicYn;

    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = " clothes_id")
    private Clothes clothes;;
}
