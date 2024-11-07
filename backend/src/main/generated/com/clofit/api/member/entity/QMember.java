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

    private static final PathInits INITS = PathInits.DIRECT2;

    public static final QMember member = new QMember("member1");

    public final NumberPath<Integer> age = createNumber("age", Integer.class);

    public final com.clofit.api.closet.entity.QCloset closet;

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
        this(Member.class, forVariable(variable), INITS);
    }

    public QMember(Path<? extends Member> path) {
        this(path.getType(), path.getMetadata(), PathInits.getFor(path.getMetadata(), INITS));
    }

    public QMember(PathMetadata metadata) {
        this(metadata, PathInits.getFor(metadata, INITS));
    }

    public QMember(PathMetadata metadata, PathInits inits) {
        this(Member.class, metadata, inits);
    }

    public QMember(Class<? extends Member> type, PathMetadata metadata, PathInits inits) {
        super(type, metadata, inits);
        this.closet = inits.isInitialized("closet") ? new com.clofit.api.closet.entity.QCloset(forProperty("closet"), inits.get("closet")) : null;
    }

}

