//package com.clofit.api.mongoDB.service;
//
//import com.clofit.api.closet.entity.Closet;
//import lombok.RequiredArgsConstructor;
//import org.springframework.data.mongodb.core.mapping.event.AbstractMongoEventListener;
//import org.springframework.data.mongodb.core.mapping.event.BeforeConvertEvent;
//import org.springframework.stereotype.Component;
//
//import java.util.Optional;
//
//@Component
//@RequiredArgsConstructor
//public class ClosetListener extends AbstractMongoEventListener<Closet>  {
//
//    private final SequenceGeneratorService sequenceGeneratorService;
//
//    @Override
//    public void onBeforeConvert(BeforeConvertEvent<Closet> event) {
//        Closet closet = event.getSource();
//        if (shouldGenerateNewId(closet)) {
//            closet.setClosetId(generateNewId());
//        }
//    }
//
//    private boolean shouldGenerateNewId(Closet closet) {
//        return Optional.ofNullable(closet.getClosetId()).orElse(0L) < 1;
//    }
//
//    private Long generateNewId() {
//        return sequenceGeneratorService.generateSequence(Closet.SEQUENCE_NAME);
//    }
//}
//
