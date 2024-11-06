'use client';

import { useRouter } from 'next/navigation';
import { useState } from 'react';
import ButtonRectangular from '@/components/ButtonRectangular';
import axiosInstance from '@/api/axiosInstance';

export default function BottomSelection() {
  const [selectedItemIndex, setSelectedItemIndex] = useState<number | null>(
    null
  );
  const router = useRouter();

  const handleItemClick = (index: number) => {
    setSelectedItemIndex(index);
  };

  const handleCompleteClick = async () => {
    if (selectedItemIndex === null) return;

    // AWS S3 이미지 URL
    const modelUrl = 'https://clofit.s3.ap-southeast-2.amazonaws.com/10.jpg';
    const clothUrl = `https://clofit.s3.ap-southeast-2.amazonaws.com/${selectedItemIndex + 1}.jpg`;

    // API 요청 및 에러 핸들링
    await axiosInstance
      .post('/api/fitting', {
        modelName: modelUrl,
        clothName: clothUrl,
      })
      .then((response) => {
        console.log('피팅 데이터 전송 성공:', response.data);
        router.push('/fitting/complete');
      })
      .catch((error) => {
        console.error('피팅 데이터 전송 중 에러:', error.message || error);
      });
  };

  return (
    <div className='flex flex-col items-center p-4'>
      <h2 className='text-lg font-semibold mb-2'>
        입어보고 싶은 하의를 선택해 주세요.
      </h2>

      {/* 진행 바 */}
      <div className='w-full bg-gray-300 h-1 mb-4'>
        <div className='bg-blue-500 h-1' style={{ width: '100%' }}></div>
      </div>

      <div className='grid grid-cols-3 gap-2 mb-4'>
        {Array.from({ length: 9 }).map((_, index) => (
          <div
            key={index}
            onClick={() => handleItemClick(index)}
            className={`w-24 h-24 flex items-center justify-center rounded cursor-pointer ${
              selectedItemIndex === index
                ? 'bg-blue-300 border border-blue-600'
                : 'bg-gray-200'
            }`}
          >
            <span>하의 {index + 1}</span>
          </div>
        ))}
      </div>

      <ButtonRectangular
        text='완료'
        onClick={handleCompleteClick}
        disabled={selectedItemIndex === null} // 선택되지 않았을 때 비활성화
      />
    </div>
  );
}
