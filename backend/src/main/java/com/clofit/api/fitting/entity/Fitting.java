package com.clofit.api.fitting.entity;

import com.clofit.api.clothes.entity.Clothes;
import com.clofit.api.member.entity.Member;
import jakarta.persistence.*;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;
import net.minidev.json.annotate.JsonIgnore;
import lombok.ToString;

import java.time.LocalDateTime;


@Getter
@Setter
@Entity
@Table(name = "fitting")
@ToString
@NoArgsConstructor
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

    @Column(name = "reg_fitting_dttm")
    private String regFittingDttm;

    @Column(name = "favorite_yn")
    private Character favoriteYn;

    @Column(name = "fitting_name")
    private String fittingName;

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

    @PrePersist
    public void prePersist() {
        // 엔티티가 저장되기 전에 현재 시간을 설정
        if (this.regFittingDttm == null) {
            this.regFittingDttm = String.valueOf(LocalDateTime.now());
        }
    }
}
