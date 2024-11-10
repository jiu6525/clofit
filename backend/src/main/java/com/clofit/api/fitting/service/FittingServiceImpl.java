package com.clofit.api.fitting.service;

import com.clofit.api.fitting.request.FittingRequest;
import lombok.RequiredArgsConstructor;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.http.*;
import org.springframework.stereotype.Service;
import org.springframework.web.client.RestTemplate;

import java.io.ByteArrayInputStream;
import java.io.ByteArrayOutputStream;
import java.io.IOException;
import java.util.ArrayList;
import java.util.Collections;
import java.util.List;
import java.util.zip.ZipEntry;
import java.util.zip.ZipInputStream;

@Service
@RequiredArgsConstructor
public class FittingServiceImpl implements FittingService {

    @Value("${ootd.gpu-server}")
    private String gpuServer;

    private final AwsS3ServiceImpl awsS3ServiceImpl;
    private final RestTemplate restTemplate;
    private static final Logger logger = LoggerFactory.getLogger(FittingServiceImpl.class);

    @Override
    public byte[] fitting(FittingRequest fittingRequest) {
        // S3에서 모델 파일과 의류 파일을 가져옴
        String modelFile = awsS3ServiceImpl.getFile(fittingRequest.getModelName());
        String clothFile = awsS3ServiceImpl.getFile(fittingRequest.getClothName());

        // 외부 API의 URL 설정
        String url = gpuServer + "run-ootd";
        String jsonPayload = "{"
                + "\"model_file_path\": \"" + modelFile + "\","
                + "\"cloth_file_path\": \"" + clothFile + "\""
                + "}";

        // HTTP 헤더 설정
        HttpHeaders headers = new HttpHeaders();
        headers.setContentType(MediaType.APPLICATION_JSON);
        headers.setAccept(Collections.singletonList(MediaType.APPLICATION_JSON));

        HttpEntity<String> entity = new HttpEntity<>(jsonPayload, headers);

        try {
            // 외부 API에 POST 요청을 보내 zip 파일을 응답받음
            ResponseEntity<byte[]> response = restTemplate.exchange(url, HttpMethod.POST, entity, byte[].class);

            byte[] zipFileBytes = response.getBody();
            if (zipFileBytes != null) {
                // zip 파일 압축 해제
                List<byte[]> imageFiles = unzipFile(zipFileBytes);

                if (!imageFiles.isEmpty()) {
                    // 여러 이미지 파일을 반환
                    return imageFiles.getFirst();
                } else {
                    logger.error("압축 해제 오류: 이미지 파일이 없습니다.");
                    throw new Exception("압축 해제 오류: 이미지 파일이 없습니다.");
                }
            } else {
                logger.error("응답이 zip 파일이 아님");
                throw new Exception("응답이 zip 파일이 아님"); // 응답이 zip 파일이 아님
            }

        } catch (Exception e) {
            logger.error("오류 발생: {}", e.getMessage(), e); // 구체적인 오류 메시지 및 스택 트레이스 로깅
            throw new RuntimeException("API 요청 중 오류 발생", e); // 예외를 던져서 컨트롤러에서 처리하도록 함
        }
    }

    private List<byte[]> unzipFile(byte[] zipFileBytes) throws IOException {
        List<byte[]> imageFiles = new ArrayList<>();
        ByteArrayInputStream byteArrayInputStream = new ByteArrayInputStream(zipFileBytes);
        ZipInputStream zipInputStream = new ZipInputStream(byteArrayInputStream);
        ZipEntry entry;

        while ((entry = zipInputStream.getNextEntry()) != null) {
            if (!entry.isDirectory() && (entry.getName().endsWith(".jpg") || entry.getName().endsWith(".png"))) { // 이미지 파일만 처리 (예: JPG)
                ByteArrayOutputStream byteArrayOutputStream = new ByteArrayOutputStream();
                byte[] buffer = new byte[1024];
                int length;
                while ((length = zipInputStream.read(buffer)) >= 0) {
                    byteArrayOutputStream.write(buffer, 0, length);
                }
                imageFiles.add(byteArrayOutputStream.toByteArray());
            }
            zipInputStream.closeEntry();
        }

        zipInputStream.close();
        return imageFiles;
    }

}
