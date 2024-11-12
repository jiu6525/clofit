'use client';

import { useState } from 'react';
import MyOriginPicture from './components/MyOriginPicture';
import LikedSnaps from './components/LikedSnaps';
import usePhotoStore from '@/stores/usePhotoStore'; // PhotoStore import 추가
import axiosInstance from '@/api/axiosInstance';
import { AiOutlineDelete } from 'react-icons/ai';

export default function MyPage() {
  const nickname = '유아이볼';
  const profileImageUrl = '/default-profile.png';
  const email = 'user@example.com';

  const { fetchPhotos } = usePhotoStore(); // fetchPhotos 가져오기
  const [activeTab, setActiveTab] = useState<'myPhotos' | 'likedSnaps'>(
    'myPhotos'
  );
  const [isDeleteMode, setIsDeleteMode] = useState(false);
  const [selectedPhotos, setSelectedPhotos] = useState<Set<number>>(new Set());

  const items = [
    // 좋아요한 스냅 데이터 (생략)
  ];

  const handleTabChange = (tab: 'myPhotos' | 'likedSnaps') => {
    setActiveTab(tab);
    setIsDeleteMode(false);
  };

  const toggleDeleteMode = () => {
    setIsDeleteMode((prevMode) => !prevMode);
    setSelectedPhotos(new Set());
  };

  const toggleSelectPhoto = (photoId: number) => {
    setSelectedPhotos((prevSelected) => {
      const newSelected = new Set(prevSelected);
      newSelected.has(photoId)
        ? newSelected.delete(photoId)
        : newSelected.add(photoId);
      return newSelected;
    });
  };

  const handleDeletePhotos = async () => {
    const pictureIds = Array.from(selectedPhotos);
    if (pictureIds.length === 0) {
      alert('삭제할 사진을 선택하세요.');
      return;
    }

    const data = {
      memberId: 1,
      pictureIds,
    };

    try {
      await axiosInstance.put('/origin-picture/delete', data);
      console.log('삭제 성공');
      await fetchPhotos(); // 삭제 후 사진 목록 새로고침
      setSelectedPhotos(new Set());
      setIsDeleteMode(false);
    } catch (error) {
      console.error('삭제 실패:', error);
      alert('삭제에 실패했습니다. 다시 시도해 주세요.');
    }
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
      <hr className='border-gray-200 my-4' />

      {/* 탭 버튼 및 삭제 모드 버튼 */}
      <div className='flex items-center mb-4 space-x-4'>
        <div className='flex-grow flex items-center space-x-4'>
          <button
            onClick={() => handleTabChange('myPhotos')}
            className={`px-2 py-1 text-sm font-semibold ${activeTab === 'myPhotos' ? 'border-b-2 border-black text-black' : 'text-gray-500'}`}
          >
            나의 전신 사진
          </button>
          <button
            onClick={() => handleTabChange('likedSnaps')}
            className={`px-2 py-1 text-sm font-semibold ${activeTab === 'likedSnaps' ? 'border-b-2 border-black text-black' : 'text-gray-500'}`}
          >
            좋아요한 스냅
          </button>
        </div>

        {/* 삭제 모드 버튼 */}
        {activeTab === 'myPhotos' && !isDeleteMode && (
          <button
            onClick={toggleDeleteMode}
            className='ml-4 px-2 py-1 text-red-500 hover:text-red-700 flex items-center'
          >
            <AiOutlineDelete className='text-2xl' />
          </button>
        )}

        {/* 삭제 모드에서 취소 및 삭제 버튼 */}
        {isDeleteMode && (
          <div className='flex items-center space-x-2'>
            <button
              onClick={toggleDeleteMode}
              className='px-2 py-1 bg-gray-300 text-black rounded-md'
            >
              취소
            </button>
            <button
              onClick={handleDeletePhotos}
              className='px-2 py-1 bg-red-500 text-white rounded-md'
            >
              삭제
            </button>
          </div>
        )}
      </div>

      {/* 탭 콘텐츠 */}
      {activeTab === 'myPhotos' && (
        <MyOriginPicture
          isDeleteMode={isDeleteMode}
          selectedPhotos={selectedPhotos}
          toggleSelectPhoto={toggleSelectPhoto}
        />
      )}
      {activeTab === 'likedSnaps' && <LikedSnaps items={items} />}
    </div>
  );
}
