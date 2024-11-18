package com.clofit.api.feed.service;

import com.clofit.api.clothes.entity.Clothes;
import com.clofit.api.clothes.repository.ClothesRepository;
import com.clofit.api.clothes.service.ClothesService;
import com.clofit.api.feed.dto.ClothesFeed;
import com.clofit.api.feed.dto.Feed;
import com.clofit.api.feed.dto.FittingFeed;
import com.clofit.api.fitting.entity.Fitting;
import com.clofit.api.fitting.service.FittingService;
import com.clofit.api.member.entity.Member;
import com.clofit.api.member.service.MemberService;
import lombok.RequiredArgsConstructor;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.PageRequest;
import org.springframework.data.domain.Pageable;
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
    private final ClothesRepository clothesRepository;

    @Override
    public List<Feed> getFeedsByColor(Long memberId) {
        String color = memberService.getColor(memberId);
        Long colorId = Long.parseLong(color);

        Pageable pageable = PageRequest.of(0, 200);
        Page<Clothes> clothesList = clothesService.getPublicClothesListByColor(colorId, pageable);
        Page<Fitting> fittingList = fittingService.getPublicFittingListByColor(colorId, pageable);

        List<Feed> feedList = new ArrayList<>();

        for (Clothes clothes : clothesList) {
            feedList.add(new ClothesFeed(clothes));
        }
        for(Fitting fitting : fittingList) {
            fitting.setMember(hideData(fitting.getMember()));
            feedList.add(new FittingFeed(fitting));
        }

        // 랜덤하게 섞기
        Collections.shuffle(feedList);

        return feedList.subList(0, Math.min(feedList.size(), 30));
    }

    @Override
    public List<Feed> getFeeds(Long memberId) {
        Pageable pageable = PageRequest.of(0, 200);

        Page<Clothes> clothesList = clothesService.getPublicClothesList(pageable);
        Page<Fitting> fittingList = fittingService.getPublicFittingList(pageable);

        List<Feed> feedList = new ArrayList<>();

        for (Clothes clothes : clothesList) {
            feedList.add(new ClothesFeed(clothes));
        }
        for(Fitting fitting : fittingList) {
            fitting.setMember(hideData(fitting.getMember()));
            feedList.add(new FittingFeed(fitting));
        }

        // 랜덤하게 섞기
        Collections.shuffle(feedList);

        return feedList.subList(0, Math.min(feedList.size(), 30));
    }

    @Override
    public List<Feed> getItemsByColor(Long memberId) {
        String color = memberService.getColor(memberId);
        Long colorId = Long.parseLong(color);

        Pageable pageable = PageRequest.of(0, 200);

        Page<Clothes> clothesList = clothesService.getPublicClothesListByColor(colorId, pageable);

        List<Feed> feedList = new ArrayList<>();

        for (Clothes clothes : clothesList) {
            feedList.add(new ClothesFeed(clothes));
        }

        // 랜덤하게 섞기
        Collections.shuffle(feedList);

        return feedList.subList(0, Math.min(feedList.size(), 30));
    }

    @Override
    public List<Feed> getItems(Long memberId) {
        Pageable pageable = PageRequest.of(0, 200);

        Page<Clothes> clothesList = clothesService.getPublicClothesList(pageable);

        List<Feed> feedList = new ArrayList<>();

        for (Clothes clothes : clothesList) {
            feedList.add(new ClothesFeed(clothes));
        }

        // 랜덤하게 섞기
        Collections.shuffle(feedList);

        return feedList.subList(0, Math.min(feedList.size(), 30));
    }

    @Override
    public List<Feed> getSnapsByColor(Long memberId) {
        String color = memberService.getColor(memberId);
        Long colorId = Long.parseLong(color);

        Pageable pageable = PageRequest.of(0, 200);

        Page<Fitting> fittingList = fittingService.getPublicFittingListByColor(colorId, pageable);

        List<Feed> feedList = new ArrayList<>();

        for(Fitting fitting : fittingList) {
            fitting.setMember(hideData(fitting.getMember()));
            feedList.add(new FittingFeed(fitting));
        }

        // 랜덤하게 섞기
        Collections.shuffle(feedList);

        return feedList.subList(0, Math.min(feedList.size(), 30));
    }

    @Override
    public List<Feed> getSnaps(Long memberId) {
        Pageable pageable = PageRequest.of(0, 200);

        Page<Fitting> fittingList = fittingService.getPublicFittingList(pageable);

        List<Feed> feedList = new ArrayList<>();

        for(Fitting fitting : fittingList) {
            fitting.setMember(hideData(fitting.getMember()));
            feedList.add(new FittingFeed(fitting));
        }

        // 랜덤하게 섞기
        Collections.shuffle(feedList);

        return feedList.subList(0, Math.min(feedList.size(), 30));
    }

    private Member hideData(Member member) {
        Member m = new Member();
        m.setId(member.getId());
        m.setDelMemberYn(member.getDelMemberYn());
        m.setProfileFileName(member.getProfileFileName());
        m.setProfileFilePath(member.getProfileFilePath());
        m.setMemberName(member.getMemberName());
        m.setRegMemberDttm(member.getRegMemberDttm());
        return m;
    }
}
