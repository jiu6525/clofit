'use client';

import { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import ButtonRectangular from '@/components/ButtonRectangular';
import axiosInstance from '@/api/axiosInstance';
import useSelectionStore from '@/stores/useSelectionStore';

interface BottomSelectionProps {
  memberId: number;
  hasSelectedTop: boolean;
}

export default function BottomSelection({
  memberId,
  hasSelectedTop,
}: BottomSelectionProps) {
  const router = useRouter();
  const [bottoms, setBottoms] = useState<string[]>([]);
  const [selectedItemIndex, setSelectedItemIndex] = useState<number | null>(
    null
  );
  const [isRequestPending, setIsRequestPending] = useState(false);

  const selectedFullBodyImage = useSelectionStore(
    (state) => state.selectedFullBodyImage
  );
  const selectedTopImage = useSelectionStore((state) => state.selectedTopImage);
  const setSelectedBottomImage = useSelectionStore(
    (state) => state.setSelectedBottomImage
  );

  useEffect(() => {
    const fetchBottomClothes = async () => {
      try {
        const response = await axiosInstance.get<string[]>(
          '/fitting/bottom-clothes',
          {
            params: { memberId },
          }
        );

        setBottoms(
          response.data && response.data.length > 0
            ? response.data
            : [
                'https://clofit-s3-bucket.s3.ap-southeast-2.amazonaws.com/cloth/bottom/1.png',
                'https://clofit-s3-bucket.s3.ap-southeast-2.amazonaws.com/cloth/bottom/10.png',
                'https://clofit-s3-bucket.s3.ap-southeast-2.amazonaws.com/cloth/bottom/100.png',
              ]
        );
      } catch (error) {
        console.error('하의 로딩 실패:', error);
        setBottoms([
          'https://clofit-s3-bucket.s3.ap-southeast-2.amazonaws.com/cloth/bottom/1.png',
          'https://clofit-s3-bucket.s3.ap-southeast-2.amazonaws.com/cloth/bottom/10.png',
          'https://clofit-s3-bucket.s3.ap-southeast-2.amazonaws.com/cloth/bottom/100.png',
        ]);
      }
    };

    fetchBottomClothes();
  }, [memberId]);

  const handleItemClick = (index: number | null) => {
    setSelectedItemIndex(index);
    setSelectedBottomImage(index !== null ? bottoms[index] : null); // 선택한 하의 또는 선택 해제
  };

  const handleCompleteClick = async () => {
    setIsRequestPending(true);

    try {
      // 선택된 하의 및 상의 URL에서 파일명을 추출합니다.
      const selectedBottomImage =
        selectedItemIndex !== null ? bottoms[selectedItemIndex] : null;
      const bottomFileName = selectedBottomImage
        ? selectedBottomImage.split('/').pop()
        : '';

      const topFileName = selectedTopImage
        ? selectedTopImage.split('/').pop()
        : '';

      const clothName = [topFileName, bottomFileName].filter(Boolean);

      // category 설정 로직
      const category =
        topFileName && bottomFileName
          ? 2
          : topFileName
            ? 0
            : bottomFileName
              ? 1
              : null;

      if (category === null) {
        console.error('No valid selection for category');
        setIsRequestPending(false);
        return;
      }

      // 전송할 데이터 생성
      const requestData = {
        memberId,
        category,
        modelName: selectedFullBodyImage.split('/').pop(), // modelName도 파일명만 추출
        clothName,
      };

      console.log('Sending request data:', requestData);

      const response = await axiosInstance.post('/fitting', requestData);
      console.log('Response received:', response.data);

      router.push('/fitting/complete');
    } catch (error) {
      console.error('피팅 요청 실패:', error);
    } finally {
      setIsRequestPending(false);
    }
  };

  return (
    <div className='flex flex-col items-center p-4'>
      <h2 className='text-lg font-semibold mb-2'>
        입어보고 싶은 하의를 선택해 주세요.
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

      <div className='grid grid-cols-3 gap-2 mb-4'>
        {bottoms.map((url, index) => (
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
              alt={`하의 ${index + 1}`}
              className='w-full h-full object-cover rounded'
            />
          </div>
        ))}
      </div>

      <ButtonRectangular
        text='완료'
        onClick={handleCompleteClick}
        disabled={
          isRequestPending || (selectedItemIndex === null && !hasSelectedTop)
        }
      />
    </div>
  );
}
