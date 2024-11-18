'use client';

import { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import axiosInstance from '@/api/axiosInstance';
import { IoAddCircleOutline } from 'react-icons/io5';

type RecentFittingResponse = { uuid: string; imgUrl: string }; // 최신 추가된 피팅 데이터 타입
type SavedFittingResponse = { imgUrl: string }; // 저장된 피팅 데이터 타입

export default function FittingPage() {
  const [recentImages, setRecentImages] = useState<string[]>([]);
  const [savedImages, setSavedImages] = useState<string[]>([]);
  const [loading, setLoading] = useState({ recent: true, saved: true });
  const [error, setError] = useState({ recent: null, saved: null });
  const router = useRouter();

  // API 호출 함수
  const fetchData = async (
    url: string,
    method: 'GET' | 'POST',
    body: Record<string, any> | null,
    onSuccess: (data: any) => void,
    setLoadingKey: 'recent' | 'saved',
    setErrorKey: 'recent' | 'saved'
  ) => {
    setLoading((prev) => ({ ...prev, [setLoadingKey]: true }));
    try {
      const response =
        method === 'POST'
          ? await axiosInstance.post(url, body)
          : await axiosInstance.get(url);

      onSuccess(response.data);
    } catch (error) {
      console.error(`${setLoadingKey} 데이터 로드 실패:`, error);
      setError((prev) => ({
        ...prev,
        [setErrorKey]: '데이터를 로드하는 중 문제가 발생했습니다.',
      }));
    } finally {
      setLoading((prev) => ({ ...prev, [setLoadingKey]: false }));
    }
  };

  useEffect(() => {
    fetchData(
      '/fitting/recent',
      'GET',
      null,
      (data: RecentFittingResponse[]) =>
        setRecentImages(data.map((item) => item.imgUrl)),
      'recent',
      'recent'
    );
    fetchData(
      '/fitting/search',
      'POST',
      { member_id: 1 },
      (data: SavedFittingResponse[]) =>
        setSavedImages(data.map((item) => item.imgUrl)),
      'saved',
      'saved'
    );
  }, []);

  // 피팅 추가 버튼 클릭
  const handleStartFitting = () => {
    router.push('/fitting/add/select');
  };

  return (
    <div className='relative flex flex-col items-center w-full min-h-screen bg-white'>
      <div className='relative flex flex-col items-center w-full max-w-[600px] p-4'>
        {/* 헤더 */}
        <header className='w-full py-4 px-6 text-left'>
          <h1 className='text-2xl font-semibold'>피팅</h1>
        </header>

        {/* 최근 추가한 피팅 섹션 */}
        <FittingSection
          title='최근 추가한 피팅'
          images={recentImages}
          loading={loading.recent}
          error={error.recent}
        />

        {/* 저장된 피팅 섹션 */}
        <div className='w-full'>
          <h2 className='text-lg font-medium mb-2'>저장된 피팅 목록</h2>
          {loading.saved ? (
            <p className='text-gray-500 text-sm'>로딩 중...</p>
          ) : error.saved ? (
            <p className='text-red-500 text-sm'>{error.saved}</p>
          ) : (
            <div className='grid grid-cols-3 gap-4 w-full'>
              {/* 피팅 추가 버튼 */}
              <div
                className='flex items-center justify-center border border-dashed border-gray-300 rounded-lg aspect-square cursor-pointer hover:bg-gray-100'
                onClick={handleStartFitting}
              >
                <IoAddCircleOutline size={48} className='text-gray-400' />
              </div>
              {/* 저장된 피팅 썸네일 */}
              {savedImages.map((image, index) => (
                <Thumbnail
                  key={index}
                  image={image}
                  altText={`저장된 피팅 이미지 ${index + 1}`}
                />
              ))}
            </div>
          )}
        </div>
      </div>
    </div>
  );
}

// 개별 섹션 컴포넌트
function FittingSection({
  title,
  images,
  loading,
  error,
}: {
  title: string;
  images: string[];
  loading: boolean;
  error: string | null;
}) {
  return (
    <div className='w-full mb-4'>
      <h2 className='text-lg font-medium mb-2'>{title}</h2>
      {error ? (
        <p className='text-red-500 text-sm'>{error}</p>
      ) : loading ? (
        <p className='text-gray-500 text-sm'>로딩 중...</p>
      ) : images.length > 0 ? (
        <div className='flex overflow-x-auto space-x-4'>
          {images.map((image, index) => (
            <Thumbnail
              key={index}
              image={image}
              altText={`${title} 이미지 ${index + 1}`}
            />
          ))}
        </div>
      ) : (
        <p className='text-gray-500 text-sm'>피팅 기록이 없습니다.</p>
      )}
    </div>
  );
}

// 썸네일 컴포넌트
function Thumbnail({ image, altText }: { image: string; altText: string }) {
  return (
    <div className='relative w-24 h-24 bg-gray-100 rounded-lg overflow-hidden flex-shrink-0'>
      <img src={image} alt={altText} className='object-cover w-full h-full' />
    </div>
  );
}
