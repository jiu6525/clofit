'use client';

import { useEffect, useState } from 'react';

export default function Closet() {
  const [hasItems, setHasItems] = useState(true);
  const [selectedSource, setSelectedSource] = useState('전체');
  const [selectedCategory, setSelectedCategory] = useState('전체');

  // 아이템 목록 (예시 데이터)
  const allItems = [
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
            <div className='flex justify-around border-b text-sm sm:text-sm'>
              {['전체', '내 옷', '상품'].map((source) => (
                <button
                  key={source}
                  className={`py-2 px-3 ${
                    selectedSource === source
                      ? 'text-black border-b-2 border-black'
                      : 'text-gray-400'
                  }`}
                  onClick={() => setSelectedSource(source)}
                >
                  {source}
                </button>
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
            <p className='text-lg font-semibold mb-2'>옷장이 비어있어요.</p>
            <p className='text-sm text-gray-500 mb-4'>
              옷장을 아이템으로 채워보세요.
            </p>
            <button className='bg-black text-white rounded-md px-4 py-2'>
              아이템 추가 하러 가기
            </button>
          </div>
        )}
      </div>
    </div>
  );
}
