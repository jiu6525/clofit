'use client';

import { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import axiosInstance from '@/api/axiosInstance';

type ClosetItem = {
  id: number;
  clothes: {
    id: number;
    item: string;
    imgPath: string;
    category: string;
    itemUrl: string;
  };
};

type AddClothesProps = {
  params?: Record<string, string>;
  searchParams?: Record<string, string | undefined>;
};

export default function AddClothes({ searchParams = {} }: AddClothesProps) {
  const [closetItems, setClosetItems] = useState<ClosetItem[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const router = useRouter();

  const type = searchParams.type || 'top';
  const baseImageUrl = searchParams.baseImageUrl || '';

  useEffect(() => {
    const fetchClosetItems = async () => {
      setLoading(true);
      setError(null);
      try {
        const response =
          await axiosInstance.get<ClosetItem[]>('/closet/mycloset');
        const filteredItems = response.data.filter(
          (item) => item.clothes.category === type
        );
        setClosetItems(filteredItems);
      } catch (error) {
        console.error('아이템 로드 실패:', error);
        setError('아이템을 불러오는 중 문제가 발생했습니다.');
      } finally {
        setLoading(false);
      }
    };

    fetchClosetItems();
  }, [type]);

  const handleItemSelect = (itemId: number, itemUrl: string) => {
    router.push(
      `/fitting/add/confirm?type=${type}&baseImageUrl=${encodeURIComponent(
        baseImageUrl
      )}&itemId=${itemId}&itemUrl=${encodeURIComponent(itemUrl)}`
    );
  };

  return (
    <div className='relative flex flex-col items-center w-full min-h-screen bg-white'>
      <div className='relative flex flex-col items-center w-full max-w-[600px] p-4'>
        <header className='w-full py-4 px-6 text-left'>
          <h1 className='text-2xl font-semibold'>
            {type === 'top' ? '상의 선택' : '하의 선택'}
          </h1>
        </header>

        {error ? (
          <p className='text-red-500 text-center'>{error}</p>
        ) : loading ? (
          <div className='flex items-center justify-center w-full h-40'>
            <div className='animate-spin rounded-full h-10 w-10 border-t-2 border-b-2 border-blue-500'></div>
          </div>
        ) : closetItems.length === 0 ? (
          <p className='text-gray-500 text-sm'>등록된 아이템이 없습니다.</p>
        ) : (
          <div className='grid grid-cols-2 gap-4 w-full mt-6'>
            {closetItems.map((item) => (
              <button
                key={item.id}
                onClick={() => handleItemSelect(item.id, item.clothes.imgPath)}
                className='relative border-2 border-gray-300 hover:border-blue-500 rounded-lg overflow-hidden aspect-[5/6]'
              >
                <img
                  src={item.clothes.imgPath}
                  alt={item.clothes.item}
                  className='object-contain w-full h-full'
                />
                <div className='absolute bottom-0 left-0 right-0 bg-black bg-opacity-50 text-white text-sm px-2 py-1 text-center'>
                  {item.clothes.item}
                </div>
              </button>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}
