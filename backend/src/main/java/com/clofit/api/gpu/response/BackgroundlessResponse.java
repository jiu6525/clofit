package com.clofit.api.gpu.response;

import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
public class BackgroundlessResponse {
    int status_code;
    String message;
//    String url;
}
