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
import java.net.URL;
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
    private String uploadFile(MultipartFile file, String filePath) {
        if (file == null || file.isEmpty()) {
            logger.info("업로드 파일이 없거나 비어 있습니다.");
            return null;
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
            return fileName;
        } catch (IOException e) {
            throw new ResponseStatusException(HttpStatus.INTERNAL_SERVER_ERROR, "파일 업로드에 실패했습니다.");
        }
    }

    @Override
    public String uploadClothFile(ClothInsertRequest clothInsertRequest) {
        MultipartFile cloth = clothInsertRequest.getClothImg();
        String category = clothInsertRequest.getCategory() == 0 ? "top" : "bottom";
        String filePath = "cloth/" + category; // 경로 지정

        return uploadFile(cloth, filePath);  // 공통 메서드 호출
    }

    @Override
    public String uploadModelFile(ModelInsertRequest modelInsertRequest) {
        MultipartFile model = modelInsertRequest.getModelImg();
        Long memberId = modelInsertRequest.getMemberId();
        String filePath = "model/" + memberId; // 경로 지정

        return uploadFile(model, filePath);  // 공통 메서드 호출
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

//    @Override
//    public void uploadFile(FittingStoreRequest fittingStoreRequest){
//        MultipartFile fittingImg = fittingStoreRequest.getFittingImg();
//        Long memberId = fittingStoreRequest.getMemberId();
//
//
//        if (fittingImg == null || fittingImg.isEmpty()) {
//            logger.info("업로드 파일이 없거나 비어 있습니다.");
//            return;
//        }
//        String name = createFileName();
//        // memberId를 경로에 포함시키고, 파일명에 UUID를 추가
//        String fileName = "fitting/" + memberId + "/" + name; // 경로 지정
//
//        ObjectMetadata objectMetadata = new ObjectMetadata();
//        objectMetadata.setContentLength(fittingImg.getSize());
//        objectMetadata.setContentType(fittingImg.getContentType());
//        objectMetadata.setContentDisposition("inline; filename=\"" + name + "\"");
//
//        try(InputStream inputStream = fittingImg.getInputStream()){
//            amazonS3.putObject(new PutObjectRequest(bucket, fileName, inputStream, objectMetadata)
//                    .withCannedAcl(CannedAccessControlList.PublicRead));
//            logger.info("파일 업로드가 완료되었습니다.{}", fileName);
//        } catch (IOException e){
//            throw new ResponseStatusException(HttpStatus.INTERNAL_SERVER_ERROR, "파일 업로드에 실패했습니다.");
//        }
//
//    }
//
//    @Override
//    public String uploadFile(FittingStoreRequest fittingStoreRequest, String redisId) {
//        MultipartFile fittingImg = fittingStoreRequest.getFittingImg();
//        Long memberId = fittingStoreRequest.getMemberId();
//
//
//        if (fittingImg == null || fittingImg.isEmpty()) {
//            logger.info("업로드 파일이 없거나 비어 있습니다.");
//            return redisId;
//        }
//        String name = redisId + ".png";  //redis id 기준으로 저장하기
//        // memberId를 경로에 포함시키고, 파일명에 RedisId를 넣어준다.
//        String fileName = "fitting/" + memberId + "/tmp/" + name; // 경로 지정
//
//        ObjectMetadata objectMetadata = new ObjectMetadata();
//        objectMetadata.setContentLength(fittingImg.getSize());
//        objectMetadata.setContentType(fittingImg.getContentType());
//        objectMetadata.setContentDisposition("inline; filename=\"" + name + "\"");
//
//        try(InputStream inputStream = fittingImg.getInputStream()){
//            amazonS3.putObject(new PutObjectRequest(bucket, fileName, inputStream, objectMetadata)
//                    .withCannedAcl(CannedAccessControlList.PublicRead));
//            logger.info("파일 업로드가 완료되었습니다.{}", fileName);
//        } catch (IOException e){
//            throw new ResponseStatusException(HttpStatus.INTERNAL_SERVER_ERROR, "파일 업로드에 실패했습니다.");
//        }
//        return amazonS3.getUrl(bucket, fileName).toString();
//    }

    // 파일명을 난수화하기 위해 UUID 를 활용하여 난수를 돌린다.
    public String createFileName(){
//        return UUID.randomUUID().toString().concat(".jpg");
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

    /**
     * 임시 파일을 피팅 폴더로 이동
     * @param url
     */
    @Override
    public URL moveFile(String url) {
        String com = ".com/";
        int index = url.indexOf(com);
        String result = null;
        if (index != -1) {
            result = url.substring(index + com.length());
            String replace = result.replace("/tmp", "");
//            CopyObjectRequest copyObjectRequest = new CopyObjectRequest(bucket, result, bucket, replace).withCannedAccessControlList(CannedAccessControlList.PublicRead);
//            amazonS3.copyObject(bucket, result, bucket, result.replace("/tmp", ""));

//            amazonS3.copyObject(copyObjectRequest);
//            amazonS3.deleteObject(bucket, result);

            return amazonS3.getUrl(bucket, replace);
        } else {
            logger.warn("Keyword not found in the URL.");
            return null;
        }

    }

    @Override
    public String recentFile(Long memberId, byte[] img) {
        String name = createFileName();
        String fileName = "fitting/" + memberId + "/tmp/" + name;
        MultipartFile recentImg = new ByteArrayMultipartFile(name, img);

        ObjectMetadata objectMetadata = new ObjectMetadata();
        objectMetadata.setContentLength(recentImg.getSize());
        objectMetadata.setContentType(recentImg.getContentType());
        objectMetadata.setContentDisposition("inline; filename=\"" + name + "\"");

        try (InputStream inputStream = recentImg.getInputStream()) {
            amazonS3.putObject(new PutObjectRequest(bucket, fileName, inputStream, objectMetadata)
                    .withCannedAcl(CannedAccessControlList.PublicRead));
            logger.info("파일 업로드가 완료되었습니다.{}", fileName);
        } catch (IOException e) {
            throw new ResponseStatusException(HttpStatus.INTERNAL_SERVER_ERROR, "파일 업로드에 실패했습니다.");
        }

//    public String getFile(String fileName) {
//        String folderPath = "fitting/" + 3L + "/" + fileName;
//        return amazonS3.getUrl(bucket, folderPath).toString();
//    }
        return amazonS3.getUrl(bucket, fileName).toString();
    }
}