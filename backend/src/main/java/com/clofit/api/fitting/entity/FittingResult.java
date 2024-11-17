package com.clofit.api.fitting.entity;

import com.fasterxml.jackson.annotation.JsonIgnoreProperties;
import jakarta.persistence.Entity;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import lombok.*;
import org.springframework.data.annotation.Id;
import org.springframework.data.redis.core.RedisHash;
import org.springframework.data.redis.core.TimeToLive;
import org.springframework.data.redis.core.index.Indexed;

import java.util.List;

@Getter
@Setter
@Builder(toBuilder = true)
@AllArgsConstructor
@NoArgsConstructor
@RedisHash(value="fitting", timeToLive=1200) //20 min
@JsonIgnoreProperties(ignoreUnknown = true)
@ToString
public class FittingResult {
    private String memberId;
    private String imgUrl;
    private String modelName;
    private List<String> clothName;
    private boolean isDone;
}
