package com.clofit.api.origin_picture.entity;

import static com.querydsl.core.types.PathMetadataFactory.*;

import com.querydsl.core.types.dsl.*;

import com.querydsl.core.types.PathMetadata;
import javax.annotation.processing.Generated;
import com.querydsl.core.types.Path;
import com.querydsl.core.types.dsl.PathInits;


/**
 * QOriginPicture is a Querydsl query type for OriginPicture
 */
@Generated("com.querydsl.codegen.DefaultEntitySerializer")
public class QOriginPicture extends EntityPathBase<OriginPicture> {

    private static final long serialVersionUID = -1689334292L;

    private static final PathInits INITS = PathInits.DIRECT2;

    public static final QOriginPicture originPicture = new QOriginPicture("originPicture");

    public final ComparablePath<Character> delPicYn = createComparable("delPicYn", Character.class);

    public final StringPath fileName = createString("fileName");

    public final StringPath filePath = createString("filePath");

    public final NumberPath<Long> id = createNumber("id", Long.class);

    public final com.clofit.api.member.entity.QMember member;

    public final StringPath regPicDttm = createString("regPicDttm");

    public QOriginPicture(String variable) {
        this(OriginPicture.class, forVariable(variable), INITS);
    }

    public QOriginPicture(Path<? extends OriginPicture> path) {
        this(path.getType(), path.getMetadata(), PathInits.getFor(path.getMetadata(), INITS));
    }

    public QOriginPicture(PathMetadata metadata) {
        this(metadata, PathInits.getFor(metadata, INITS));
    }

    public QOriginPicture(PathMetadata metadata, PathInits inits) {
        this(OriginPicture.class, metadata, inits);
    }

    public QOriginPicture(Class<? extends OriginPicture> type, PathMetadata metadata, PathInits inits) {
        super(type, metadata, inits);
        this.member = inits.isInitialized("member") ? new com.clofit.api.member.entity.QMember(forProperty("member"), inits.get("member")) : null;
    }

}

