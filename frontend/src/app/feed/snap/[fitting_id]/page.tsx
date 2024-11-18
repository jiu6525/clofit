'use client';

import { useState, useEffect } from 'react';
import { useParams } from 'next/navigation';
import axiosInstance from '@/api/axiosInstance';
import { AiFillHeart, AiOutlineHeart } from 'react-icons/ai';
import Image from 'next/image';

export default function SnapDetailPage() {
  const { fitting_id: fitting_idParam } = useParams();
  const fitting_id = Array.isArray(fitting_idParam)
    ? fitting_idParam[0]
    : fitting_idParam; // string 변환
  const [liked, setLiked] = useState(false);
  const [snap, setSnap] = useState<any>(null);

  useEffect(() => {
    // 스냅 데이터 및 좋아요 상태 로드
    const fetchSnapDetails = async () => {
      try {
        const response = await axiosInstance.get(`/feed/snap/${fitting_id}`);
        setSnap(response.data);

        const likeResponse =
          await axiosInstance.get<{ fittingId: number }[]>('/likes/my');
        const likedItems = likeResponse.data.map(
          (item: { fittingId: number }) => item.fittingId
        );
        setLiked(likedItems.includes(parseInt(fitting_id, 10)));
      } catch (error) {
        console.error('스냅 상세 정보 로드 실패:', error);
      }
    };

    fetchSnapDetails();
  }, [fitting_id]);

  const toggleLike = async () => {
    try {
      if (liked) {
        await axiosInstance.request({
          url: '/likes/like',
          method: 'DELETE',
          data: { fittingId: parseInt(fitting_id, 10) },
        });
        setLiked(false);
      } else {
        await axiosInstance.post('/likes/like', {
          fittingId: parseInt(fitting_id, 10),
        });
        setLiked(true);
      }
    } catch (error) {
      console.error('좋아요 상태 변경 실패:', error);
    }
  };

  return (
    <div className='h-full flex flex-col bg-gray-100 overflow-hidden w-full'>
      {/* 상단 프로필 및 좋아요 버튼 */}
      <header className='flex items-center justify-between px-4 py-3 bg-white shadow-md h-14 w-full'>
        <div className='flex items-center space-x-2'>
          <div className='w-8 h-8 bg-gray-200 rounded-full'></div>
          <div>
            <span className='text-[#000000] font-medium'>
              {snap?.member?.memberName || '사용자 이름'}
            </span>
          </div>
        </div>
        <button onClick={toggleLike} className='text-gray-500'>
          {liked ? (
            <AiFillHeart className='text-red-500 text-xl' />
          ) : (
            <AiOutlineHeart className='text-gray-300 text-xl' />
          )}
        </button>
      </header>

      {/* 메인 이미지 */}
      <div className='w-full aspect-[5/6] bg-gray-200 relative overflow-hidden'>
        <Image
          src={snap?.imgPath || '/placeholder.png'}
          alt={snap?.fittingName || '스냅 이미지'}
          fill
          className='object-cover'
        />
      </div>

      {/* 추가적인 스냅 정보 */}
      <div className='p-4'>
        <h2 className='text-lg font-medium'>
          {snap?.fittingName || '스냅 이름'}
        </h2>
      </div>
    </div>
  );
}
