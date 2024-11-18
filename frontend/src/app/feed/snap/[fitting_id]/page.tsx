'use client';

import { useState, useEffect } from 'react';
import Image from 'next/image';
import { useRouter } from 'next/navigation';
import { AiFillHeart, AiOutlineHeart } from 'react-icons/ai';
import axiosInstance from '@/api/axiosInstance';

// 응답 데이터 타입 정의
interface LikeResponse {
  fittingId: number;
  img_path: string;
}

export default function SnapDetailPage() {
  const router = useRouter();
  const image = '/snap1.png'; // 단일 이미지 경로
  const productImage = '/product.jpg'; // 제품 이미지 경로
  const fittingId = 1; // 예제 fittingId

  const [liked, setLiked] = useState(false); // 좋아요 상태

  useEffect(() => {
    // 좋아요 상태 확인
    const fetchLikeStatus = async () => {
      try {
        const response = await axiosInstance.get<LikeResponse[]>('/likes/my');
        const likedItems = response.data.map((item) => item.fittingId);
        setLiked(likedItems.includes(fittingId));
      } catch (error) {
        console.error('좋아요 상태 확인 실패:', error);
      }
    };

    fetchLikeStatus();
  }, [fittingId]);

  const toggleLike = async () => {
    try {
      if (liked) {
        // 좋아요 취소 요청
        await axiosInstance.request({
          url: '/likes/like',
          method: 'DELETE',
          headers: { 'Content-Type': 'application/json' },
          data: { fittingId },
        });
        setLiked(false);
      } else {
        // 좋아요 추가 요청
        await axiosInstance.post('/likes/like', { fittingId });
        setLiked(true);
      }
    } catch (error) {
      console.error('좋아요 상태 변경 실패:', error);
    }
  };

  const handleDoubleClick = () => {
    if (!liked) {
      toggleLike();
    }
  };

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

      {/* 상단 프로필 및 좋아요 버튼 */}
      <header className='flex items-center justify-between px-4 py-3 bg-white shadow-md h-14 w-full'>
        <div className='flex items-center space-x-2'>
          {/* 프로필 이미지 */}
          <div className='w-8 h-8 bg-gray-200 rounded-full'></div>
          {/* 유저 이름 */}
          <div>
            <span className='text-[#000000] font-medium'>써비노</span>
          </div>
        </div>
        {/* 좋아요 버튼 */}
        <button onClick={toggleLike} className='text-gray-500'>
          {liked ? (
            <AiFillHeart className='text-red-500 text-xl' />
          ) : (
            <AiOutlineHeart className='text-gray-300 text-xl' />
          )}
        </button>
      </header>

      {/* 메인 이미지 */}
      <div
        className='w-full aspect-[5/6] bg-gray-200 relative overflow-hidden'
        onDoubleClick={handleDoubleClick} // 더블 클릭 이벤트 추가
      >
        <Image src={image} alt='Snap Image' fill className='object-cover' />
        {liked && (
          <AiFillHeart
            className='absolute text-red-500 text-6xl opacity-70 animate-ping'
            style={{
              top: '50%',
              left: '50%',
              transform: 'translate(-50%, -50%)',
            }}
          />
        )}
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
