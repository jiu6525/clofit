package com.clofit.api.brand.entity;

import static com.querydsl.core.types.PathMetadataFactory.*;

import com.querydsl.core.types.dsl.*;

import com.querydsl.core.types.PathMetadata;
import javax.annotation.processing.Generated;
import com.querydsl.core.types.Path;
import com.querydsl.core.types.dsl.PathInits;


/**
 * QBrand is a Querydsl query type for Brand
 */
@Generated("com.querydsl.codegen.DefaultEntitySerializer")
public class QBrand extends EntityPathBase<Brand> {

    private static final long serialVersionUID = 1433361773L;

    public static final QBrand brand = new QBrand("brand");

    public final StringPath brandImgPath = createString("brandImgPath");

    public final StringPath brandName = createString("brandName");

    public final ListPath<com.clofit.api.clothes.entity.Clothes, com.clofit.api.clothes.entity.QClothes> clothes = this.<com.clofit.api.clothes.entity.Clothes, com.clofit.api.clothes.entity.QClothes>createList("clothes", com.clofit.api.clothes.entity.Clothes.class, com.clofit.api.clothes.entity.QClothes.class, PathInits.DIRECT2);

    public final NumberPath<Long> id = createNumber("id", Long.class);

    public QBrand(String variable) {
        super(Brand.class, forVariable(variable));
    }

    public QBrand(Path<? extends Brand> path) {
        super(path.getType(), path.getMetadata());
    }

    public QBrand(PathMetadata metadata) {
        super(Brand.class, metadata);
    }

}

