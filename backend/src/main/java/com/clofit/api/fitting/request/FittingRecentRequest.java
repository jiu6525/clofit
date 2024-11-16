package com.clofit.api.fitting.request;

import io.swagger.v3.oas.annotations.tags.Tags;
import lombok.*;

import java.util.List;

@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
@ToString
public class FittingRecentRequest {
    private Long memberId;
    private int category;
    private String modelName;
    private List<String> clothName;
    private String imgUrl;

    public FittingRecentRequest(FittingRequest fittingRequest, String imgUrl) {
        this.memberId = fittingRequest.getMemberId();
        this.category = fittingRequest.getCategory();
        this.modelName = fittingRequest.getModelName();
        this.clothName = fittingRequest.getClothName();
        this.imgUrl = imgUrl;
    }
}
