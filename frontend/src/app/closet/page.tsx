'use client';

import { useState, useEffect } from 'react';
import axiosInstance from '@/api/axiosInstance';
import { useRouter } from 'next/navigation';
import { FaCamera } from 'react-icons/fa';
import { SlPicture } from 'react-icons/sl';
import { IoSearch } from 'react-icons/io5';
import { HiDotsVertical } from 'react-icons/hi';
import { FiPlus } from 'react-icons/fi';
import { BsCheckCircle, BsCircle } from 'react-icons/bs';
import React from 'react';

// Closet API 응답 타입
interface ClosetItem {
  id: number;
  clothes: {
    id: number;
    imgPath: string;
    style: string;
    category: string; // top, bottom 등
  };
}

// 카테고리 매핑
const CATEGORY_MAP: { [key: string]: string } = {
  전체: '전체',
  상의: 'top',
  하의: 'bottom',
};

const Closet = () => {
  const [closetItems, setClosetItems] = useState<ClosetItem[]>([]);
  const [activeTab, setActiveTab] = useState('전체'); // 현재 탭 ('전체', '상의', '하의')
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [selectedItems, setSelectedItems] = useState<number[]>([]);
  const [isDeleteMenuOpen, setIsDeleteMenuOpen] = useState(false);
  const router = useRouter();

  useEffect(() => {
    const fetchClosetItems = async () => {
      setIsLoading(true);
      setError(null);
      try {
        const response =
          await axiosInstance.get<ClosetItem[]>('/closet/mycloset');
        const sortedItems = response.data.sort((a, b) => b.id - a.id);
        setClosetItems(sortedItems);
      } catch (error) {
        console.error('옷장 데이터를 가져오는 중 문제가 발생했습니다:', error);
        setError('옷장 데이터를 불러오는 중 오류가 발생했습니다.');
      } finally {
        setIsLoading(false);
      }
    };

    fetchClosetItems();
  }, []);

  // 선택된 탭에 따라 필터링
  const filteredItems = closetItems.filter((item) =>
    activeTab === '전체'
      ? true
      : item.clothes.category === CATEGORY_MAP[activeTab]
  );

  const handleDeleteItems = async () => {
    try {
      await axiosInstance({
        method: 'delete',
        url: '/closet',
        data: { closetIds: selectedItems },
      });
      setClosetItems(
        closetItems.filter((item) => !selectedItems.includes(item.id))
      );
      setSelectedItems([]);
      setIsDeleteMenuOpen(false);
    } catch (error) {
      console.error('아이템 삭제 중 오류 발생:', error);
      setError('아이템 삭제 중 문제가 발생했습니다.');
    }
  };

  const handleGalleryUpload = async (file: File) => {
    try {
      const formData = new FormData();
      formData.append('file', file);

      const response = await axiosInstance.post('/clothes/upload', formData, {
        headers: {
          'Content-Type': 'multipart/form-data',
        },
      });

      router.push(
        `/closet/add?data=${encodeURIComponent(JSON.stringify(response.data))}`
      );
    } catch (err) {
      console.error('이미지 업로드 중 오류 발생:', err);
      alert('이미지 업로드에 실패했습니다.');
    }
  };

  return (
    <div className='flex flex-col items-center w-full min-h-screen bg-white'>
      <header className='w-full max-w-[600px] py-4 px-6 text-left'>
        <h1 className='text-2xl font-semibold'>옷장</h1>
      </header>

      <div className='w-full max-w-[600px]'>
        {/* 상단 탭 */}
        <div className='flex justify-between items-center px-4 mb-4'>
          <div className='flex items-center space-x-4'>
            {['전체', '상의', '하의'].map((tab) => (
              <button
                key={tab}
                onClick={() => {
                  setActiveTab(tab);
                  setIsDeleteMenuOpen(false); // 필터링 시 삭제 메뉴 닫기
                }}
                className={`px-2 py-1 text-sm font-semibold ${
                  activeTab === tab
                    ? 'border-b-2 border-black text-black'
                    : 'text-gray-400'
                }`}
              >
                {tab}
              </button>
            ))}
          </div>
          <div>
            <button onClick={() => setIsDeleteMenuOpen((prev) => !prev)}>
              <HiDotsVertical className='text-xl text-gray-500' />
            </button>
          </div>
        </div>

        {/* 삭제 및 취소 메뉴 */}
        {isDeleteMenuOpen && (
          <div className='flex justify-end space-x-2 px-4 mb-2'>
            <button
              onClick={() => setIsDeleteMenuOpen(false)}
              className='px-4 py-2 bg-gray-300 text-white rounded-md'
            >
              취소
            </button>
            <button
              onClick={handleDeleteItems}
              className='px-4 py-2 bg-red-500 text-white rounded-md'
            >
              삭제
            </button>
          </div>
        )}

        {/* 옷장 그리드 */}
        <div className='grid grid-cols-3 gap-0'>
          {/* 아이템 추가하기 버튼 */}
          <div
            className='relative w-full aspect-[5/6] bg-gray-200 flex items-center justify-center cursor-pointer'
            onClick={() => setIsModalOpen(true)}
          >
            <FiPlus className='text-gray-500 text-4xl' />
          </div>

          {/* 옷장 항목 */}
          {filteredItems.map((item) => (
            <div
              key={item.id}
              className='relative w-full aspect-[5/6] bg-gray-200 overflow-hidden cursor-pointer'
            >
              <img
                src={item.clothes.imgPath}
                alt={`Item ${item.clothes.id}`}
                className={`w-full h-full object-cover ${
                  isDeleteMenuOpen && selectedItems.includes(item.id)
                    ? 'opacity-50'
                    : ''
                }`}
              />
              {isDeleteMenuOpen && (
                <button
                  onClick={() => {
                    if (selectedItems.includes(item.id)) {
                      setSelectedItems(
                        selectedItems.filter((id) => id !== item.id)
                      );
                    } else {
                      setSelectedItems([...selectedItems, item.id]);
                    }
                  }}
                  className='absolute top-2 right-2 text-blue-500'
                >
                  {selectedItems.includes(item.id) ? (
                    <BsCheckCircle className='text-red-500 text-2xl' />
                  ) : (
                    <BsCircle className='text-gray-300 text-2xl' />
                  )}
                </button>
              )}
            </div>
          ))}
        </div>
      </div>

      {/* Modal */}
      {isModalOpen && (
        <div className='fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center'>
          <div className='bg-white rounded-lg w-full max-w-[600px] p-6'>
            <div className='flex justify-between items-center mb-4'>
              <h2 className='text-lg font-semibold'>아이템 추가하기</h2>
              <button onClick={() => setIsModalOpen(false)}>✕</button>
            </div>
            <div className='flex flex-col gap-4'>
              <button
                className='flex items-center gap-6 p-2 text-left font-medium'
                onClick={() => {
                  setIsModalOpen(false);
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
                      handleGalleryUpload(e.target.files[0]);
                    }
                  }}
                />
              </button>
              <button
                className='flex items-center gap-6 p-2 text-left font-medium'
                onClick={() => {
                  setIsModalOpen(false);
                  router.push('/feed');
                }}
              >
                <IoSearch size={24} /> 추천 아이템 둘러보기
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default Closet;
