package com.clofit.api.closet.request;

import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;

import java.util.List;

@Getter
@NoArgsConstructor
@AllArgsConstructor
public class ClosetDeleteRequest {
    private List<Long> closetIds;
}
