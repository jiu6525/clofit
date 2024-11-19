'use client';

import { useState } from 'react';
import axiosInstance from '@/api/axiosInstance'; // axiosInstance로 변경

interface RecentFittingModalProps {
  isOpen: boolean;
  onClose: () => void;
  imageUrl: string | null;
  onConfirm: (action: 'save' | 'delete', publicYn?: 'Y' | 'N') => void;
  uuid: string | null; // 삭제 및 업데이트를 위해 UUID 전달
}

export default function RecentFittingModal({
  isOpen,
  onClose,
  imageUrl,
  onConfirm,
  uuid,
}: RecentFittingModalProps) {
  const [isPublic, setIsPublic] = useState(false); // 공개 여부 설정
  const [loading, setLoading] = useState(false); // 요청 상태 관리

  const handleToggle = () => {
    setIsPublic((prev) => !prev);
  };

  const handleSave = () => {
    const publicYn = isPublic ? 'Y' : 'N';
    onConfirm('save', publicYn); // 부모 컴포넌트에만 상태 전달
  };

  const handleDelete = () => {
    onConfirm('delete'); // 삭제 요청
  };

  if (!isOpen || !imageUrl) return null;

  return (
    <div className='fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50'>
      <div className='bg-white rounded-lg shadow-lg p-6 w-[300px] relative'>
        {/* 닫기 버튼 (X 아이콘) */}
        <button
          className='absolute top-2 right-2 text-gray-500 hover:text-gray-700'
          onClick={onClose}
        >
          <svg
            xmlns='http://www.w3.org/2000/svg'
            className='h-6 w-6'
            fill='none'
            viewBox='0 0 24 24'
            stroke='currentColor'
          >
            <path
              strokeLinecap='round'
              strokeLinejoin='round'
              strokeWidth='2'
              d='M6 18L18 6M6 6l12 12'
            />
          </svg>
        </button>

        <img
          src={imageUrl}
          alt='피팅 이미지'
          className='w-full h-full object-cover rounded-lg mt-4 mb-4'
        />

        {/* 공개 여부 토글 */}
        <div className='flex items-center justify-between mb-4 ml-2'>
          <span className='text-medium'>공개 여부</span>
          <label className='relative inline-flex items-center cursor-pointer'>
            <input
              type='checkbox'
              className='sr-only peer'
              checked={isPublic}
              onChange={handleToggle}
            />
            <div className="w-11 h-6 bg-gray-200 rounded-full peer peer-checked:bg-blue-600 after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:after:translate-x-full peer-checked:after:border-white"></div>
          </label>
        </div>

        {/* 액션 버튼 */}
        <div className='flex justify-between'>
          <button
            className='px-4 py-2 w-[45%] text-black bg-white border border-gray-300 rounded-lg hover:bg-gray-100'
            onClick={handleDelete}
          >
            삭제
          </button>
          <button
            className='px-4 py-2 w-[45%] text-white bg-black rounded-lg hover:bg-gray-800'
            onClick={handleSave}
            disabled={loading} // 로딩 중에는 버튼 비활성화
          >
            {loading ? '저장 중...' : '저장'}
          </button>
        </div>
      </div>
    </div>
  );
}
