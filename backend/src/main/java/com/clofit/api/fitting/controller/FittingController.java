package com.clofit.api.fitting.controller;

import com.clofit.api.fitting.request.FittingRequest;
import com.clofit.api.fitting.service.AwsS3ServiceImpl;
import lombok.RequiredArgsConstructor;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springdoc.core.service.GenericResponseService;
import org.springframework.core.io.ByteArrayResource;
import org.springframework.http.*;
import org.springframework.util.LinkedMultiValueMap;
import org.springframework.util.MultiValueMap;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.client.HttpClientErrorException;
import org.springframework.web.client.RestTemplate;
import org.springframework.web.multipart.MultipartFile;

import java.io.*;
import java.util.ArrayList;
import java.util.Base64;
import java.util.Collections;
import java.util.List;
import java.util.stream.Collectors;
import java.util.zip.ZipEntry;
import java.util.zip.ZipInputStream;

/**
 * 현재는 s3를 통해 사진의 읽기, 등록, 삭제 기능이 여기에 구현되어 있지만
 * 이 controller 에서 필요한 기능인 읽기, 삭제 기능만 남기고 등륵 부분은 옷장 controller 작성하며
 * 옷장 부분에 이동 예정
 */

@RestController
@RequestMapping("/fitting")
@RequiredArgsConstructor
public class FittingController {
    private static final Logger log = LoggerFactory.getLogger(FittingController.class);
    private final AwsS3ServiceImpl awsS3ServiceImpl;
    private final RestTemplate restTemplate;
    private final GenericResponseService responseBuilder;

    /**
     * @param multipartFile
     * 사용자에게 입력받은 이미지 파일을 jpg 형식으로 s3에 저장
     * @return
     * 등록 성공, 실패 반환
     */
//    @PostMapping
//    public ResponseEntity<String> uploadFile(MultipartFile multipartFile){
//        return ResponseEntity.ok(awsS3ServiceImpl.uploadFile(multipartFile));
//    }

    /**
     * @param fileName s3에 등록된 파일의 주소를 통해 사진 삭제
     * @return 삭제 성공, 실패 반환
     */
    @DeleteMapping
    public ResponseEntity<String> deleteFile(@RequestParam String fileName) {
        awsS3ServiceImpl.deleteFile(fileName);
        return ResponseEntity.ok(fileName);
    }

    /**
     * @param fileName 프론트 서버에서 파일의 이름을 보내준다면 s3에 저장되어있는
     *                 파일의 경로를 반환하는 메서드
     * @return 파일경로 반환, 없을경우 NotFound 동작 추가하기
     */
    @GetMapping
    public ResponseEntity<String> getFile(@RequestParam String fileName) {
        return ResponseEntity.ok(awsS3ServiceImpl.getFile(fileName));
    }


    /**
     * @param fittingRequest 프론트에게 모델 이미지의 이름과 의류 사진을 요청받아서
     *                       s3에 저장된 이미지 파일의 경로를 얻어와서 gpu 서버에 전송한 뒤
     *                       결과물인 zip 파일을 얻어와서 redis 에 등록 후 프론트에 응답해줌
     * @return zip 파일을 응답받아서 압축 해제 후 프론트로 전송
     */
    @PostMapping
    public ResponseEntity<byte[]> fitting(@RequestBody FittingRequest fittingRequest) {
        // S3에서 모델 파일과 의류 파일을 가져옴
        String modelFile = awsS3ServiceImpl.getFile(fittingRequest.getModelName());
        String clothFile = awsS3ServiceImpl.getFile(fittingRequest.getClothName());

        // 외부 API의 URL 설정
        String url = "http://70.12.130.111:8000/run-ootd";
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
                    // 압축 해제된 첫 번째 이미지를 반환
                    byte[] imageBytes = imageFiles.getFirst();  // 첫 번째 이미지 파일만 반환 (필요에 따라 수정 가능)

                    // 이미지 파일을 응답으로 반환
                    HttpHeaders responseHeaders = new HttpHeaders();
                    responseHeaders.setContentType(MediaType.IMAGE_JPEG);  // JPEG 이미지 파일일 경우
                    responseHeaders.setContentDisposition(ContentDisposition.builder("inline")
                            .filename("fitting_result.jpg")
                            .build());

                    return new ResponseEntity<>(imageBytes, responseHeaders, HttpStatus.OK);
                } else {
                    return ResponseEntity.status(500).body(null); // 압축 해제 오류
                }
            } else {
                return ResponseEntity.status(500).body(null); // 응답이 zip 파일이 아님
            }

        } catch (Exception e) {
            e.printStackTrace();  // 예외 디버깅용 출력
            return ResponseEntity.status(500).body(null); // API 요청 중 오류 발생
        }
    }

    private List<byte[]> unzipFile(byte[] zipFileBytes) throws IOException {
        List<byte[]> imageFiles = new ArrayList<>();
        ByteArrayInputStream byteArrayInputStream = new ByteArrayInputStream(zipFileBytes);
        ZipInputStream zipInputStream = new ZipInputStream(byteArrayInputStream);
        ZipEntry entry;

        while ((entry = zipInputStream.getNextEntry()) != null) {
            if (!entry.isDirectory() && entry.getName().endsWith(".jpg")) { // 이미지 파일만 처리 (예: JPG)
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