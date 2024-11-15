package com.clofit.api.likelog.entity;

import com.clofit.api.fitting.entity.Fitting;
import com.clofit.api.member.entity.Member;
import jakarta.persistence.*;
import lombok.Getter;
import lombok.Setter;
import lombok.ToString;
import org.hibernate.annotations.CreationTimestamp;

import java.time.LocalDateTime;


@Getter
@Setter
@Entity
@Table(name = "likelog")
@ToString
public class LikeLog {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "like_log_id")
    private Long id;

    @CreationTimestamp
    @Column(name = "reg_likelog_dttm")
    private LocalDateTime regLikeLogDttm;

    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "member_id")
    private Member member;

    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "fitting_id")
    private Fitting fitting;
}
