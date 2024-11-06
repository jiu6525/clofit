package com.clofit.api.fitting.controller;

import com.clofit.api.fitting.service.AwsS3Service;
import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.multipart.MultipartFile;

@RestController
@RequestMapping("/fitting")
@RequiredArgsConstructor
public class FittingController {
    private final AwsS3Service awsS3Service;

    @PostMapping
    public ResponseEntity<String> uploadFile(MultipartFile multipartFile){
        return ResponseEntity.ok(awsS3Service.uploadFile(multipartFile));
    }

    @DeleteMapping
    public ResponseEntity<String> deleteFile(@RequestParam String fileName){
        awsS3Service.deleteFile(fileName);
        return ResponseEntity.ok(fileName);
    }

}


