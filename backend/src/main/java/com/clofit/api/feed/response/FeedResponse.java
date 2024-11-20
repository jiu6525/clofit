package com.clofit.api.feed.response;

import com.clofit.api.feed.dto.Feed;
import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

import java.util.List;

@Getter
@Setter
@AllArgsConstructor
@NoArgsConstructor
public class FeedResponse {
    List<Feed> feeds;
}
