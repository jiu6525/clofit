package com.clofit.db.redis.service;

import com.clofit.api.fitting.entity.FittingResult;
import com.clofit.api.fitting.response.FittingRecentDetailResponse;
import com.clofit.api.fitting.response.FittingRecentResponse;
import com.fasterxml.jackson.core.JsonProcessingException;
import org.springframework.stereotype.Service;

import java.io.IOException;
import java.time.Duration;
import java.util.List;

/**
 * Redis 단일 데이터를 처리하는 비즈니스 로직 인터페이스입니다.
 */
@Service
public interface RedisService {

    // Redis 단일 데이터 값을 등록/수정합니다.
    int setSingleData(String key, Object value);

    // Redis 단일 데이터 값을 등록/수정합니다.(duration 값이 존재하면 메모리 상 유효시간을 지정합니다.)
    int setSingleData(String key, Object value, Duration duration);

    // Redis 키를 기반으로 단일 데이터의 값을 조회합니다.
    String getSingleData(String key);

    // Redis 키를 기반으로 단일 데이터의 값을 삭제합니다.
    int deleteSingleData(String key);

    void storeFitting(String key, String memberId, String imagePath) throws IOException;

    void storeFitting(FittingResult fittingResult, String memberId) throws JsonProcessingException;
    void updateFitting(String memberId, String redisId, String url) throws IOException;

    void removeFittingResult(String memberId, String redisId) throws JsonProcessingException;
    List<String> getFittingList(String memberId);
    FittingRecentResponse getFittingResult(String redisId) throws JsonProcessingException;
    boolean existFittingResult(String memberId, String redisId) throws JsonProcessingException;
    FittingRecentDetailResponse getFittingDetailResult(String redisId) throws JsonProcessingException;
}