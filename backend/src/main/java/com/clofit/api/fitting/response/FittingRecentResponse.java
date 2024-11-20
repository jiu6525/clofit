package com.clofit.api.fitting.response;

import com.clofit.api.fitting.request.FittingRequest;
import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.ToString;

import java.util.List;

@Getter
@NoArgsConstructor
@AllArgsConstructor
@ToString
public class FittingRecentResponse {
    private String uuid;
    private String imgUrl;

    public FittingRecentResponse(String uuid, FittingRecentDetailResponse fittingRecentDetailResponse) {
        this.uuid = uuid;
        this.imgUrl = imgUrl;
    }
}
