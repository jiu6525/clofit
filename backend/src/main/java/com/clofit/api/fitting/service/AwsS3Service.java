package com.clofit.api.fitting.service;

import com.clofit.api.fitting.request.*;
import com.clofit.api.fitting.response.FittingSearchResponse;

import java.util.List;

public interface AwsS3Service {

    void uploadClothFile(ClothInsertRequest clothInsertRequest);
    void uploadModelFile(ModelInsertRequest ModelInsertRequest);
    void uploadFile(FittingStoreRequest fittingStoreRequest);
    String uploadFile(FittingStoreRequest fittingStoreRequest, String redisId);
    void deleteFile(String fileName);
    String getClothFile(ClothRequest clothRequest);
    String getModelFile(ModelRequest modelRequest);
    List<FittingSearchResponse> getFittingImages(FittingSearchRequest fittingSearchRequest);
    void moveFile(String url);
}
