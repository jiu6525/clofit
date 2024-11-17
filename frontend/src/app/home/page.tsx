'use client';

import React, { useState } from 'react';
import 'slick-carousel/slick/slick.css';
import 'slick-carousel/slick/slick-theme.css';
import Image from 'next/image';
import { useRouter } from 'next/navigation';
import Navbar from '@/components/Navbar';
import Slider from 'react-slick';
import { IoNotificationsOutline, IoChevronForward } from 'react-icons/io5';

export default function MainPage() {
  const router = useRouter();
  const [currentSlide, setCurrentSlide] = useState(0);

  const slides = [
    {
      id: 1,
      src: '/images/mainslide1.png',
      smallText: '간편한 아이템 등록으로',
      largeText: '나만의 옷장 만들기',
      buttonText: '지금 등록하기',
      textColor: '#171A1F',
    },
    {
      id: 2,
      src: '/images/mainslide2.png',
      smallText: '텍스트 뭐라고 하냐',
      largeText: '미정입니다',
      buttonText: '지금 둘러보기',
      textColor: '#171A1F',
    },
    {
      id: 3,
      src: '/images/mainslide3.png',
      smallText: '추천 상품이 나와 어울릴지 궁금하다면',
      largeText: 'AI 가상 피팅',
      buttonText: '지금 피팅하기',
      textColor: '#FFFFFF',
    },
  ];

  const sliderSettings = {
    dots: false,
    infinite: true,
    speed: 500,
    slidesToShow: 1,
    slidesToScroll: 1,
    autoplay: true,
    autoplaySpeed: 3000,
    beforeChange: (_: number, next: number) => setCurrentSlide(next),
  };

  return (
    <div className='w-full min-h-screen bg-white flex justify-center'>
      <div className='w-full max-w-[600px] flex flex-col items-center'>
        <header className='w-full flex items-center justify-between py-4 px-6 mt-6'>
          <Image
            src='/logo.svg'
            alt='Clofit Logo'
            width={80}
            height={30}
            style={{ width: 'auto', height: 'auto' }}
          />
          <IoNotificationsOutline
            size={28}
            className='text-gray-700 cursor-pointer'
          />
        </header>

        {/* 슬라이드 섹션 */}
        <div className='w-full max-w-[600px] relative'>
          <Slider {...sliderSettings} className='overflow-hidden'>
            {slides.map((slide, index) => (
              <div key={slide.id} className='relative w-full'>
                <Image
                  src={slide.src}
                  alt={`슬라이드 이미지 ${slide.id}`}
                  width={600}
                  height={300}
                  className='object-cover w-full'
                  priority={index === 0} // 첫 번째 슬라이드 이미지 priority
                />
                <div className='absolute bottom-8 inset-x-0 flex flex-col items-center text-center'>
                  <p
                    className='text-sm font-semiboldbold'
                    style={{ color: slide.textColor }}
                  >
                    {slide.smallText}
                  </p>
                  <p
                    className='font-bold text-2xl mb-1'
                    style={{ color: slide.textColor }}
                  >
                    {slide.largeText}
                  </p>
                  <button
                    onClick={() => router.push('/closet')}
                    className={`px-4 py-2 rounded-md text-sm flex items-center ${
                      slide.textColor === '#171A1F'
                        ? 'bg-[#171A1F] text-white'
                        : 'bg-white text-[#171A1F]'
                    }`}
                  >
                    {slide.buttonText}
                    <IoChevronForward size={16} className='ml-1' />
                  </button>
                </div>
              </div>
            ))}
          </Slider>

          {/* 개별 프로그레스 바 */}
          <div className='absolute bottom-4 left-0 w-full h-1 flex justify-between px-4'>
            {slides.map((_, index) => (
              <div
                key={index}
                className={`h-full flex-1 ${
                  currentSlide === index ? 'bg-white' : 'bg-[#B8B7AC]'
                }`}
              />
            ))}
          </div>
        </div>

        {/* 추천 아이템 섹션 */}
        <section className='w-full'>
          <h2 className='font-medium text-[#373A3F] ml-3 my-4'>
            강현후님을 위한 아이템 추천
          </h2>
          <div className='grid grid-cols-3 gap-0'>
            {Array.from({ length: 3 }).map((_, index) => (
              <div key={index} className='relative w-full aspect-[3/4]'>
                <Image
                  src='/snap1.webp'
                  alt={`추천 아이템 ${index + 1}`}
                  fill
                  sizes='(max-width: 600px) 33vw'
                  className='object-cover'
                />
              </div>
            ))}
          </div>
        </section>

        {/* 하단 네비게이션 */}
        <Navbar />
      </div>
    </div>
  );
}
