package com.clofit.api.clothes.request;

import lombok.Getter;
import lombok.Setter;
import org.springframework.web.multipart.MultipartFile;

@Getter
@Setter
public class ClothesUploadRequest {
    MultipartFile file;
}
