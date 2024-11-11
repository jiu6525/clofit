package com.clofit.api.member.response;

import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
public class MemberInfoResponse {
    private String memberName;
    private String personalColor;
    private String profileFilePath;
}
