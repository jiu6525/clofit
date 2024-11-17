package com.clofit.api.feed.service;

import com.clofit.api.feed.dto.Feed;

import java.util.List;

public interface FeedService {
    List<Feed> getFeedsByColor(Long memberId);
    List<Feed> getFeeds(Long memberId);
    List<Feed> getItemsByColor(Long memberId);
    List<Feed> getItems(Long memberId);
    List<Feed> getSnapsByColor(Long memberId);
    List<Feed> getSnaps(Long memberId);
}
