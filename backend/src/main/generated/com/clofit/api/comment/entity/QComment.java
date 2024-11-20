package com.clofit.api.comment.entity;

import static com.querydsl.core.types.PathMetadataFactory.*;

import com.querydsl.core.types.dsl.*;

import com.querydsl.core.types.PathMetadata;
import javax.annotation.processing.Generated;
import com.querydsl.core.types.Path;
import com.querydsl.core.types.dsl.PathInits;


/**
 * QComment is a Querydsl query type for Comment
 */
@Generated("com.querydsl.codegen.DefaultEntitySerializer")
public class QComment extends EntityPathBase<Comment> {

    private static final long serialVersionUID = 1166280301L;

    private static final PathInits INITS = PathInits.DIRECT2;

    public static final QComment comment = new QComment("comment");

    public final StringPath content = createString("content");

    public final ComparablePath<Character> delCommentYn = createComparable("delCommentYn", Character.class);

    public final com.clofit.api.fitting.entity.QFitting fitting;

    public final NumberPath<Long> id = createNumber("id", Long.class);

    public final com.clofit.api.member.entity.QMember member;

    public final StringPath regCommentDttm = createString("regCommentDttm");

    public QComment(String variable) {
        this(Comment.class, forVariable(variable), INITS);
    }

    public QComment(Path<? extends Comment> path) {
        this(path.getType(), path.getMetadata(), PathInits.getFor(path.getMetadata(), INITS));
    }

    public QComment(PathMetadata metadata) {
        this(metadata, PathInits.getFor(metadata, INITS));
    }

    public QComment(PathMetadata metadata, PathInits inits) {
        this(Comment.class, metadata, inits);
    }

    public QComment(Class<? extends Comment> type, PathMetadata metadata, PathInits inits) {
        super(type, metadata, inits);
        this.fitting = inits.isInitialized("fitting") ? new com.clofit.api.fitting.entity.QFitting(forProperty("fitting"), inits.get("fitting")) : null;
        this.member = inits.isInitialized("member") ? new com.clofit.api.member.entity.QMember(forProperty("member")) : null;
    }

}

