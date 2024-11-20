'use client';

import { useEffect, useState } from 'react';
import { useParams, useRouter } from 'next/navigation';
import Image from 'next/image';
import axiosInstance from '@/api/axiosInstance';

export default function ProductDetailPage() {
  const { clothes_id } = useParams();
  const router = useRouter();
  const [product, setProduct] = useState(null);
  const [error, setError] = useState<string | null>(null);
  const [addedToCloset, setAddedToCloset] = useState(false);

  useEffect(() => {
    if (clothes_id) {
      axiosInstance
        .get(`/clothes/${clothes_id}`)
        .then((response) => setProduct(response.data))
        .catch((err) => {
          console.error('Error fetching product:', err);
          setError(
            '상품 정보를 불러오는데 문제가 발생했습니다. 다시 시도해주세요.'
          );
        });
    }
  }, [clothes_id]);

  if (error) {
    return (
      <div className='flex items-center justify-center w-full h-full'>
        <p className='text-red-500'>{error}</p>
      </div>
    );
  }

  if (!product) {
    return (
      <div className='flex items-center justify-center w-full h-full'>
        <div className='animate-spin rounded-full h-10 w-10 border-t-2 border-b-2 border-blue-500'></div>
      </div>
    );
  }

  const handleAddToCloset = () => {
    axiosInstance
      .post('/closet', { clothesId: product.id })
      .then(() => {
        setAddedToCloset(true);
        alert(`옷장에 '${product.item}'이(가) 추가되었습니다.`);
      })
      .catch((err) => {
        if (err.response?.status === 409) {
          alert('이미 옷장에 등록된 아이템입니다.');
        } else {
          console.error('Error adding to closet:', err);
          alert('옷장에 추가하는 중 문제가 발생했습니다. 다시 시도해주세요.');
        }
      });
  };

  return (
    <div className='flex flex-col w-full h-full overflow-hidden'>
      <div className='w-full h-14 bg-white flex items-center px-4 shadow'>
        <button onClick={() => router.back()} className='text-gray-500'>
          <svg
            width='28'
            height='28'
            viewBox='0 0 20 20'
            fill='none'
            xmlns='http://www.w3.org/2000/svg'
            className='stroke-black'
          >
            <path
              d='M11.5 15.5L6.212 10.212a.3.3 0 0 1 0-.424L11.5 4.5'
              strokeWidth='1.4'
              vectorEffect='non-scaling-stroke'
            />
          </svg>
        </button>
      </div>

      <div className='flex-shrink-0 w-full aspect-[5/6] relative overflow-hidden'>
        <Image
          src={product.imgPath}
          alt={product.item}
          fill
          className='object-cover'
        />
      </div>

      <div className='flex-grow flex flex-col p-4'>
        <h1 className='text-lg font-medium'>{product.item}</h1>
        <p className='text-gray-500 text-xs mt-1'>
          {product.style || '카테고리 정보 없음'}
        </p>
        <div className='flex items-center mt-4'>
          <span className='text-2xl font-semibold text-gray-900'>
            {product.price.toLocaleString()}원
          </span>
        </div>

        <div className='flex w-full mt-auto'>
          <button
            className={`w-1/2 py-3 text-center font-semibold ${
              addedToCloset
                ? 'bg-gray-500 text-white'
                : 'bg-gray-200 text-black'
            }`}
            onClick={handleAddToCloset}
            disabled={addedToCloset}
          >
            {addedToCloset ? '이미 추가됨' : '옷장에 추가하기'}
          </button>
          <a
            href={product.itemUrl}
            target='_blank'
            rel='noopener noreferrer'
            className='w-1/2 bg-black text-white py-3 text-center font-semibold'
          >
            상품 보러 가기
          </a>
        </div>
      </div>
    </div>
  );
}
