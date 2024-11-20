'use client';

import { useState, useEffect, useCallback } from 'react';
import { useRouter } from 'next/navigation';
import axiosInstance from '@/api/axiosInstance';
import Navbar from '@/components/Navbar';
import Image from 'next/image';

export interface FeedItem {
  type: 'clothes' | 'fitting';
  clothes?: {
    id: number;
    textile: string | null;
    item: string;
    price: number;
    imgPath: string;
    style: string;
    season: string;
    category: string; // 'top', 'bottom', etc.
    itemUrl: string;
    myClothesYn: string;
    delClothesYn: string;
  };
  fitting?: {
    id: number;
    member: {
      id: number;
      memberName: string;
    };
    imgPath: string;
    fittingName: string;
  };
}

export default function FeedPage() {
  const [activeTab, setActiveTab] = useState<'전체' | '상품' | '스냅'>('전체');
  const [colorBased, setColorBased] = useState(false); // 색상 기반 추천 여부
  const [feedItems, setFeedItems] = useState<FeedItem[]>([]);
  const [errorMessage, setErrorMessage] = useState<string | null>(null);
  const router = useRouter();

  // 데이터 가져오기
  const fetchFeedData = useCallback(() => {
    let endpoint = '/feed';

    if (colorBased) {
      if (activeTab === '전체') {
        endpoint = '/feed/byColor';
      } else if (activeTab === '상품') {
        endpoint = '/feed/items/byColor';
      } else if (activeTab === '스냅') {
        endpoint = '/feed/snaps/byColor';
      }
    } else {
      if (activeTab === '상품') {
        endpoint = '/feed/items';
      } else if (activeTab === '스냅') {
        endpoint = '/feed/snaps';
      }
    }

    axiosInstance
      .get<{ feeds: FeedItem[] }>(endpoint)
      .then((response) => {
        setFeedItems(response.data.feeds);
        setErrorMessage(null);
      })
      .catch((error) => {
        console.error('데이터 가져오기 오류:', error);
        setErrorMessage('데이터를 불러오는 중 문제가 발생했습니다.');
      });
  }, [colorBased, activeTab]);

  // 탭 또는 색상 추천 상태 변경 시 데이터 갱신
  useEffect(() => {
    fetchFeedData();
  }, [fetchFeedData]);

  // 탭 변경
  const handleTabClick = useCallback((tab: '전체' | '상품' | '스냅') => {
    setActiveTab(tab);
  }, []);

  // 아이템 클릭 핸들러
  const handleItemClick = useCallback(
    (item: FeedItem) => {
      if (item.type === 'clothes' && item.clothes) {
        router.push(`/feed/product/${item.clothes.id}`);
      } else if (item.type === 'fitting' && item.fitting) {
        router.push(`/feed/snap/${item.fitting.id}`);
      }
    },
    [router]
  );

  return (
    <div className='flex flex-col items-center w-full min-h-screen bg-white'>
      <header className='w-full py-4 px-6 text-left'>
        <h1 className='text-2xl font-semibold'>피드</h1>
      </header>

      {/* 탭 디자인 및 색상 추천 토글 */}
      <div className='w-full flex justify-between items-center text-base font-medium my-2'>
        {/* 탭 */}
        <div className='flex justify-around w-2/3'>
          {['전체', '상품', '스냅'].map((tab) => (
            <span
              key={tab}
              className={`pb-1 cursor-pointer ${
                activeTab === tab
                  ? 'text-[#373A3F] border-black'
                  : 'text-[#9095A1] border-transparent'
              }`}
              onClick={() => handleTabClick(tab as '전체' | '상품' | '스냅')}
            >
              {tab}
            </span>
          ))}
        </div>

        {/* 색상 추천 토글 */}
        <div className='flex items-center space-x-2 h-full p-1'>
          <span
            className={`${
              colorBased ? 'text-[#373A3F]' : 'text-[#9095A1]'
            } pb-1`}
          >
            색상 추천
          </span>
          <label className='relative inline-flex items-center cursor-pointer h-6'>
            <input
              type='checkbox'
              className='sr-only peer'
              checked={colorBased}
              onChange={() => setColorBased((prev) => !prev)}
            />
            <div className="w-11 h-6 bg-gray-200 rounded-full peer peer-checked:bg-blue-600 after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:after:translate-x-full peer-checked:after:border-white"></div>
          </label>
        </div>
      </div>

      {errorMessage && <div className='text-red-500 mt-4'>{errorMessage}</div>}

      {/* 피드 아이템 */}
      <div className='grid grid-cols-3 gap-0 w-full max-w-[1024px] mx-auto'>
        {feedItems.map((item, index) => (
          <div
            key={index}
            className='w-full aspect-[5/6] relative cursor-pointer'
            onClick={() => handleItemClick(item)}
          >
            <Image
              src={item.clothes?.imgPath || item.fitting?.imgPath || ''}
              alt={item.clothes?.item || item.fitting?.fittingName || ''}
              fill
              priority={true}
              sizes='33vw'
              className='object-cover w-full h-full'
            />
          </div>
        ))}
      </div>
      <Navbar />
    </div>
  );
}
