package com.clofit.api.color.response;

import com.clofit.api.color.entity.Color;
import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.RequiredArgsConstructor;
import lombok.Setter;

import java.util.List;

@Getter
@Setter
@RequiredArgsConstructor
@AllArgsConstructor
public class ColorResponse {
    List<Color> colors;
}
