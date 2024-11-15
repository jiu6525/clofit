package com.clofit.api.feed.dto;

import com.clofit.api.fitting.entity.Fitting;
import lombok.*;

@Getter
@Setter
@AllArgsConstructor
@NoArgsConstructor
public class FittingFeed extends Feed {
    private Fitting fitting;
}
