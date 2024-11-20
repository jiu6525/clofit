'use client';

import { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import axiosInstance from '@/api/axiosInstance';
import RecentFittingModal from './components/RecentFittingModal';
import { IoAddCircleOutline } from 'react-icons/io5';

type RecentFittingResponse = { uuid: string; imgUrl: string }; // 최신 추가된 피팅 데이터 타입
type SavedFittingResponse = {
  id: number;
  imgPath: string;
  regFittingDttm: string;
  favoriteYn: string;
  fittingName: string;
  publicYn: string;
}; // 저장된 피팅 데이터 타입

export default function FittingPage() {
  const [recentImages, setRecentImages] = useState<RecentFittingResponse[]>([]);
  const [savedImages, setSavedImages] = useState<SavedFittingResponse[]>([]);
  const [loading, setLoading] = useState({ recent: true, saved: true });
  const [error, setError] = useState({ recent: null, saved: null });
  const [selectedImage, setSelectedImage] = useState<string | null>(null);
  const [selectedUuid, setSelectedUuid] = useState<string | null>(null); // redisId로 매핑
  const [isModalOpen, setIsModalOpen] = useState(false);

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
      (data: RecentFittingResponse[]) => setRecentImages(data),
      'recent',
      'recent'
    );
    fetchData(
      '/fitting/search',
      'POST',
      { member_id: 1 }, // 필요한 body 데이터
      (data: SavedFittingResponse[]) => setSavedImages(data),
      'saved',
      'saved'
    );
  }, []);

  // 피팅 추가 버튼 클릭
  const handleStartFitting = () => {
    router.push('/fitting/add/select');
  };

  // 모달 열기
  const openModal = (imageUrl: string, uuid: string) => {
    console.log('Open Modal - UUID:', uuid);
    setSelectedImage(imageUrl);
    setSelectedUuid(uuid);
    setIsModalOpen(true);
  };

  // 모달 닫기
  const closeModal = () => {
    setSelectedImage(null);
    setSelectedUuid(null); // 선택된 redisId 초기화
    setIsModalOpen(false);
  };

  // 저장된 피팅 아이템 클릭 시 스냅 상세 페이지로 이동
  const handleFittingClick = (fittingId: number) => {
    router.push(`/feed/snap/${fittingId}`); // 경로 수정
  };

  // 모달에서 "저장" 또는 "삭제"를 클릭했을 때 호출되는 핸들러
  const handleConfirm = (action: 'save' | 'delete', publicYn?: 'Y' | 'N') => {
    if (action === 'save' && selectedUuid) {
      axiosInstance
        .put('/fitting', {
          redisId: selectedUuid,
          publicYn,
        })
        .then(() => {
          console.log('피팅 공개 여부 저장 성공:', publicYn);
          alert('피팅 공개 여부가 저장되었습니다.');
        })
        .catch((err) => {
          console.error('피팅 공개 여부 저장 실패:', err);
          alert('저장 중 문제가 발생했습니다.');
        });
    }

    if (action === 'delete' && selectedUuid) {
      axiosInstance
        .delete(`/fitting/${selectedUuid}`)
        .then(() => {
          console.log('피팅 삭제 성공');
          alert('피팅이 삭제되었습니다.');
          setRecentImages((prev) =>
            prev.filter((item) => item.uuid !== selectedUuid)
          );
        })
        .catch((err) => {
          console.error('피팅 삭제 실패:', err);
          alert('삭제 중 문제가 발생했습니다.');
        });
    }

    closeModal();
  };

  return (
    <div className='relative flex flex-col items-center w-full min-h-screen bg-white'>
      <div className='relative flex flex-col items-center w-full max-w-[600px] p-4'>
        {/* 헤더 */}
        <header className='w-full py-4 px-6 text-left'>
          <h1 className='text-2xl font-semibold'>피팅</h1>
        </header>

        {/* 최근 추가한 피팅 섹션 */}
        <div className='w-full mb-4'>
          <h2 className='text-lg font-medium mb-2'>최근 완성된 피팅</h2>
          {loading.recent ? (
            <div className='flex justify-center items-center'>
              <div className='animate-spin rounded-full h-10 w-10 border-t-2 border-b-2 border-blue-500'></div>
            </div>
          ) : error.recent ? (
            <p className='text-red-500 text-sm'>{error.recent}</p>
          ) : recentImages.length === 0 ? (
            <p className='text-gray-500 text-sm'>
              최근 완성된 피팅이 없습니다!
            </p>
          ) : (
            <div className='flex overflow-x-auto space-x-4'>
              {recentImages.map((item) => (
                <div
                  key={item.uuid}
                  className='relative w-24 h-24 bg-gray-100 rounded-lg overflow-hidden flex-shrink-0 cursor-pointer'
                  onClick={() => openModal(item.imgUrl, item.uuid)} // redisId 전달
                >
                  <img
                    src={item.imgUrl}
                    alt={`최근 피팅 이미지`}
                    className='object-cover w-full h-full'
                  />
                </div>
              ))}
            </div>
          )}
        </div>

        {/* 저장된 피팅 섹션 */}
        <div className='w-full'>
          <h2 className='text-lg font-medium mb-2'>저장한 피팅 목록</h2>
          {loading.saved ? (
            <div className='flex justify-center items-center'>
              <div className='animate-spin rounded-full h-10 w-10 border-t-2 border-b-2 border-blue-500'></div>
            </div>
          ) : error.saved ? (
            <p className='text-red-500 text-sm'>{error.saved}</p>
          ) : (
            <div className='grid grid-cols-3 gap-4 w-full'>
              {/* 피팅 추가 버튼은 항상 렌더링 */}
              <div
                className='flex items-center justify-center border border-dashed border-gray-300 rounded-lg aspect-square cursor-pointer hover:bg-gray-100'
                onClick={handleStartFitting}
              >
                <IoAddCircleOutline size={48} className='text-gray-400' />
              </div>
              {savedImages.length > 0 ? (
                savedImages.map((item) => (
                  <div
                    key={item.id}
                    className='relative w-24 h-24 bg-gray-100 rounded-md overflow-hidden flex-shrink-0 cursor-pointer'
                    onClick={() => handleFittingClick(item.id)} // 스냅 상세 페이지로 이동
                  >
                    <img
                      src={item.imgPath}
                      alt={item.fittingName || `저장된 피팅 이미지`}
                      className='object-cover w-full h-full'
                    />
                  </div>
                ))
              ) : (
                <p className='text-gray-500 text-sm col-span-3'>
                  저장된 피팅이 없습니다!
                </p>
              )}
            </div>
          )}
        </div>
      </div>

      {/* RecentFittingModal */}
      <RecentFittingModal
        isOpen={isModalOpen}
        onClose={closeModal}
        imageUrl={selectedImage}
        uuid={selectedUuid} // redisId 전달
        onConfirm={handleConfirm}
      />
    </div>
  );
}
