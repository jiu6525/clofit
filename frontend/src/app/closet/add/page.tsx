'use client';

import { useRouter } from 'next/navigation';
import { useState } from 'react';
import { IoChevronBack } from 'react-icons/io5';

export default function AddClothingPage() {
  const router = useRouter();

  // 선택된 옵션 상태 (계절, 카테고리, 색상)
  const [season, setSeason] = useState('여름');
  const [category, setCategory] = useState('상의');
  const [color, setColor] = useState('검정');

  return (
    <div className='flex flex-col items-center w-full min-h-screen bg-white pb-16'>
      <header className='w-full flex items-center justify-between p-4'>
        <button onClick={() => router.back()} className='text-xl'>
          <IoChevronBack size={24} />
        </button>
        <h1 className='text-xl text-[#373A3F] font-medium'>내 옷 등록하기</h1>
        <button
          onClick={() => router.push('/closet')}
          className='text-[#373A3F] font-medium '
        >
          취소
        </button>
      </header>

      <div className='w-full max-w-md mx-auto p-4'>
        {/* 임의의 이미지 미리보기 */}
        <img
          src='https://via.placeholder.com/400x400' // 임의의 이미지 URL
          alt='Captured'
          className='w-full h-80 object-cover rounded-lg'
        />

        {/* 계절, 카테고리, 색상 선택 */}
        <div className='w-full bg-white rounded-lg p-4 mt-4'>
          <h2 className='text-lg font-semibold mb-6'>어떤 옷인가요?</h2>

          <div className='flex justify-between py-4 '>
            <span className='text-[#373A3F] font-medium'>계절</span>
            <span className='text-[#373A3F]'>{season} &gt;</span>
          </div>

          <div className='flex justify-between py-4'>
            <span className='text-[#373A3F] font-medium'>카테고리</span>
            <span className='text-[#373A3F]'>{category} &gt;</span>
          </div>

          <div className='flex justify-between py-4'>
            <span className='text-[#373A3F] font-medium'>색상</span>
            <span className='text-[#373A3F]'>{color} &gt;</span>
          </div>
        </div>
      </div>

      {/* 화면 하단에 고정된 확인 버튼 */}
      <button
        onClick={() => {
          alert('옷이 등록되었습니다!');
          router.push('/closet'); // /closet 경로로 이동
        }}
        className='fixed bottom-0 left-0 right-0 w-full py-6 bg-black text-white text-lg font-semibold'
      >
        확인
      </button>
    </div>
  );
}
