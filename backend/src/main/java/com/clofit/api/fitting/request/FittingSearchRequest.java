package com.clofit.api.fitting.request;

import com.fasterxml.jackson.annotation.JsonProperty;
import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

@Getter
@Setter
@AllArgsConstructor
@NoArgsConstructor
public class FittingSearchRequest {

    @JsonProperty("member_id") // JSON의 "member_id"를 memberId 필드로 매핑
    private Long memberId;
}
