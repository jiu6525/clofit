package com.clofit.api.origin_picture.request;
import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import java.util.List;

@Getter
@NoArgsConstructor
@AllArgsConstructor
public class DeleteOriginPictureReqeust {
    private Long memberId;
    private List<Long> pictureIds;

}
