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
      title: 'Snap 1',
      location: '용인시, 수지구 | 카페',
      imageUrl: '/snap1.webp',
    },
    {
      id: 5,
      title: 'Snap 2',
      location: '용인시, 수지구 | 카페',
      imageUrl: '/snap2.webp',
    },
    {
      id: 6,
      title: 'Snap 3',
      location: '용인시, 수지구 | 카페',
      imageUrl: '/snap3.webp',
    },
  ];

  return (
    <div className='my-page p-4 bg-white text-black min-h-screen'>
      {/* Profile section */}
      <div className='flex items-start justify-between mb-4 px-4'>
        <div>
          <h1 className='text-lg font-semibold mb-1'>{nickname}</h1>
          <p className='text-sm text-gray-500'>{email}</p>{' '}
          {/* Displaying hardcoded email */}
        </div>
        <div className='relative'>
          <img
            src={profileImageUrl}
            alt='프로필 이미지'
            className='w-16 h-16 rounded-full border border-gray-300'
          />
        </div>
      </div>

      {/* Divider */}
      <hr className='border-gray-300 my-4' />

      {/* Thumbnail grid section with three items per row */}
      <div className='px-4'>
        <div className='grid grid-cols-3 gap-4'>
          {items.map((item) => (
            <div key={item.id} className='rounded-lg overflow-hidden'>
              <img
                src={item.imageUrl}
                alt={item.title}
                className='w-full h-48 object-cover' // Adjusted height for 3-item layout
              />
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
