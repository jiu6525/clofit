'use client';

import React, { useState } from 'react';
import Navbar from '@/components/Navbar';
import Image from 'next/image';
import CategoryFilter from './components/CategoryFilter';

export default function FeedPage() {
  const [activeTab, setActiveTab] = useState('전체');

  // Sample items data
  const sampleItems = [
    { id: 1, type: '상품', src: '/images/product1.jpg' },
    { id: 2, type: '상품', src: '/images/product2.jpg' },
    { id: 3, type: '코디', src: '/images/coordin1.jpg' },
    { id: 4, type: '코디', src: '/images/coordin2.jpg' },
  ];

  // Filter items based on active tab
  const filteredItems = sampleItems.filter((item) => {
    if (activeTab === '전체') return true; // Show all items for '전체'
    return item.type === activeTab; // Filter by type for '상품' or '코디'
  });

  const handleTabClick = (tab: string) => {
    setActiveTab(tab);
  };

  return (
    <div className='flex flex-col items-center w-full min-h-screen bg-white'>
      {/* Header */}
      <header className='w-full py-4 px-6 text-left'>
        <h1 className='text-2xl font-semibold'>탐색</h1>
      </header>

      {/* Category Filter */}
      <CategoryFilter activeTab={activeTab} onTabClick={handleTabClick} />

      {/* Image Grid */}
      <div className='grid grid-cols-3 gap-0 w-full max-w-[1024px] mx-auto'>
        {filteredItems.map((item) => (
          <div key={item.id} className='w-full aspect-square relative'>
            <Image
              src={item.src}
              alt={`item ${item.id}`}
              layout='fill'
              objectFit='cover'
              className='w-full h-full'
            />
          </div>
        ))}
      </div>

      {/* Bottom Navigation */}
      <Navbar />
    </div>
  );
}
