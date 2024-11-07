package com.clofit.api.fitting.service;

import com.clofit.api.fitting.request.FittingSearchRequest;
import com.clofit.api.fitting.request.FittingStoreRequest;

import java.util.List;

public interface AwsS3Service {

    void uploadFile(FittingStoreRequest fittingStoreRequest);
    void deleteFile(String fileName);
    String getFile(String fileName);
    List<String> getFittingImages(FittingSearchRequest fittingSearchRequest);
}
