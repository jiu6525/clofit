package com.clofit.api.feed.controller;

import com.clofit.api.feed.dto.ClothesFeed;
import com.clofit.api.feed.dto.Feed;
import com.clofit.api.feed.dto.FittingFeed;
import com.clofit.api.feed.request.FeedRequest;
import com.clofit.api.feed.response.FeedResponse;
import com.clofit.api.feed.service.FeedService;
import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.ArrayList;
import java.util.List;

@RequiredArgsConstructor
@RestController
@RequestMapping("/feed")
public class FeedController {

    private final FeedService feedService;

    @PostMapping
    public ResponseEntity<FeedResponse> getFeed(@RequestBody FeedRequest feedRequest) {
        List<Feed> list = feedService.getFeeds(feedRequest.getMemberId());
        return ResponseEntity.ok(new FeedResponse(list));
    }
}
