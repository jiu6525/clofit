import React from 'react';

export default function MyPage() {
  const nickname = '유아이볼';
  const profileImageUrl = '/default-profile.png'; // Updated to default profile image
  const email = 'user@example.com'; // Hardcoded email, replace with API data once available

  const items = [
    {
      id: 1,
      title: 'Snap 1',
      location: '용인시, 수지구 | 카페',
      imageUrl: '/snap1.webp',
    },
    {
      id: 2,
      title: 'Snap 2',
      location: '용인시, 수지구 | 카페',
      imageUrl: '/snap2.webp',
    },
    {
      id: 3,
      title: 'Snap 3',
      location: '용인시, 수지구 | 카페',
      imageUrl: '/snap3.webp',
    },
    {
      id: 4,
      title: 'Snap 4',
      location: '용인시, 수지구 | 카페',
      imageUrl: '/snap1.webp',
    },
    {
      id: 5,
      title: 'Snap 5',
      location: '용인시, 수지구 | 카페',
      imageUrl: '/snap2.webp',
    },
    {
      id: 6,
      title: 'Snap 6',
      location: '용인시, 수지구 | 카페',
      imageUrl: '/snap3.webp',
    },
  ];

  return (
    <div className='my-page p-4 bg-white text-black min-h-screen'>
      {/* Profile section */}
      <div className='flex flex-col items-center mb-6'>
        <div className='relative mb-4'>
          <img
            src={profileImageUrl}
            alt='프로필 이미지'
            className='w-24 h-24 rounded-full border border-gray-300'
          />
        </div>
        <h1 className='text-lg font-semibold'>{nickname}</h1>
        <p className='text-sm text-gray-500'>{email}</p>
      </div>

      {/* Divider */}
      <hr className='border-gray-300 my-4' />

      {/* Thumbnail grid section */}
      <div className='grid grid-cols-3 gap-1 px-2'>
        {items.map((item) => (
          <div key={item.id} className='w-full aspect-square overflow-hidden'>
            <img
              src={item.imageUrl}
              alt={item.title}
              className='w-full h-full object-cover'
            />
          </div>
        ))}
      </div>
    </div>
  );
}
