package com.clofit.api.fitting.response;

import com.clofit.api.clothes.entity.Clothes;
import com.clofit.api.member.entity.Member;
import jakarta.persistence.*;
import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;
import net.minidev.json.annotate.JsonIgnore;

import java.time.LocalDateTime;

@Getter
@Setter
@AllArgsConstructor
@NoArgsConstructor
public class FittingSearchResponse {
    private Long id;
    private Long memberId;
    private String imgPath;
    private String regFittingDttm;
    private Character favoriteYn;
    private String fittingName;
    private Character publicYn;
    private Long top;
    private Long bottom;
}
