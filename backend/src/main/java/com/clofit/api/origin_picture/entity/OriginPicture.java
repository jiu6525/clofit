package com.clofit.api.origin_picture.entity;

import com.clofit.api.member.entity.Member;
import jakarta.persistence.*;
import lombok.Getter;
import lombok.Setter;
import lombok.ToString;

import java.time.LocalDateTime;

@Getter
@Setter
@Entity
@Table(name = "origin_picture")
@ToString
public class OriginPicture {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "origin_picure_id")
    private Long id;

    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "member_id")
    private Member member;

    @Column(name = "file_path")
    private String filePath;

    @Column(name = "file_name")
    private String fileName;

    @Column(name = "reg_pic_dttm")
    private LocalDateTime regPicDttm;

    @Column(name = "del_pic_yn", nullable = false)
    private char delPicYn = 'N';
}
