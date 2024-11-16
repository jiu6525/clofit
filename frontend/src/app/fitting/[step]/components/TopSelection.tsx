'use client';

import { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import ButtonRectangular from '@/components/ButtonRectangular';
import axiosInstance from '@/api/axiosInstance';
import useSelectionStore from '@/stores/useSelectionStore';

interface TopSelectionProps {
  memberId: number;
}

export default function TopSelection({ memberId }: TopSelectionProps) {
  const router = useRouter();
  const [tops, setTops] = useState<string[]>([]);
  const [selectedItemIndex, setSelectedItemIndex] = useState<number | null>(
    null
  );

  // 전역 상태에 상의 이미지를 저장할 함수
  const setSelectedTopImage = useSelectionStore(
    (state) => state.setSelectedTopImage
  );

  useEffect(() => {
    const fetchTopClothes = async () => {
      try {
        const response = await axiosInstance.get<string[]>(
          '/fitting/top-clothes',
          {
            params: { memberId },
          }
        );

        if (response.data && response.data.length > 0) {
          setTops(response.data); // API 응답으로 상의 목록 설정
        } else {
          setTops([
            'https://clofit-s3-bucket.s3.ap-southeast-2.amazonaws.com/cloth/top/1.png',
            'https://clofit-s3-bucket.s3.ap-southeast-2.amazonaws.com/cloth/top/10.png',
            'https://clofit-s3-bucket.s3.ap-southeast-2.amazonaws.com/cloth/top/100.png',
          ]); // API 호출 실패 시 기본 이미지 목록 설정
        }
      } catch (error) {
        console.error('상의 로딩 실패:', error);
        setTops([
          'https://clofit-s3-bucket.s3.ap-southeast-2.amazonaws.com/cloth/top/1.png',
          'https://clofit-s3-bucket.s3.ap-southeast-2.amazonaws.com/cloth/top/10.png',
          'https://clofit-s3-bucket.s3.ap-southeast-2.amazonaws.com/cloth/top/100.png',
        ]); // API 호출 실패 시 기본 이미지 설정
      }
    };

    fetchTopClothes();
  }, [memberId]);

  const handleItemClick = (index: number) => {
    if (selectedItemIndex !== index) {
      setSelectedItemIndex(index);
      setSelectedTopImage(tops[index]); // 선택한 상의 URL을 전역 상태에 저장
    } else {
      // 같은 항목을 클릭하면 선택 해제
      setSelectedItemIndex(null);
      setSelectedTopImage(null); // 상의 선택 해제 시 전역 상태에서도 해제
    }
  };

  const handleNextClick = () => {
    router.push('/fitting/bottom'); // 하의 선택 페이지로 이동
  };

  return (
    <div className='flex flex-col items-center p-4'>
      <h2 className='text-lg font-semibold mb-2'>
        입어보고 싶은 상의를 선택해 주세요.
      </h2>

      {/* 선택하지 않음 옵션 */}
      <div
        onClick={() => handleItemClick(null)}
        className={`w-full p-2 my-2 rounded border cursor-pointer ${
          selectedItemIndex === null
            ? 'bg-blue-300 border-blue-600'
            : 'bg-gray-200'
        }`}
      >
        선택하지 않음
      </div>

      {/* 상의 목록 */}
      <div className='grid grid-cols-3 gap-2 mb-4'>
        {tops.map((url, index) => (
          <div
            key={index}
            onClick={() => handleItemClick(index)}
            className={`w-24 h-24 flex items-center justify-center rounded cursor-pointer ${
              selectedItemIndex === index
                ? 'bg-blue-300 border border-blue-600'
                : 'bg-gray-200'
            }`}
          >
            <img
              src={url}
              alt={`상의 ${index + 1}`}
              className='w-full h-full object-cover rounded'
            />
          </div>
        ))}
      </div>

      {/* 다음 버튼 */}
      <ButtonRectangular text='다음' onClick={handleNextClick} />
    </div>
  );
}
