// FittingPage.tsx
'use client';

import { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import axiosInstance from '@/api/axiosInstance';
import FittingThumbnails from './components/FittingThumbnails';
import FittingStart from './components/FittingStart';
import FloatingButton from '@/components/FloatingButton';

export default function FittingPage() {
  const [images, setImages] = useState<string[]>([]);
  const [hasFittingData, setHasFittingData] = useState(false);
  const router = useRouter();

  useEffect(() => {
    fetchFittingData();
  }, []);

  // API 요청 함수
  async function fetchFittingData() {
    type FittingImageResponse = {
      imgUrl: string;
    };

    try {
      const response = await axiosInstance.post<FittingImageResponse[]>(
        '/fitting/search',
        {
          member_id: 1, // 실제 회원 ID로 변경 필요
        }
      );

      const imgUrls = response.data.map((item) => item.imgUrl); // 이미지 URL만 추출

      setImages(imgUrls);
      setHasFittingData(imgUrls.length > 0); // 이미지 데이터가 있으면 true로 설정
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
          <FittingThumbnails images={images} /> // 데이터를 FittingThumbnails에 전달
        ) : (
          <FittingStart onStartFitting={handleStartFitting} />
        )}

        {/* Floating Button */}
        <FloatingButton onClick={handleStartFitting} />
      </div>
    </div>
  );
}
