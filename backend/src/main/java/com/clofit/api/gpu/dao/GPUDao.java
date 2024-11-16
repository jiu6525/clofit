package com.clofit.api.gpu.dao;

import com.amazonaws.SdkClientException;
import com.amazonaws.services.s3.AmazonS3;
import com.amazonaws.services.s3.model.AmazonS3Exception;
import com.amazonaws.services.s3.model.CannedAccessControlList;
import com.amazonaws.services.s3.model.ObjectMetadata;
import com.amazonaws.services.s3.model.PutObjectRequest;
import com.clofit.api.fitting.request.FittingStoreRequest;
import com.clofit.api.gpu.dto.PrivateClothesDto;
import lombok.RequiredArgsConstructor;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.http.HttpStatus;
import org.springframework.stereotype.Component;
import org.springframework.web.multipart.MultipartFile;
import org.springframework.web.server.ResponseStatusException;

import java.io.IOException;

@Component
@RequiredArgsConstructor
public class GPUDao {
    private final static Logger logger = LoggerFactory.getLogger(GPUDao.class);
    private final AmazonS3 s3;

    @Value("${cloud.aws.s3.bucket}")
    private String bucket;

    public String upload(String path, MultipartFile image) {

        if (image == null || image.isEmpty()) {
            logger.info("업로드 파일이 없거나 비어 있습니다.");
            throw new ResponseStatusException(HttpStatus.INTERNAL_SERVER_ERROR, "파일 업로드에 실패했습니다.");
        }

        ObjectMetadata metadata = new ObjectMetadata();
        metadata.setContentLength(image.getSize());
        metadata.setContentType(image.getContentType());

        try {
            s3.putObject(bucket, path, image.getInputStream(), metadata);
        } catch (AmazonS3Exception e) {
            logger.error("Amazon S3 error while uploading file: " + e.getMessage());
            throw new AmazonS3Exception("Amazon S3 error while uploading file: " + e.getMessage());
        } catch (SdkClientException e) {
            logger.error("AWS SDK client error while uploading file: " + e.getMessage());
            throw new SdkClientException("AWS SDK client error while uploading file: " + e.getMessage());
        } catch (IOException e) {
            logger.error("IO error while uploading file: " + e.getMessage());
            throw new ResponseStatusException(HttpStatus.INTERNAL_SERVER_ERROR, "파일 업로드에 실패했습니다.");
        }

        logger.info("File upload completed: " + path);

        return s3.getUrl(bucket, path).toString();
    }

    public void insert2ClothesTable(PrivateClothesDto clothes) {

    }

}
