'use client';

import { useState, useEffect } from 'react';
import MyOriginPicture from './components/MyOriginPicture';
import LikedSnaps from './components/LikedSnaps';
import usePhotoStore from '@/stores/usePhotoStore';
import useMemberStore from '@/stores/useMemberStore';
import axiosInstance from '@/api/axiosInstance';
import { FaCamera } from 'react-icons/fa';
import { HiOutlineMenu } from 'react-icons/hi';
import { HiDotsVertical } from 'react-icons/hi';

interface MemberInfoResponse {
  memberName: string;
  personalColor: string;
  profileFilePath: string;
}

export default function MyPage() {
  const { fetchPhotos } = usePhotoStore();
  const { setPersonalColor } = useMemberStore();

  const memberId = 1;

  const [activeTab, setActiveTab] = useState<'myPhotos' | 'likedSnaps'>(
    'myPhotos'
  );
  const [isDeleteMode, setIsDeleteMode] = useState(false);
  const [selectedPhotos, setSelectedPhotos] = useState<Set<number>>(new Set());
  const [nickname, setNickname] = useState<string | null>(null);
  const [profileImageUrl, setProfileImageUrl] = useState<string | null>(null);
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  useEffect(() => {
    const fetchMemberInfo = async () => {
      try {
        const response =
          await axiosInstance.get<MemberInfoResponse>('/member/mypage');

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
      const response = await axiosInstance.put(
        '/member/profile-image',
        formData,
        {
          headers: { 'Content-Type': 'multipart/form-data' },
        }
      );

      if (typeof response.data === 'string') {
        const fileUrl = response.data.split(': ')[1].trim(); // URL 추출
        setProfileImageUrl(fileUrl); // 새로운 프로필 이미지 반영
        alert('프로필 이미지가 성공적으로 업데이트되었습니다.');
      } else {
        console.error('Unexpected response data format:', response.data);
        alert('프로필 이미지 업데이트에 실패했습니다.');
      }
    } catch (error) {
      console.error('프로필 이미지 업데이트 실패:', error);
      alert('프로필 이미지 업데이트에 실패했습니다.');
    }
  }; // 여기가 문제였던 부분: handleFileChange 닫힘 추가

  const handleLogout = async () => {
    try {
      await axiosInstance.post('/member/logout');
      alert('로그아웃되었습니다.');
    } catch (error) {
      console.error('로그아웃 실패:', error);
      alert('로그아웃에 실패했습니다.');
    }
  };

  const handleAccountDelete = async () => {
    try {
      await axiosInstance.put('/member/resign');
      alert('회원 탈퇴가 완료되었습니다.');
    } catch (error) {
      console.error('회원 탈퇴 실패:', error);
      alert('회원 탈퇴에 실패했습니다.');
    }
  };

  const handleDeletePhotos = async () => {
    const pictureIds = Array.from(selectedPhotos);
    if (pictureIds.length === 0) {
      alert('삭제할 사진을 선택하세요.');
      return;
    }

    const data = { pictureIds };

    try {
      await axiosInstance.put('/origin-picture/delete', data, {
        headers: {
          'Content-Type': 'application/json',
        },
      });

      await fetchPhotos();
      setSelectedPhotos(new Set());
      setIsDeleteMode(false);
      alert('사진이 성공적으로 삭제되었습니다.');
    } catch (error) {
      console.error('삭제 실패:', error);
      alert('삭제에 실패했습니다. 다시 시도해 주세요.');
    }
  };

  return (
    <div className='my-page w-full bg-white text-[#373A3F] min-h-screen'>
      <div className='w-full max-w-[600px] mx-auto relative'>
        <div className='absolute top-4 right-4'>
          <button
            onClick={() => setIsMenuOpen((prev) => !prev)}
            className='text-2xl text-gray-700'
          >
            <HiOutlineMenu />
          </button>
          {isMenuOpen && (
            <div className='absolute top-8 right-0 bg-white border border-gray-300 rounded-lg shadow-lg p-2 flex flex-col space-y-2'>
              <button
                onClick={handleLogout}
                className='text-sm hover:text-gray-600 px-2 py-1 whitespace-nowrap'
              >
                로그아웃
              </button>
              <button
                onClick={handleAccountDelete}
                className='text-sm text-red-600 hover:text-red-400 px-2 py-1 whitespace-nowrap'
              >
                회원 탈퇴
              </button>
            </div>
          )}
        </div>
      </div>

      <div className='relative flex flex-col items-center mt-16 mb-6'>
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

      <div className='flex items-center mr-2 mb-4 space-x-4'>
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
            className='px-2 py-1 text-[#8F8B8D] hover:text-gray-700 flex items-center'
          >
            <HiDotsVertical className='text-xl' />
          </button>
        )}

        {isDeleteMode && (
          <div className='flex items-center space-x-2'>
            <button
              onClick={toggleDeleteMode}
              className='px-2 py-1 bg-gray-300 text-white rounded-md'
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
      {activeTab === 'likedSnaps' && <LikedSnaps />}
    </div>
  );
}
