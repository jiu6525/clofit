package com.clofit.api.fitting.service;

import com.clofit.api.fitting.request.FittingSearchRequest;
import com.clofit.api.fitting.request.FittingStoreRequest;
import com.clofit.api.fitting.response.FittingSearchResponse;

import java.util.List;

public interface AwsS3Service {

    void uploadFile(FittingStoreRequest fittingStoreRequest);
    void deleteFile(String fileName);
    String getFile(String fileName);
    List<FittingSearchResponse> getFittingImages(FittingSearchRequest fittingSearchRequest);
}
