package com.clofit.api.fitting.entity;

import static com.querydsl.core.types.PathMetadataFactory.*;

import com.querydsl.core.types.dsl.*;

import com.querydsl.core.types.PathMetadata;
import javax.annotation.processing.Generated;
import com.querydsl.core.types.Path;
import com.querydsl.core.types.dsl.PathInits;


/**
 * QFitting is a Querydsl query type for Fitting
 */
@Generated("com.querydsl.codegen.DefaultEntitySerializer")
public class QFitting extends EntityPathBase<Fitting> {

    private static final long serialVersionUID = -1253064083L;

    private static final PathInits INITS = PathInits.DIRECT2;

    public static final QFitting fitting = new QFitting("fitting");

    public final com.clofit.api.clothes.entity.QClothes clothes;

    public final ComparablePath<Character> favoriteYn = createComparable("favoriteYn", Character.class);

    public final StringPath fittingName = createString("fittingName");

    public final NumberPath<Long> id = createNumber("id", Long.class);

    public final StringPath imgPath = createString("imgPath");

    public final com.clofit.api.member.entity.QMember member;

    public final ComparablePath<Character> publicYn = createComparable("publicYn", Character.class);

    public final StringPath regFittingDttm = createString("regFittingDttm");

    public QFitting(String variable) {
        this(Fitting.class, forVariable(variable), INITS);
    }

    public QFitting(Path<? extends Fitting> path) {
        this(path.getType(), path.getMetadata(), PathInits.getFor(path.getMetadata(), INITS));
    }

    public QFitting(PathMetadata metadata) {
        this(metadata, PathInits.getFor(metadata, INITS));
    }

    public QFitting(PathMetadata metadata, PathInits inits) {
        this(Fitting.class, metadata, inits);
    }

    public QFitting(Class<? extends Fitting> type, PathMetadata metadata, PathInits inits) {
        super(type, metadata, inits);
        this.clothes = inits.isInitialized("clothes") ? new com.clofit.api.clothes.entity.QClothes(forProperty("clothes"), inits.get("clothes")) : null;
        this.member = inits.isInitialized("member") ? new com.clofit.api.member.entity.QMember(forProperty("member"), inits.get("member")) : null;
    }

}

