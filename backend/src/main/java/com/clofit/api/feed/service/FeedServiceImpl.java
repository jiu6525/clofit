package com.clofit.api.feed.service;

import com.clofit.api.clothes.entity.Clothes;
import com.clofit.api.clothes.service.ClothesService;
import com.clofit.api.feed.dto.ClothesFeed;
import com.clofit.api.feed.dto.Feed;
import com.clofit.api.feed.dto.FittingFeed;
import com.clofit.api.fitting.entity.Fitting;
import com.clofit.api.fitting.service.FittingService;
import com.clofit.api.member.service.MemberService;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

import java.util.ArrayList;
import java.util.Collections;
import java.util.List;

@Service
@RequiredArgsConstructor
public class FeedServiceImpl implements FeedService {

    private final ClothesService clothesService;
    private final FittingService fittingService;
    private final MemberService memberService;

    @Override
    public List<Feed> getFeeds(Long memberId) {
        String color = memberService.getColor(memberId);
        Long colorId = Long.parseLong(color);

        List<Clothes> clothesList = clothesService.getPublicClothesListByColor(colorId);
        List<Fitting> fittingList = fittingService.getPublicFittingListByColor(colorId);

        List<Feed> feedList = new ArrayList<>();

        for (Clothes clothes : clothesList) {
            feedList.add(new ClothesFeed(clothes));
        }
        for(Fitting fitting : fittingList) {
            feedList.add(new FittingFeed(fitting));
        }

        // 랜덤하게 섞기
        Collections.shuffle(feedList);

        return feedList;
    }
}
