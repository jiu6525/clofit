package com.clofit.api.fitting.request;

import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

@Getter
@Setter
@AllArgsConstructor
@NoArgsConstructor
public class FittingSaveRequest {

    private String redisId;
    private String fittingName;

}