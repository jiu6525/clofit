package com.clofit.api.closet.response;

import com.clofit.api.closet.entity.Closet;
import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.Setter;

@Getter
@Setter
@AllArgsConstructor
public class ClosetResponse {
    private Long closetId;
    private Long clothesId;
    private String memberName;
    private String regClosetDttm;
}
