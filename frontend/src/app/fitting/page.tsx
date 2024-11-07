// FittingPage.tsx
'use client';

import { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import FittingThumbnails from './components/FittingThumbnails';
import FittingStart from './components/FittingStart';
import FloatingButton from '@/components/FloatingButton';

export default function FittingPage() {
  const [hasFittingData, setHasFittingData] = useState(false);
  const router = useRouter();

  useEffect(() => {
    fetchFittingData();
  }, []);

  async function fetchFittingData() {
    try {
      setHasFittingData(true); // 임시 데이터 설정
    } catch (error) {
      console.error('피팅 데이터 로딩 중 에러 발생:', error);
    }
  }

  const handleStartFitting = () => {
    router.push('/fitting/fullbody');
  };

  return (
    <div className='relative flex flex-col items-center w-full min-h-screen bg-white'>
      {/* Main Content */}
      <div className='relative flex flex-col items-center w-full max-w-[600px] p-4'>
        <header className='w-full py-4 px-6 text-left'>
          <h1 className='text-2xl font-semibold'>피팅</h1>
        </header>
        {hasFittingData ? (
          <FittingThumbnails />
        ) : (
          <FittingStart onStartFitting={handleStartFitting} />
        )}

        {/* Floating Button */}
        <FloatingButton onClick={handleStartFitting} />
      </div>
    </div>
  );
}
