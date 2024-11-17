package com.clofit.api.gpu.service;

import com.clofit.api.clothes.response.ClothesUploadResponse;
import com.clofit.api.clothes.service.ClothesService;
import com.clofit.api.fitting.entity.ByteMultiPart;
import com.clofit.api.gpu.dao.GPUDao;
import lombok.RequiredArgsConstructor;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.http.*;
import org.springframework.stereotype.Service;
import org.springframework.web.client.RestTemplate;
import org.springframework.web.multipart.MultipartFile;

import java.util.Base64;
import java.util.Collections;
import java.util.Map;

@Service
@RequiredArgsConstructor
public class GPUServiceImpl implements GPUService {

    private static final Logger logger = LoggerFactory.getLogger(GPUServiceImpl.class);

    private final GPUDao gpuDao;

    private final RestTemplate restTemplate;
    private final ClothesService clothesService;

    @Value("${background_remover.gpu-server}")
    private String background_remover_gpu_server;

    @Override
    public String upload(String path, MultipartFile image) {
        return gpuDao.upload(path, image);
    }

    public ClothesUploadResponse upload2(Long memberId, String path, String type, MultipartFile image) {
        String url = gpuDao.upload(path + type, image); //원본 업로드하기
//        String url = "https://clofit-s3-bucket.s3.ap-southeast-2.amazonaws.com/cloth/bottom/26.png";
        String jsonPayload = "{ \"url\": \"" + url + "\"}";
        // HTTP 헤더 설정
        HttpHeaders headers = new HttpHeaders();
        headers.setContentType(MediaType.APPLICATION_JSON);
        headers.setAccept(Collections.singletonList(MediaType.APPLICATION_JSON));

        HttpEntity<String> entity = new HttpEntity<>(jsonPayload, headers);

        try {
            ResponseEntity<Map> response = restTemplate.exchange(background_remover_gpu_server + "mask", HttpMethod.POST, entity, Map.class);

            Long color_id = Long.valueOf((Integer)response.getBody().get("color_id"));
            Double confidence = (Double)response.getBody().get("confidence");
            String clothes_type = (String)response.getBody().get("clothes_type");
            Integer clothes_type_id = (Integer)response.getBody().get("clothes_type_id");
            String clothes_type_top_bottom = (String)response.getBody().get("clothes_type_top_bottom");
//            String masked_image = (String)response.getBody().get("masked_image"); //Base64 encoded
//            System.out.println(masked_image);
            byte[] masked_image = Base64.getDecoder().decode((String)response.getBody().get("masked_image"));

            ByteMultiPart multiPart = new ByteMultiPart(masked_image, "private clothes");
            String maskPath = gpuDao.upload(path + "_mask" + type, multiPart); // 배경 제거 이미지 업로드

            return clothesService.uploadClothes(url, maskPath, color_id, clothes_type_top_bottom, clothes_type);

//            gpuDao.insert2ClothesTable(
//                    new PrivateClothesDto(
//                            memberId,
//                            color_id,
//                            confidence,
//                            clothes_type,
//                            clothes_type_id,
//                            clothes_type_bottom_top,
//                            path + type,
//                            path + "_mask" + type
//                    )
//            );

        } catch (Exception e) {
            logger.error("오류 발생: {}", e.getMessage(), e); // 구체적인 오류 메시지 및 스택 트레이스 로깅
            throw new RuntimeException("API 요청 중 오류 발생", e); // 예외를 던져서 컨트롤러에서 처리하도록 함
        }
    }
}
