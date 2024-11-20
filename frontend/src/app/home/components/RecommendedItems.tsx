'use client';

import React, { useState } from 'react';
import Image from 'next/image';
import Slider from 'react-slick';
import useMemberStore from '@/stores/useMemberStore';
import PaletteModal from '../../../components/PaletteModal'; // 팔레트 모달 import

interface ClothesItem {
  id: number;
  imgPath: string;
  item: string;
  price: number;
  style: string;
  season: string;
  category: string;
  itemUrl: string;
  myClothesYn: string;
}

interface RecommendedItemsProps {
  memberName: string | null;
  items: ClothesItem[];
  onItemClick: (item: ClothesItem) => void;
}

const colorMapping = [
  { id: 1, rgb: '0,0,0', colorName: '블랙' },
  { id: 2, rgb: '139,69,19', colorName: '브라운' },
  { id: 3, rgb: '255,165,0', colorName: '오렌지' },
  { id: 4, rgb: '255,255,0', colorName: '옐로우' },
  { id: 5, rgb: '0,0,255', colorName: '블루' },
  { id: 6, rgb: '255,192,203', colorName: '핑크' },
  { id: 7, rgb: '255,0,0', colorName: '레드' },
  { id: 8, rgb: '255,255,255', colorName: '화이트' },
  { id: 9, rgb: '50,205,50', colorName: '그린' },
  { id: 10, rgb: '240,230,140', colorName: '카키' },
  { id: 11, rgb: '192,192,192', colorName: '실버' },
];

const RecommendedItems: React.FC<RecommendedItemsProps> = ({
  memberName,
  items,
  onItemClick,
}) => {
  const { memberInfo, setMemberInfo } = useMemberStore(); // 스토어 사용
  const [isPaletteOpen, setIsPaletteOpen] = useState(false);

  const handleSelectColor = (color: {
    id: number;
    rgb: string;
    colorName: string;
  }) => {
    setMemberInfo({
      ...memberInfo,
      personalColor: color.id.toString(), // 선택한 색상 ID로 업데이트
    });
  };

  return (
    <section className='w-full'>
      <div className='flex justify-between items-center ml-3 mr-3 my-4'>
        <h2 className='font-medium text-[#373A3F]'>
          {memberInfo?.memberName || '회원'} 님을 위한 아이템 추천
        </h2>
        <span
          className='text-sm text-gray-500 underline cursor-pointer'
          onClick={() => setIsPaletteOpen(true)}
        >
          색상 선택
        </span>
      </div>
      <div className='w-full'>
        <Slider
          {...{
            dots: false,
            infinite: false,
            speed: 500,
            slidesToShow: 3,
            slidesToScroll: 3,
            arrows: false,
          }}
        >
          {items.map((item, index) => (
            <div
              key={index}
              className='px-1 cursor-pointer'
              onClick={() => onItemClick(item)}
            >
              <div className='relative w-full aspect-[3/4] overflow-hidden'>
                <Image
                  src={item.imgPath}
                  alt={item.item}
                  width={200}
                  height={300}
                  className='object-cover'
                />
              </div>
            </div>
          ))}
        </Slider>
      </div>

      {/* 팔레트 모달 */}
      <PaletteModal
        isOpen={isPaletteOpen}
        onClose={() => setIsPaletteOpen(false)}
        onSelectColor={handleSelectColor}
        colors={colorMapping}
      />
    </section>
  );
};

export default RecommendedItems;
