package com.clofit.api.fitting.entity;

import com.clofit.api.clothes.entity.Clothes;
import com.clofit.api.member.entity.Member;
import jakarta.persistence.*;
import lombok.Getter;
import lombok.Setter;
import net.minidev.json.annotate.JsonIgnore;
import lombok.ToString;
import org.hibernate.annotations.ColumnDefault;
import org.hibernate.annotations.CreationTimestamp;

import java.time.LocalDateTime;


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
    @JsonIgnore
    private Member member;

    @Column(name = "img_path")
    private String imgPath;

//    @CreationTimestamp
    @Column(name = "reg_fitting_dttm")
    private String regFittingDttm;

//    @ColumnDefault("N")
    @Column(name = "favorite_yn")
    private Character favoriteYn;

    @Column(name = "fitting_name")
    private String fittingName;

//    @ColumnDefault("N")
    @Column(name = "public_yn")
    private Character publicYn;

//    @ManyToOne(fetch = FetchType.LAZY)
//    @JoinColumn(name = "clothes_id")
//    private Clothes clothes;

    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "top")
    @JsonIgnore
    private Clothes top;;

    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "bottom")
    @JsonIgnore
    private Clothes bottom;;
}
