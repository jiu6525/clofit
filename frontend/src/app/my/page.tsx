'use client';

import { useState, useEffect } from 'react';
import MyOriginPicture from './components/MyOriginPicture';
import LikedSnaps from './components/LikedSnaps';
import usePhotoStore from '@/stores/usePhotoStore';
import useMemberStore from '@/stores/useMemberStore';
import axiosInstance from '@/api/axiosInstance';
import { AiOutlineDelete } from 'react-icons/ai';
import { FaCamera } from 'react-icons/fa';

interface MemberInfoResponse {
  memberName: string;
  personalColor: string;
  profileFilePath: string;
}

export default function MyPage() {
  const { fetchPhotos } = usePhotoStore();
  const { setPersonalColor } = useMemberStore();

  // memberId를 상단에서 한 번만 선언
  const memberId = 1;

  const [activeTab, setActiveTab] = useState<'myPhotos' | 'likedSnaps'>(
    'myPhotos'
  );
  const [isDeleteMode, setIsDeleteMode] = useState(false);
  const [selectedPhotos, setSelectedPhotos] = useState<Set<number>>(new Set());
  const [nickname, setNickname] = useState<string | null>(null);
  const [profileImageUrl, setProfileImageUrl] = useState<string | null>(null);

  useEffect(() => {
    const fetchMemberInfo = async () => {
      try {
        const response = await axiosInstance.get<MemberInfoResponse>(
          `/member/my/${memberId}`
        );
        const { memberName, personalColor, profileFilePath } = response.data;

        setNickname(memberName);
        setProfileImageUrl(profileFilePath || '/default-profile.png');
        setPersonalColor(personalColor);
      } catch (error) {
        console.error('사용자 정보 불러오기 실패:', error);
      }
    };

    fetchMemberInfo();
  }, [setPersonalColor]);

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

  const handleFileChange = async (
    event: React.ChangeEvent<HTMLInputElement>
  ) => {
    const file = event.target.files?.[0];
    if (!file) return;

    const formData = new FormData();
    formData.append('file', file);

    try {
      await axiosInstance.put(
        `/member/profile-image?memberId=${memberId}`,
        formData,
        {
          headers: { 'Content-Type': 'multipart/form-data' },
        }
      );
      alert('프로필 이미지가 성공적으로 업데이트되었습니다.');
      setProfileImageUrl(URL.createObjectURL(file));
    } catch (error) {
      console.error('프로필 이미지 업데이트 실패:', error);
      alert('프로필 이미지 업데이트에 실패했습니다.');
    }
  };

  const handleDeletePhotos = async () => {
    const pictureIds = Array.from(selectedPhotos);
    if (pictureIds.length === 0) {
      alert('삭제할 사진을 선택하세요.');
      return;
    }

    const data = { memberId, pictureIds };

    try {
      await axiosInstance.put('/origin-picture/delete', data);
      await fetchPhotos();
      setSelectedPhotos(new Set());
      setIsDeleteMode(false);
    } catch (error) {
      console.error('삭제 실패:', error);
      alert('삭제에 실패했습니다. 다시 시도해 주세요.');
    }
  };

  return (
    <div className='my-page w-full bg-white text-[#373A3F] min-h-screen'>
      <div className='flex flex-col items-center mt-12 mb-6'>
        <div className='relative mb-4'>
          {profileImageUrl ? (
            <img
              src={profileImageUrl}
              alt='프로필 이미지'
              className='w-24 h-24 rounded-full border border-gray-300'
            />
          ) : (
            <div className='w-24 h-24 rounded-full border border-gray-300 bg-gray-200'></div>
          )}
          <label
            htmlFor='profile-upload'
            className='absolute bottom-0 right-0 bg-white w-6 h-6 rounded-full flex justify-center items-center cursor-pointer'
          >
            <FaCamera className='text-[#222222] text-xs' />
            <input
              type='file'
              id='profile-upload'
              accept='image/*'
              onChange={handleFileChange}
              className='hidden'
            />
          </label>
        </div>
        {nickname && <h1 className='text-lg font-semibold'>{nickname}</h1>}
      </div>
      <hr className='border-gray-200 my-4' />

      <div className='flex items-center mb-4 space-x-4'>
        <div className='flex-grow flex items-center space-x-4'>
          <button
            onClick={() => handleTabChange('myPhotos')}
            className={`px-2 py-1 text-sm font-semibold ${
              activeTab === 'myPhotos'
                ? 'border-b-2 border-[#373A3F] text-[#373A3F]'
                : 'text-[#8F8B8D]'
            }`}
          >
            나의 전신 사진
          </button>
          <button
            onClick={() => handleTabChange('likedSnaps')}
            className={`px-2 py-1 text-sm font-semibold ${
              activeTab === 'likedSnaps'
                ? 'border-b-2 border-[#373A3F] text-[#373A3F]'
                : 'text-[#8F8B8D]'
            }`}
          >
            좋아요한 스냅
          </button>
        </div>

        {activeTab === 'myPhotos' && !isDeleteMode && (
          <button
            onClick={toggleDeleteMode}
            className='ml-4 px-2 py-1 text-[#8F8B8D] hover:text-red-700 flex items-center'
          >
            <AiOutlineDelete className='text-2xl' />
          </button>
        )}

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

      {activeTab === 'myPhotos' && (
        <MyOriginPicture
          isDeleteMode={isDeleteMode}
          selectedPhotos={selectedPhotos}
          toggleSelectPhoto={toggleSelectPhoto}
        />
      )}
      {activeTab === 'likedSnaps' && <LikedSnaps items={[]} />}
    </div>
  );
}
