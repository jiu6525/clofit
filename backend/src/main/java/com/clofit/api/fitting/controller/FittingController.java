package com.clofit.api.fitting.controller;

import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;
import org.springframework.web.multipart.MultipartFile;

import java.io.IOException;
import java.io.InputStream;
import java.util.List;

@RequiredArgsConstructor
@RestController
public class FittingController {
//    private final AwsS3Service awsS3Service;
//
//    @PostMapping
//    public ResponseEntity<List<String>> uploadFile(List<MultipartFile> multipartFiles){
//        return ResponseEntity.ok(awsS3Service.uploadFile(multipartFiles));
//    }
//
//    @DeleteMapping
//    public ResponseEntity<String> deleteFile(@RequestParam String fileName){
//        awsS3Service.deleteFile(fileName);
//        return ResponseEntity.ok(fileName);
//    }

}
