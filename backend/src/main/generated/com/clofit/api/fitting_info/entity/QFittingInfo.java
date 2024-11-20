package com.clofit.api.fitting_info.entity;

import static com.querydsl.core.types.PathMetadataFactory.*;

import com.querydsl.core.types.dsl.*;

import com.querydsl.core.types.PathMetadata;
import javax.annotation.processing.Generated;
import com.querydsl.core.types.Path;
import com.querydsl.core.types.dsl.PathInits;


/**
 * QFittingInfo is a Querydsl query type for FittingInfo
 */
@Generated("com.querydsl.codegen.DefaultEntitySerializer")
public class QFittingInfo extends EntityPathBase<FittingInfo> {

    private static final long serialVersionUID = -130924264L;

    private static final PathInits INITS = PathInits.DIRECT2;

    public static final QFittingInfo fittingInfo = new QFittingInfo("fittingInfo");

    public final com.clofit.api.fitting.entity.QFitting fitting;

    public final NumberPath<Long> id = createNumber("id", Long.class);

    public final NumberPath<Long> likeCount = createNumber("likeCount", Long.class);

    public final NumberPath<Long> viewCount = createNumber("viewCount", Long.class);

    public QFittingInfo(String variable) {
        this(FittingInfo.class, forVariable(variable), INITS);
    }

    public QFittingInfo(Path<? extends FittingInfo> path) {
        this(path.getType(), path.getMetadata(), PathInits.getFor(path.getMetadata(), INITS));
    }

    public QFittingInfo(PathMetadata metadata) {
        this(metadata, PathInits.getFor(metadata, INITS));
    }

    public QFittingInfo(PathMetadata metadata, PathInits inits) {
        this(FittingInfo.class, metadata, inits);
    }

    public QFittingInfo(Class<? extends FittingInfo> type, PathMetadata metadata, PathInits inits) {
        super(type, metadata, inits);
        this.fitting = inits.isInitialized("fitting") ? new com.clofit.api.fitting.entity.QFitting(forProperty("fitting"), inits.get("fitting")) : null;
    }

}

