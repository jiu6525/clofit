package com.clofit.api.gpu.request;

import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;
import org.springframework.web.multipart.MultipartFile;

@Getter
@Setter
@NoArgsConstructor
public class BackgroundlessRequestDto {

//    private String filePath;
    private MultipartFile image;
}
