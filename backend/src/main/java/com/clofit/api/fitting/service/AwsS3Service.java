package com.clofit.api.fitting.service;

import com.clofit.api.fitting.request.*;
import com.clofit.api.fitting.response.FittingSearchResponse;

import java.util.List;

public interface AwsS3Service {

    String uploadClothFile(ClothInsertRequest clothInsertRequest);
    String uploadModelFile(ModelInsertRequest ModelInsertRequest);
    void deleteFile(String fileName);
    String getClothFile(ClothRequest clothRequest);
    String getModelFile(ModelRequest modelRequest);
    List<FittingSearchResponse> getFittingImages(Long memberId);
    void moveFile(String url);
    String recentFile(Long memberId, byte[] img);
}
