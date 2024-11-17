import { useState, useEffect } from 'react';
import { AiFillHeart, AiOutlineHeart } from 'react-icons/ai';
import axiosInstance from '@/api/axiosInstance';

interface LikeLogResponse {
  fittingId: number;
  img_path: string;
}

export default function LikedSnaps() {
  const [items, setItems] = useState<LikeLogResponse[]>([]);
  const [likedItems, setLikedItems] = useState<number[]>([]);

  useEffect(() => {
    let didCancel = false;

    const fetchLikedSnaps = async () => {
      try {
        const response =
          await axiosInstance.get<LikeLogResponse[]>('/likes/my');
        if (!didCancel) {
          console.log('좋아요된 스냅 목록:', response.data);
          setItems(response.data);
          const likedIds = response.data.map((item) => item.fittingId);
          setLikedItems(likedIds);
        }
      } catch (error) {
        if (!didCancel) {
          console.error('좋아요 목록 불러오기 실패:', error);
        }
      }
    };

    fetchLikedSnaps();

    return () => {
      didCancel = true;
    };
  }, []);

  const toggleLike = async (id: number) => {
    const isLiked = likedItems.includes(id);

    try {
      if (isLiked) {
        // 좋아요 취소 요청
        console.log('좋아요 취소 요청 데이터:', { fittingId: id });

        // DELETE 요청 본문 포함
        const response = await axiosInstance.request({
          url: '/likes/like',
          method: 'DELETE',
          headers: { 'Content-Type': 'application/json' },
          data: { fittingId: id }, // 요청 본문
        });

        console.log('좋아요 취소 응답:', response.data);
        setLikedItems((prevLikedItems) =>
          prevLikedItems.filter((itemId) => itemId !== id)
        );
      } else {
        // 좋아요 추가 요청
        console.log('좋아요 추가 요청 데이터:', { fittingId: id });

        const response = await axiosInstance.post('/likes/like', {
          fittingId: id,
        });

        console.log('좋아요 추가 응답:', response.data);
        setLikedItems((prevLikedItems) => [...prevLikedItems, id]);
      }
    } catch (error) {
      console.error('좋아요 상태 변경 실패:', error);
    }
  };

  return (
    <div className='grid grid-cols-3 gap-0 w-full'>
      {items.map((item) => (
        <div key={item.fittingId} className='relative'>
          <img
            src={item.img_path}
            alt={`Fitting ${item.fittingId}`}
            className='w-full h-full object-cover'
          />
          {/* 오른쪽 상단 하트 버튼 */}
          <button
            onClick={() => toggleLike(item.fittingId)}
            className='absolute top-2 right-2 text-white'
            style={{
              border: 'none',
              outline: 'none',
              backgroundColor: 'transparent',
            }}
          >
            {likedItems.includes(item.fittingId) ? (
              <AiFillHeart className='text-red-500 text-xl' />
            ) : (
              <AiOutlineHeart className='text-gray-300 text-xl' />
            )}
          </button>
        </div>
      ))}
    </div>
  );
}
