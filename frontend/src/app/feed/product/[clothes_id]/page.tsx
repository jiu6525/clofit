'use client';

import { useEffect, useState } from 'react';
import { useParams, useRouter } from 'next/navigation';
import Image from 'next/image';
import axiosInstance from '@/api/axiosInstance';

export default function ProductDetailPage() {
  const { clothes_id } = useParams();
  const router = useRouter();
  const [product, setProduct] = useState(null);

  useEffect(() => {
    if (clothes_id) {
      axiosInstance
        .get(`/clothes/${clothes_id}`)
        .then((response) => setProduct(response.data))
        .catch((err) =>
          console.error('상품 정보를 불러오는 중 문제가 발생했습니다.', err)
        );
    }
  }, [clothes_id]);

  if (!product) return <div>로딩 중...</div>;

  const handleAddToCloset = () => {
    axiosInstance
      .post('/closet', {
        memberId: 1, // 회원 ID
        clothesId: product.id, // 상품 ID
      })
      .then((response) => {
        // 옷장에 추가된 상품 정보 출력
        console.log('옷장에 추가된 아이템 정보:', {
          id: product.id,
          name: product.item,
          imgPath: product.imgPath,
        });

        // 성공 메시지 표시
        alert(`옷장에 '${product.item}'이(가) 추가되었습니다.`);
      })
      .catch((err) => {
        console.error('옷장에 추가하는 중 문제가 발생했습니다.', err);
        alert('옷장에 추가하지 못했습니다. 다시 시도해주세요.');
      });
  };

  const handleGoToProduct = () => {
    window.open(product.itemUrl, '_blank'); // 상품 페이지로 이동
  };

  return (
    <div className='flex flex-col h-[calc(100vh-76px)] overflow-hidden'>
      {/* 상단 탑바 */}
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

      {/* 메인 이미지 */}
      <div className='flex-shrink-0 w-full aspect-[5/6] relative overflow-hidden'>
        <Image
          src={product.imgPath}
          alt={product.item}
          fill
          className='object-cover'
        />
      </div>

      {/* 상품 정보 */}
      <div className='flex-grow flex flex-col p-4'>
        <div className='flex justify-between items-center'>
          <h1 className='text-lg font-medium'>{product.item}</h1>
        </div>
        <p className='text-gray-500 text-xs mt-1'>
          {product.style || '카테고리 정보 없음'}
        </p>

        {/* 가격 정보 */}
        <div className='flex items-center mt-4'>
          <span className='text-2xl font-semibold text-gray-900'>
            {product.price.toLocaleString()}원
          </span>
        </div>

        {/* 버튼 영역 */}
        <div className='flex w-full mt-auto'>
          <button
            className='w-1/2 bg-gray-200 text-black py-3 text-center font-semibold'
            onClick={handleAddToCloset}
          >
            옷장에 추가하기
          </button>
          <button
            className='w-1/2 bg-black text-white py-3 text-center font-semibold'
            onClick={handleGoToProduct}
          >
            상품 보러 가기
          </button>
        </div>
      </div>
    </div>
  );
}
