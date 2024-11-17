package com.clofit.api.fitting.response;

import com.clofit.api.fitting.request.FittingRequest;
import lombok.*;

import java.util.List;

@Getter
@NoArgsConstructor
@AllArgsConstructor
@ToString
public class FittingRecentDetailResponse {
    private Long memberId;
    private int category;
    private String modelName;
    private List<String> clothName;
    private String imgUrl;
    private boolean isDone;

    public FittingRecentDetailResponse(FittingRequest fittingRequest, String imgUrl) {
        this.memberId = fittingRequest.getMemberId();
        this.category = fittingRequest.getCategory();
        this.modelName = fittingRequest.getModelName();
        this.clothName = fittingRequest.getClothName();
        this.imgUrl = imgUrl;
        this.isDone = true;
    }
}
