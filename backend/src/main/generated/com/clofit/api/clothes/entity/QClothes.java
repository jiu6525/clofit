package com.clofit.api.clothes.entity;

import static com.querydsl.core.types.PathMetadataFactory.*;

import com.querydsl.core.types.dsl.*;

import com.querydsl.core.types.PathMetadata;
import javax.annotation.processing.Generated;
import com.querydsl.core.types.Path;
import com.querydsl.core.types.dsl.PathInits;


/**
 * QClothes is a Querydsl query type for Clothes
 */
@Generated("com.querydsl.codegen.DefaultEntitySerializer")
public class QClothes extends EntityPathBase<Clothes> {

    private static final long serialVersionUID = 533813069L;

    private static final PathInits INITS = PathInits.DIRECT2;

    public static final QClothes clothes = new QClothes("clothes");

    public final StringPath category = createString("category");

    public final ListPath<com.clofit.api.closet.entity.Closet, com.clofit.api.closet.entity.QCloset> closet = this.<com.clofit.api.closet.entity.Closet, com.clofit.api.closet.entity.QCloset>createList("closet", com.clofit.api.closet.entity.Closet.class, com.clofit.api.closet.entity.QCloset.class, PathInits.DIRECT2);

    public final com.clofit.api.color.entity.QColor color;

    public final ComparablePath<Character> delClothesYn = createComparable("delClothesYn", Character.class);

    public final NumberPath<Long> id = createNumber("id", Long.class);

    public final StringPath imgPath = createString("imgPath");

    public final StringPath item = createString("item");

    public final StringPath itemUrl = createString("itemUrl");

    public final StringPath maskedPath = createString("maskedPath");

    public final ComparablePath<Character> myClothesYn = createComparable("myClothesYn", Character.class);

    public final NumberPath<Integer> price = createNumber("price", Integer.class);

    public final StringPath season = createString("season");

    public final StringPath style = createString("style");

    public final StringPath textile = createString("textile");

    public QClothes(String variable) {
        this(Clothes.class, forVariable(variable), INITS);
    }

    public QClothes(Path<? extends Clothes> path) {
        this(path.getType(), path.getMetadata(), PathInits.getFor(path.getMetadata(), INITS));
    }

    public QClothes(PathMetadata metadata) {
        this(metadata, PathInits.getFor(metadata, INITS));
    }

    public QClothes(PathMetadata metadata, PathInits inits) {
        this(Clothes.class, metadata, inits);
    }

    public QClothes(Class<? extends Clothes> type, PathMetadata metadata, PathInits inits) {
        super(type, metadata, inits);
        this.color = inits.isInitialized("color") ? new com.clofit.api.color.entity.QColor(forProperty("color")) : null;
    }

}

