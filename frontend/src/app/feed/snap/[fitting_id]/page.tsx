'use client';

import Image from 'next/image';
import { useRouter } from 'next/navigation';

export default function SnapDetailPage() {
  const router = useRouter();
  const image = '/snap1.png'; // 단일 이미지 경로
  const productImage = '/product.jpg'; // 제품 이미지 경로

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
            stroke='black'
          >
            <path
              d='M11.5 15.5L6.212 10.212a.3.3 0 0 1 0-.424L11.5 4.5'
              strokeWidth='1.4'
              vectorEffect='non-scaling-stroke'
            />
          </svg>
        </button>
      </div>

      {/* 상단 프로필 및 팔로우 버튼 */}
      <header className='flex items-center justify-between px-4 py-3 bg-white shadow-md h-14 w-full'>
        <div className='flex items-center space-x-2'>
          {/* 프로필 이미지 */}
          <div className='w-8 h-8 bg-gray-200 rounded-full'></div>
          {/* 유저 이름 */}
          <div>
            <span className='text-[#000000] font-medium'>써비노</span>
          </div>
        </div>
      </header>

      {/* 메인 이미지 */}
      <div className='w-full aspect-[5/6] bg-gray-200 relative overflow-hidden'>
        <Image src={image} alt='Snap Image' fill className='object-cover' />
      </div>

      {/* 제품 정보 카드 */}
      <div className='h-24 flex items-center space-x-4 w-full px-4 mt-4 bg-white'>
        <Image
          src={productImage}
          alt='Product Image'
          width={60}
          height={60}
          className='object-cover rounded-lg'
        />
        <div className='flex-1'>
          <p className='text-sm font-semibold'>패디드 워크 자켓 FADED BLACK</p>
          <p className='text-xs text-gray-500'>
            <span className='text-red-500 font-semibold'>10%</span> 219,000원
          </p>
        </div>
        <button className='text-gray-400 text-xl'>♡</button>
      </div>
    </div>
  );
}
