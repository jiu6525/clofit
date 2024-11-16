package com.clofit.api.closet.service;

import com.clofit.api.closet.entity.Closet;
import com.clofit.api.closet.repository.ClosetRepository;
import com.clofit.api.closet.request.ClosetAddRequest;
import com.clofit.api.closet.response.ClosetResponse;
import com.clofit.api.clothes.entity.Clothes;
import com.clofit.api.clothes.repository.ClothesRepository;
import com.clofit.api.member.entity.Member;
import com.clofit.api.member.repository.MemberRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.time.LocalDateTime;
import java.util.ArrayList;
import java.util.List;

@Service
@Transactional
@RequiredArgsConstructor
public class ClosetService {
    private final ClosetRepository closetRepository;
    private final ClothesRepository clothesRepository;
    private final MemberRepository memberRepository;

    public void addCloset(Long memberId, ClosetAddRequest closetAddRequest) {
        Closet closet = new Closet();
        Clothes clothes = clothesRepository.findById(closetAddRequest.getClothesId())
                .orElseThrow(() -> new IllegalArgumentException("Invalid clothes ID"));
        Member member = memberRepository.findById(memberId)
                .orElseThrow(() -> new IllegalArgumentException("Invalid member ID"));
        closet.setClothes(clothes);
        closet.setMember(member);
        closet.setReg_closet_dttm(LocalDateTime.now().toString());
        closetRepository.save(closet);
    }

    public void deleteCloset(Long closetId) {
        Closet closet = closetRepository.findById(closetId)
                .orElseThrow(() -> new IllegalArgumentException("Invalid closet ID"));

        closetRepository.delete(closet);
    }

    public List<Closet> searchCloset(String category) {
        return null;
    }

    public List<Closet> getCloset(Long memberId) {
        List<Closet> closet = closetRepository.findAllByMemberId(memberId);
//        List<ClosetResponse> closetResponses = new ArrayList<>();
//        for (Closet closet : closets) {
//            ClosetResponse closetResponse = new ClosetResponse(
//                    closet.getId(),
//                    closet.getClothes().getId(),
//                    closet.getMember().getMemberName(),
//                    closet.getReg_closet_dttm()
//            );
//            closetResponses.add(closetResponse);
//        }

        return closet;
    }

//    public List<Long> getItem() {
//
//    }
}
