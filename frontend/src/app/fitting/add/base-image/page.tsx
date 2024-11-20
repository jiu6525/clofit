'use client';

import { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import axiosInstance from '@/api/axiosInstance';

type BaseImage = {
  originPictureId: number;
  imgUrl: string;
};

export default function SelectBaseImage() {
  const [baseImages, setBaseImages] = useState<BaseImage[]>([]);
  const [selectedImageId, setSelectedImageId] = useState<number | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const router = useRouter();

  // 전신 사진 데이터 가져오기
  const fetchBaseImages = async () => {
    setLoading(true);
    try {
      const response = await axiosInstance.get<BaseImage[]>(
        '/origin-picture/base-image'
      );
      setBaseImages(response.data);
    } catch (err) {
      console.error('전신 사진 데이터를 가져오는 중 오류 발생:', err);
      setError('전신 사진 데이터를 로드하는 중 문제가 발생했습니다.');
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchBaseImages();
  }, []);

  // 다음 단계로 이동
  const handleNextStep = () => {
    if (!selectedImageId) {
      alert('전신 사진을 선택해주세요.');
      return;
    }
    router.push(`/fitting/add/clothes?baseImageId=${selectedImageId}`);
  };

  return (
    <div className='relative flex flex-col items-center w-full min-h-screen bg-white'>
      <div className='relative flex flex-col items-center w-full max-w-[600px] p-4'>
        <header className='w-full py-4 px-6 text-left'>
          <h1 className='text-2xl font-semibold'>전신 사진 선택</h1>
        </header>

        {loading ? (
          <p className='text-gray-500 text-sm'>로딩 중...</p>
        ) : error ? (
          <p className='text-red-500 text-sm'>{error}</p>
        ) : (
          <div className='grid grid-cols-2 gap-4 w-full mt-6'>
            {baseImages.map((image) => (
              <button
                key={image.originPictureId}
                onClick={() => setSelectedImageId(image.originPictureId)}
                className={`relative w-full aspect-square rounded-lg overflow-hidden border-2 ${
                  selectedImageId === image.originPictureId
                    ? 'border-blue-500'
                    : 'border-gray-300'
                }`}
              >
                <img
                  src={image.imgUrl}
                  alt={`전신 사진 ${image.originPictureId}`}
                  className='object-cover w-full h-full'
                />
              </button>
            ))}
          </div>
        )}

        <button
          onClick={handleNextStep}
          className='mt-6 w-full py-2 bg-blue-500 text-white rounded-lg hover:bg-blue-600 disabled:bg-gray-300 disabled:cursor-not-allowed'
          disabled={!selectedImageId}
        >
          다음
        </button>
      </div>
    </div>
  );
}
