package com.clofit.oauth2.dto;

import lombok.Data;

@Data
public class MemberDTO {
    private String role;
    private String name;
    private String username;
    private String email;
    private Long memberId;
}
