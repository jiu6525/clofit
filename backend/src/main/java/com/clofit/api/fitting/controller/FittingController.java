package com.clofit.api.fitting.controller;

import com.clofit.api.fitting.entity.FittingResult;
import com.clofit.api.fitting.request.FittingRequest;
import com.clofit.api.fitting.request.FittingSearchRequest;
import com.clofit.api.fitting.request.FittingStoreRequest;
import com.clofit.api.fitting.request.ThreadFittingRequest;
import com.clofit.api.fitting.request.*;
import com.clofit.api.fitting.response.FittingSearchResponse;
import com.clofit.api.fitting.service.AwsS3Service;
import com.clofit.api.fitting.service.FittingService;
import com.clofit.db.redis.service.RedisService;
import lombok.RequiredArgsConstructor;
import org.springframework.http.*;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.multipart.MultipartFile;

import java.util.List;

/**
 * 현재는 s3를 통해 사진의 읽기, 등록, 삭제 기능이 여기에 구현되어 있지만
 * 이 controller 에서 필요한 기능인 읽기, 삭제 기능만 남기고 등륵 부분은 옷장 controller 작성하며
 * 옷장 부분에 이동 예정
 */

@RestController
@RequestMapping("/fitting")
@RequiredArgsConstructor
public class FittingController {
    private final AwsS3Service awsS3Service;
    private final FittingService fittingService;
    private final RedisService redisService;

    /**
     * @param img 의류 이미지 파일을 png 형식으로 s3에 저장
     * @return 등록 성공, 실패 반환
     */
    @PostMapping("clothInsert")
    public ResponseEntity<String> uploadClothFile(
            @RequestParam("category") int category,
            @RequestParam("img") MultipartFile img)
    {
        awsS3Service.uploadClothFile(new ClothInsertRequest(category, img));
        return ResponseEntity.ok("등록완료");
    }

    /**
     * @param img 전신 이미지 파일을 png 형식으로 s3에 저장
     * @return 등록 성공, 실패 반환
     */
    @PostMapping("modelInsert")
    public ResponseEntity<String> uploadModelFile(
            @RequestParam("memberId") Long memberId,
            @RequestParam("img") MultipartFile img)
    {
        awsS3Service.uploadModelFile(new ModelInsertRequest(memberId, img));
        return ResponseEntity.ok("등록완료");
    }

    /**
     * @param fileName s3에 등록된 파일의 주소를 통해 사진 삭제
     * @return 삭제 성공, 실패 반환
     */
    @DeleteMapping
    public ResponseEntity<String> deleteFile(@RequestParam String fileName) {
        awsS3Service.deleteFile(fileName);
        return ResponseEntity.ok(fileName);
    }

    /**
     * @param clothRequest 프론트 서버에서 파일의 이름을 보내준다면 s3에 저장되어있는
     *                 의휴 파일의 경로를 반환하는 메서드
     * @return 파일경로 반환, 없을경우 NotFound 동작 추가하기
     */
    @PostMapping("/cloth")
    public ResponseEntity<String> getClothFile(@RequestBody ClothRequest clothRequest) {
        return ResponseEntity.ok(awsS3Service.getClothFile(clothRequest));
    }

    /**
     * @param modelRequest 프론트 서버에서 파일의 이름을 보내준다면 s3에 저장되어있는
     *                  모델 파일의 경로를 반환하는 메서드
     * @return 파일경로 반환, 없을경우 NotFound 동작 추가하기
     */
    @PostMapping("/model")
    public ResponseEntity<String> getModelFile(@RequestBody ModelRequest modelRequest) {
        return ResponseEntity.ok(awsS3Service.getModelFile(modelRequest));
    }


    /**
     * @param fittingRequest 프론트에게 모델 이미지의 이름과 의류 사진을 요청받아서
     *                       s3에 저장된 이미지 파일의 경로를 얻어와서 gpu 서버에 전송한 뒤
     *                       결과물인 zip 파일을 얻어와서 redis 에 등록 후 프론트에 응답해줌
     * @return zip 파일을 응답받아서 압축 해제 후 프론트로 전송
     */
    @PostMapping
    public ResponseEntity<byte[]> fitting(@RequestBody FittingRequest fittingRequest) {
        try {
            // 서비스에서 비즈니스 로직 처리 후 이미지 파일 반환
            byte[] imageBytes = fittingService.fitting(fittingRequest);

            /**
             * 이미지를 redis에 저장하는 로직 구현 에정
             */

            // 이미지 파일을 응답으로 반환
            HttpHeaders responseHeaders = new HttpHeaders();
            responseHeaders.setContentType(MediaType.IMAGE_JPEG);
            responseHeaders.setContentDisposition(ContentDisposition.builder("inline")
                    .filename("fitting_result.png")
                    .build());

            return new ResponseEntity<>(imageBytes, responseHeaders, HttpStatus.OK);
        } catch (Exception e) {
            e.printStackTrace();  // 예외 디버깅용 출력
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).body(null);
        }
    }

    /**
     * Virtual Thread를 사용한 피팅
     * @param fittingRequest 프론트에게 모델 이미지의 이름과 의류 사진을 요청받아서
     *                       s3에 저장된 이미지 파일의 경로를 얻어와서 gpu 서버에 전송한 뒤
     *                       결과물인 zip 파일을 얻어와서 redis 에 등록 후 프론트에 응답해줌
     * @return zip 파일을 응답받아서 압축 해제 후 프론트로 전송
     */
    @PostMapping("/thread")
    public ResponseEntity<String> fitting2(@RequestBody FittingRequest fittingRequest) {
        try {
            // 서비스에서 비즈니스 로직 처리 후 이미지 파일 반환
//            byte[] imageBytes = fittingService.fitting(fittingRequest);
            FittingResult fittingResult = new FittingResult();
            Thread.ofVirtual().start(() -> {
                String res = fittingService.threadFitting(fittingRequest, fittingResult.getId().toString());
                fittingResult.setDone(true);
                fittingResult.setUrl(res);
                System.out.println(res);
            });

            return new ResponseEntity<>(fittingResult.getId().toString(), HttpStatus.OK);
        } catch (Exception e) {
            e.printStackTrace();  // 예외 디버깅용 출력
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).body(null);
        }
    }

    /**
     * @param fittingStoreRequest
     * 생성된 피팅 이미지 화면에서 출력된 img 파일과 memberId 값을 받음
     */
    @PostMapping("/store")
    public ResponseEntity<String> storeFile(@ModelAttribute FittingStoreRequest fittingStoreRequest) {
        awsS3Service.uploadFile(fittingStoreRequest);
        return ResponseEntity.ok("File uploaded successfully");
    }

    /**
     * 
     * @param fittingSearchRequest
     * memberId 값을 통해 s3에 경로에 저장되어있는 사진들을 불러와서 리스트 형식으로 뿌려줌
     * @return
     * List<url>
     */
    @PostMapping("/search")
    public ResponseEntity<List<FittingSearchResponse>> getFittingImages(@RequestBody FittingSearchRequest fittingSearchRequest) {
        return ResponseEntity.ok(awsS3Service.getFittingImages(fittingSearchRequest));
    }
}
//    public ResponseEntity<String> uploadFile(MultipartFile multipartFile){
//        return ResponseEntity.ok(awsS3ServiceImpl.uploadFile(multipartFile));
//    }