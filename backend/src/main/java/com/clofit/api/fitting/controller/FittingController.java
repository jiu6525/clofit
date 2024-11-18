package com.clofit.api.fitting.controller;

import com.clofit.api.fitting.request.*;
import com.clofit.api.fitting.response.FittingRecentDetailResponse;
import com.clofit.api.fitting.response.FittingRecentResponse;
import com.clofit.api.fitting.response.FittingSearchResponse;
import com.clofit.api.fitting.service.AwsS3Service;
import com.clofit.api.fitting.service.FittingService;
import com.clofit.db.redis.service.RedisService;
import com.clofit.oauth2.dto.CustomOAuth2User;
import com.fasterxml.jackson.core.JsonProcessingException;
import io.swagger.v3.oas.annotations.Operation;
import lombok.RequiredArgsConstructor;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.core.annotation.AuthenticationPrincipal;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.multipart.MultipartFile;

import java.util.ArrayList;
import java.util.List;
import java.util.concurrent.CompletableFuture;

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
    @Operation(summary = "의류 파일 등록")
    public ResponseEntity<String> uploadClothFile(
            @RequestParam("category") int category,
            @RequestParam("img") MultipartFile img)
    {
        String fileName = awsS3Service.uploadClothFile(new ClothInsertRequest(category, img));
        return ResponseEntity.ok("등록완료" + fileName);
    }

    /**
     * @param img 전신 이미지 파일을 png 형식으로 s3에 저장
     * @return 등록 성공, 실패 반환
     */
    @PostMapping("modelInsert")
    @Operation(summary = "전신 이미지 파일 등록")
    public ResponseEntity<String> uploadModelFile(
            @RequestParam("memberId") Long memberId,
            @RequestParam("img") MultipartFile img)
    {
        String fileName = awsS3Service.uploadModelFile(new ModelInsertRequest(memberId, img));
        return ResponseEntity.ok("등록완료" + fileName);
    }

    /**
     * @param fileName s3에 등록된 파일의 주소를 통해 사진 삭제
     * @return 삭제 성공, 실패 반환
     */
    @DeleteMapping
    @Operation(summary = "s3 파일 삭제")
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
    @Operation(summary = "s3 의류 주소 조회")
    public ResponseEntity<String> getClothFile(@RequestBody ClothRequest clothRequest) {
        return ResponseEntity.ok(awsS3Service.getClothFile(clothRequest));
    }

    /**
     * @param modelRequest 프론트 서버에서 파일의 이름을 보내준다면 s3에 저장되어있는
     *                  모델 파일의 경로를 반환하는 메서드
     * @return 파일경로 반환, 없을경우 NotFound 동작 추가하기
     */
    @PostMapping("/model")
    @Operation(summary = "s3 모델 주소 조회")
    public ResponseEntity<String> getModelFile(@RequestBody ModelRequest modelRequest) {
        return ResponseEntity.ok(awsS3Service.getModelFile(modelRequest));
    }

    @PostMapping
    @Operation(summary = "가상 피팅")
    public void fitting(@AuthenticationPrincipal CustomOAuth2User customOAuth2User, @RequestBody FittingRequest fittingRequest) {
        Long memberId = 1L;
//        Long memberId = customOAuth2User.getmemberId();
        fittingRequest.setMemberId(memberId);
        // 가상 스레드를 사용해 비동기적으로 처리
        Thread.ofVirtual().start(() -> {
            // 비동기적으로 메시지를 큐에 푸시
            fittingService.fittingMQ(fittingRequest);
        });
    }

    /**
     *
     * memberId 값을 입력받으면 redis 에 임시저장된 의류정보와 url 주소를 보내준다.
     */
    @PostMapping("/recent")
    @Operation(summary = "최신 피팅 불러오기")
    public ResponseEntity<List<String>> recent(@AuthenticationPrincipal CustomOAuth2User customOAuth2User) {
        try {
            // uuid 값이 들어있는 리스트 반환

            List<String> imageList = fittingService.recentFitting(customOAuth2User.getmemberId());

            if (imageList.isEmpty()) {
                return ResponseEntity.status(HttpStatus.NOT_FOUND).body(null);
            }

            return ResponseEntity.ok(imageList);
        } catch (RuntimeException e) {
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).body(null);
        }
    }

    /**
     *
     * @param fittingSearchRequest
     * memberId 값을 통해 s3에 경로에 저장되어있는 사진들을 불러와서 리스트 형식으로 뿌려줌
     * @return
     * List<url>
     */
    @PostMapping("/search")
    @Operation(summary = "사용자가 저장한 피팅 사진 조회")
    public ResponseEntity<List<FittingSearchResponse>> getFittingImages(@AuthenticationPrincipal CustomOAuth2User customOAuth2User, @RequestBody FittingSearchRequest fittingSearchRequest) {
        fittingSearchRequest.setMemberId(customOAuth2User.getmemberId());
        return ResponseEntity.ok(awsS3Service.getFittingImages(fittingSearchRequest));
    }

    /**
     * 레디스에 있는 최신 피팅 결과 리스트를 반환한다.
     * @return
     */
    @GetMapping("/recent")
    @Operation(summary = "최신 피팅 불러오기")
    public ResponseEntity<List<FittingRecentResponse>> getFittingResultList(@AuthenticationPrincipal CustomOAuth2User customOAuth2User) {
        Long memberId = 1L;
//        Long memberId = customOAuth2User.getmemberId();
        List<String> objList = redisService.getFittingList(memberId);
        List<FittingRecentResponse> fittingResultList = new ArrayList<>();

        for(String obj : objList) {
            try {
                fittingResultList.add(redisService.getFittingResult(obj));
            } catch (JsonProcessingException e) {
                throw new RuntimeException(e);
            }
        }

        return ResponseEntity.ok(fittingResultList);
    }

    /**
     * 최신 피팅 결과 상세 정보를 반환한다.
     * @param redisId
     * @return
     * @throws JsonProcessingException
     */
    @GetMapping("/recent/{redisId}")
    @Operation(summary = "최신 피팅 상세보기")
    public ResponseEntity<FittingRecentDetailResponse> getFittingResult(@PathVariable("redisId") String redisId) {
        FittingRecentDetailResponse fr = null;
        try {
//            if(!redisService.existFittingResult(memberId, redisId)) {
//                return ResponseEntity.status(HttpStatus.NOT_FOUND).body(new FittingResult("null", false, "null"));
//            }
            fr = redisService.getFittingDetailResult(redisId);

        } catch (JsonProcessingException e) {
            throw new RuntimeException(e);
        }

        return ResponseEntity.ok(fr);
    }

    /**
     * 요소 삭제
     * @param redisId
     * @return
     * @throws JsonProcessingException
     */
    @DeleteMapping("/{redisId}")
    @Operation(summary = "최근 피팅 삭제")
    public ResponseEntity<String> deleteFittingResult(@AuthenticationPrincipal CustomOAuth2User customOAuth2User, @PathVariable("redisId") String redisId) {
        try {
            redisService.removeFittingResult(customOAuth2User.getmemberId(), redisId);
        } catch (JsonProcessingException e) {
            throw new RuntimeException(e);
        }
        return ResponseEntity.ok("Deleted");
    }

    @PutMapping
    @Operation(summary = "최신 피팅 결과 저장")
    public ResponseEntity<String> saveFittingResult(@AuthenticationPrincipal CustomOAuth2User customOAuth2User, @RequestBody FittingSaveRequest fittingSaveRequest) {
//        Long memberId = customOAuth2User.getmemberId();
        Long memberId = 1L;
        FittingRecentDetailResponse fittingResult;
        try {
            fittingResult = redisService.getFittingDetailResult(fittingSaveRequest.getRedisId());
        } catch (JsonProcessingException e) {
            throw new RuntimeException(e);
        }
        if (fittingResult == null) {
            return ResponseEntity.status(HttpStatus.NOT_FOUND).body("Fitting not found");
        }

        awsS3Service.moveFile(fittingResult.getImgUrl());

        try {
            redisService.removeFittingResult(memberId, fittingSaveRequest.getRedisId());
            fittingService.saveFitting(fittingSaveRequest.getFittingName(), fittingResult);

        } catch (JsonProcessingException e) {
            throw new RuntimeException(e);
        }

        return ResponseEntity.ok("Saved");
    }

}
