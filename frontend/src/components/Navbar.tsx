'use client';

import { usePathname } from 'next/navigation';

export default function Navbar() {
  const pathname = usePathname();

  // 특정 경로에서는 네브바 숨기기
  const hiddenPaths = ['/closet/camera', '/closet/add'];
  if (hiddenPaths.includes(pathname)) return null;

  const tabs = [
    {
      name: '홈',
      path: '/home',
      activeImg: '/images/home-active.svg',
      inactiveImg: '/images/home-inactive.svg',
    },
    {
      name: '옷장',
      path: '/closet',
      activeImg: '/images/closet-active.svg',
      inactiveImg: '/images/closet-inactive.svg',
    },
    {
      name: '피드',
      path: '/feed',
      activeImg: '/images/feed-active.svg',
      inactiveImg: '/images/feed-inactive.svg',
    },
    {
      name: '피팅',
      path: '/fitting',
      activeImg: '/images/fitting-active.svg',
      inactiveImg: '/images/fitting-inactive.svg',
    },
    {
      name: '마이',
      path: '/my',
      activeImg: '/images/my-active.svg',
      inactiveImg: '/images/my-inactive.svg',
    },
  ];

  return (
    <nav className='navbar'>
      {tabs.map((tab) => (
        <a
          href={tab.path}
          key={tab.name}
          className='w-1/5 flex justify-center items-center'
          style={{ textAlign: 'center' }}
        >
          <img
            src={pathname === tab.path ? tab.activeImg : tab.inactiveImg}
            alt={`${tab.name} 아이콘`}
          />
        </a>
      ))}
    </nav>
  );
}
