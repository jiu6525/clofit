'use client';

import { useSearchParams, useRouter } from 'next/navigation';
import { useState } from 'react';
import axiosInstance from '@/api/axiosInstance';
import ButtonRectangular from '@/components/ButtonRectangular';
type ConfirmFittingProps = {
  params?: Record<string, string>;
  searchParams?: Record<string, string | undefined>;
};

export default function ConfirmFitting({
  searchParams = {},
}: ConfirmFittingProps) {
  const router = useRouter();
  const baseImageUrl = decodeURIComponent(searchParams.baseImageUrl || '');
  const itemUrl = decodeURIComponent(searchParams.itemUrl || '');
  const type = searchParams.type || 'top';

  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const extractFileName = (url: string) => {
    return url.split('/').pop() || '';
  };

  const handleFittingRequest = async () => {
    const requestData = {
      memberId: 1,
      category: type === 'top' ? 0 : 1,
      modelName: extractFileName(baseImageUrl),
      clothName: [extractFileName(itemUrl)],
    };

    console.log('Request Data:', requestData);

    setLoading(true);
    try {
      const response = await axiosInstance.post('/fitting', requestData);
      console.log('Fitting Request Success:', response.data);
      alert('가상 피팅을 만들기 시작했습니다!');
      router.push('/fitting');
    } catch (err) {
      console.error('Fitting Request Error:', err);
      setError('요청 처리 중 문제가 발생했습니다.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className='relative flex flex-col items-center w-full min-h-screen bg-white'>
      <div className='relative flex flex-col items-center w-full max-w-[600px] p-4'>
        <header className='w-full py-4 px-6 text-left'>
          <h1 className='text-2xl font-semibold'>선택한 이미지 확인</h1>
        </header>

        {error ? (
          <p className='text-red-500'>{error}</p>
        ) : (
          <div className='w-full'>
            <section className='mb-6'>
              <h2 className='text-lg font-medium mb-2'>선택한 전신 사진</h2>
              <div className='relative w-full aspect-[5/6] rounded-lg overflow-hidden border border-gray-300'>
                <img
                  src={baseImageUrl}
                  alt='선택한 전신 사진'
                  className='object-cover w-full h-full'
                />
              </div>
            </section>
            <section className='mb-6'>
              <h2 className='text-lg font-medium mb-2'>
                {type === 'top' ? '선택한 상의' : '선택한 하의'}
              </h2>
              <div className='relative w-full aspect-[5/6] rounded-lg overflow-hidden border border-gray-300'>
                <img
                  src={itemUrl}
                  alt={`선택한 ${type === 'top' ? '상의' : '하의'}`}
                  className='object-cover w-full h-full'
                />
              </div>
            </section>
          </div>
        )}

        {/* 버튼 영역 */}
        <div className='mt-6 flex justify-center w-full'>
          <ButtonRectangular
            text={loading ? '피팅 중...' : '피팅하기'}
            onClick={handleFittingRequest}
            disabled={loading}
          />
        </div>
      </div>
    </div>
  );
}
