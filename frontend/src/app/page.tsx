'use client';

import React, { useEffect, useState } from 'react';
import KakaoLoginButton from '../components/KakaoLoginButton';
import Image from 'next/image';

export default function Home() {
  const [showOnboarding, setShowOnboarding] = useState(true);
  const [logoVisible, setLogoVisible] = useState(false);

  useEffect(() => {
    const timer = setTimeout(() => {
      setShowOnboarding(false);
    }, 1000); // 1초 후에 카카오 버튼을 표시

    setTimeout(() => {
      setLogoVisible(true); // 로고가 점점 나타나도록 설정
    }, 100); // 로고가 약간의 지연 후에 페이드 인 시작

    return () => clearTimeout(timer);
  }, []);

  return (
    <div className='bg-[#171A1F] min-h-[100vh] w-full flex flex-col items-center justify-center relative overflow-hidden'>
      <style jsx global>{`
        html,
        body {
          margin: 0;
          padding: 0;
          height: 100%;
          width: 100%;
          overflow: hidden; /* 스크롤 방지 */
          background-color: #171a1f; /* 배경 확장 */
        }

        #__next {
          height: 100%;
          width: 100%; /* 루트 컨테이너 너비도 100%로 설정 */
        }

        .min-h-[100vh] {
          min-height: -webkit-fill-available; /* 브라우저의 가용 높이 채우기 */
        }
      `}</style>

      {/* 온보딩 로고 */}
      <div
        className={`flex-grow flex items-center justify-center transition-opacity duration-1000 ${
          logoVisible ? 'opacity-100' : 'opacity-0'
        }`}
      >
        <Image
          src='/onboarding.svg'
          alt='Onboarding Logo'
          width={120}
          height={130}
        />
      </div>

      {/* 1초 후에 하단에 고정된 카카오 버튼 표시 */}
      {!showOnboarding && (
        <div className='absolute bottom-16'>
          <KakaoLoginButton />
        </div>
      )}
    </div>
  );
}
