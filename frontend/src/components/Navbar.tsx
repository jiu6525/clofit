'use client';

import { usePathname } from 'next/navigation';
import { HiHome, HiUserCircle } from 'react-icons/hi';
import { FaTshirt } from 'react-icons/fa';
import { MdOutlineInventory2 } from 'react-icons/md';
import { AiOutlineSearch } from 'react-icons/ai'; // 돋보기 아이콘 추가

export default function Navbar() {
  const pathname = usePathname();

  // 특정 경로에서는 네브바 숨기기
  const hiddenPaths = ['/closet/camera', '/closet/add', '/'];
  if (hiddenPaths.includes(pathname)) return null;

  const tabs = [
    {
      name: '홈',
      path: '/home',
      icon: HiHome,
    },
    {
      name: '옷장',
      path: '/closet',
      icon: MdOutlineInventory2,
    },
    {
      name: '피드',
      path: '/feed',
      icon: AiOutlineSearch, // 돋보기 아이콘으로 변경
    },
    {
      name: '피팅',
      path: '/fitting',
      icon: FaTshirt,
    },
    {
      name: '마이',
      path: '/my',
      icon: HiUserCircle,
    },
  ];

  return (
    <nav className='navbar flex justify-around bg-gray-100 py-2 border-t'>
      {tabs.map((tab) => {
        const Icon = tab.icon;
        const isActive = pathname === tab.path;
        return (
          <a
            href={tab.path}
            key={tab.name}
            className={`w-1/5 flex flex-col items-center ${isActive ? 'text-black' : 'text-gray-500'}`}
          >
            <Icon
              size={24}
              className={isActive ? 'text-black' : 'text-gray-400'}
            />
            <span className='text-xs mt-1'>{tab.name}</span>
          </a>
        );
      })}
    </nav>
  );
}
