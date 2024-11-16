'use client';

import { useState, useEffect } from 'react';
import axiosInstance from '@/api/axiosInstance';
import { useRouter } from 'next/navigation';
import { FaPlus } from 'react-icons/fa';
import { FaCamera } from 'react-icons/fa';
import { SlPicture } from 'react-icons/sl';
import { IoSearch } from 'react-icons/io5';

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

export default function Closet() {
  const [closetItems, setClosetItems] = useState<ClosetItem[]>([]);
  const [filteredItems, setFilteredItems] = useState<ClosetItem[]>([]);
  const [hasItems, setHasItems] = useState(false);
  const [selectedCategory, setSelectedCategory] = useState('전체');
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isLoading, setIsLoading] = useState(true); // 로딩 상태 추가
  const router = useRouter();

  // 옷장 데이터를 가져오는 함수
  useEffect(() => {
    fetchItems();
  }, []);

  async function fetchItems() {
    setIsLoading(true); // 로딩 시작
    try {
      const response = await axiosInstance.get<ClosetItem[]>('/closet/1');
      setClosetItems(response.data);
      setFilteredItems(response.data);
      setHasItems(response.data.length > 0);
    } catch (error) {
      console.error('옷장 데이터를 가져오는 중 문제가 발생했습니다:', error);
    } finally {
      setIsLoading(false); // 로딩 종료
    }
  }

  // 카테고리 필터링 함수
  const handleCategoryFilter = (category: string) => {
    setSelectedCategory(category);

    if (category === '전체') {
      setFilteredItems(closetItems);
    } else {
      setFilteredItems(
        closetItems.filter((item) => item.clothes.category === category)
      );
    }
  };

  // 모달 열기 및 닫기 핸들러
  const handleOpenModal = () => setIsModalOpen(true);
  const handleCloseModal = () => setIsModalOpen(false);

  const handleDeleteItems = () => {
    alert('아이템 삭제 기능 준비 중');
  };

  return (
    <div className='flex flex-col items-center w-full min-h-screen bg-white'>
      <header className='w-full max-w-[600px] py-4 px-6 text-left'>
        <h1 className='text-2xl font-semibold'>옷장</h1>
      </header>

      {/* Main Content */}
      <div className='w-full max-w-[600px] flex-grow flex flex-col items-center px-4'>
        {isLoading ? (
          // 로딩 스피너
          <div className='flex justify-center items-center h-full'>
            <div className='w-12 h-12 border-4 border-gray-300 border-t-gray-900 rounded-full animate-spin'></div>
          </div>
        ) : (
          <div className='w-full'>
            {/* 카테고리 필터 탭 */}
            <div className='flex justify-around border-b mt-2 text-sm sm:text-sm'>
              {['전체', 'top', 'bottom'].map((category) => (
                <button
                  key={category}
                  className={`py-2 px-3 ${
                    selectedCategory === category
                      ? 'text-black border-b-2 border-black'
                      : 'text-gray-400'
                  }`}
                  onClick={() => handleCategoryFilter(category)}
                >
                  {category === '전체' ? '전체' : `카테고리 ${category}`}
                </button>
              ))}
            </div>

            {/* 추가/삭제 버튼 */}
            <div className='flex justify-between mt-4 px-6'>
              <button
                onClick={handleOpenModal}
                className='px-4 py-2 bg-blue-500 text-white rounded-lg text-sm font-semibold'
              >
                아이템 추가하기
              </button>
              <button
                onClick={handleDeleteItems}
                className='px-4 py-2 bg-red-500 text-white rounded-lg text-sm font-semibold'
              >
                아이템 삭제하기
              </button>
            </div>

            {/* 아이템 목록 */}
            <div className='grid grid-cols-2 gap-4 mt-4 p-4'>
              {filteredItems.map((item) => (
                <div
                  key={item.id}
                  className='relative w-full aspect-square border rounded overflow-hidden'
                >
                  <img
                    src={item.clothes.imgPath}
                    alt={`Item ${item.clothes.id}`}
                    className='absolute inset-0 w-full h-full object-cover'
                  />
                </div>
              ))}
            </div>
          </div>
        )}
      </div>

      {/* Modal */}
      {isModalOpen && (
        <div className='fixed inset-0 bg-black bg-opacity-50 flex justify-center items-end'>
          <div className='bg-white rounded-t-lg w-full max-w-[600px] p-4 h-80'>
            <div className='flex justify-between items-center mb-8'>
              <h2 className='text-lg font-semibold flex-1 text-center'>
                아이템 추가하기
              </h2>
              <button onClick={handleCloseModal}>✕</button>
            </div>
            <div className='flex flex-col gap-4'>
              <button
                className='flex items-center gap-6 p-2 text-left font-medium'
                onClick={() => {
                  handleCloseModal();
                  router.push('/closet/camera'); // 카메라 페이지로 이동
                }}
              >
                <FaCamera size={24} /> 사진 찍기
              </button>
              <button
                className='flex items-center gap-6 p-2 text-left font-medium'
                onClick={() => alert('갤러리에서 선택하기 기능 준비 중')}
              >
                <SlPicture size={24} /> 갤러리에서 선택하기
              </button>
              <button
                className='flex items-center gap-6 p-2 text-left font-medium'
                onClick={() => {
                  handleCloseModal();
                  router.push('/feed'); // 추천 아이템 둘러보기 클릭
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
}
