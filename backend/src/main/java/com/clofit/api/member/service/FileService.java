package com.clofit.api.member.service;

import com.amazonaws.services.s3.AmazonS3;
import com.amazonaws.services.s3.model.DeleteObjectRequest;
import com.amazonaws.services.s3.model.ObjectMetadata;
import lombok.RequiredArgsConstructor;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.stereotype.Service;
import org.springframework.web.multipart.MultipartFile;

import java.io.IOException;
import java.util.UUID;

@Service
@RequiredArgsConstructor
public class FileService {

    private final AmazonS3 amazonS3;

    @Value("${cloud.aws.s3.bucket}")
    private String bucket;

    // S3에 파일 업로드하고 URL 반환(프로필)
    public String uploadFile(Long memberId, MultipartFile file) throws IOException {
        // 고유한 파일 이름 생성
        String uniqueFileName = "profile/" + memberId + "/" + generateUniqueFileName(file);

        // 메타데이터 설정
        ObjectMetadata metadata = new ObjectMetadata();
        metadata.setContentType(file.getContentType());
        metadata.setContentLength(file.getSize());

        // S3에 파일 업로드
        amazonS3.putObject(bucket, uniqueFileName, file.getInputStream(), metadata);

        // URL 생성 및 반환
        return amazonS3.getUrl(bucket, uniqueFileName).toString();
    }

    // S3에서 파일 삭제
    public void deleteFile(String fileUrl) {
        String fileName = extractFileNameFromUrl(fileUrl);
        amazonS3.deleteObject(new DeleteObjectRequest(bucket, fileName));
    }

    // 고유한 파일 이름 생성
    private String generateUniqueFileName(MultipartFile file) {
        return UUID.randomUUID() + "_" + file.getOriginalFilename();
    }

    // URL에서 파일 이름 추출
    private String extractFileNameFromUrl(String fileUrl) {
        return fileUrl.substring(fileUrl.lastIndexOf('/') + 1);
    }
}
