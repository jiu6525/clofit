'use client';

import { useState } from 'react';
import MyPhotos from './components/MyPhotos';
import LikedSnaps from './components/LikedSnaps';

export default function MyPage() {
  const nickname = '유아이볼';
  const profileImageUrl = '/default-profile.png'; // 기본 프로필 이미지
  const email = 'user@example.com'; // 이메일 (API 연결 시 업데이트 예정)

  // 탭 상태 관리
  const [activeTab, setActiveTab] = useState<'myPhotos' | 'likedSnaps'>(
    'myPhotos'
  );

  // 좋아요한 스냅 데이터
  const items = [
    {
      id: 1,
      title: 'Snap 1',
      location: '용인시, 수지구 | 카페',
      imageUrl: '/snap1.webp',
    },
    {
      id: 2,
      title: 'Snap 2',
      location: '용인시, 수지구 | 카페',
      imageUrl: '/snap2.webp',
    },
    {
      id: 3,
      title: 'Snap 3',
      location: '용인시, 수지구 | 카페',
      imageUrl: '/snap3.webp',
    },
    {
      id: 4,
      title: 'Snap 4',
      location: '용인시, 수지구 | 카페',
      imageUrl: '/snap1.webp',
    },
    {
      id: 5,
      title: 'Snap 5',
      location: '용인시, 수지구 | 카페',
      imageUrl: '/snap2.webp',
    },
    {
      id: 6,
      title: 'Snap 6',
      location: '용인시, 수지구 | 카페',
      imageUrl: '/snap3.webp',
    },
  ];

  // 탭 변경 핸들러
  const handleTabChange = (tab: 'myPhotos' | 'likedSnaps') => {
    setActiveTab(tab);
  };

  return (
    <div className='my-page w-full bg-white text-black min-h-screen'>
      {/* 프로필 섹션 */}
      <div className='flex flex-col items-center mt-12 mb-6'>
        <div className='relative mb-4'>
          <img
            src={profileImageUrl}
            alt='프로필 이미지'
            className='w-24 h-24 rounded-full border border-gray-300'
          />
        </div>
        <h1 className='text-lg font-semibold'>{nickname}</h1>
        <p className='text-sm text-gray-500'>{email}</p>
      </div>
      {/* 구분선 */}
      <hr className='border-gray-200 my-4' />
      {/* 탭 버튼 */}
      <div className='flex items-center mb-4 space-x-4'>
        <button
          onClick={() => handleTabChange('myPhotos')}
          className={`px-2 py-1 text-sm font-semibold ${
            activeTab === 'myPhotos'
              ? 'border-b-2 border-black text-black'
              : 'text-gray-500'
          }`}
        >
          나의 전신 사진
        </button>
        <button
          onClick={() => handleTabChange('likedSnaps')}
          className={`px-2 py-1 text-sm font-semibold ${
            activeTab === 'likedSnaps'
              ? 'border-b-2 border-black text-black'
              : 'text-gray-500'
          }`}
        >
          좋아요한 스냅
        </button>
      </div>
      {/* 탭 콘텐츠 */}
      {activeTab === 'myPhotos' && <MyPhotos />}
      {activeTab === 'likedSnaps' && <LikedSnaps items={items} />}{' '}
    </div>
  );
}
