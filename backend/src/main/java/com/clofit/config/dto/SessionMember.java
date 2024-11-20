package com.clofit.config.dto;

import com.clofit.api.member.entity.Member;
import lombok.Getter;

import java.io.Serializable;

@Getter
public class SessionMember implements Serializable {
    private final String memberName;
    private final String memberEmail;

    public SessionMember(Member member) {
        this.memberName = member.getMemberName();
        this.memberEmail = member.getEmail();
    }
}