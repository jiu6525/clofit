package com.clofit.db.redis.service;

import com.clofit.api.fitting.entity.FittingResult;
import com.clofit.config.RedisConfig;
import com.clofit.db.redis.RedisHandler;
import lombok.RequiredArgsConstructor;
import org.springframework.data.redis.core.ListOperations;
import org.springframework.data.redis.core.RedisTemplate;
import org.springframework.stereotype.Service;

import java.io.IOException;
import java.nio.file.Files;
import java.nio.file.Paths;
import java.time.Duration;

/**
 * Redis 단일 데이터를 처리하는 비즈니스 로직 구현체입니다.
 */
@Service
@RequiredArgsConstructor
public class RedisServiceImpl implements RedisService {

    private final RedisHandler redisHandler;
    private final RedisConfig redisConfig;
    private final RedisTemplate<String, Object> redisTemplate;
    private final RedisTemplate<String, FittingResult> fittingResultRedisTemplate;

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
    public void storeFitting(FittingResult fittingResult) {
        ListOperations<String, FittingResult> list =  fittingResultRedisTemplate.opsForList();
        list.rightPush("fitting:" + fittingResult.getMemberId(), fittingResult);
    }

    // Redis에서 memberId 조회
    public String getMemberId(String key) {
        return (String) redisTemplate.opsForValue().get(key + ":memberId");
    }

    // Redis에서 이미지 조회
    public byte[] getImage(String key) {
        return (byte[]) redisTemplate.opsForValue().get(key + ":image");
    }
}