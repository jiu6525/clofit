'use client';

import { useRouter } from 'next/navigation';
import { IoShirtOutline, IoBodyOutline, IoBagOutline } from 'react-icons/io5';
import { useState } from 'react';
import ButtonRectangular from '@/components/ButtonRectangular';

// 합성 방식 타입
type FittingType = 'top' | 'bottom' | 'fullbody';

// 합성 방식 옵션
const fittingOptions: {
  type: FittingType;
  label: string;
  Icon: React.ComponentType<{ size: number; className?: string }>;
}[] = [
  { type: 'top', label: '상의 합성', Icon: IoShirtOutline },
  { type: 'bottom', label: '하의 합성', Icon: IoBagOutline },
  { type: 'fullbody', label: '전신 합성', Icon: IoBodyOutline },
];

export default function SelectFittingType() {
  const router = useRouter();
  const [selectedType, setSelectedType] = useState<FittingType | null>(null);

  // 합성 방식 선택 핸들러
  const handleFittingTypeSelection = (type: FittingType) => {
    setSelectedType(type);

    // 선택 즉시 전신 사진 선택 페이지로 이동
    router.push(`/fitting/add/fullbody?type=${type}`);
  };

  return (
    <div className='relative flex flex-col items-center w-full min-h-screen bg-white'>
      <div className='relative flex flex-col items-center w-full max-w-[600px] p-4'>
        {/* 헤더 */}
        <header className='w-full py-4 px-6 text-left'>
          <h1 className='text-2xl font-semibold'>합성 방식 선택</h1>
        </header>

        {/* 옵션 버튼 */}
        <div className='grid grid-cols-1 gap-4 w-full mt-6'>
          {fittingOptions.map(({ type, label, Icon }) => (
            <button
              key={type}
              className={`group flex items-center justify-start gap-4 p-4 border rounded-lg ${
                selectedType === type
                  ? 'border-blue-500 bg-blue-100'
                  : 'border-gray-300 hover:bg-gray-100'
              }`}
              onClick={() => handleFittingTypeSelection(type)}
              aria-label={`${label} 선택`}
            >
              <Icon
                size={36}
                className={`text-gray-600 ${
                  selectedType === type
                    ? 'text-blue-500'
                    : 'group-hover:text-blue-500'
                }`}
              />
              <span
                className={`text-lg font-medium ${
                  selectedType === type ? 'text-blue-500' : 'text-gray-700'
                }`}
              >
                {label}
              </span>
            </button>
          ))}
        </div>
      </div>
    </div>
  );
}
