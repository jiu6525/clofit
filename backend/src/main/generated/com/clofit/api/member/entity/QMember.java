package com.clofit.api.member.entity;

import static com.querydsl.core.types.PathMetadataFactory.*;

import com.querydsl.core.types.dsl.*;

import com.querydsl.core.types.PathMetadata;
import javax.annotation.processing.Generated;
import com.querydsl.core.types.Path;
import com.querydsl.core.types.dsl.PathInits;


/**
 * QMember is a Querydsl query type for Member
 */
@Generated("com.querydsl.codegen.DefaultEntitySerializer")
public class QMember extends EntityPathBase<Member> {

    private static final long serialVersionUID = 1611635995L;

    public static final QMember member = new QMember("member1");

    public final NumberPath<Integer> age = createNumber("age", Integer.class);

    public final ListPath<com.clofit.api.closet.entity.Closet, com.clofit.api.closet.entity.QCloset> closet = this.<com.clofit.api.closet.entity.Closet, com.clofit.api.closet.entity.QCloset>createList("closet", com.clofit.api.closet.entity.Closet.class, com.clofit.api.closet.entity.QCloset.class, PathInits.DIRECT2);

    public final DateTimePath<java.time.LocalDateTime> delMemberDttm = createDateTime("delMemberDttm", java.time.LocalDateTime.class);

    public final ComparablePath<Character> delMemberYn = createComparable("delMemberYn", Character.class);

    public final StringPath email = createString("email");

    public final NumberPath<Long> id = createNumber("id", Long.class);

    public final StringPath memberName = createString("memberName");

    public final StringPath password = createString("password");

    public final StringPath personalColor = createString("personalColor");

    public final StringPath profileFileName = createString("profileFileName");

    public final StringPath profileFilePath = createString("profileFilePath");

    public final DateTimePath<java.time.LocalDateTime> regMemberDttm = createDateTime("regMemberDttm", java.time.LocalDateTime.class);

    public final StringPath role = createString("role");

    public QMember(String variable) {
        super(Member.class, forVariable(variable));
    }

    public QMember(Path<? extends Member> path) {
        super(path.getType(), path.getMetadata());
    }

    public QMember(PathMetadata metadata) {
        super(Member.class, metadata);
    }

}

