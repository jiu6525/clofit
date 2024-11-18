'use client';

import React, { useState, useEffect } from 'react';
import useMemberStore from '@/stores/useMemberStore';
import axiosInstance from '@/api/axiosInstance';
import 'slick-carousel/slick/slick.css';
import 'slick-carousel/slick/slick-theme.css';
import Image from 'next/image';
import { useRouter } from 'next/navigation';
import Navbar from '@/components/Navbar';
import Slider from 'react-slick';
import { IoNotificationsOutline, IoChevronForward } from 'react-icons/io5';
import ClothesModal from './components/ClothesModal';
import RecommendedItems from './components/RecommendedItems';

// 타입 정의
interface MemberInfoResponse {
  memberName: string;
  personalColor: string;
  profileFilePath: string;
}

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

interface RecommendedItemsResponse {
  feeds: {
    type: string;
    clothes: ClothesItem;
  }[];
}

export default function MainPage() {
  const router = useRouter();
  const [currentSlide, setCurrentSlide] = useState(0);
  const { memberInfo, setMemberInfo } = useMemberStore(); // 스토어 사용
  const [recommendedItems, setRecommendedItems] = useState<ClothesItem[]>([]); // 추천 아이템 상태
  const [isModalOpen, setIsModalOpen] = useState(false); // 모달 열림 상태
  const [selectedClothes, setSelectedClothes] = useState<ClothesItem | null>(
    null
  ); // 선택된 아이템 데이터

  useEffect(() => {
    // 회원 정보 가져오기
    const fetchMemberInfo = async () => {
      try {
        const response =
          await axiosInstance.get<MemberInfoResponse>('/member/mypage');
        setMemberInfo(response.data);
        console.log('memberInfo 저장 성공:', response.data); // 추가 로그
      } catch (error) {
        console.error('memberInfo 불러오기 실패:', error);
      }
    };

    // 추천 아이템 가져오기
    const fetchRecommendedItems = async () => {
      try {
        const response = await axiosInstance.get<RecommendedItemsResponse>(
          '/feed/items/byColor'
        );
        const items = response.data.feeds.map((feed) => feed.clothes);
        setRecommendedItems(items);
        console.log('추천 아이템 불러오기 성공:', items);
      } catch (error) {
        console.error('추천 아이템 불러오기 실패:', error);
      }
    };

    fetchMemberInfo();
    fetchRecommendedItems();
  }, []);

  const slides = [
    {
      id: 1,
      src: '/images/mainslide1.png',
      smallText: '간편한 아이템 등록으로',
      largeText: '나만의 옷장 만들기',
      buttonText: '지금 등록하기',
      textColor: '#171A1F',
    },
    {
      id: 2,
      src: '/images/mainslide2.png',
      smallText: '텍스트 뭐라고 하냐',
      largeText: '미정입니다',
      buttonText: '지금 둘러보기',
      textColor: '#171A1F',
    },
    {
      id: 3,
      src: '/images/mainslide3.png',
      smallText: '추천 상품이 나와 어울릴지 궁금하다면',
      largeText: 'AI 가상 피팅',
      buttonText: '지금 피팅하기',
      textColor: '#FFFFFF',
    },
  ];

  const sliderSettings = {
    dots: false,
    infinite: true,
    speed: 500,
    slidesToShow: 1,
    slidesToScroll: 1,
    autoplay: true,
    autoplaySpeed: 3000,
    beforeChange: (_: number, next: number) => setCurrentSlide(next),
  };

  const handleItemClick = (item: ClothesItem) => {
    setSelectedClothes(item); // 선택된 아이템 설정
    setIsModalOpen(true); // 모달 열기
  };

  return (
    <div className='w-full min-h-screen bg-white flex justify-center'>
      <div className='w-full max-w-[600px] flex flex-col items-center'>
        {/* 헤더 */}
        <header className='w-full flex items-center justify-between py-4 px-6 mt-6'>
          <Image
            src='/logo.svg'
            alt='Clofit Logo'
            width={80}
            height={30}
            style={{ width: 'auto', height: 'auto' }}
          />
          <IoNotificationsOutline
            size={28}
            className='text-gray-700 cursor-pointer'
          />
        </header>

        {/* 슬라이드 섹션 */}
        <div className='w-full max-w-[600px] relative'>
          <Slider {...sliderSettings} className='overflow-hidden'>
            {slides.map((slide, index) => (
              <div key={slide.id} className='relative w-full'>
                <Image
                  src={slide.src}
                  alt={`슬라이드 이미지 ${slide.id}`}
                  width={600}
                  height={300}
                  className='object-cover w-full'
                  priority={index === 0} // 첫 번째 슬라이드 이미지 priority
                />
                <div className='absolute bottom-8 inset-x-0 flex flex-col items-center text-center'>
                  <p
                    className='text-sm font-semibold'
                    style={{ color: slide.textColor }}
                  >
                    {slide.smallText}
                  </p>
                  <p
                    className='font-bold text-2xl mb-1'
                    style={{ color: slide.textColor }}
                  >
                    {slide.largeText}
                  </p>
                  <button
                    onClick={() => router.push('/closet')}
                    className={`px-4 py-2 rounded-md text-sm flex items-center ${
                      slide.textColor === '#171A1F'
                        ? 'bg-[#171A1F] text-white'
                        : 'bg-white text-[#171A1F]'
                    }`}
                  >
                    {slide.buttonText}
                    <IoChevronForward size={16} className='ml-1' />
                  </button>
                </div>
              </div>
            ))}
          </Slider>
        </div>

        {/* 추천 아이템 섹션 */}
        <RecommendedItems
          memberName={memberInfo?.memberName || null}
          items={recommendedItems}
          onItemClick={handleItemClick}
        />

        {/* 모달 컴포넌트 */}
        <ClothesModal
          isOpen={isModalOpen}
          clothes={selectedClothes}
          onClose={() => setIsModalOpen(false)}
        />

        {/* 하단 네비게이션 */}
        <Navbar />
      </div>
    </div>
  );
}
