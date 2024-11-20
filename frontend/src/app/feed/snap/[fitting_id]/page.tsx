'use client';

import { useState, useEffect } from 'react';
import { useParams, useRouter } from 'next/navigation';
import Image from 'next/image';
import axiosInstance from '@/api/axiosInstance';
import { AiFillHeart, AiOutlineHeart } from 'react-icons/ai';

interface SnapDetail {
  id: number;
  imgPath: string | null;
  regFittingDttm: string;
  favoriteYn: 'Y' | 'N' | null;
  fittingName: string | null;
  publicYn: 'Y' | 'N';
  top?: {
    id: number;
    item: string;
    price: number;
    imgPath: string | null;
    itemUrl: string;
  };
  bottom?: {
    id: number;
    item: string;
    price: number;
    imgPath: string | null;
    itemUrl: string;
  };
}

export default function SnapDetailPage() {
  const { fitting_id: fitting_idParam } = useParams();
  const router = useRouter();
  const fitting_id = Array.isArray(fitting_idParam)
    ? fitting_idParam[0]
    : fitting_idParam; // string 변환
  const [snap, setSnap] = useState<SnapDetail | null>(null);
  const [liked, setLiked] = useState(false);

  useEffect(() => {
    const fetchSnapDetails = async () => {
      try {
        const response = await axiosInstance.get<SnapDetail>(
          `/fitting/${fitting_id}`
        );
        setSnap(response.data);
        setLiked(response.data.favoriteYn === 'Y');
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

  if (!snap) {
    return (
      <div className='flex items-center justify-center w-full h-full'>
        <div className='animate-spin rounded-full h-10 w-10 border-t-2 border-b-2 border-blue-500'></div>
      </div>
    );
  }

  const isValidUrl = (url: string | null): boolean => {
    return Boolean(url && url.startsWith('http'));
  };

  const defaultImage = '/placeholder.png';

  return (
    <div className='h-full flex flex-col overflow-hidden w-full'>
      {/* 상단 탑바 */}
      <div className='w-full h-14 bg-white flex items-center px-4 shadow'>
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

      {/* 메인 이미지 */}
      <div className='flex-shrink-0 w-full aspect-[5/6] relative overflow-hidden'>
        <Image
          src={isValidUrl(snap.imgPath) ? snap.imgPath! : defaultImage}
          alt={snap.fittingName || '스냅 이미지'}
          fill
          className='object-cover'
        />
      </div>

      {/* 사용된 아이템 정보 */}
      <div className='p-4 bg-white'>
        {/* 좋아요 버튼 */}
        <button
          onClick={toggleLike}
          className='flex items-center text-lg text-gray-500'
        >
          {liked ? (
            <AiFillHeart className='text-red-500 text-xl' />
          ) : (
            <AiOutlineHeart className='text-gray-300 text-xl' />
          )}
          <span className='ml-2 text-base'>{liked ? '좋아요 ' : '좋아요'}</span>
        </button>
      </div>

      {/* 아이템 리스트 */}
      <div className='p-4 bg-gray-100'>
        <div className='flex space-x-4 overflow-x-scroll scrollbar-hide'>
          {snap.top && snap.top.item !== 'null_clothes' && (
            <div className='flex-none w-60'>
              <div className='flex items-center space-x-4 mb-4'>
                <Image
                  src={
                    isValidUrl(snap.top.imgPath)
                      ? snap.top.imgPath!
                      : defaultImage
                  }
                  alt={snap.top.item || '상단 아이템'}
                  width={60}
                  height={60}
                  className='object-cover rounded-md'
                />
                <div>
                  <h2 className='text-sm font-medium'>{snap.top.item}</h2>
                  <p className='text-gray-500 text-xs'>{snap.top.price}원</p>
                </div>
              </div>
            </div>
          )}
          {snap.bottom && snap.bottom.item !== 'null_clothes' && (
            <div className='flex-none w-60'>
              <div className='flex items-center space-x-4'>
                <Image
                  src={
                    isValidUrl(snap.bottom.imgPath)
                      ? snap.bottom.imgPath!
                      : defaultImage
                  }
                  alt={snap.bottom.item || '하단 아이템'}
                  width={60}
                  height={60}
                  className='object-cover rounded-md'
                />
                <div>
                  <h2 className='text-sm font-medium'>{snap.bottom.item}</h2>
                  <p className='text-gray-500 text-xs'>{snap.bottom.price}원</p>
                </div>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
