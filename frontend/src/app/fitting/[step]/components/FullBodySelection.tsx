import { useRouter } from 'next/navigation';
import { useState } from 'react';
import ButtonRectangular from '@/components/ButtonRectangular';

export default function FullBodySelection() {
  const router = useRouter(); // useRouter 훅을 사용하여 router를 초기화합니다.
  const [selectedItemIndex, setSelectedItemIndex] = useState<number | null>(
    null
  );

  // 아이템 클릭 핸들러
  const handleItemClick = (index: number) => {
    setSelectedItemIndex(index);
  };

  const handleNextClick = () => {
    router.push('/fitting/top');
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
            <span>이미지 {index + 1}</span>
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
