'use client';

import React from 'react';
import Image from 'next/image';
import Navbar from '@/components/Navbar'; // 하단 네비게이션 바 컴포넌트 임포트

export default function MainPage() {
  const placeholderImage = '/snap1.webp'; // 옷 사진 경로

  return (
    <div className='w-full min-h-screen bg-white flex flex-col items-center'>
      {/* Header */}
      <header className='w-full py-4 px-2 text-left'>
        <Image src='/logo.svg' alt='Clofit Logo' width={80} height={30} />
      </header>

      {/* Registration Banner */}
      <div className='w-full max-w-[480px] bg-[#464646] text-white py-2 p-4 flex items-center justify-between rounded-md my-4'>
        <div>
          <p className='text-sm'>나만의 디지털 옷장을 만들고 싶다면</p>
          <p className='text-base font-semibold mt-1'>
            간편하게 내 아이템 등록하기
          </p>
        </div>
        <div>
          <Image src='/closet.svg' alt='Closet Icon' width={60} height={60} />
        </div>
      </div>

      {/* Recommended Items Section */}
      <section className='w-full max-w-[480px] px-4'>
        <h2 className='text-base font-medium mb-4'>
          강현후님을 위한 아이템 추천
        </h2>
        <div className='grid grid-cols-3 gap-0'>
          {/* 첫 번째 3장의 사진 */}
          {Array.from({ length: 3 }).map((_, index) => (
            <div key={index} className='relative w-full aspect-[3/4]'>
              <Image
                src={placeholderImage}
                alt={`추천 아이템 ${index + 1}`}
                layout='fill'
                objectFit='cover'
              />
              <p className='text-center text-sm mt-2'>무신사 스탠다드</p>
            </div>
          ))}
        </div>

        <h2 className='text-base font-medium my-4'>
          강현후님이 좋아요 한 코디
        </h2>

        <div className='grid grid-cols-3 gap-0'>
          {Array.from({ length: 3 }).map((_, index) => (
            <div key={index} className='relative w-full aspect-[3/4]'>
              <Image
                src={placeholderImage}
                alt={`좋아요한 코디 ${index + 1}`}
                layout='fill'
                objectFit='cover'
              />
              <p className='text-center text-sm mt-2'>무신사 스탠다드</p>
            </div>
          ))}
        </div>
      </section>

      {/* Fitting Recommendation Banner */}
      <div className='w-full max-w-[480px] bg-[#E6F0FF] text-center p-4 rounded mt-6 mb-16'>
        <p className='text-lg font-semibold text-[#373A3F]'>
          나와 어울리는 아이템은?
        </p>
        <p className='text-blue-600 font-semibold'>가상피팅 하러가기</p>
      </div>

      {/* Bottom Navigation */}
      <Navbar />
    </div>
  );
}
