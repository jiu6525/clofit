package com.clofit.api.fitting.service;

import org.springframework.web.multipart.MultipartFile;

public interface AwsS3Service {

    String uploadFile(MultipartFile multipartFile);
    void deleteFile(String fileName);
    String getFile(String fileName);
}
