package com.clofit.api.feed.dto;

import com.fasterxml.jackson.annotation.JsonSubTypes;
import com.fasterxml.jackson.annotation.JsonTypeInfo;

/**
 * 서로 다른 클래스를 타입으로 구분하여
 * 하나의 리스트로 보여주기 위한 추상 클래스
 * 이 클래스를 상속받고 타입에 등록해주면
 * 하나의 리스트로 직렬화시킬 수 있다.
 */
@JsonTypeInfo(
        use = JsonTypeInfo.Id.NAME, // 타입 정보를 JSON에 추가
        include = JsonTypeInfo.As.PROPERTY,
        property = "type"          // JSON에 "type" 필드로 구분
)
@JsonSubTypes({
        @JsonSubTypes.Type(value = ClothesFeed.class, name = "clothes"),
        @JsonSubTypes.Type(value = FittingFeed.class, name = "fitting")
})
public abstract class Feed {
}
