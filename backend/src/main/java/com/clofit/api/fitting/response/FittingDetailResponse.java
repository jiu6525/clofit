package com.clofit.api.fitting.response;

import com.clofit.api.clothes.entity.Clothes;
import com.clofit.api.member.entity.Member;
import jakarta.persistence.Column;
import jakarta.persistence.FetchType;
import jakarta.persistence.JoinColumn;
import jakarta.persistence.ManyToOne;
import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.Setter;
import net.minidev.json.annotate.JsonIgnore;

@Getter
@Setter
@AllArgsConstructor
public class FittingDetailResponse {
    private Long id;
    private String imgPath;
    private String regFittingDttm;
    private Character favoriteYn;
    private String fittingName;
    private Character publicYn;
    private Clothes top;
    private Clothes bottom;
}
