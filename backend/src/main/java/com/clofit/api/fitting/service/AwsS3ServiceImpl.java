package com.clofit.api.fitting.service;

import com.amazonaws.services.s3.AmazonS3;
import com.amazonaws.services.s3.model.*;
import com.clofit.api.fitting.request.*;
import com.clofit.api.fitting.response.FittingSearchResponse;
import lombok.RequiredArgsConstructor;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.http.HttpStatus;
import org.springframework.stereotype.Service;
import org.springframework.web.multipart.MultipartFile;
import org.springframework.web.server.ResponseStatusException;

import java.io.IOException;
import java.io.InputStream;
import java.util.ArrayList;
import java.util.List;
import java.util.UUID;

@Service
@RequiredArgsConstructor
public class AwsS3ServiceImpl implements AwsS3Service {

    @Value("${cloud.aws.s3.bucket}")
    private String bucket;

    private static final Logger logger = LoggerFactory.getLogger(AwsS3ServiceImpl.class);

    private final AmazonS3 amazonS3;

    // 공통된 파일 업로드 메서드
    private void uploadFile(MultipartFile file, String filePath) {
        if (file == null || file.isEmpty()) {
            logger.info("업로드 파일이 없거나 비어 있습니다.");
            return;
        }

        String name = createFileName(); // 파일명 생성
        String fileName = filePath + "/" + name; // 경로 지정

        ObjectMetadata objectMetadata = new ObjectMetadata();
        objectMetadata.setContentLength(file.getSize());
        objectMetadata.setContentType(file.getContentType());
        objectMetadata.setContentDisposition("inline; filename=\"" + name + "\"");

        try (InputStream inputStream = file.getInputStream()) {
            amazonS3.putObject(new PutObjectRequest(bucket, fileName, inputStream, objectMetadata)
                    .withCannedAcl(CannedAccessControlList.PublicRead));
            logger.info("파일 업로드가 완료되었습니다.{}", fileName);
        } catch (IOException e) {
            throw new ResponseStatusException(HttpStatus.INTERNAL_SERVER_ERROR, "파일 업로드에 실패했습니다.");
        }
    }

    @Override
    public void uploadClothFile(ClothInsertRequest clothInsertRequest) {
        MultipartFile cloth = clothInsertRequest.getClothImg();
        String category = clothInsertRequest.getCategory() == 0 ? "top" : "bottom";
        String filePath = "cloth/" + category; // 경로 지정

        uploadFile(cloth, filePath);  // 공통 메서드 호출
    }

    @Override
    public void uploadModelFile(ModelInsertRequest modelInsertRequest) {
        MultipartFile model = modelInsertRequest.getModelImg();
        Long memberId = modelInsertRequest.getMemberId();
        String filePath = "model/" + memberId; // 경로 지정

        uploadFile(model, filePath);  // 공통 메서드 호출
    }

    /**
     * 다중 파일 업로드 기능도 구현 하였으나
     * 추후 사용 여부에 대해 확인 예정
     */
//    public List<String> uploadFile(List<MultipartFile> multipartFiles){
//        List<String> fileNameList = new ArrayList<>();
//
//        // forEach 구문을 통해 multipartFiles 리스트로 넘어온 파일들을 순차적으로 fileNameList 에 추가
//        multipartFiles.forEach(file -> {
//            String fileName = createFileName(file.getOriginalFilename());
//            ObjectMetadata objectMetadata = new ObjectMetadata();
//            objectMetadata.setContentLength(file.getSize());
//            objectMetadata.setContentType(file.getContentType());
//
//            try(InputStream inputStream = file.getInputStream()){
//                amazonS3.putObject(new PutObjectRequest(bucket, fileName, inputStream, objectMetadata)
//                        .withCannedAcl(CannedAccessControlList.PublicRead));
//            } catch (IOException e){
//                throw new ResponseStatusException(HttpStatus.INTERNAL_SERVER_ERROR, "파일 업로드에 실패했습니다.");
//            }
//            fileNameList.add(fileName);
//
//        });
//
//        return fileNameList;
//    }

    @Override
    public void uploadFile(FittingStoreRequest fittingStoreRequest){
        MultipartFile fittingImg = fittingStoreRequest.getFittingImg();
        Long memberId = fittingStoreRequest.getMemberId();


        if (fittingImg == null || fittingImg.isEmpty()) {
            logger.info("업로드 파일이 없거나 비어 있습니다.");
            return;
        }
        String name = createFileName();
        // memberId를 경로에 포함시키고, 파일명에 UUID를 추가
        String fileName = "fitting/" + memberId + "/" + name; // 경로 지정

        ObjectMetadata objectMetadata = new ObjectMetadata();
        objectMetadata.setContentLength(fittingImg.getSize());
        objectMetadata.setContentType(fittingImg.getContentType());
        objectMetadata.setContentDisposition("inline; filename=\"" + name + "\"");

        try(InputStream inputStream = fittingImg.getInputStream()){
            amazonS3.putObject(new PutObjectRequest(bucket, fileName, inputStream, objectMetadata)
                    .withCannedAcl(CannedAccessControlList.PublicRead));
            logger.info("파일 업로드가 완료되었습니다.{}", fileName);
        } catch (IOException e){
            throw new ResponseStatusException(HttpStatus.INTERNAL_SERVER_ERROR, "파일 업로드에 실패했습니다.");
        }

    }

    // 파일명을 난수화하기 위해 UUID 를 활용하여 난수를 돌린다.
    public String createFileName(){
        return UUID.randomUUID().toString().concat(".png");
    }

    //  "."의 존재 유무만 판단
    private String getFileExtension(String fileName){
        try{
            return fileName.substring(fileName.lastIndexOf("."));
        } catch (StringIndexOutOfBoundsException e){
            throw new ResponseStatusException(HttpStatus.BAD_REQUEST, "잘못된 형식의 파일" + fileName + ") 입니다.");
        }
    }

    @Override
    public void deleteFile(String fileName){
        amazonS3.deleteObject(new DeleteObjectRequest(bucket, fileName));
        logger.info("파일 삭제 성공");
    }

    @Override
    public List<FittingSearchResponse> getFittingImages(FittingSearchRequest fittingSearchRequest) {
        Long memberId = fittingSearchRequest.getMemberId();
        String folderPath = "fitting/" + memberId + "/";

        ListObjectsV2Request listObjectsV2Request = new ListObjectsV2Request()
                .withBucketName(bucket)
                .withPrefix(folderPath);

        List<FittingSearchResponse> fileUrls = new ArrayList<>();
        amazonS3.listObjectsV2(listObjectsV2Request).getObjectSummaries()
                .forEach(s3ObjectSummary -> {
                    String fileUrl = amazonS3.getUrl(bucket, s3ObjectSummary.getKey()).toString();
                    fileUrls.add(new FittingSearchResponse(fileUrl));
                });

        return fileUrls;
    }

    @Override
    public String getClothFile(ClothRequest clothRequest) {
        int category = clothRequest.getCategory();
        String folderPath = "cloth/" + (category == 0 || category == 2 ? "top" : "bottom") + "/" + clothRequest.getClothImg();
        return amazonS3.getUrl(bucket, folderPath).toString();
    }

    @Override
    public String getModelFile(ModelRequest modelRequest) {
        String folderPath = "model/" + modelRequest.getMemberId() + "/" + modelRequest.getModelImg();
        return amazonS3.getUrl(bucket, folderPath).toString();
    }
}