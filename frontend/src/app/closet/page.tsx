'use client';

import { useState, useEffect } from 'react';
import axiosInstance from '@/api/axiosInstance';
import { useRouter } from 'next/navigation';
import { FaCamera } from 'react-icons/fa';
import { SlPicture } from 'react-icons/sl';
import { IoSearch } from 'react-icons/io5';
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

const Closet = () => {
  const [closetItems, setClosetItems] = useState<ClosetItem[]>([]);
  const [selectedCategory, setSelectedCategory] = useState('전체');
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [selectedItems, setSelectedItems] = useState<number[]>([]); // 삭제 모드에서 선택된 아이템
  const [isDeleteMode, setIsDeleteMode] = useState(false); // 삭제 모드 활성화 여부
  const [selectedImage, setSelectedImage] = useState<File | null>(null); // 갤러리에서 선택된 이미지
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

  const filteredItems = closetItems.filter((item) =>
    selectedCategory === '전체'
      ? true
      : item.clothes.category === selectedCategory
  );

  const toggleModal = () => setIsModalOpen((prev) => !prev);

  const toggleDeleteMode = () => {
    setIsDeleteMode(!isDeleteMode);
    if (!isDeleteMode) {
      setSelectedItems([]);
    }
  };

  const handleSelectItem = (id: number) => {
    if (selectedItems.includes(id)) {
      setSelectedItems(selectedItems.filter((itemId) => itemId !== id));
    } else {
      setSelectedItems([...selectedItems, id]);
    }
  };

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
      setIsDeleteMode(false);
    } catch (error) {
      console.error('아이템 삭제 중 오류 발생:', error);
      setError('아이템 삭제 중 문제가 발생했습니다.');
    }
  };

  const handleGalleryUpload = async () => {
    if (!selectedImage) {
      alert('이미지를 선택해주세요.');
      return;
    }

    try {
      const formData = new FormData();
      formData.append('file', selectedImage);

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

      <div className='w-full max-w-[600px] flex-grow flex flex-col items-center px-4'>
        {isLoading ? (
          <div className='flex justify-center items-center h-full'>
            <div className='w-12 h-12 border-4 border-gray-300 border-t-gray-900 rounded-full animate-spin'></div>
          </div>
        ) : error ? (
          <p className='text-red-500 text-center'>{error}</p>
        ) : (
          <div className='w-full'>
            <div className='flex justify-around border-b mt-2 text-sm sm:text-sm'>
              {['전체', 'top', 'bottom'].map((category) => (
                <button
                  key={category}
                  className={`py-2 px-3 ${
                    selectedCategory === category
                      ? 'text-black border-b-2 border-black'
                      : 'text-gray-400'
                  }`}
                  onClick={() => setSelectedCategory(category)}
                >
                  {category === '전체' ? '전체' : `카테고리 ${category}`}
                </button>
              ))}
            </div>

            <div className='flex justify-between mt-4 px-6'>
              {isDeleteMode ? (
                <button
                  onClick={handleDeleteItems}
                  className='px-4 py-2 bg-red-500 text-white rounded-lg text-sm font-semibold'
                >
                  선택한 아이템 삭제
                </button>
              ) : (
                <button
                  onClick={toggleModal}
                  className='px-4 py-2 bg-blue-500 text-white rounded-lg text-sm font-semibold'
                >
                  아이템 추가하기
                </button>
              )}
              <button
                onClick={toggleDeleteMode}
                className={`px-4 py-2 ${
                  isDeleteMode ? 'bg-gray-500' : 'bg-red-500'
                } text-white rounded-lg text-sm font-semibold`}
              >
                {isDeleteMode ? '선택 모드 종료' : '아이템 삭제하기'}
              </button>
            </div>

            <div className='grid grid-cols-2 gap-4 mt-4 p-4'>
              {filteredItems.map((item) => (
                <ItemCard
                  key={item.id}
                  item={item}
                  isSelected={selectedItems.includes(item.id)}
                  isDeleteMode={isDeleteMode}
                  onSelect={handleSelectItem}
                />
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
              <button onClick={toggleModal}>✕</button>
            </div>
            <div className='flex flex-col gap-4'>
              <button
                className='flex items-center gap-6 p-2 text-left font-medium'
                onClick={() => {
                  toggleModal();
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
                  onChange={async (e) => {
                    if (e.target.files && e.target.files[0]) {
                      const selectedFile = e.target.files[0];
                      console.log('선택된 파일:', selectedFile); // 선택된 파일 로그 추가

                      try {
                        const formData = new FormData();
                        formData.append('file', selectedFile);

                        console.log('FormData:', formData); // FormData 디버깅 로그

                        const response = await axiosInstance.post(
                          '/clothes/upload',
                          formData,
                          {
                            headers: {
                              'Content-Type': 'multipart/form-data',
                            },
                          }
                        );

                        console.log('서버 응답 데이터:', response.data); // 서버 응답 확인
                        router.push(
                          `/closet/add?data=${encodeURIComponent(JSON.stringify(response.data))}`
                        );
                      } catch (err) {
                        console.error('이미지 업로드 중 오류 발생:', err);
                        alert('이미지 업로드에 실패했습니다.');
                      }
                    } else {
                      console.log('파일이 선택되지 않았습니다.');
                    }
                  }}
                />
              </button>

              <button
                className='flex items-center gap-6 p-2 text-left font-medium'
                onClick={() => {
                  toggleModal();
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

const ItemCard = React.memo(
  ({
    item,
    isSelected,
    isDeleteMode,
    onSelect,
  }: {
    item: ClosetItem;
    isSelected: boolean;
    isDeleteMode: boolean;
    onSelect: (id: number) => void;
  }) => (
    <div
      className={`relative w-full aspect-square border rounded overflow-hidden ${
        isDeleteMode && isSelected ? 'border-red-500' : 'border-gray-300'
      }`}
      onClick={() => isDeleteMode && onSelect(item.id)}
    >
      <img
        src={item.clothes.imgPath}
        alt={`Item ${item.clothes.id}`}
        className={`absolute inset-0 w-full h-full object-cover ${
          isDeleteMode ? 'cursor-pointer' : ''
        }`}
      />
      {isDeleteMode && (
        <div
          className={`absolute inset-0 flex justify-center items-center ${
            isSelected ? 'bg-red-500 bg-opacity-50' : ''
          }`}
        >
          {isSelected && <span className='text-white text-2xl'>✔</span>}
        </div>
      )}
    </div>
  )
);

export default Closet;
