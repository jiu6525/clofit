package com.clofit.api.fitting.service;

import com.clofit.api.fitting.request.FittingRequest;
import com.clofit.api.fitting.request.ThreadFittingRequest;

public interface FittingService {
    byte[] fitting(FittingRequest fittingRequest);
    String threadFitting(ThreadFittingRequest fittingRequest, String redisId);
}
