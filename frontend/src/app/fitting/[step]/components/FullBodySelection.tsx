'use client';

import { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import ButtonRectangular from '@/components/ButtonRectangular';
import axiosInstance from '@/api/axiosInstance';
import useSelectionStore from '@/stores/useSelectionStore';

interface FullBodySelectionProps {
  memberId: number;
}

export default function FullBodySelection({
  memberId,
}: FullBodySelectionProps) {
  const router = useRouter();
  const [images, setImages] = useState<string[]>([]);
  const [selectedItemIndex, setSelectedItemIndex] = useState<number | null>(
    null
  );

  // 전역 상태의 setSelectedFullBodyImage 함수를 가져옵니다.
  const setSelectedFullBodyImage = useSelectionStore(
    (state) => state.setSelectedFullBodyImage
  );

  useEffect(() => {
    const fetchModelImages = async () => {
      try {
        const response = await axiosInstance.get<string[]>(
          '/fitting/model-images',
          {
            params: { memberId },
          }
        );

        if (response.data && response.data.length > 0) {
          setImages(response.data); // API 응답으로부터 이미지 목록을 설정
        } else {
          setImages([
            'https://clofit-s3-bucket.s3.ap-southeast-2.amazonaws.com/model/1/772bb921-ddc3-4590-b961-594bd5bbd812.png',
            'https://clofit-s3-bucket.s3.ap-southeast-2.amazonaws.com/model/1/cbe0809e-0e9d-4d90-8b64-3880c76afb02.png',
          ]); // 하드코딩된 기본 이미지 목록 설정
        }
      } catch (error) {
        console.error('전신 사진 로딩 실패:', error);
        setImages([
          'https://clofit-s3-bucket.s3.ap-southeast-2.amazonaws.com/model/1/772bb921-ddc3-4590-b961-594bd5bbd812.png',
          'https://clofit-s3-bucket.s3.ap-southeast-2.amazonaws.com/model/1/cbe0809e-0e9d-4d90-8b64-3880c76afb02.png',
        ]); // API 호출 실패 시 기본 이미지 설정
      }
    };

    fetchModelImages();
  }, [memberId]);

  const handleItemClick = (index: number) => {
    setSelectedItemIndex(index);
    setSelectedFullBodyImage(images[index]); // 선택한 이미지를 전역 상태에 저장
  };

  const handleNextClick = () => {
    router.push('/fitting/top'); // 상의 선택 페이지로 이동
  };

  return (
    <div className='flex flex-col items-center p-4'>
      <h2 className='text-lg font-semibold mb-2'>
        가상피팅을 위한 전신사진을 선택해 주세요.
      </h2>

      {/* 진행 바 */}
      <div className='w-full bg-gray-300 h-1 mb-4'>
        <div className='bg-blue-500 h-1' style={{ width: '33%' }}></div>
      </div>

      {/* 이미지 선택 목록 */}
      <div className='grid grid-cols-3 gap-2 mb-4'>
        {images.map((url, index) => (
          <div
            key={index}
            onClick={() => handleItemClick(index)}
            className={`w-24 h-24 flex items-center justify-center rounded cursor-pointer ${
              selectedItemIndex === index
                ? 'bg-blue-300 border border-blue-600'
                : 'bg-gray-200'
            }`}
          >
            <img
              src={url}
              alt={`이미지 ${index + 1}`}
              className='w-full h-full object-cover rounded'
            />
          </div>
        ))}
      </div>

      {/* 다음 버튼 - 선택된 이미지가 없으면 비활성화 */}
      <ButtonRectangular
        text='다음'
        onClick={handleNextClick}
        disabled={selectedItemIndex === null}
      />
    </div>
  );
}
