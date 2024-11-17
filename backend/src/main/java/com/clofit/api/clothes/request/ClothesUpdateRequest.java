package com.clofit.api.clothes.request;

import lombok.Getter;
import lombok.Setter;

@Getter
@Setter
public class ClothesUpdateRequest {
    String category;
    String style;
    Long colorId;
}
