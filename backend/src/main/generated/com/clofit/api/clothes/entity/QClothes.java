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

    public final com.clofit.api.brand.entity.QBrand brand;

    public final StringPath category = createString("category");

    public final ComparablePath<Character> delClothesYn = createComparable("delClothesYn", Character.class);

    public final NumberPath<Long> id = createNumber("id", Long.class);

    public final StringPath imgPath = createString("imgPath");

    public final StringPath item = createString("item");

    public final StringPath itemUrl = createString("itemUrl");

    public final StringPath mainColor = createString("mainColor");

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
        this.brand = inits.isInitialized("brand") ? new com.clofit.api.brand.entity.QBrand(forProperty("brand")) : null;
    }

}

