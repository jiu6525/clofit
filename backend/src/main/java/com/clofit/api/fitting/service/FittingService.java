package com.clofit.api.fitting.service;

import com.clofit.api.fitting.request.FittingRequest;

public interface FittingService {
    byte[] fitting(FittingRequest fittingRequest) throws Exception;
}
