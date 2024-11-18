package com.clofit.config;

import org.springframework.stereotype.Component;
import org.springframework.web.servlet.mvc.method.annotation.SseEmitter;

import java.io.IOException;
import java.util.Map;
import java.util.concurrent.ConcurrentHashMap;

@Component
public class SseEmitterManager {

    private final Map<Long, SseEmitter> emitters = new ConcurrentHashMap<>();

    public SseEmitter createEmitter(Long memberId) {
        SseEmitter emitter = new SseEmitter(Long.MAX_VALUE);
        emitters.put(memberId, emitter);

        emitter.onCompletion(() -> emitters.remove(memberId));
        emitter.onTimeout(() -> emitters.remove(memberId));

        return emitter;
    }

    public void sendEvent(Long memberId, Object data) throws IOException {
        SseEmitter emitter = emitters.get(memberId);
        if (emitter != null) {
            emitter.send(SseEmitter.event().name("fittingComplete").data(data));
        } else {
            throw new IllegalStateException("No SSE connection for memberId: " + memberId);
        }
    }
}
