package com.clofit.api.feed.service;

import com.clofit.api.feed.dto.Feed;

import java.util.List;

public interface FeedService {
    List<Feed> getFeeds(Long memberId);
}
