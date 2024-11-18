'use client';

import React, { useState } from 'react';
import axiosInstance from '@/api/axiosInstance'; // axiosInstance import

// 팔레트 색상 데이터 타입
interface PaletteColor {
  id: number;
  rgb: string;
  colorName: string;
}

interface PaletteModalProps {
  isOpen: boolean;
  onClose: () => void;
  onSelectColor: (color: PaletteColor) => void;
  colors: PaletteColor[];
}

const PaletteModal: React.FC<PaletteModalProps> = ({
  isOpen,
  onClose,
  onSelectColor,
  colors,
}) => {
  const [selectedColor, setSelectedColor] = useState<PaletteColor | null>(null); // 선택된 색상 상태

  const handleSave = async () => {
    if (!selectedColor) {
      alert('색상을 선택해주세요!');
      return;
    }

    try {
      // PUT 요청 보내기
      const response = await axiosInstance.put(
        `/member/personal-color/${selectedColor.id}`
      );
      console.log('색상 업데이트 성공:', response.data);

      // 선택된 색상 처리
      onSelectColor(selectedColor);
      onClose();
    } catch (error) {
      console.error('색상 업데이트 실패:', error);
      alert('색상을 업데이트하는 데 실패했습니다.');
    }
  };

  if (!isOpen) return null;

  return (
    <div className='fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50'>
      <div className='bg-white rounded-lg shadow-lg p-6 w-[320px] relative'>
        {/* 닫기 버튼 */}
        <button
          className='absolute top-2 right-2 text-gray-400 hover:text-gray-600'
          onClick={onClose}
        >
          ✕
        </button>

        {/* 제목 */}
        <h2 className='font-semibold text-gray-800 mb-4 text-center'>
          필터링 색상을 선택하세요
        </h2>

        {/* 색상 팔레트 */}
        <div className='grid grid-cols-4 gap-3'>
          {colors.map((color) => (
            <div
              key={color.id}
              className={`w-12 h-12 rounded-full shadow-md cursor-pointer transform transition-transform duration-200 hover:scale-105 hover:shadow-lg ${
                selectedColor?.id === color.id ? 'ring-2 ring-blue-500' : ''
              }`}
              style={{
                backgroundColor: `rgb(${color.rgb})`,
              }}
              onClick={() => setSelectedColor(color)} // 선택된 색상 업데이트
              title={color.colorName}
            />
          ))}
        </div>

        {/* 저장 버튼 */}
        <button
          className='mt-6 w-full py-2 text-sm font-medium text-white bg-gray-800 rounded-md hover:bg-gray-700 focus:outline-none focus:ring focus:ring-gray-400'
          onClick={handleSave} // 저장 버튼 클릭 시 API 요청
        >
          저장
        </button>
      </div>
    </div>
  );
};

export default PaletteModal;
