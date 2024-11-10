package com.clofit.api.closet.request;

import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;

@Getter
@NoArgsConstructor
@AllArgsConstructor
public class ClosetDeleteRequest {
    private Long closetId;
    private Long clothesId;
}
