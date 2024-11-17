package com.clofit.api.member.entity;

import com.clofit.api.closet.entity.Closet;
import com.fasterxml.jackson.annotation.JsonBackReference;
import com.fasterxml.jackson.annotation.JsonIgnore;
import jakarta.persistence.*;
import lombok.CustomLog;
import lombok.Getter;
import lombok.Setter;
import lombok.ToString;
import org.hibernate.annotations.CreationTimestamp;

import java.time.LocalDateTime;
import java.util.List;

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

//    @OneToOne(cascade = CascadeType.ALL, fetch = FetchType.LAZY)
//    @JoinColumn(name = "closet_id")

    @OneToMany(mappedBy = "member", fetch = FetchType.LAZY)
    @JsonBackReference
    @JsonIgnore
    private List<Closet> closet;

    @Column(name = "email")
    private String email;

    @Column(name = "password")
    private String password;

    @Column(name = "member_name")
    private String memberName;

    @Column(name = "age")
    private Integer age;

    @Column(name = "role")
    private String role;

    @Column(name = "del_user_yn")
    private char delMemberYn = 'N';

    @Column(name = "del_member_dttm")
    private LocalDateTime delMemberDttm;

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
