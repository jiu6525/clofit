import React from 'react';
import axiosInstance from '@/api/axiosInstance'; // axiosInstance 가져오기
import { AiOutlineClose } from 'react-icons/ai';

export interface ClothesModalProps {
  isOpen: boolean;
  clothes: {
    id: number;
    imgPath: string;
    style: string;
    category: string; // top, bottom
    price: number | null;
    itemUrl: string | null;
    myClothesYn: string;
  } | null;
  onClose: () => void;
}

const ClothesModal: React.FC<ClothesModalProps> = ({
  isOpen,
  clothes,
  onClose,
}) => {
  if (!isOpen || !clothes) return null;

  // 카테고리 매핑
  const CATEGORY_MAP: { [key: string]: string } = {
    top: '상의',
    bottom: '하의',
  };

  // 옷장에 넣기 핸들러
  const handleAddToCloset = async () => {
    try {
      const response = await axiosInstance.post('/closet', {
        clothesId: clothes.id,
      });
      alert('옷장에 성공적으로 추가되었습니다!');
    } catch (error) {
      console.error('옷장에 넣기 실패:', error);
      alert('옷장에 추가하는 데 실패했습니다. 다시 시도해 주세요.');
    }
  };

  return (
    <div className='fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center z-50'>
      <div className='bg-white p-6 rounded-md w-full max-w-xs relative'>
        {/* 닫기 버튼 */}
        <button
          onClick={onClose}
          className='absolute top-4 right-4 text-gray-500 hover:text-black'
        >
          <AiOutlineClose size={20} />
        </button>

        {/* 이미지 */}
        <div className='w-full flex justify-center'>
          <img
            src={clothes.imgPath}
            alt={`Clothes ${clothes.id}`}
            className='w-36 h-36 object-contain rounded-md'
          />
        </div>

        {/* 정보 */}
        <div className='flex justify-between items-center mt-6 px-4 py-2 border rounded-md'>
          <p className='text-sm font-semibold text-gray-600'>
            {CATEGORY_MAP[clothes.category] || '기타'}
          </p>
          {clothes.myClothesYn === 'N' && clothes.price && (
            <p className='text-sm font-semibold text-gray-600'>
              {clothes.price}원
            </p>
          )}
        </div>

        {/* 버튼 */}
        <div className='mt-6 flex justify-between space-x-2'>
          {clothes.myClothesYn === 'N' && (
            <button
              onClick={handleAddToCloset}
              className='w-1/2 px-4 py-2 text-center text-white bg-gray-700 rounded-md hover:bg-gray-900'
            >
              옷장에 넣기
            </button>
          )}
          {clothes.myClothesYn === 'N' && clothes.itemUrl && (
            <a
              href={clothes.itemUrl}
              target='_blank'
              rel='noopener noreferrer'
              className='w-1/2 px-4 py-2 text-center text-white bg-black rounded-md hover:bg-blue-800'
            >
              사러가기
            </a>
          )}
        </div>

        {clothes.myClothesYn !== 'N' && (
          <button
            onClick={onClose}
            className='block w-full px-4 py-2 mt-2 text-center text-white bg-black rounded-md'
          >
            닫기
          </button>
        )}
      </div>
    </div>
  );
};

export default ClothesModal;
