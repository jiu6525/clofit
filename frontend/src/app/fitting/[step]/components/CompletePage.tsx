'use client';

import { useRouter, useSearchParams } from 'next/navigation';
import { useEffect, useState } from 'react';
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

  const handleSave = () => {
    console.log('이미지 저장');
    router.push('/fitting');
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
