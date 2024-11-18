package com.clofit.api.fitting.service;

import com.clofit.api.fitting.entity.Fitting;
import com.clofit.api.fitting.request.FittingRequest;
import com.clofit.api.fitting.response.FittingDetailResponse;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;

import java.util.List;
import java.util.concurrent.CompletableFuture;

public interface FittingService {
    byte[] fitting(FittingRequest fittingRequest) throws Exception;
    CompletableFuture<byte[]> fittingMQ(FittingRequest fittingRequest);
    Page<Fitting> getPublicFittingList(Pageable pageable);
    Page<Fitting> getPublicFittingListByColor(Long colorId, Pageable pageable);
    List<String> recentFitting(Long memberId);
    FittingDetailResponse getDetailFitting(Long fittingId);
}
