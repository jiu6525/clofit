'use client';

import { useState, useEffect, useMemo, useCallback } from 'react';
import { useRouter } from 'next/navigation';
import axiosInstance from '@/api/axiosInstance';
import Navbar from '@/components/Navbar';
import Image from 'next/image';
import CategoryFilter from './components/CategoryFilter';

export interface ClothesItem {
  id: number;
  brand: object | null;
  textile: string | null;
  item: string;
  price: number;
  imgPath: string;
  style: string;
  season: string;
  category: string; // 'top', 'bottom', etc.
  itemUrl: string;
  mainColor: string | null;
  myClothesYn: string;
  delClothesYn: string;
  type: '상품' | '스냅'; // 상품/스냅을 구분하기 위한 속성
}

export default function FeedPage() {
  const [activeTab, setActiveTab] = useState('전체'); // 전체, 상품, 스냅 탭
  const [subCategory, setSubCategory] = useState('전체'); // 상품 탭 하위 필터링 ('전체', '상의', '하의')
  const [productItems, setProductItems] = useState<ClothesItem[]>([]);
  const [snapItems, setSnapItems] = useState<ClothesItem[]>([]);
  const [errorMessage, setErrorMessage] = useState<string | null>(null);
  const router = useRouter();

  // 상품 데이터 API 호출
  useEffect(() => {
    axiosInstance
      .get<ClothesItem[]>('/clothes')
      .then((response) => {
        const productsWithType: ClothesItem[] = response.data.map((item) => ({
          ...item,
          type: '상품' as const,
        }));
        setProductItems(productsWithType);
      })
      .catch((error) => {
        console.error('데이터 가져오기 오류:', error);
        setErrorMessage('데이터를 불러오는 중 문제가 발생했습니다.');
      });
  }, []);

  // 스냅 데이터 하드코딩
  useEffect(() => {
    const snapData: ClothesItem[] = [
      {
        id: 5,
        brand: null,
        textile: null,
        item: 'Hooded Zip Up Sweater Brown',
        price: 191200,
        imgPath: 'https://clofit-s3-bucket.s3.amazonaws.com/cloth/top/5.png',
        style: '맨투맨/스웨트',
        season: '2024 FW',
        category: 'top',
        itemUrl: 'https://www.musinsa.com/products/4491769',
        mainColor: null,
        myClothesYn: 'N',
        delClothesYn: 'N',
        type: '스냅',
      },
    ];
    setSnapItems(snapData);
  }, []);

  // 필터링된 아이템 계산
  const filteredItems = useMemo(() => {
    if (activeTab === '전체') {
      return [...productItems, ...snapItems];
    }
    if (activeTab === '상품') {
      if (subCategory === '상의') {
        return productItems.filter((item) => item.category === 'top');
      }
      if (subCategory === '하의') {
        return productItems.filter((item) => item.category === 'bottom');
      }
      return productItems; // 상품 전체
    }
    if (activeTab === '스냅') {
      return snapItems;
    }
    return [];
  }, [activeTab, subCategory, productItems, snapItems]);

  const handleTabClick = useCallback((tab: string) => {
    setActiveTab(tab);
    if (tab !== '상품') {
      setSubCategory('전체'); // 상품 외 다른 탭으로 이동 시 서브 카테고리 초기화
    }
  }, []);

  const handleSubCategoryClick = useCallback((category: string) => {
    setSubCategory(category);
  }, []);

  const handleItemClick = useCallback(
    (item: ClothesItem) => {
      if (item.type === '상품') {
        router.push(`/feed/product/${item.id}`);
      } else {
        router.push(`/feed/snap/${item.id}`);
      }
    },
    [router]
  );

  return (
    <div className='flex flex-col items-center w-full min-h-screen bg-white'>
      <header className='w-full py-4 px-6 text-left'>
        <h1 className='text-2xl font-semibold'>피드</h1>
      </header>

      {/* 메인 탭 필터 */}
      <CategoryFilter activeTab={activeTab} onTabClick={handleTabClick} />

      {/* 상품 탭의 하위 카테고리 필터 */}
      {activeTab === '상품' && (
        <div className='flex justify-center space-x-4 my-4'>
          {['전체', '상의', '하의'].map((category) => (
            <button
              key={category}
              className={`px-4 py-2 rounded ${
                subCategory === category
                  ? 'bg-black text-white'
                  : 'bg-gray-200 text-gray-800'
              }`}
              onClick={() => handleSubCategoryClick(category)}
            >
              {category}
            </button>
          ))}
        </div>
      )}

      {errorMessage && <div className='text-red-500 mt-4'>{errorMessage}</div>}

      <div className='grid grid-cols-3 gap-0 w-full max-w-[1024px] mx-auto'>
        {filteredItems.map((item, index) => (
          <div
            key={`${item.id}-${index}`}
            className='w-full aspect-[5/6] relative'
            onClick={() => handleItemClick(item)}
          >
            <Image
              src={item.imgPath}
              alt={item.item}
              fill
              priority={true}
              sizes='33vw'
              className='object-cover w-full h-full'
            />
          </div>
        ))}
      </div>
      <Navbar />
    </div>
  );
}
