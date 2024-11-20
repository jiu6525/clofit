package com.clofit.api.comment.entity;

import com.clofit.api.fitting.entity.Fitting;
import com.clofit.api.member.entity.Member;
import jakarta.persistence.*;

@Entity
public class Comment {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "comment_id")
    private Long id;

    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "member_id")
    private Member member;

    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "fitting_id")
    private Fitting fitting;

    @Column(name = "reg_comment_dttm")
    private String regCommentDttm;

    @Column(name = "content")
    private String content;

    @Column(name = "del_comment_yn")
    private char delCommentYn;
}
