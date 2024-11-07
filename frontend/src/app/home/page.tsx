'use client';

import React from 'react';
import Image from 'next/image';
import { useRouter } from 'next/navigation';
import Navbar from '@/components/Navbar';

export default function MainPage() {
  const router = useRouter();
  const placeholderImage = '/snap1.webp';

  return (
    <div className='w-full min-h-screen bg-white flex justify-center'>
      {/* 최상위 컨테이너 설정 */}
      <div className='w-full min-w-[360px] max-w-[600px] p-4 flex flex-col items-center'>
        <header className='w-full py-4 px-2 mt-2 text-left'>
          <Image src='/logo.svg' alt='Clofit Logo' width={80} height={30} />
        </header>

        {/* 등록 배너 */}
        <div className='w-full bg-[#464646] py-2 px-4 flex items-center justify-between rounded-md my-4'>
          <div>
            <p className='text-sm text-[#B7B7B7] ml-2 font-semibold'>
              나만의 디지털 옷장을 만들고 싶다면
            </p>
            <p className='text-base text-white ml-2 font-semibold mt-1'>
              간편하게 내 아이템 등록하기
            </p>
          </div>
          <div>
            <Image src='/closet.svg' alt='Closet Icon' width={60} height={60} />
          </div>
        </div>

        {/* 추천 아이템 섹션 */}
        <section className='w-full'>
          <h2 className='text-base font-medium text-[#373A3F] my-4'>
            강현후님을 위한 아이템 추천
          </h2>
          <div className='grid grid-cols-3 gap-0'>
            {Array.from({ length: 3 }).map((_, index) => (
              <div key={index} className='relative w-full aspect-[3/4]'>
                <Image
                  src={placeholderImage}
                  alt={`추천 아이템 ${index + 1}`}
                  fill
                  className='object-cover'
                />
                <p className='text-center text-sm mt-2'>무신사 스탠다드</p>
              </div>
            ))}
          </div>

          <h2 className='text-base font-medium text-[#373A3F] my-4'>
            강현후님이 좋아요 한 코디
          </h2>

          <div className='grid grid-cols-3 gap-0'>
            {Array.from({ length: 3 }).map((_, index) => (
              <div key={index} className='relative w-full aspect-[3/4]'>
                <Image
                  src={placeholderImage}
                  alt={`좋아요한 코디 ${index + 1}`}
                  fill
                  className='object-cover'
                />
              </div>
            ))}
          </div>
        </section>

        {/* 가상 피팅 추천 배너 */}
        <div
          className='w-full bg-[#E6F0FF] p-4 rounded mt-6 mb-16 flex items-center justify-between gap-4 cursor-pointer'
          onClick={() => router.push('/fitting')}
        >
          <div className='flex flex-col items-center text-center'>
            <p className='text-lg font-bold text-[#222222]'>
              나와 어울리는 아이템은?
            </p>
            <p className='text-lg text-[#3376F6] font-bold'>
              가상피팅 하러가기
            </p>
          </div>
          <div>
            <Image
              src='/gofitting.svg'
              alt='Closet Icon'
              width={105}
              height={60}
            />
          </div>
        </div>

        {/* 하단 네비게이션 */}
        <Navbar />
      </div>
    </div>
  );
}
