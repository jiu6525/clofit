'use client';

import { useRouter } from 'next/navigation';
import { useState } from 'react';
import ButtonRectangular from '@/components/ButtonRectangular';
import axiosInstance from '@/api/axiosInstance';

export default function BottomSelection() {
  const [selectedItemIndex, setSelectedItemIndex] = useState<number | null>(
    null
  );
  const [isRequestPending, setIsRequestPending] = useState(false); // 요청 상태
  const router = useRouter();

  const handleItemClick = (index: number) => {
    setSelectedItemIndex(index);
  };

  const handleCompleteClick = async () => {
    if (selectedItemIndex === null || isRequestPending) return;

    setIsRequestPending(true); // 요청 중으로 상태 설정
    console.log('fitting API 요청 전송'); // 요청 전송 상태 표시

    try {
      const response = await axiosInstance.post<Blob>(
        '/fitting',
        {
          modelName: '10.jpg',
          clothName: '1.jpg',
        },
        { responseType: 'blob' }
      );

      console.log('API 요청 완료');
      const imageUrl = URL.createObjectURL(new Blob([response.data]));
      router.push(`/fitting/complete?imageUrl=${encodeURIComponent(imageUrl)}`);
    } catch (error) {
      console.error(
        '피팅 데이터 전송 중 에러:',
        (error as any).message || error
      );
    } finally {
      setIsRequestPending(false); // 요청 완료 후 버튼 활성화
    }
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
        text={isRequestPending ? '합성 중...' : '완료'}
        onClick={handleCompleteClick}
        disabled={selectedItemIndex === null || isRequestPending}
      />
    </div>
  );
}
