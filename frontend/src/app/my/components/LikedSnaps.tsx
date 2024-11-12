// LikedSnaps.tsx
import { useState } from 'react';
import { AiFillHeart, AiOutlineHeart } from 'react-icons/ai';

interface LikedSnapsProps {
  items: {
    id: number;
    title: string;
    location: string;
    imageUrl: string;
  }[];
}

export default function LikedSnaps({ items }: LikedSnapsProps) {
  const [likedItems, setLikedItems] = useState<number[]>([]);

  const toggleLike = (id: number) => {
    setLikedItems((prevLikedItems) =>
      prevLikedItems.includes(id)
        ? prevLikedItems.filter((itemId) => itemId !== id)
        : [...prevLikedItems, id]
    );
  };

  return (
    <div className='grid grid-cols-3 w-full'>
      {items.map((item) => (
        <div
          key={item.id}
          className='relative w-fullaspect-[5/6] overflow-hidden'
        >
          <img
            src={item.imageUrl}
            alt={item.title}
            className='w-full h-full object-cover'
          />
          <button
            onClick={() => toggleLike(item.id)}
            className='absolute top-2 right-2 text-white'
            style={{
              border: 'none', // 테두리 제거
              outline: 'none', // 클릭 시 외곽선 제거
              backgroundColor: 'transparent', // 배경색 투명
            }}
          >
            {likedItems.includes(item.id) ? (
              <AiFillHeart className='text-red-500' />
            ) : (
              <AiOutlineHeart className='text-gray-300' />
            )}
          </button>
        </div>
      ))}
    </div>
  );
}
