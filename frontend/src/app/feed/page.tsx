'use client';

import { useState, useEffect, useMemo, useCallback } from 'react';
import axiosInstance from '@/api/axiosInstance';
import Navbar from '@/components/Navbar';
import Image from 'next/image';
import CategoryFilter from './components/CategoryFilter';
import ProductModal from './components/ProductModal';

export interface ClothesItem {
  id: number;
  brand: object;
  textile: string | null;
  item: string;
  price: number;
  imgPath: string;
  style: string;
  season: string;
  category: string;
  itemUrl: string;
  mainColor: string | null;
  myClothesYn: string;
  delClothesYn: string;
  type: '상품' | '스냅'; // 상품/스냅을 구분하기 위한 속성
}

export default function FeedPage() {
  const [activeTab, setActiveTab] = useState('전체');
  const [productItems, setProductItems] = useState<ClothesItem[]>([]);
  const [snapItems, setSnapItems] = useState<ClothesItem[]>([]);
  const [selectedItem, setSelectedItem] = useState<ClothesItem | null>(null);
  const [errorMessage, setErrorMessage] = useState<string | null>(null);

  // 상품 데이터 API 호출
  useEffect(() => {
    axiosInstance
      .get<ClothesItem[]>('/clothes')
      .then((response) => {
        // 상품 데이터에 type 속성을 '상품'으로 추가
        const productsWithType: ClothesItem[] = response.data.map((item) => ({
          ...item,
          type: '상품' as const, // type 속성을 '상품'으로 명시적으로 설정
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
        brand: {},
        textile: null,
        item: 'Hooded Zip Up Sweater Brown',
        price: 191200,
        imgPath: 'https://clofit-s3-bucket.s3.amazonaws.com/cloth/top/5.png',
        style: '맨투맨/스웨트',
        season: '2024 FW',
        category: '0',
        itemUrl: 'https://www.musinsa.com/products/4491769',
        mainColor: null,
        myClothesYn: 'N',
        delClothesYn: 'N',
        type: '스냅', // 스냅 데이터임을 나타내는 type 속성 추가
      },
    ];
    setSnapItems(snapData);
  }, []);

  // 탭에 따라 다른 카테고리의 아이템을 필터링
  const filteredItems = useMemo(() => {
    if (activeTab === '전체') {
      return [...productItems, ...snapItems];
    }
    if (activeTab === '상품') {
      return productItems;
    }
    if (activeTab === '스냅') {
      return snapItems;
    }
    return [];
  }, [activeTab, productItems, snapItems]);

  const handleTabClick = useCallback((tab: string) => {
    setActiveTab(tab);
  }, []);

  const openModal = useCallback((item: ClothesItem) => {
    console.log('Clicked item:', item);
    if (item.type === '상품') {
      setSelectedItem(item);
    }
  }, []);

  const closeModal = useCallback(() => {
    setSelectedItem(null);
  }, []);

  return (
    <div className='flex flex-col items-center w-full min-h-screen bg-white'>
      <header className='w-full py-4 px-6 text-left'>
        <h1 className='text-2xl font-semibold'>피드</h1>
      </header>
      <CategoryFilter activeTab={activeTab} onTabClick={handleTabClick} />
      {errorMessage && <div className='text-red-500 mt-4'>{errorMessage}</div>}
      <div className='grid grid-cols-3 gap-0 w-full max-w-[1024px] mx-auto'>
        {filteredItems.map((item) => (
          <div
            key={item.id}
            className='w-full aspect-[5/6] relative'
            onClick={() => openModal(item)}
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
      {selectedItem && (
        <ProductModal item={selectedItem} onClose={closeModal} />
      )}
      <Navbar />
    </div>
  );
}
