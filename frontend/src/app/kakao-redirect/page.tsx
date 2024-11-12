'use client';

import { useEffect } from 'react';
import { useRouter } from 'next/navigation';
import axios from 'axios';
import useAuthStore from '@/stores/useAuthStore';

interface UserInfo {
  memberId: number;
  role: string;
  name: string;
  username: string;
  email: string;
}

const KakaoRedirect = () => {
  const router = useRouter();
  const setUserInfo = useAuthStore((state) => state.setUserInfo);

  useEffect(() => {
    const fetchKakaoUserInfo = async () => {
      const code = new URL(window.location.href).searchParams.get('code');
      if (code) {
        try {
          const response = await axios.post<UserInfo>(
            '/api/auth/kakao/callback',
            { code }
          );
          const { memberId, role, name, username, email } = response.data;

          setUserInfo({ memberId, role, name, username, email });
          router.push('/home');
        } catch (error) {
          console.error('사용자 정보 요청 실패:', error);
        }
      }
    };

    fetchKakaoUserInfo();
  }, [router, setUserInfo]);

  return <div>로그인 처리 중...</div>;
};

export default KakaoRedirect;
