package com.clofit.api.gpu.controller;

import com.clofit.api.gpu.request.BackgroundlessRequestDto;
import com.clofit.api.gpu.response.BackgroundlessResponse;
import com.clofit.api.gpu.service.GPUService;
import com.clofit.oauth2.dto.CustomOAuth2User;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.core.annotation.AuthenticationPrincipal;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/gpu")
public class GPUController {

    @Autowired
    private GPUService gpuService;

    /**
     * 배경 제거 이미지 업로드
     * @param brd 배경화면 제거된 이미지 및 경로
     * @return 저장한 url 경로를 응답한다.
     */
    @PostMapping("/backgroundless")
    ResponseEntity<BackgroundlessResponse> saveBackgroundless(@ModelAttribute BackgroundlessRequestDto brd) {
        int index = brd.getFilePath().lastIndexOf('.');
        String fileType = brd.getFilePath().substring(index);
        String fileName = brd.getFilePath().substring(0, index);

        String url = gpuService.upload(fileName + "_mask" + fileType, brd.getImage());
        return new ResponseEntity<>(new BackgroundlessResponse(200, "Upload Success", url), HttpStatus.OK);
    }

    @PostMapping("/test")
    ResponseEntity<BackgroundlessResponse> saveBackgroundless2(@AuthenticationPrincipal CustomOAuth2User customOAuth2User, @ModelAttribute BackgroundlessRequestDto brd) {

        int index = brd.getFilePath().lastIndexOf('.');
        String fileType = brd.getFilePath().substring(index);
        String fileName = brd.getFilePath().substring(0, index);

        gpuService.upload2(fileName, fileType, brd.getImage());
        return new ResponseEntity<>(new BackgroundlessResponse(200, "Upload Success", "url"), HttpStatus.OK);
    }

}
