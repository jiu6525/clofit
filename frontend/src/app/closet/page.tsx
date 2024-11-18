'use client';

import { useState, useEffect } from 'react';
import axiosInstance from '@/api/axiosInstance';
import { useRouter } from 'next/navigation';
import { HiDotsVertical } from 'react-icons/hi';
import { FiPlus } from 'react-icons/fi';
import { BsCheckCircle, BsCircle } from 'react-icons/bs';
import ClothesModal from './components/ClothesModal';

// Closet API 응답 타입
interface ClosetItem {
  id: number;
  clothes: {
    id: number;
    imgPath: string;
    style: string;
    category: string;
    price: number | null;
    itemUrl: string | null;
    myClothesYn: string;
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
  const [isClothesModalOpen, setIsClothesModalOpen] = useState(false);
  const [selectedClothes, setSelectedClothes] = useState<
    ClosetItem['clothes'] | null
  >(null);
  const [isLoading, setIsLoading] = useState(false); // 옷장 조회 로딩
  const [isCategorizing, setIsCategorizing] = useState(false); // 갤러리 업로드 로딩
  const [error, setError] = useState<string | null>(null);
  const [selectedItems, setSelectedItems] = useState<number[]>([]);
  const [isDeleteMenuOpen, setIsDeleteMenuOpen] = useState(false);
  const router = useRouter();

  useEffect(() => {
    const fetchClosetItems = async () => {
      setIsLoading(true); // 로딩 시작
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
        setIsLoading(false); // 로딩 종료
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
    setIsLoading(true); // 로딩 시작
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
    } finally {
      setIsLoading(false); // 로딩 종료
    }
  };

  const handleGalleryUpload = async (file: File) => {
    setIsLoading(true); // 로딩 시작
    setIsCategorizing(true); // 갤러리 업로드 중 상태 활성화
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
    } finally {
      setIsLoading(false); // 로딩 종료
      setIsCategorizing(false); // 업로드 중 상태 해제
    }
  };

  const handleOpenClothesModal = (clothes: ClosetItem['clothes']) => {
    setSelectedClothes(clothes);
    setIsClothesModalOpen(true);
  };

  const handleCloseClothesModal = () => {
    setSelectedClothes(null);
    setIsClothesModalOpen(false);
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

          {/* 삭제 모드가 활성화된 경우 삭제/취소 버튼 표시 */}
          {isDeleteMenuOpen ? (
            <div className='flex space-x-2'>
              <button
                onClick={() => setIsDeleteMenuOpen(false)}
                className='px-2 py-1 bg-gray-300 text-white rounded-md'
              >
                취소
              </button>
              <button
                onClick={handleDeleteItems}
                className='px-2 py-1 bg-red-600 text-white rounded-md'
              >
                삭제
              </button>
            </div>
          ) : (
            <button onClick={() => setIsDeleteMenuOpen((prev) => !prev)}>
              <HiDotsVertical className='text-xl text-gray-500' />
            </button>
          )}
        </div>

        {/* 옷장 그리드 */}
        <div className='grid grid-cols-3 gap-0'>
          {/* 아이템 추가하기 버튼 */}
          <div className='relative w-full aspect-[5/6] bg-gray-200 flex items-center justify-center cursor-pointer'>
            <input
              type='file'
              accept='image/*'
              className='absolute inset-0 opacity-0 cursor-pointer'
              onChange={(e) => {
                if (e.target.files && e.target.files[0]) {
                  handleGalleryUpload(e.target.files[0]); // 갤러리 선택과 동일한 처리
                }
              }}
            />
            <FiPlus className='text-gray-500 text-4xl' />
          </div>

          {/* 옷장 항목 */}
          {filteredItems.map((item) => (
            <div
              key={item.id}
              className='relative w-full aspect-[5/6] bg-gray-200 overflow-hidden cursor-pointer'
              onClick={() => {
                if (!isDeleteMenuOpen) {
                  handleOpenClothesModal(item.clothes);
                }
              }}
            >
              <img
                src={item.clothes.imgPath}
                alt={`Item ${item.clothes.id}`}
                className='w-full h-full object-cover'
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

      {/* 옷 상세정보 모달 */}
      <ClothesModal
        isOpen={isClothesModalOpen}
        clothes={selectedClothes}
        onClose={handleCloseClothesModal}
      />

      {/* 로딩 스피너 */}
      {(isLoading || isCategorizing) && (
        <div className='fixed inset-0 bg-black bg-opacity-50 flex flex-col justify-center items-center z-50'>
          <div className='w-16 h-16 border-4 border-gray-200 border-t-black rounded-full animate-spin'></div>
          {isCategorizing && (
            <p className='text-white mt-4'>
              옷의 카테고리와 색상을 분류 중입니다.
            </p>
          )}
        </div>
      )}
    </div>
  );
};

export default Closet;
