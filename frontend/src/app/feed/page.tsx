'use client';

import React, { useState } from 'react';
import Navbar from '@/components/Navbar'; // Navbar 컴포넌트를 임포트
import Image from 'next/image';

export default function FeedPage() {
  const placeholderImage = '/snap1.webp'; // 임시 이미지 경로
  const [activeTab, setActiveTab] = useState('전체'); // 현재 선택된 탭 상태

  // 탭 변경 함수
  const handleTabClick = (tab: string) => {
    setActiveTab(tab);
  };

  return (
    <div className='flex flex-col items-center w-full min-h-screen bg-white'>
      {/* Header */}
      <header className='w-full py-4 px-6 text-left'>
        <h1 className='text-2xl font-semibold'>탐색</h1>
      </header>

      {/* Tabs */}
      <div className='w-full flex justify-around text-base font-medium my-2'>
        {['전체', '상품', '코디'].map((tab) => (
          <span
            key={tab}
            onClick={() => handleTabClick(tab)}
            className={`pb-1 border-b-2 ${
              activeTab === tab
                ? 'text-[#373A3F] border-black'
                : 'text-[#9095A1] border-transparent'
            } cursor-pointer`}
          >
            {tab}
          </span>
        ))}
      </div>

      {/* Image Grid */}
      <div className='grid grid-cols-3 gap-0  w-full max-w-[1024px] mx-auto'>
        {Array.from({ length: 18 }).map((_, index) => (
          <div key={index} className='w-full aspect-square relative'>
            <Image
              src={placeholderImage}
              alt={`placeholder ${index}`}
              layout='fill'
              objectFit='cover'
              className='w-full h-full'
            />
          </div>
        ))}
      </div>

      {/* Bottom Navigation */}
      <Navbar />
    </div>
  );
}
