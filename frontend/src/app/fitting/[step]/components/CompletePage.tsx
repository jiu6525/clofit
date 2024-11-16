'use client';

import { useRouter } from 'next/navigation';
import { useEffect, useState } from 'react';
import axiosInstance from '@/api/axiosInstance';
import useSelectionStore from '@/stores/useSelectionStore'; // 전역 상태로부터 이미지 URL 가져오기
import ButtonRectangular from '@/components/ButtonRectangular';

export default function CompletePage() {
  const router = useRouter();
  const [isImageLoaded, setIsImageLoaded] = useState(false);
  const [blobUrl, setBlobUrl] = useState<string | null>(null);

  // 전역 상태에서 선택된 이미지 URL을 가져옵니다.
  const selectedFullBodyImage = useSelectionStore(
    (state) => state.selectedFullBodyImage
  );

  useEffect(() => {
    if (selectedFullBodyImage) {
      // Blob URL로 이미지 미리보기 생성
      const fetchImageBlob = async () => {
        try {
          const response = await fetch(selectedFullBodyImage);
          const blob = await response.blob();
          const url = URL.createObjectURL(blob);
          setBlobUrl(url);
          setIsImageLoaded(true);
        } catch (error) {
          console.error('이미지 로드 중 에러 발생:', error);
        }
      };

      fetchImageBlob();

      // 페이지 언마운트 시 메모리 해제
      return () => {
        if (blobUrl) URL.revokeObjectURL(blobUrl);
      };
    }
  }, [selectedFullBodyImage, blobUrl]);

  const handleSave = async () => {
    try {
      if (!blobUrl) return;

      console.log('이미지 저장 요청 시작');

      const response = await fetch(blobUrl);
      const blob = await response.blob();

      const formData = new FormData();
      formData.append('fittingImg', blob, 'fitting_result.jpg');
      formData.append('member_id', '1'); // 실제 member_id로 변경

      const saveResponse = await axiosInstance.post(
        '/fitting/store',
        formData,
        {
          headers: {
            'Content-Type': 'multipart/form-data',
          },
        }
      );

      if (saveResponse.status === 200) {
        console.log('이미지 저장 성공');
        router.push('/fitting');
      } else {
        console.log('이미지 저장 응답 상태 코드:', saveResponse.status);
      }
    } catch (error) {
      console.error('이미지 저장 중 에러 발생:', error);
    }
  };

  const handleCancel = () => {
    console.log('취소');
    router.push('/fitting');
  };

  return (
    <div className='flex flex-col items-center p-4'>
      <h2 className='text-lg font-semibold mb-4'>완성된 피팅 사진</h2>
      {isImageLoaded ? (
        <img
          src={blobUrl || ''}
          alt='합성된 이미지'
          className='w-full max-w-md mb-4 rounded-lg'
        />
      ) : (
        <div>이미지 로딩 중...</div>
      )}
      <div className='flex gap-4 mt-4'>
        <ButtonRectangular
          text='저장'
          onClick={handleSave}
          disabled={!isImageLoaded}
        />
        <ButtonRectangular text='취소' onClick={handleCancel} />
      </div>
    </div>
  );
}
