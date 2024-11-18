'use client';

import { useEffect, useState } from 'react';
import { useParams, useRouter } from 'next/navigation';
import axiosInstance from '@/api/axiosInstance';
import Image from 'next/image';

export default function SnapDetailPage() {
  const { fitting_id } = useParams(); // 경로 매개변수 fitting_id
  const router = useRouter();
  const [snap, setSnap] = useState(null);
  const [error, setError] = useState<string | null>(null);

  // 스냅 데이터 가져오기
  useEffect(() => {
    if (fitting_id) {
      axiosInstance
        .get(`/fitting/${fitting_id}`) // API 호출
        .then((response) => setSnap(response.data))
        .catch((err) => {
          console.error('Error fetching snap:', err);
          setError('스냅 정보를 불러오는 중 문제가 발생했습니다.');
        });
    }
  }, [fitting_id]);

  if (error) {
    return (
      <div className='flex items-center justify-center h-full'>
        <p className='text-red-500'>{error}</p>
      </div>
    );
  }

  if (!snap) {
    return (
      <div className='flex items-center justify-center h-full'>
        <div className='animate-spin rounded-full h-10 w-10 border-t-2 border-b-2 border-blue-500'></div>
      </div>
    );
  }

  return (
    <div className='h-full flex flex-col bg-gray-100 overflow-hidden w-full'>
      {/* 상단 탑바 */}
      <div className='w-full h-14 bg-white flex items-center px-4'>
        <button onClick={() => router.back()} className='text-gray-500'>
          <svg
            width='28'
            height='28'
            viewBox='0 0 20 20'
            fill='none'
            xmlns='http://www.w3.org/2000/svg'
            className='stroke-black'
          >
            <path
              d='M11.5 15.5L6.212 10.212a.3.3 0 0 1 0-.424L11.5 4.5'
              strokeWidth='1.4'
              vectorEffect='non-scaling-stroke'
            />
          </svg>
        </button>
      </div>

      {/* 상단 프로필 */}
      <header className='flex items-center justify-between px-4 py-3 bg-white shadow-md h-14 w-full'>
        <div className='flex items-center space-x-2'>
          <div className='w-8 h-8 bg-gray-200 rounded-full'></div>
          <div>
            <span className='text-[#000000] font-medium'>
              {snap.member.memberName}
            </span>
          </div>
        </div>
      </header>

      {/* 메인 이미지 */}
      <div className='w-full aspect-[5/6] bg-gray-200 relative overflow-hidden'>
        <Image
          src={snap.imgPath}
          alt={snap.fittingName}
          fill
          className='object-cover'
        />
      </div>
    </div>
  );
}
