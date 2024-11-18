package com.clofit.api.fitting.service;

import com.clofit.api.clothes.entity.Clothes;
import com.clofit.api.clothes.repository.ClothesRepository;
import com.clofit.api.fitting.entity.Fitting;
import com.clofit.api.fitting.repository.FittingRepository;
import com.clofit.api.fitting.request.*;
import com.clofit.api.fitting.response.FittingDetailResponse;
import com.clofit.api.fitting.response.FittingRecentDetailResponse;
import com.clofit.api.member.entity.Member;
import com.clofit.api.member.repository.MemberRepository;
import com.clofit.config.SseEmitterManager;
import com.fasterxml.jackson.databind.ObjectMapper;
import jakarta.annotation.PostConstruct;
import lombok.RequiredArgsConstructor;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.redis.core.RedisTemplate;
import org.springframework.http.*;
import org.springframework.stereotype.Service;
import org.springframework.web.client.RestTemplate;
import org.springframework.web.reactive.function.client.WebClient;
import reactor.core.publisher.Mono;

import java.io.ByteArrayInputStream;
import java.io.ByteArrayOutputStream;
import java.io.IOException;
import java.time.Duration;
import java.time.temporal.ChronoUnit;
import java.util.*;
import java.util.concurrent.CompletableFuture;
import java.util.zip.ZipEntry;
import java.util.zip.ZipInputStream;

@Service
@RequiredArgsConstructor
public class FittingServiceImpl implements FittingService {

    private final FittingRepository fittingRepository;
    private final MemberRepository memberRepository;
    private final ClothesRepository clothesRepository;
    private final SseEmitterManager sseEmitterManager;
    @Value("${ootd.gpu-server}")
    private String gpuServer;

    private final RedisTemplate<String, Object> template;
    private final ObjectMapper objectMapper;
    private final String key = "clofit";
    private boolean isGpuBusy;
    private final WebClient webClient;

    private final AwsS3Service awsS3Service;
    private final RestTemplate restTemplate;
    private static final Logger logger = LoggerFactory.getLogger(FittingServiceImpl.class);

    @PostConstruct
    public void init() {
        startQueueProcessing();
    }

    public void startQueueProcessing() {
        Thread.ofVirtual().start(this::monitorQueue);
    }

    private void monitorQueue() {
        while (true) {
            System.out.println("polling 진행중");
            try {
                isGpuBusy = isGpuServerBusy();
                if (!isGpuBusy) {
                    String queuedMessage = popMessageFromQueue();
                    if (queuedMessage != null) {
                        FittingRequest fittingRequest = objectMapper.readValue(queuedMessage, FittingRequest.class);
                        processMessage(fittingRequest);
                    }
                }
                Thread.sleep(3000); // Wait for a short interval before checking again
            } catch (Exception e) {
                System.err.println("Error monitoring queue: " + e.getMessage());
            }
        }
    }

    private boolean isGpuServerBusy() {
        try {
            String url = gpuServer + "status";
            ResponseEntity<String> response = restTemplate.getForEntity(url, String.class);

            return response.getBody() != null && response.getBody().contains("busy");
        } catch (Exception e) {
            System.err.println("Error checking GPU server status: " + e.getMessage());
            return true;
        }
    }

    String popMessageFromQueue() {
        return (String) template.opsForList().leftPop(key);
    }

//    @Override
//    public byte[] fitting(FittingRequest fittingRequest) throws Exception {
//        int category = fittingRequest.getCategory();
//        Long memberId = fittingRequest.getMemberId();
//        String modelName = fittingRequest.getModelName();
//
//        String modelFile = awsS3ServiceImpl.getModelFile(new ModelRequest(memberId, modelName));
//
//        List<String> clothes;
//        // S3에서 모델 파일과 의류 파일을 가져옴
//        if(category == 2){
//            List<String> clothList = fittingRequest.getClothName();
//            String top = awsS3ServiceImpl.getClothFile(new ClothRequest(0, clothList.getFirst()));
//            String bottom = awsS3ServiceImpl.getClothFile(new ClothRequest(1, clothList.getLast()));
//            clothes = Arrays.asList(top, bottom);
//            return fitting(modelFile, clothes, category);
//        }else if(category == 0 || category == 1){
//            // 상의 이거나 하의 단일 카테고리만 선택한 경우
//            String clothFile = awsS3ServiceImpl.getClothFile(new ClothRequest(category, fittingRequest.getClothName().getFirst()));
//            clothes = Collections.singletonList(clothFile);
//            return fitting(modelFile, clothes, category);
//        }else{
//            throw new Exception("잘못된 요청 입니다.");
//        }
//    }

    @Override
    public void fittingMQ(FittingRequest fittingRequest){
        CompletableFuture.supplyAsync(() -> {
            System.out.println("가상 스레드 시작: " + Thread.currentThread().getName());
            try {
                byte[] bytes = new byte[0];
                fitting result = getFitting(fittingRequest);
                Map<String, Object> valueMap = createValueMap(fittingRequest, result);

                // 큐에 메시지를 추가
                template.opsForList().rightPush(key, objectMapper.writeValueAsString(valueMap));
                System.out.println("Message added to queue.");
                return bytes;
            } catch (Exception e) {
                System.err.println("Error processing message: " + e.getMessage());
                throw new RuntimeException("Error processing message", e);
            }
        });
    }

    @Override
    public Page<Fitting> getPublicFittingList(Pageable pageable) {
        return fittingRepository.findAllPublicYn(pageable);
    }

    @Override
    public Page<Fitting> getPublicFittingListByColor(Long colorId, Pageable pageable) {
        return fittingRepository.findAllPublicYnByColorId(colorId, pageable);
    }

    @Override
    public List<String> recentFitting(Long memberId) {
        List<Object> imageDataList = template.opsForList().range(String.valueOf(memberId), 0, -1);

        List<String> imageList = new ArrayList<>();
        if (imageDataList != null) {
            for (Object obj : imageDataList) {
                if (obj instanceof String) {
                    imageList.add((String) obj);
                } else {
                    throw new IllegalArgumentException("Expected String but found " + obj.getClass().getName());
                }
            }
        }

        System.out.println(Arrays.toString(imageList.toArray()));

        return imageList;
    }

    /**
     * 피팅 이미지 저장
     */
    @Override
    public void saveFitting(Character publicYn, FittingRecentDetailResponse fittingRecentDetailResponse) {
        Optional<Member> byId = memberRepository.findById(fittingRecentDetailResponse.getMemberId());
        Fitting fitting = new Fitting();

        // 널 아이템에 대한 저장 진행하기
        if(byId.isPresent()){
            Member member = byId.get();
            String imgUrl = fittingRecentDetailResponse.getImgUrl();
            fitting.setMember(member);
            fitting.setImgPath(imgUrl);
            List<String> clothName = fittingRecentDetailResponse.getClothName();

            int category = fittingRecentDetailResponse.getCategory();
            if(category == 2){
                Clothes topClothe = clothesRepository.findTopClothe(clothName.getFirst());
                Clothes bottomClothe = clothesRepository.findBottomClothe(clothName.getLast());
                fitting.setTop(topClothe);
                fitting.setBottom(bottomClothe);
            } else if (category == 0) { // 상의 피팅이니까 bottom 에 대한 nullItem 값을 가져와서 id로 넣어주자
                fitting.setTop(clothesRepository.findTopClothe(clothName.getFirst()));
                fitting.setBottom(clothesRepository.findBottomNullColor());
            }else{
                fitting.setTop(clothesRepository.findTopNullColor());
                fitting.setBottom(clothesRepository.findBottomClothe(clothName.getLast()));
            }

            fitting.setPublicYn(publicYn);

            fittingRepository.save(fitting);
        }

    }


    private byte[] startFitting(fitting result) throws IOException {
        try {
//            String url = result.url;
//            String payload = result.jsonPayload;
//
//            HttpHeaders headers = new HttpHeaders();
//            headers.setContentType(MediaType.APPLICATION_JSON);
//            HttpEntity<String> entity = new HttpEntity<>(payload, headers);
//
//            logger.warn("!!!!!GPU SEND !!!!!");
//            ResponseEntity<byte[]> responseEntity = restTemplate.postForEntity(url, entity, byte[].class);
//            logger.warn("!!!!!GPU SEND END !!!!!");
//            byte[] imgFile = responseEntity.getBody();

            // WebClient 요청 보내기
            Mono<ResponseEntity<byte[]>> responseMono = webClient.post()
                    .uri(result.url()) // URL 설정
                    .header(HttpHeaders.CONTENT_TYPE, MediaType.APPLICATION_JSON_VALUE) // Content-Type 설정
                    .header(HttpHeaders.ACCEPT, MediaType.APPLICATION_JSON_VALUE) // Accept 헤더 추가
                    .bodyValue(result.jsonPayload) // JSON 본문 설정
                    .retrieve() // 요청 보내기
                    .toEntity(byte[].class); // 응답을 byte[]로 처리

            // 응답을 기다림
//            logger.warn("!!!!!!!!!!!!!!! GPU SEND  !!!!!!!!!!!!!!!");
            ResponseEntity<byte[]> responseEntity = responseMono.block(Duration.of(4, ChronoUnit.MINUTES)); // block()으로 응답 기다림
//            logger.warn(responseEntity == null ? "ENTITY IS NULL" : "ENTITY IS NOT NULL");
//            logger.warn(responseEntity.getStatusCode().toString());
            byte[] imgFile = responseEntity != null ? responseEntity.getBody() : null;

            logger.info("연산 완료");
            logger.info("Request sent to GPU server.");

            // 이미지가 있으면 첫 번째 이미지를 반환
            if (imgFile != null) {
                return imgFile;
            } else {
                logger.info("No images to return.");
                return null; // 이미지가 없으면 null 반환
            }
        } catch (Exception e) {
            System.err.println("Error handling GPU task: " + e.getMessage());
            return null;
        }
    }

    private void processMessage(FittingRequest fittingRequest) {
        try {
            fitting result = getFitting(fittingRequest);
            isGpuBusy = isGpuServerBusy();
            if (!isGpuBusy) {
                try {
                    String uuid = UUID.randomUUID().toString();
                    Long memberId = result.fittingRequest.getMemberId();


//                    template.opsForValue().set(uuid, new ObjectMapper().writeValueAsString(new FittingRecentDetailResponse()));

                    byte[] img = startFitting(result);
                    String imgUrl = awsS3Service.recentFile(memberId, img);
                    FittingRecentDetailResponse fittingRecentDetailResponse = new FittingRecentDetailResponse(fittingRequest, imgUrl);
                    // 멤버 id 와 처리된 이미지 파일을 s3에 저장하고 redis에 url 주소를 저장하자
                    template.opsForList().rightPush(String.valueOf(memberId), uuid);
                    template.opsForSet().add(uuid, new ObjectMapper().writeValueAsString(fittingRecentDetailResponse));

                    logger.info("Data saved to Redis: memberId = {}", memberId);

                    // SSE 이벤트 전송
//                    sendSseEvent(memberId, fittingRecentDetailResponse);
                } catch (Exception e) {
                    logger.error("Error saving data to Redis: {}", e.getMessage());
                }
            } else {
                // GPU가 바쁠 경우 메시지를 큐에 다시 추가
                Map<String, Object> valueMap = createValueMap(fittingRequest, result);
                template.opsForList().rightPush(key, objectMapper.writeValueAsString(valueMap));
                System.out.println("GPU server busy; message re-added to queue.");
            }
        } catch (Exception e) {
            System.err.println("Error processing message: " + e.getMessage());
        }
    }

    private void sendSseEvent(Long memberId, FittingRecentDetailResponse fittingRecentDetailResponse) {
        try {
            sseEmitterManager.sendEvent(memberId, fittingRecentDetailResponse);
            logger.info("SSE event sent to client: memberId = {}", memberId);
        } catch (Exception e) {
            logger.error("Error sending SSE event: {}", e.getMessage());
        }
    }

    private fitting getFitting(FittingRequest fittingRequest) throws Exception {
        HttpHeaders headers = new HttpHeaders();
        headers.setContentType(MediaType.APPLICATION_JSON);
        headers.setAccept(Collections.singletonList(MediaType.APPLICATION_JSON));

        Long memberId = fittingRequest.getMemberId();
        String modelName = fittingRequest.getModelName();
        List<String> clothes;
        int category = fittingRequest.getCategory();

        String modelFile = awsS3Service.getModelFile(new ModelRequest(memberId, modelName));


        if(category == 2){
            List<String> clothList = fittingRequest.getClothName();
            String top = awsS3Service.getClothFile(new ClothRequest(0, clothList.getFirst()));
            String bottom = awsS3Service.getClothFile(new ClothRequest(1, clothList.getLast()));
            clothes = Arrays.asList(top, bottom);
        }else if(category == 0 || category == 1){
            // 상의 이거나 하의 단일 카테고리만 선택한 경우
            String clothFile = awsS3Service.getClothFile(new ClothRequest(category, fittingRequest.getClothName().getFirst()));
            clothes = Collections.singletonList(clothFile);
        }else{
            throw new Exception("잘못된 요청 입니다.");
        }

        String url = gpuServer + "run-ootd";

        String jsonPayload = "{"
                + "\"model_file_path\": \"" + modelFile + "\","
                + "\"top_file_path\": \"" + clothes.getFirst() + "\","
                + "\"category\": \"" + category + "\"";
        if(category == 2){
            jsonPayload += ","+ "\"bottom_file_path\": \"" + clothes.getLast() + "\"";
        }


        jsonPayload += "}";

        return new fitting(fittingRequest, url, jsonPayload, new HttpEntity<>(jsonPayload, headers));
    }

    private record fitting(FittingRequest fittingRequest, String url, String jsonPayload, HttpEntity<String> entity) {}

    private Map<String, Object> createValueMap(FittingRequest fittingRequest, fitting result) {
        Map<String, Object> valueMap = new HashMap<>();

        if (fittingRequest != null) {
            valueMap.put("memberId", String.valueOf(fittingRequest.getMemberId()));
            valueMap.put("modelName", fittingRequest.getModelName());
            valueMap.put("clothName", fittingRequest.getClothName());
            valueMap.put("category", String.valueOf(fittingRequest.getCategory()));
        }
        valueMap.put("message", String.valueOf(result));

        return valueMap;
    }

    private List<byte[]> unzipFile(byte[] zipFileBytes) throws IOException {
        List<byte[]> imageFiles = new ArrayList<>();
        try (ZipInputStream zipInputStream = new ZipInputStream(new ByteArrayInputStream(zipFileBytes))) {
            ZipEntry entry;
            while ((entry = zipInputStream.getNextEntry()) != null) {
                if (!entry.isDirectory() && entry.getName().endsWith(".png")) {
                    ByteArrayOutputStream outputStream = new ByteArrayOutputStream();
                    zipInputStream.transferTo(outputStream);
                    imageFiles.add(outputStream.toByteArray());
                }
            }
        }
        return imageFiles;
    }

    /**
     * 기존 코드
     */

    @Override
    public byte[] fitting(FittingRequest fittingRequest) throws Exception {
        int category = fittingRequest.getCategory();
        Long memberId = fittingRequest.getMemberId();
        String modelName = fittingRequest.getModelName();

        String modelFile = awsS3Service.getModelFile(new ModelRequest(memberId, modelName));

        List<String> clothes;
        // S3에서 모델 파일과 의류 파일을 가져옴
        if(category == 2){
            List<String> clothList = fittingRequest.getClothName();
            String top = awsS3Service.getClothFile(new ClothRequest(0, clothList.getFirst()));
            String bottom = awsS3Service.getClothFile(new ClothRequest(1, clothList.getLast()));
            clothes = Arrays.asList(top, bottom);
            return fitting(modelFile, clothes, category);
        }else if(category == 0 || category == 1){
            // 상의 이거나 하의 단일 카테고리만 선택한 경우
            String clothFile = awsS3Service.getClothFile(new ClothRequest(category, fittingRequest.getClothName().getFirst()));
            clothes = Collections.singletonList(clothFile);
            return fitting(modelFile, clothes, category);
        }else{
            throw new Exception("잘못된 요청 입니다.");
        }
    }

    private byte[] fitting(String modelFile, List<String> clothFile, int category) {
        // 외부 API의 URL 설정
        String url = gpuServer + "run-ootd";
        String jsonPayload = "{"
                + "\"model_file_path\": \"" + modelFile + "\","
                + "\"top_file_path\": \"" + clothFile.getFirst() + "\","
                + "\"category\": \"" + category + "\"";
        if(category == 2){
            jsonPayload += ","+ "\"bottom_file_path\": \"" + clothFile.getLast() + "\"";
        }
        System.out.println("test" + jsonPayload);

        jsonPayload += "}";

        // HTTP 헤더 설정
        HttpHeaders headers = new HttpHeaders();
        headers.setContentType(MediaType.APPLICATION_JSON);
        headers.setAccept(Collections.singletonList(MediaType.APPLICATION_JSON));

        HttpEntity<String> entity = new HttpEntity<>(jsonPayload, headers);
        try {
            // 외부 API에 POST 요청을 보내 zip 파일을 응답받음
            ResponseEntity<byte[]> response = restTemplate.exchange(url, HttpMethod.POST, entity, byte[].class);
            byte[] zipFileBytes = response.getBody();
            if (zipFileBytes != null) {
                // zip 파일 압축 해제
                List<byte[]> imageFiles = unzipFile(zipFileBytes);

                if (!imageFiles.isEmpty()) {
                    // 첫번째 이미지 파일을 반환
                    return imageFiles.getFirst();
                } else {
                    logger.error("압축 해제 오류: 이미지 파일이 없습니다.");
                    throw new Exception("압축 해제 오류: 이미지 파일이 없습니다.");
                }
            } else {
                logger.error("응답이 zip 파일이 아님");
                throw new Exception("응답이 zip 파일이 아님"); // 응답이 zip 파일이 아님
            }

        } catch (Exception e) {
            logger.error("오류 발생: {}", e.getMessage(), e); // 구체적인 오류 메시지 및 스택 트레이스 로깅
            throw new RuntimeException("API 요청 중 오류 발생", e); // 예외를 던져서 컨트롤러에서 처리하도록 함
        }
    }

    @Override
    public FittingDetailResponse getDetailFitting(Long fittingId) {
        Fitting fitting = fittingRepository.findById(fittingId).orElse(null);

        FittingDetailResponse fittingDetailResponse = new FittingDetailResponse(
                fitting.getId(),
                fitting.getImgPath(),
                fitting.getRegFittingDttm(),
                fitting.getFavoriteYn(),
                fitting.getFittingName(),
                fitting.getPublicYn(),
                fitting.getTop(),
                fitting.getBottom()
        );

        return fittingDetailResponse;
    }


}
