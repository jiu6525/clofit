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
    <div className='flex justify-center w-full min-h-screen bg-gray-100'>
      <div
        id='app'
        className='w-full min-w-[360px] max-w-[600px] flex flex-col items-center'
      >
        {children}
      </div>
      {showNavbar && <Navbar />}
    </div>
  );
}
