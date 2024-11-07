'use client';

import { useEffect, useState, useRef } from 'react';
import { useRouter } from 'next/navigation';
import { FaCamera } from 'react-icons/fa';
import { SlPicture } from 'react-icons/sl';
import { IoSearch } from 'react-icons/io5';

interface Item {
  id: number;
  name: string;
  type: string;
  category: string;
}

export default function Closet() {
  const [hasItems, setHasItems] = useState(true);
  const [selectedSource, setSelectedSource] = useState('전체');
  const [selectedCategory, setSelectedCategory] = useState('전체');
  const [isModalOpen, setIsModalOpen] = useState(false);

  const fileInputRef = useRef<HTMLInputElement | null>(null); // 파일 입력 요소의 참조 생성
  const router = useRouter();

  // 아이템 목록 (예시 데이터)
  const allItems: Item[] = [
    { id: 1, name: '티셔츠', type: '내 옷', category: '티셔츠' },
    { id: 2, name: '청바지', type: '내 옷', category: '청바지' },
    { id: 3, name: '셔츠', type: '상품', category: '셔츠' },
    { id: 4, name: '후드티', type: '상품', category: '후드티' },
    { id: 5, name: '티셔츠', type: '상품', category: '티셔츠' },
  ];

  // 아이템을 가져오는 함수 (임시 설정)
  useEffect(() => {
    fetchItems();
  }, []);

  async function fetchItems() {
    try {
      setHasItems(true); // 임시로 아이템이 있다고 설정
    } catch (error) {
      console.error('아이템 로딩 중 에러 발생:', error);
    }
  }

  // 필터링 로직
  const filteredItems = allItems.filter((item) => {
    const sourceMatch =
      selectedSource === '전체' || item.type === selectedSource;
    const categoryMatch =
      selectedCategory === '전체' || item.category === selectedCategory;
    return sourceMatch && categoryMatch;
  });

  // 모달 열기 및 닫기 핸들러
  const handleOpenModal = () => {
    setIsModalOpen(true);
  };

  const handleCloseModal = () => {
    setIsModalOpen(false);
  };

  // 파일 선택 이벤트 핸들러
  const handleFileSelect = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (file) {
      console.log('Selected file:', file);
      // 여기에서 파일을 업로드하거나 필요한 처리를 할 수 있습니다.
    }
  };

  return (
    <div className='flex flex-col items-center w-full min-h-screen bg-white'>
      <header className='w-full max-w-[600px] py-4 px-6 text-left'>
        <h1 className='text-2xl font-semibold'>옷장</h1>
      </header>

      {/* Main Content */}
      <div className='w-full max-w-[600px] flex-grow flex flex-col items-center px-4'>
        {hasItems ? (
          <div className='w-full'>
            {/* 출처 필터 탭 */}
            <div className='w-full flex justify-around text-base font-medium my-2'>
              {['전체', '내 옷', '상품'].map((source) => (
                <span
                  key={source}
                  onClick={() => setSelectedSource(source)}
                  className={`pb-1 border-b-2 cursor-pointer ${
                    selectedSource === source
                      ? 'text-[#373A3F] border-black'
                      : 'text-[#9095A1] border-transparent'
                  }`}
                >
                  {source}
                </span>
              ))}
            </div>

            {/* 카테고리 필터 탭 */}
            <div className='flex justify-around border-b mt-2 text-sm sm:text-sm'>
              {['전체', '티셔츠', '청바지', '셔츠', '후드티'].map(
                (category) => (
                  <button
                    key={category}
                    className={`py-2 px-3 ${
                      selectedCategory === category
                        ? 'text-black border-b-2 border-black'
                        : 'text-gray-400'
                    }`}
                    onClick={() => setSelectedCategory(category)}
                  >
                    {category}
                  </button>
                )
              )}
            </div>

            {/* 아이템 목록 */}
            <div className='grid grid-cols-2 gap-4 mt-4 p-4'>
              {filteredItems.map((item) => (
                <div
                  key={item.id}
                  className='border rounded p-4 flex justify-center items-center w-full max-w-[260px]'
                >
                  {item.name}
                </div>
              ))}
            </div>
          </div>
        ) : (
          <div className='flex flex-col items-center justify-center h-full text-center w-full max-w-[600px] px-4'>
            <img
              src='/images/empty-closet-icon.svg'
              alt='Empty Closet Icon'
              className='w-16 h-16 mb-4'
            />
            <p className='text-lg text-[#4A4A4A] font-medium mb-2'>
              옷장이 비어있어요.
            </p>
            <p className=' text-[#717171] mb-4'>
              옷장을 아이템으로 채워보세요.
            </p>
            <button
              className='bg-[#171A1F] text-white rounded-md mt-4 mb-16 px-10 py-3'
              onClick={handleOpenModal}
            >
              아이템 추가 하러 가기
            </button>
          </div>
        )}
      </div>

      {/* 모달 */}
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
                onClick={() => fileInputRef.current?.click()}
              >
                <SlPicture size={24} /> 갤러리에서 선택하기
              </button>
              <button
                className='flex items-center gap-6 p-2 text-left font-medium'
                onClick={() => {
                  handleCloseModal();
                  router.push('/feed'); // 추천 아이템 둘러보기 클릭 시 /feed로 이동
                }}
              >
                <IoSearch size={24} /> 추천 아이템 둘러보기
              </button>

              {/* 숨겨진 파일 입력 요소 */}
              <input
                type='file'
                accept='image/*'
                ref={fileInputRef}
                className='hidden'
                onChange={handleFileSelect}
              />
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
