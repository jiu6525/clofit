package com.clofit.api.likelog.entity;

import static com.querydsl.core.types.PathMetadataFactory.*;

import com.querydsl.core.types.dsl.*;

import com.querydsl.core.types.PathMetadata;
import javax.annotation.processing.Generated;
import com.querydsl.core.types.Path;
import com.querydsl.core.types.dsl.PathInits;


/**
 * QLikeLog is a Querydsl query type for LikeLog
 */
@Generated("com.querydsl.codegen.DefaultEntitySerializer")
public class QLikeLog extends EntityPathBase<LikeLog> {

    private static final long serialVersionUID = -2046511987L;

    private static final PathInits INITS = PathInits.DIRECT2;

    public static final QLikeLog likeLog = new QLikeLog("likeLog");

    public final com.clofit.api.fitting.entity.QFitting fitting;

    public final NumberPath<Long> id = createNumber("id", Long.class);

    public final com.clofit.api.member.entity.QMember member;

    public final DateTimePath<java.time.LocalDateTime> regLikeLogDttm = createDateTime("regLikeLogDttm", java.time.LocalDateTime.class);

    public QLikeLog(String variable) {
        this(LikeLog.class, forVariable(variable), INITS);
    }

    public QLikeLog(Path<? extends LikeLog> path) {
        this(path.getType(), path.getMetadata(), PathInits.getFor(path.getMetadata(), INITS));
    }

    public QLikeLog(PathMetadata metadata) {
        this(metadata, PathInits.getFor(metadata, INITS));
    }

    public QLikeLog(PathMetadata metadata, PathInits inits) {
        this(LikeLog.class, metadata, inits);
    }

    public QLikeLog(Class<? extends LikeLog> type, PathMetadata metadata, PathInits inits) {
        super(type, metadata, inits);
        this.fitting = inits.isInitialized("fitting") ? new com.clofit.api.fitting.entity.QFitting(forProperty("fitting"), inits.get("fitting")) : null;
        this.member = inits.isInitialized("member") ? new com.clofit.api.member.entity.QMember(forProperty("member")) : null;
    }

}

