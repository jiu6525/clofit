'use client';

import { useState, useEffect } from 'react';

// 피팅 데이터가 없을 때 표시할 컴포넌트
function FittingStart({ onStartFitting }: { onStartFitting: () => void }) {
  return (
    <div className='flex flex-col items-center text-center p-8 bg-white rounded-2xl'>
      <img
        src='/images/fitting-inactive.svg'
        alt='피팅 아이템 없음'
        className='w-20 h-20 mb-5'
      />
      <p className='text-lg mb-5 leading-relaxed'>
        추가한 옷장 아이템으로
        <br />
        가상피팅을 시작해 보세요.
      </p>
      <button onClick={onStartFitting} className='button-common rounded-lg'>
        피팅 하러 가기
      </button>
    </div>
  );
}

// 메인 피팅 페이지 컴포넌트
export default function FittingPage() {
  const [hasFittingData, setHasFittingData] = useState(false);

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
      setHasFittingData(false);
    } catch (error) {
      console.error('피팅 데이터 로딩 중 에러 발생:', error);
    }
  }

  return (
    <div className='flex flex-col items-center w-full min-h-screen bg-white'>
      {/* Header */}
      <header className='w-full py-4 px-6 text-left'>
        <h1 className='text-2xl font-semibold'>피팅</h1>
      </header>

      {/* Main Content */}
      <div className='flex flex-col items-center w-full max-w-[1024px] p-4'>
        {hasFittingData ? (
          <div className='grid grid-cols-2 gap-4'>
            {/* 피팅 데이터 썸네일 예시 - 추후 API 데이터를 맵핑하여 구현 */}
            {Array.from({ length: 6 }).map((_, index) => (
              <div key={index} className='w-full aspect-square'>
                <img
                  src='/path-to-thumbnail-image.jpg'
                  alt={`피팅 데이터 ${index + 1}`}
                  className='w-full h-full object-cover rounded-lg'
                />
              </div>
            ))}
          </div>
        ) : (
          <FittingStart onStartFitting={() => console.log('피팅 시작')} />
        )}
      </div>

      {/* Floating Action Button */}
      <div className='fixed bottom-16 right-8 bg-black text-white rounded-full p-4 shadow-lg'>
        <span className='text-2xl'>+</span>
      </div>
    </div>
  );
}
