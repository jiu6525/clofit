import { useRouter } from 'next/navigation';
import { useState } from 'react';
import ButtonRectangular from '@/components/ButtonRectangular';

export default function TopSelection() {
  const router = useRouter();
  const [selectedItemIndex, setSelectedItemIndex] = useState<number | null>(
    null
  );

  const handleItemClick = (index: number) => {
    setSelectedItemIndex(index);
  };

  const handleNextClick = () => {
    router.push('/fitting/bottom');
  };

  return (
    <div className='flex flex-col items-center p-4'>
      <h2 className='text-lg font-semibold mb-2'>
        입어보고 싶은 상의를 선택해 주세요.
      </h2>

      {/* 진행 바 */}
      <div className='w-full bg-gray-300 h-1 mb-4'>
        <div className='bg-blue-500 h-1' style={{ width: '66%' }}></div>
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
            <span>상의 {index + 1}</span>
          </div>
        ))}
      </div>

      <ButtonRectangular
        text='다음'
        onClick={handleNextClick}
        disabled={selectedItemIndex === null}
      />
    </div>
  );
}
