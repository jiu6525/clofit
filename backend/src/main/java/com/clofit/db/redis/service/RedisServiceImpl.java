package com.clofit.db.redis.service;

import com.clofit.api.fitting.entity.FittingResult;
import com.clofit.api.fitting.response.FittingRecentDetailResponse;
import com.clofit.api.fitting.response.FittingRecentResponse;
import com.clofit.config.RedisConfig;
import com.clofit.db.redis.RedisHandler;
import com.fasterxml.jackson.core.JsonProcessingException;
import com.fasterxml.jackson.databind.ObjectMapper;
import io.lettuce.core.RedisException;
import lombok.RequiredArgsConstructor;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.data.redis.core.ListOperations;
import org.springframework.data.redis.core.RedisTemplate;
import org.springframework.data.redis.core.ValueOperations;
import org.springframework.stereotype.Service;

import java.io.IOException;
import java.nio.file.Files;
import java.nio.file.Paths;
import java.time.Duration;
import java.util.ArrayList;
import java.util.List;
import java.util.Set;

/**
 * Redis 단일 데이터를 처리하는 비즈니스 로직 구현체입니다.
 */
@Service
@RequiredArgsConstructor
public class RedisServiceImpl implements RedisService {

    private final ObjectMapper objectMapper;
    private final RedisHandler redisHandler;
    private final RedisConfig redisConfig;
    private final RedisTemplate<String, Object> redisTemplate;
//    private final RedisTemplate<String, FittingResult> fittingResultRedisTemplate;
    private static final Logger logger = LoggerFactory.getLogger(RedisServiceImpl.class);

    /**
     * Redis 단일 데이터 값을 등록/수정합니다.
     *
     * @param key   : redis key
     * @param value : redis value
     * @return {int} 성공(1), 실패(0)
     */
    @Override
    public int setSingleData(String key, Object value) {
        return redisHandler.executeOperation(() -> redisHandler.getValueOperations().set(key, value));
    }

    /**
     * Redis 단일 데이터 값을 등록/수정합니다.(duration 값이 존재하면 메모리 상 유효시간을 지정합니다.)
     *
     * @param key      : redis key
     * @param value:   : redis value
     * @param duration : redis 값 메모리 상의 유효시간.
     * @return {int} 성공(1), 실패(0)
     */
    @Override
    public int setSingleData(String key, Object value, Duration duration) {
        return redisHandler.executeOperation(() -> redisHandler.getValueOperations().set(key, value, duration));
    }

    /**
     * Redis 키를 기반으로 단일 데이터의 값을 조회합니다.
     *
     * @param key : redis key
     * @return {String} redis value 값 반환 or 미 존재시 null 반환
     */
    @Override
    public String getSingleData(String key) {
        if (redisHandler.getValueOperations().get(key) == null) return "";
        return String.valueOf(redisHandler.getValueOperations().get(key));
    }

    @Override
    public int deleteSingleData(String key) {
        return 0;
    }

    // memberId와 이미지를 Redis에 저장하는 메서드
    public void storeFitting(String key, String memberId, String imagePath) throws IOException {
        // 이미지 파일을 byte[]로 읽어오기
        byte[] imageBytes = Files.readAllBytes(Paths.get(imagePath));

        // Redis에 memberId 저장
        redisTemplate.opsForValue().set(key + ":memberId", memberId);

        // Redis에 이미지 저장
        redisTemplate.opsForValue().set(key + ":image", imageBytes);
    }

    @Override
    public void storeFitting(FittingResult fittingResult, String memberId) throws JsonProcessingException {
//        ListOperations<String, Object> list =  redisTemplate.opsForList();
//        ValueOperations<String, Object> value = redisTemplate.opsForValue();
//
//        value.set(fittingResultKey(fittingResult.getMemberId()), objectMapper.writeValueAsString(fittingResult));
//        list.rightPush(fittingListKey(memberId), objectMapper.writeValueAsString(fittingResult.getMemberId()));
    }

    /**
     * 피팅 결과가 완료되면 관련 정보를 레디스에 저장
     * @param memberId
     * @param redisId
     * @param url
     * @throws IOException
     */
    @Override
    public void updateFitting(Long memberId, String redisId, String url) throws IOException {
        ListOperations<String, Object> list =  redisTemplate.opsForList();
        List<Object> fittingList = list.range(fittingListKey(String.valueOf(memberId)), 0, -1);

        if(fittingList == null) {
            logger.warn("redis fitting:" + memberId + " is null");
            return;
        }
        String listObj = null;
        String tmpKey = "\"" + redisId + "\"";
        boolean isFound = false;
        int idx = 0;
        for(Object fitting : fittingList) {
            listObj = (String)fitting;
            if(tmpKey.equals(listObj)) {
                isFound = true;
                break;
            }
            idx++;
        }
        if(!isFound) {
            logger.warn("redis fitting:" + memberId + " inside of " + redisId + " is not found");
            return;
        }
//        redisTemplate.opsForValue().set(fittingResultKey(redisId), objectMapper.writeValueAsString(new FittingResult(redisId, true, url)));
    }

    /**
     * FittingResult를 제거한다.
     * @param memberId
     * @param redisId
     */
    @Override
    public void removeFittingResult(Long memberId, String redisId) throws JsonProcessingException {
        redisTemplate.delete(redisId);
        redisTemplate.opsForList().remove(String.valueOf(memberId), 1, objectMapper.writeValueAsString(redisId));
    }

    /**
     * 멤버가 진행한 피팅 결과 UUID 리스트
     * @param memberId
     * @return UUID List, 존재하지 않거나 사용 중인 경우 빈 리스트(Empty ArrayList)
     */
    @Override
    public List<String> getFittingList(Long memberId) {
        List<Object> list = redisTemplate.opsForList().range(String.valueOf(memberId),0, -1);
        if(list == null) {
            logger.warn("redis fitting:" + memberId + " is null");
            return new ArrayList<>();
        }

        List<String> stringList = new ArrayList<>();
        for(Object fitting : list) {
            stringList.add(((String)fitting).replaceAll("\"", ""));
        }
        return stringList;
    }

    /**
     * Fitting Result Id 를 통해 조회
     * @param redisId FittingResult.ID
     * @return FittingResult, 존재하지 않거나 사용 중인 경우 null
     */
    @Override
    public FittingRecentResponse getFittingResult(String redisId) throws JsonProcessingException {
        Set<Object> set = redisTemplate.opsForSet().members(redisId);
        if (set == null || set.isEmpty()) {
            logger.warn("redis fitting: {} is null or empty", redisId);
            throw new RedisException("redis fitting: " + redisId + " is null or empty");
        }

        ObjectMapper objectMapper = new ObjectMapper();
        FittingRecentDetailResponse fittingRecentDetailResponse = objectMapper.readValue((String) set.iterator().next(), FittingRecentDetailResponse.class);
        System.out.println(fittingRecentDetailResponse);

        return new FittingRecentResponse(redisId, fittingRecentDetailResponse.getImgUrl());
    }

    /**
     * Fitting Result Id 를 통해 조회
     * @param redisId FittingResult.ID
     * @return FittingResult, 존재하지 않거나 사용 중인 경우 null
     */
    @Override
    public FittingRecentDetailResponse getFittingDetailResult(String redisId) throws JsonProcessingException {
        Set<Object> set = redisTemplate.opsForSet().members(redisId);
        if (set == null || set.isEmpty()) {
            logger.warn("redis fitting: {} is null or empty", redisId);
            throw new RedisException("redis fitting: " + redisId + " is null or empty");
        }

        return new ObjectMapper().readValue((String) set.iterator().next(), FittingRecentDetailResponse.class);
    }


    /**
     * 주어진 UUID가 멤버의 소유인지 검사
     * @param memberId
     * @param redisId
     * @return 해당 UUID가 존재한다면 true, 아니면 false
     * @throws JsonProcessingException
     */
    @Override
    public boolean existFittingResult(Long memberId, String redisId) throws JsonProcessingException {
        Long idx =  redisTemplate.opsForList().indexOf(fittingListKey(String.valueOf(memberId)), objectMapper.writeValueAsString(redisId));
        return idx != null && idx >= 0;
    }

    // Redis에서 memberId 조회
    public String getMemberId(String key) {
        return (String) redisTemplate.opsForValue().get(key + ":memberId");
    }

    // Redis에서 이미지 조회
    public byte[] getImage(String key) {
        return (byte[]) redisTemplate.opsForValue().get(key + ":image");
    }

    private String fittingListKey(String memberId) {
        return "fitting:" + memberId;
    }

}