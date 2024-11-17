'use client';

export const dynamicParams = true; // 동적 URL 파라미터 허용
export const dynamic = 'force-dynamic';

import { Suspense, useState } from 'react';
import { useSearchParams } from 'next/navigation';
import { useRouter } from 'next/navigation';
import { IoChevronBack, IoChevronForward } from 'react-icons/io5';
import axiosInstance from '@/api/axiosInstance';

// 색상 데이터
const colors = [
  { id: 1, rgb: '0,0,0', colorName: '블랙' },
  { id: 2, rgb: '139,69,19', colorName: '새들브라운' },
  { id: 3, rgb: '255,165,0', colorName: '오렌지' },
  { id: 4, rgb: '255,255,0', colorName: '옐로우' },
  { id: 5, rgb: '0,128,0', colorName: '그린' },
  { id: 6, rgb: '0,0,255', colorName: '블루' },
  { id: 7, rgb: '255,192,203', colorName: '핑크' },
  { id: 8, rgb: '255,0,0', colorName: '레드' },
  { id: 9, rgb: '72,209,204', colorName: '미디엄쿼터즈' },
  { id: 10, rgb: '50,205,50', colorName: '라임그린' },
  { id: 11, rgb: '240,230,140', colorName: '카키' },
  { id: 12, rgb: '192,192,192', colorName: '실버' },
  { id: 13, rgb: '255,99,71', colorName: '토마토' },
];

function AddClothingContent() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const data = searchParams.get('data');
  const responseData = data ? JSON.parse(decodeURIComponent(data)) : null;

  const [category, setCategory] = useState(responseData?.category || '');
  const [colorId, setColorId] = useState(responseData?.colorId || null);
  const [isCategoryModalOpen, setIsCategoryModalOpen] = useState(false);
  const [isColorModalOpen, setIsColorModalOpen] = useState(false);

  const categoryMap = {
    top: '상의',
    bottom: '하의',
  };

  const reverseCategoryMap = {
    상의: 'top',
    하의: 'bottom',
  };

  const colorInfo = colors.find((color) => color.id === colorId);

  const handleSave = async () => {
    try {
      const payload = {
        category: reverseCategoryMap[category] || category,
        style: responseData.style,
        colorId: colorId,
      };

      await axiosInstance.put(`/clothes/${responseData.clothesId}`, payload);

      const postPayload = { clothesId: responseData.clothesId };
      await axiosInstance.post('/closet', postPayload);

      alert('옷이 성공적으로 수정 및 추가되었습니다!');
      router.push('/closet');
    } catch (error) {
      console.error('요청 처리 중 오류 발생:', error);
      alert('요청 처리에 실패했습니다.');
    }
  };

  if (!responseData) {
    return (
      <div className='flex flex-col items-center w-full min-h-screen bg-white pb-16'>
        <h1 className='text-2xl font-bold mt-16'>
          데이터를 불러올 수 없습니다.
        </h1>
        <button
          onClick={() => router.push('/closet')}
          className='mt-8 px-4 py-2 bg-black text-white rounded-lg'
        >
          옷장으로 돌아가기
        </button>
      </div>
    );
  }

  return (
    <div className='flex flex-col items-center w-full min-h-screen bg-white pb-16'>
      <header className='w-full flex items-center justify-between p-4'>
        <button onClick={() => router.back()} className='text-xl'>
          <IoChevronBack size={24} />
        </button>
        <h1 className='text-xl text-[#373A3F] font-medium'>내 옷 등록하기</h1>
        <button
          onClick={() => router.push('/closet')}
          className='text-[#373A3F] font-medium'
        >
          취소
        </button>
      </header>

      <div className='w-full max-w-md mx-auto'>
        <img
          src={responseData.imagePath}
          alt='Uploaded'
          className='w-screen h-[50vh] object-cover rounded-none'
        />
        <div className='w-full bg-white rounded-lg p-4 mt-4'>
          <h2 className='text-lg font-semibold mb-6'>어떤 옷인가요?</h2>

          <div
            className='flex justify-between py-4 cursor-pointer'
            onClick={() => setIsCategoryModalOpen(true)}
          >
            <span className='text-[#373A3F] font-medium'>카테고리</span>
            <div className='flex items-center gap-2'>
              <span className='text-[#373A3F]'>{categoryMap[category]}</span>
              <IoChevronForward size={18} className='text-gray-400' />
            </div>
          </div>

          <div
            className='flex justify-between py-4 items-center cursor-pointer'
            onClick={() => setIsColorModalOpen(true)}
          >
            <span className='text-[#373A3F] font-medium'>색상</span>
            {colorInfo ? (
              <div className='flex items-center gap-2'>
                <div
                  className='w-6 h-6 rounded-full'
                  style={{ backgroundColor: `rgb(${colorInfo.rgb})` }}
                />
                <span className='text-[#373A3F]'>{colorInfo.colorName}</span>
                <IoChevronForward size={18} className='text-gray-400' />
              </div>
            ) : (
              <div className='flex items-center gap-2'>
                <span className='text-[#373A3F]'>알 수 없음</span>
                <IoChevronForward size={18} className='text-gray-400' />
              </div>
            )}
          </div>
        </div>
      </div>

      {isCategoryModalOpen && (
        <div className='fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center'>
          <div className='bg-white rounded-lg p-4 w-full max-w-md'>
            <h3 className='text-lg font-medium mb-4'>카테고리 선택</h3>
            {Object.keys(categoryMap).map((key) => (
              <button
                key={key}
                className={`block w-full py-2 px-4 mb-2 text-left rounded-lg ${
                  category === key ? 'bg-gray-200' : ''
                }`}
                onClick={() => {
                  setCategory(key);
                  setIsCategoryModalOpen(false);
                }}
              >
                {categoryMap[key]}
              </button>
            ))}
          </div>
        </div>
      )}

      {isColorModalOpen && (
        <div className='fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center'>
          <div className='bg-white rounded-lg p-4 w-full max-w-md h-[70vh] overflow-y-scroll'>
            <h3 className='text-lg font-medium mb-4'>색상 수정하기</h3>
            {colors.map((color) => (
              <button
                key={color.id}
                className='flex items-center gap-4 w-full py-2 px-4 mb-2 text-left rounded-lg'
                onClick={() => {
                  setColorId(color.id);
                  setIsColorModalOpen(false);
                }}
              >
                <div
                  className='w-6 h-6 rounded-full'
                  style={{
                    backgroundColor: `rgb(${color.rgb})`,
                  }}
                />
                <span>{color.colorName}</span>
              </button>
            ))}
          </div>
        </div>
      )}

      <button
        onClick={handleSave}
        className='fixed bottom-0 w-full max-w-[600px] py-6 bg-black text-white text-lg font-semibold'
      >
        확인
      </button>
    </div>
  );
}

export default function AddClothingPage() {
  return (
    <Suspense fallback={<div>Loading...</div>}>
      <AddClothingContent />
    </Suspense>
  );
}
