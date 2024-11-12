// components/CategoryFilter.tsx
import React from 'react';

type CategoryFilterProps = {
  activeTab: string;
  onTabClick: (tab: string) => void;
};

function CategoryFilter({ activeTab, onTabClick }: CategoryFilterProps) {
  const categories = ['전체', '상품', '코디'];

  return (
    <div className='w-full flex justify-around text-base font-medium my-2'>
      {categories.map((tab) => (
        <span
          key={tab}
          onClick={() => onTabClick(tab)}
          className={`pb-1 border-b-2 ${
            activeTab === tab
              ? 'text-[#373A3F] border-black'
              : 'text-[#9095A1] border-transparent'
          } cursor-pointer`}
        >
          {tab}
        </span>
      ))}
    </div>
  );
}

export default CategoryFilter;
