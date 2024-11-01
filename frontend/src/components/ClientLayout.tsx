'use client';

import Navbar from './Navbar';
import { usePathname } from 'next/navigation';

export default function ClientLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const pathname = usePathname();
  const hideNavbarRoutes = ['/login', '/signup'];
  const showNavbar = !hideNavbarRoutes.includes(pathname);

  return (
    <div className='relative min-h-screen flex flex-col'>
      <div id='app' className='flex-grow'>
        {children}
      </div>
      {showNavbar && <Navbar />} {/* 조건부로 Navbar 표시 */}
    </div>
  );
}
