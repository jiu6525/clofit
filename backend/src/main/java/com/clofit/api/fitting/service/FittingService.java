package com.clofit.api.fitting.service;

import com.clofit.api.fitting.entity.Fitting;
import com.clofit.api.fitting.request.FittingRequest;
import com.clofit.api.fitting.request.FittingSearchRequest;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import com.clofit.api.fitting.response.FittingRecentDetailResponse;

import java.util.List;

public interface FittingService {
    byte[] fitting(FittingRequest fittingRequest) throws Exception;
    void fittingMQ(FittingRequest fittingRequest);
    Page<Fitting> getPublicFittingList(Pageable pageable);
    Page<Fitting> getPublicFittingListByColor(Long colorId, Pageable pageable);
    List<String> recentFitting(Long memberId);
    void saveFitting(Character publicYn, FittingRecentDetailResponse fittingRecentDetailResponse);

}
