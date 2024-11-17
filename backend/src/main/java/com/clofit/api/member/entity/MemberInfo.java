package com.clofit.api.member.entity;

import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

@AllArgsConstructor
@NoArgsConstructor
@Getter
@Setter

public class MemberInfo {
    private Long memberId;
    private String memberName;
    private String profileFilePath;
    private String fittingName;
}
