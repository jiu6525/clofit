package com.clofit.api.member.entity;

import jakarta.persistence.*;
import lombok.Getter;
import lombok.Setter;
import lombok.ToString;
import org.hibernate.annotations.CreationTimestamp;

import java.time.LocalDateTime;

@Getter
@Setter
@Entity
@Table(name = "member")
@ToString
public class Member {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "member_id", nullable = false)
    private Long id;

    @Column(name = "member_name")
    private String memberName;

    private String email;

    private String role;

    @Column(name = "age")
    private Integer age;

    @Column(name = "del_user_yn")
    private char delMemberYn;

    @CreationTimestamp
    @Column(name = "reg_member_dttm", nullable = false)
    private LocalDateTime regMemberDttm;

    @Column(name = "personal_color")
    private String personalColor;

    @Column(name = "profile_file_path")
    private String profileFilePath;

    @Column(name = "profile_file_name")
    private String profileFileName;


}
