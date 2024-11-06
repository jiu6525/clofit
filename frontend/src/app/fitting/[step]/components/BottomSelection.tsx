import { useRouter } from 'next/navigation';
import { useState } from 'react';
import ButtonRectangular from '@/components/ButtonRectangular';

export default function BottomSelection() {
  const [selectedItemIndex, setSelectedItemIndex] = useState<number | null>(
    null
  );

  const handleItemClick = (index: number) => {
    setSelectedItemIndex(index);
  };

  const handleCompleteClick = async () => {
    if (selectedItemIndex !== null) {
      try {
        // API 요청 예시 코드
        // const response = await fetch('/api/fitting', {
        //   method: 'POST',
        //   headers: {
        //     'Content-Type': 'application/json',
        //   },
        //   body: JSON.stringify({
        //     selectedBottom: selectedItemIndex,
        //   }),
        // });

        // if (!response.ok) {
        //   throw new Error('피팅 데이터 전송에 실패했습니다.');
        // }

        // 요청이 성공한 후 추가 작업 수행
        console.log('피팅 데이터가 성공적으로 전송되었습니다.');
      } catch (error) {
        console.error('에러:', error);
      }
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
        text='완료'
        onClick={handleCompleteClick}
        disabled={selectedItemIndex === null}
      />
    </div>
  );
}
