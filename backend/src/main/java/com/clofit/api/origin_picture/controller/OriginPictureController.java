package com.clofit.api.origin_picture.controller;

import com.clofit.api.origin_picture.entity.OriginPicture;
import com.clofit.api.origin_picture.request.DeleteOriginPictureReqeust;
import com.clofit.api.origin_picture.request.OriginPictureRequest;
import com.clofit.api.origin_picture.response.OriginPictureResponse;
import com.clofit.api.origin_picture.service.OriginPictureService;
import com.clofit.oauth2.dto.CustomOAuth2User;
import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.security.core.annotation.AuthenticationPrincipal;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.multipart.MultipartFile;

import java.io.IOException;
import java.util.List;
import java.util.stream.Collectors;

@RestController
@RequestMapping("/origin-picture")
@RequiredArgsConstructor
public class OriginPictureController {

    private final OriginPictureService originPictureService;

    @PostMapping("/upload")
    public ResponseEntity<List<String>> uploadOriginPictures(
            @AuthenticationPrincipal CustomOAuth2User customOAuth2User,
            @RequestParam("files") List<MultipartFile> files) {
        Long memberId = customOAuth2User.getmemberId();
        try {
            List<String> fileUrls = originPictureService.uploadOriginPictures(memberId, files);
            return ResponseEntity.ok(fileUrls);
        } catch (IOException e) {
            return ResponseEntity.status(500).body(null);
        } catch (IllegalArgumentException e) {
            return ResponseEntity.badRequest().body(null);
        }
    }

    @PutMapping("/delete")
    public ResponseEntity<String> deleteOriginPictures(@AuthenticationPrincipal CustomOAuth2User customOAuth2User, @RequestBody DeleteOriginPictureReqeust deleteOriginPictureReqeust) {
        Long memberId = customOAuth2User.getmemberId();
        List<Long> pictureIds = deleteOriginPictureReqeust.getPictureIds();

        // 유효성 검사: 삭제할 이미지 ID 리스트가 없는 경우
        if (pictureIds == null || pictureIds.isEmpty()) {
            return ResponseEntity.badRequest().body("삭제할 이미지 ID가 필요합니다.");
        }

        boolean isDeleted = originPictureService.deleteOriginPictures(memberId, pictureIds);
        if (isDeleted) {
            return ResponseEntity.ok("해당 멤버의 베이스 이미지가 삭제되었습니다.");
        } else {
            return ResponseEntity.status(400).body("삭제할 이미지를 찾을 수 없거나 멤버와 일치하지 않습니다.");
        }
    }

    @GetMapping("/base-image")
    public ResponseEntity<List<OriginPictureResponse>> getBaseOriginPictures(@AuthenticationPrincipal CustomOAuth2User customOAuth2User, @RequestBody OriginPictureRequest request) {
        Long memberId = customOAuth2User.getmemberId();
        List<OriginPicture> availablePictures = originPictureService.getBaseOriginPictures(memberId);

        // 필요한 경우, 엔티티를 응답 DTO로 변환
        List<OriginPictureResponse> responses = availablePictures.stream()
                .map(picture -> new OriginPictureResponse(picture.getId(), picture.getFilePath()))
                .collect(Collectors.toList());

        return ResponseEntity.ok(responses);
    }
}

