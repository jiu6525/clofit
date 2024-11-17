package com.clofit.api.gpu.service;

import com.clofit.api.clothes.response.ClothesUploadResponse;
import org.springframework.web.multipart.MultipartFile;

public interface GPUService {
    String upload(String path, MultipartFile image);
    ClothesUploadResponse upload2(Long memberId, String path, String type, MultipartFile image);
}
