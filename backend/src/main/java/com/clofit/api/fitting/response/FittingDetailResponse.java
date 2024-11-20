package com.clofit.api.fitting.response;

import com.clofit.api.clothes.entity.Clothes;
import com.clofit.api.member.entity.Member;
import jakarta.persistence.*;
import lombok.*;
import net.minidev.json.annotate.JsonIgnore;

import java.time.LocalDateTime;

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
        private Clothes top;;
        private Clothes bottom;;

}

