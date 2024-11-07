package com.clofit.api.closet.entity;

import static com.querydsl.core.types.PathMetadataFactory.*;

import com.querydsl.core.types.dsl.*;

import com.querydsl.core.types.PathMetadata;
import javax.annotation.processing.Generated;
import com.querydsl.core.types.Path;
import com.querydsl.core.types.dsl.PathInits;


/**
 * QCloset is a Querydsl query type for Closet
 */
@Generated("com.querydsl.codegen.DefaultEntitySerializer")
public class QCloset extends EntityPathBase<Closet> {

    private static final long serialVersionUID = 2061211487L;

    private static final PathInits INITS = PathInits.DIRECT2;

    public static final QCloset closet = new QCloset("closet");

    public final com.clofit.api.clothes.entity.QClothes clothes;

    public final NumberPath<Long> id = createNumber("id", Long.class);

    public final StringPath reg_closet_dttm = createString("reg_closet_dttm");

    public QCloset(String variable) {
        this(Closet.class, forVariable(variable), INITS);
    }

    public QCloset(Path<? extends Closet> path) {
        this(path.getType(), path.getMetadata(), PathInits.getFor(path.getMetadata(), INITS));
    }

    public QCloset(PathMetadata metadata) {
        this(metadata, PathInits.getFor(metadata, INITS));
    }

    public QCloset(PathMetadata metadata, PathInits inits) {
        this(Closet.class, metadata, inits);
    }

    public QCloset(Class<? extends Closet> type, PathMetadata metadata, PathInits inits) {
        super(type, metadata, inits);
        this.clothes = inits.isInitialized("clothes") ? new com.clofit.api.clothes.entity.QClothes(forProperty("clothes"), inits.get("clothes")) : null;
    }

}

