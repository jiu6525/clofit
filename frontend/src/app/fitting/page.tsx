'use client';

import { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import FittingThumbnails from './components/FittingThumbnails';
import FittingStart from './components/FittingStart';

export default function FittingPage() {
  const [hasFittingData, setHasFittingData] = useState(false);
  const router = useRouter();

  useEffect(() => {
    fetchFittingData();
  }, []);

  // 피팅 데이터 조회 함수 (API는 추후 추가 예정)
  async function fetchFittingData() {
    try {
      // 예시 API 호출 코드 (추후 실제 API 엔드포인트로 대체 예정)
      // const response = await fetch('/api/fitting-data');
      // const data = await response.json();
      // setHasFittingData(data.length > 0); // 데이터가 있을 경우 true, 없을 경우 false로 설정

      // 임시로 피팅 데이터가 있다고 설정
      setHasFittingData(true);
    } catch (error) {
      console.error('피팅 데이터 로딩 중 에러 발생:', error);
    }
  }

  const handleStartFitting = () => {
    router.push('/fitting/fullbody'); // fullbody 선택 페이지로 이동
  };

  return (
    <div className='flex flex-col items-center w-full min-h-screen bg-white'>
      {/* Header */}
      <header className='w-full py-4 px-6 text-left'>
        <h1 className='text-2xl font-semibold'>피팅</h1>
      </header>

      {/* Main Content */}
      <div className='flex flex-col items-center w-full max-w-[1024px] p-4'>
        {hasFittingData ? (
          <FittingThumbnails />
        ) : (
          <FittingStart onStartFitting={handleStartFitting} />
        )}
      </div>

      {/* Floating Action Button */}
      <div
        className='fixed bottom-28 right-8 bg-black text-white rounded-full shadow-lg cursor-pointer flex items-center justify-center w-12 h-12' // w-12와 h-12로 가로와 세로를 같게 설정
        onClick={handleStartFitting}
      >
        <span className='text-2xl'>+</span>
      </div>
    </div>
  );
}
