package com.clofit.api.fitting.service;

import com.clofit.api.fitting.entity.Fitting;
import com.clofit.api.fitting.request.FittingRequest;
import com.clofit.api.fitting.request.FittingSearchRequest;
import com.clofit.api.fitting.response.FittingRecentDetailResponse;

import java.util.List;
import java.util.concurrent.CompletableFuture;

public interface FittingService {
    byte[] fitting(FittingRequest fittingRequest) throws Exception;
    CompletableFuture<byte[]> fittingMQ(FittingRequest fittingRequest);
    List<Fitting> getPublicFittingList();
    List<Fitting> getPublicFittingListByColor(Long colorId);
    List<String> recentFitting(Long memberId);
    void saveFitting(String FittingName, FittingRecentDetailResponse fittingRecentDetailResponse);

}
