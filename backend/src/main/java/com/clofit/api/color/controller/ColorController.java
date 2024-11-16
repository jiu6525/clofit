package com.clofit.api.color.controller;

import com.clofit.api.color.response.ColorResponse;
import com.clofit.api.color.service.ColorService;
import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

@RestController
@RequestMapping("/color")
@RequiredArgsConstructor
public class ColorController {

    private final ColorService colorService;

    @GetMapping
    public ResponseEntity<ColorResponse> getColor() {
        return ResponseEntity.ok(new ColorResponse(colorService.getColors()));
    }

}
