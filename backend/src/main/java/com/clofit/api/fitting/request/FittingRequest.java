package com.clofit.api.fitting.request;

import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

import java.util.List;

@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
public class FittingRequest {
    private int category;
    private String modelName;
    private List<String> clothName;
}
