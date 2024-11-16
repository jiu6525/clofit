package com.clofit.api.closet.controller;

import com.clofit.api.closet.entity.Closet;
import com.clofit.api.closet.request.ClosetDeleteRequest;
import com.clofit.api.closet.request.ClosetAddRequest;
import com.clofit.api.closet.response.ClosetResponse;
import com.clofit.api.closet.service.ClosetService;
import com.clofit.api.clothes.entity.Clothes;
import com.clofit.oauth2.dto.CustomOAuth2User;
import io.swagger.v3.oas.annotations.Operation;
import lombok.RequiredArgsConstructor;
import org.springframework.http.HttpStatus;
import org.springframework.http.HttpStatusCode;
import org.springframework.http.ResponseEntity;
import org.springframework.security.core.annotation.AuthenticationPrincipal;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/closet")
@RequiredArgsConstructor
public class ClosetController {

    private final ClosetService closetService;

    @PostMapping
    @Operation(summary = "옷장에 의류 저장")
    public ResponseEntity<String> addCloset(@RequestBody ClosetAddRequest closetAddRequest) {
        boolean exist = closetService.addCloset(closetAddRequest);
        if(exist){
            return ResponseEntity.status(HttpStatus.CONFLICT).body("이미 등록된 의류입니다.");
        } else{
            return ResponseEntity.ok("의류등록 성공");
        }
    }

    @DeleteMapping
    @Operation(summary = "의류 삭제")
    public ResponseEntity<Void> deleteCloset(@RequestBody ClosetDeleteRequest closetDeleteRequest) {
        List<Long> closetIds = closetDeleteRequest.getClosetIds();
        closetService.deleteCloset(closetIds);
        return ResponseEntity.ok().build();
    }

    @GetMapping("/search/{category}")
    @Operation(summary = "의류 검색")
    public ResponseEntity<List<Closet>> searchCloset(@PathVariable String category) {
        List<Closet> list = closetService.searchCloset(category);
        return ResponseEntity.ok(list);
    }

    @GetMapping("/{memberId}")
    @Operation(summary = "개인 의류 리스트 조회")
    public ResponseEntity<List<Closet>> getCloset(@PathVariable Long memberId) {
        List<Closet> list = closetService.getCloset(memberId);
        return ResponseEntity.ok(list);
    }

//    @GetMapping
//    @Operation(summary = "상품 의류 리스트 조회")
//    public ResponseEntity<List<Long>> getItem(){
//        List<Long> list = closetService.getItem();
//        return ResponseEntity.ok(list);
//    }

}
