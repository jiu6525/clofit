'use client';

import { FaCamera } from 'react-icons/fa';
import { SlPicture } from 'react-icons/sl';
import { IoSearch } from 'react-icons/io5';
import { useRouter } from 'next/navigation';

interface AddItemModalProps {
  isOpen: boolean;
  onClose: () => void;
  onFileUpload: (file: File) => void;
}

export default function AddItemModal({
  isOpen,
  onClose,
  onFileUpload,
}: AddItemModalProps) {
  const router = useRouter();

  if (!isOpen) return null;

  return (
    <div className='fixed inset-0 bg-black bg-opacity-50 flex justify-center items-end'>
      <div className='bg-white rounded-t-lg w-full max-w-[600px] p-6 h-[45vh] overflow-y-auto'>
        <div className='flex justify-between items-center mb-4'>
          <h2 className='text-lg font-semibold'>아이템 추가하기</h2>
          <button onClick={onClose}>✕</button>
        </div>
        <div className='flex flex-col gap-4'>
          <button
            className='flex items-center gap-6 p-2 text-left font-medium'
            onClick={() => {
              onClose();
              router.push('/closet/camera');
            }}
          >
            <FaCamera size={24} /> 사진 찍기
          </button>
          <button className='flex items-center gap-6 p-2 text-left font-medium relative'>
            <SlPicture size={24} /> 갤러리에서 선택하기
            <input
              type='file'
              accept='image/*'
              className='absolute inset-0 opacity-0 cursor-pointer'
              onChange={(e) => {
                if (e.target.files && e.target.files[0]) {
                  onFileUpload(e.target.files[0]);
                }
              }}
            />
          </button>
          <button
            className='flex items-center gap-6 p-2 text-left font-medium'
            onClick={() => {
              onClose();
              router.push('/feed');
            }}
          >
            <IoSearch size={24} /> 추천 아이템 둘러보기
          </button>
        </div>
      </div>
    </div>
  );
}
