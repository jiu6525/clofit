import React, { useEffect, useRef } from 'react';
import { ClothesItem } from '../page';

interface ProductModalProps {
  item: ClothesItem;
  onClose: () => void;
}

const ProductModal = React.memo(({ item, onClose }: ProductModalProps) => {
  const modalRef = useRef<HTMLDivElement>(null);

  const handleClickOutside = (event: MouseEvent) => {
    if (modalRef.current && !modalRef.current.contains(event.target as Node)) {
      onClose();
    }
  };

  useEffect(() => {
    document.addEventListener('mousedown', handleClickOutside);
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, []);

  return (
    <div className='fixed inset-0 flex items-center justify-center bg-black bg-opacity-50'>
      <div
        ref={modalRef}
        className='relative bg-white rounded-lg max-w-xs w-full shadow-lg overflow-hidden p-4'
      >
        {/* Close button (X icon) */}
        <button
          onClick={onClose}
          className='absolute top-2 right-2 text-gray-500 hover:text-gray-700'
        >
          <svg
            xmlns='http://www.w3.org/2000/svg'
            className='h-6 w-6'
            fill='none'
            viewBox='0 0 24 24'
            stroke='currentColor'
          >
            <path
              strokeLinecap='round'
              strokeLinejoin='round'
              strokeWidth='2'
              d='M6 18L18 6M6 6l12 12'
            />
          </svg>
        </button>

        {/* Item name */}
        <div className='text-center m-4'>
          <h2 className='text-lg font-semibold text-gray-900'>{item.item}</h2>
        </div>

        {/* Item details with left and right alignment */}
        <div className='space-y-2 text-sm' style={{ color: '#5E596E' }}>
          <div className='flex justify-between'>
            <span>가격</span>
            <span>{item.price}원</span>
          </div>
          <div className='flex justify-between'>
            <span>스타일</span>
            <span>{item.style}</span>
          </div>
          <div className='flex justify-between'>
            <span>시즌</span>
            <span>{item.season}</span>
          </div>
          <div className='flex justify-between'>
            <span>메인 컬러</span>
            <span>{item.mainColor || '정보 없음'}</span>
          </div>
        </div>

        {/* Action buttons */}
        <div className='p-4 flex space-x-2 mt-4'>
          <button
            onClick={onClose}
            className='w-full py-2 text-white rounded-md hover:bg-gray-800 flex-1'
            style={{ backgroundColor: '#080020' }}
          >
            옷장에 추가
          </button>
          <a
            href={item.itemUrl}
            target='_blank'
            rel='noopener noreferrer'
            className='w-full py-2 text-center bg-white border border-gray-300 rounded-md hover:bg-gray-50 flex-1'
            style={{ color: '#080020' }}
          >
            상품 보러 가기
          </a>
        </div>
      </div>
    </div>
  );
});

export default ProductModal;
