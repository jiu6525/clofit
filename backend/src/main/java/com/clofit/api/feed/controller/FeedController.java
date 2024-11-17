package com.clofit.api.feed.controller;

import com.clofit.api.feed.dto.ClothesFeed;
import com.clofit.api.feed.dto.Feed;
import com.clofit.api.feed.dto.FittingFeed;
import com.clofit.api.feed.request.FeedRequest;
import com.clofit.api.feed.response.FeedResponse;
import com.clofit.api.feed.service.FeedService;
import com.clofit.oauth2.dto.CustomOAuth2User;
import io.swagger.v3.oas.annotations.Operation;
import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.security.core.annotation.AuthenticationPrincipal;
import org.springframework.web.bind.annotation.*;

import java.util.ArrayList;
import java.util.List;

@RequiredArgsConstructor
@RestController
@RequestMapping("/feed")
public class FeedController {

    private final FeedService feedService;


    @GetMapping("/byColor")
    @Operation(summary = "색상 기반 피드 조회")
    public ResponseEntity<FeedResponse> getFeedsByColor(
            @AuthenticationPrincipal CustomOAuth2User customOAuth2User
            ) {
        Long memberId = customOAuth2User.getmemberId();
//        Long memberId = 3L;

        List<Feed> list = feedService.getFeedsByColor(memberId);

        return ResponseEntity.ok(new FeedResponse(list));
    }

    @GetMapping
    @Operation(summary = "랜덤 피드 조회")
    public ResponseEntity<FeedResponse> getFeeds(
            @AuthenticationPrincipal CustomOAuth2User customOAuth2User
    ) {
        Long memberId = customOAuth2User.getmemberId();
//        Long memberId = 3L;

        List<Feed> list = feedService.getFeeds(memberId);

        return ResponseEntity.ok(new FeedResponse(list));
    }

    @GetMapping("/items/byColor")
    @Operation(summary = "색상 기반 피드 조회 - 상품")
    public ResponseEntity<FeedResponse> getItemsByColor(
            @AuthenticationPrincipal CustomOAuth2User customOAuth2User
    ) {
        Long memberId = customOAuth2User.getmemberId();
//        Long memberId = 3L;

        List<Feed> list = feedService.getItemsByColor(memberId);

        return ResponseEntity.ok(new FeedResponse(list));
    }

    @GetMapping("/items")
    @Operation(summary = "랜덤 피드 조회 - 상품")
    public ResponseEntity<FeedResponse> getItems(
            @AuthenticationPrincipal CustomOAuth2User customOAuth2User
    ) {
        Long memberId = customOAuth2User.getmemberId();
//        Long memberId = 3L;

        List<Feed> list = feedService.getItems(memberId);

        return ResponseEntity.ok(new FeedResponse(list));
    }

    @GetMapping("/snaps/byColor")
    @Operation(summary = "색상 기반 피드 조회 - 스냅")
    public ResponseEntity<FeedResponse> getSnapsByColor(
            @AuthenticationPrincipal CustomOAuth2User customOAuth2User
    ) {
        Long memberId = customOAuth2User.getmemberId();
//        Long memberId = 3L;

        List<Feed> list = feedService.getSnapsByColor(memberId);

        return ResponseEntity.ok(new FeedResponse(list));
    }

    @GetMapping("/snaps")
    @Operation(summary = "랜덤 피드 조회 - 스냅")
    public ResponseEntity<FeedResponse> getSnaps(
            @AuthenticationPrincipal CustomOAuth2User customOAuth2User
    ) {
        Long memberId = customOAuth2User.getmemberId();
//        Long memberId = 3L;

        List<Feed> list = feedService.getSnaps(memberId);

        return ResponseEntity.ok(new FeedResponse(list));
    }

}
