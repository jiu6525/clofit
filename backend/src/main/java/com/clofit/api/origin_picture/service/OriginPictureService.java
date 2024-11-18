package com.clofit.api.origin_picture.service;

import com.clofit.api.member.service.MemberService;
import com.clofit.api.origin_picture.entity.OriginPicture;
import com.clofit.api.origin_picture.repository.OriginPictureRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;
import org.springframework.web.multipart.MultipartFile;

import java.io.IOException;
import java.time.LocalDateTime;
import java.util.ArrayList;
import java.util.List;

@Service
@RequiredArgsConstructor
public class OriginPictureService {

    private final OriginPictureRepository originPictureRepository;
    private final OriginFileService fileService;
    private final MemberService memberService;

    public List<String> uploadOriginPictures(Long memberId, List<MultipartFile> files) throws IOException {
        // 최대 10개 초과 여부 검사
        int existingCount = originPictureRepository.countByMemberIdAndDelPicYn(memberId, 'N');
        if (existingCount + files.size() > 10) {
            throw new IllegalStateException("최대 10개의 이미지만 등록할 수 있습니다.");
        }

        List<String> fileUrls = new ArrayList<>();
        for (MultipartFile file : files) {
            // 파일 업로드 및 DB 저장 로직
            // 함수 호출
            String fileUrl = fileService.uploadFile(memberId,file);
            OriginPicture originPicture = new OriginPicture();
            originPicture.setMember(memberService.findMemberById(memberId));
            originPicture.setFilePath(fileUrl);
            originPicture.setFileName(file.getOriginalFilename());
            originPicture.setRegPicDttm(LocalDateTime.now());
            originPicture.setDelPicYn('N');
            originPictureRepository.save(originPicture);

            fileUrls.add(fileUrl);
        }
        return fileUrls;
    }

    // 삭제
    public boolean deleteOriginPictures(Long memberId, List<Long> originPictureIds) {
        // 전달받은 ID 목록이 유효한지 확인
        if (originPictureIds == null || originPictureIds.isEmpty()) {
            throw new IllegalArgumentException("삭제할 이미지 ID 목록이 비어 있습니다.");
        }
        // 특정 멤버의 delPicYn = 'N' 상태인 OriginPicture 가져오기
        List<OriginPicture> originPictures = originPictureRepository.findAllByMemberIdAndDelPicYn(memberId, 'N');

        // 전달받은 ID 목록에 해당하는 originPictures를 필터링
        List<OriginPicture> memberOwnedPicturesToDelete = new ArrayList<>();
        for (OriginPicture originPicture : originPictures) {
            if (originPictureIds.contains(originPicture.getId())) {
                memberOwnedPicturesToDelete.add(originPicture);
            }
        }

        // 필터링된 이미지가 없는 경우 false 반환
        if (memberOwnedPicturesToDelete.isEmpty()) {
            return false;
        }
        // 각 이미지의 상태를 변경
        for (OriginPicture originPicture : memberOwnedPicturesToDelete) {
            originPicture.setDelPicYn('Y');
            originPicture.setRegPicDttm(LocalDateTime.now());
        }
        originPictureRepository.saveAll(memberOwnedPicturesToDelete); // 일괄 저장
        return true;
    }

    // 저장된 원본 사진 가져오기
    public List<OriginPicture> getBaseOriginPictures(Long memberId) {

        List<OriginPicture> originPictures = originPictureRepository.findAllByMemberIdAndDelPicYn(memberId, 'N');
        // 유효성 검사: memberId와 매핑된 데이터만 처리 - 애초에 가져온 다음에 처리하기
        if (originPictures.isEmpty()) {
            throw new IllegalStateException("로그인 유저와 관련된 데이터가 없음");
        }

        return originPictureRepository.findAllByMemberIdAndDelPicYn(memberId, 'N');
    }
}
