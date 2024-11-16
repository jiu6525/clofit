package com.clofit.api.fitting.service;

import com.clofit.api.fitting.entity.Fitting;
import com.clofit.api.fitting.request.FittingRequest;
import com.clofit.api.fitting.request.ThreadFittingRequest;

import java.util.List;

public interface FittingService {
    byte[] fitting(FittingRequest fittingRequest) throws Exception;
    List<Fitting> getPublicFittingList();
    List<Fitting> getPublicFittingListByColor(Long colorId);
}
