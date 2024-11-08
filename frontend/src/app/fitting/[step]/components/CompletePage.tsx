'use client';

import { useRouter, useSearchParams } from 'next/navigation';
import { useEffect, useState } from 'react';
import axiosInstance from '@/api/axiosInstance';
import ButtonRectangular from '@/components/ButtonRectangular';

export default function CompletePage() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const imageUrl = searchParams.get('imageUrl'); // URL 파라미터에서 이미지 URL 추출
  const [isImageLoaded, setIsImageLoaded] = useState(false);

  useEffect(() => {
    if (imageUrl) {
      const img = new Image();
      img.src = imageUrl;
      img.onload = () => setIsImageLoaded(true);
    }
  }, [imageUrl]);

  const handleSave = async () => {
    try {
      if (!imageUrl) return;

      console.log('이미지 저장 요청 시작'); // 요청 시작 표시

      // 이미지를 blob으로 변환
      const response = await fetch(imageUrl);
      const blob = await response.blob();

      // FormData를 생성하고 이미지와 member_id 추가
      const formData = new FormData();
      formData.append('fittingImg', blob, 'fitting_result.jpg');
      formData.append('member_id', '1'); // 실제 member_id로 변경

      // API 요청
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
        console.log('이미지 저장 성공'); // 요청 성공 표시
        router.push('/fitting');
      } else {
        console.log('이미지 저장 응답 상태 코드:', saveResponse.status); // 응답 상태 코드 표시
      }
    } catch (error) {
      console.error('이미지 저장 중 에러 발생:', error); // 요청 실패 표시
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
          src={imageUrl || ''}
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
