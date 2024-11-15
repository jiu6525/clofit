package com.clofit.api.likelog.request;
import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;

@Getter
@NoArgsConstructor
@AllArgsConstructor
public class LikeLogRequest {

    Long memberId;
    Long fittingId;

}
