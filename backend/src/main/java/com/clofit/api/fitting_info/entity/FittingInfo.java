package com.clofit.api.fitting_info.entity;

import com.clofit.api.fitting.entity.Fitting;
import jakarta.persistence.*;

@Entity
@Table(name = "fitting_info")
public class FittingInfo {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "fitting_info_id")
    private Long id;

    @OneToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "fitting_id")
    private Fitting fitting;

    @Column(name = "like_count")
    private Long likeCount;

    @Column(name = "view_count")
    private Long viewCount;

}
