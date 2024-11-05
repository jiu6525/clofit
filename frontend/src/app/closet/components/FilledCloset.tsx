// src/app/closet/components/FilledCloset.tsx

'use client';

import { useState } from 'react';

export default function FilledCloset() {
  // 출처와 카테고리 필터 상태 관리
  const [selectedSource, setSelectedSource] = useState('전체');
  const [selectedCategory, setSelectedCategory] = useState('전체');

  // 아이템 목록 (예시 데이터)
  const allItems = [
    { id: 1, name: '티셔츠', type: '내 옷', category: '티셔츠' },
    { id: 2, name: '청바지', type: '내 옷', category: '청바지' },
    { id: 3, name: '셔츠', type: '상품', category: '셔츠' },
    { id: 4, name: '후드티', type: '상품', category: '후드티' },
    { id: 5, name: '티셔츠', type: '상품', category: '티셔츠' },
    // 추가 아이템 데이터...
  ];

  // 필터링 로직
  const filteredItems = allItems.filter((item) => {
    const sourceMatch =
      selectedSource === '전체' || item.type === selectedSource;
    const categoryMatch =
      selectedCategory === '전체' || item.category === selectedCategory;
    return sourceMatch && categoryMatch;
  });

  return (
    <div>
      {/* 출처 필터 탭 */}
      <div className='flex justify-around border-b'>
        {['전체', '내 옷', '상품'].map((source) => (
          <button
            key={source}
            className={`py-2 px-4 ${
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
      <div className='flex justify-around border-b mt-2'>
        {['전체', '티셔츠', '청바지', '셔츠', '후드티'].map((category) => (
          <button
            key={category}
            className={`py-2 px-4 ${
              selectedCategory === category
                ? 'text-black border-b-2 border-black'
                : 'text-gray-400'
            }`}
            onClick={() => setSelectedCategory(category)}
          >
            {category}
          </button>
        ))}
      </div>

      {/* 아이템 목록 */}
      <div className='grid grid-cols-2 gap-4 mt-4 p-4'>
        {filteredItems.map((item) => (
          <div
            key={item.id}
            className='border rounded p-4 flex justify-center items-center'
          >
            {item.name}
          </div>
        ))}
      </div>
    </div>
  );
}
