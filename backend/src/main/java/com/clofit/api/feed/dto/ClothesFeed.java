package com.clofit.api.feed.dto;

import com.clofit.api.clothes.entity.Clothes;
import lombok.*;

@Getter
@Setter
@AllArgsConstructor
@NoArgsConstructor
public class ClothesFeed extends Feed {
    private Clothes clothes;
}
