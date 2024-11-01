import { create } from 'zustand';

interface AuthState {
  isLoggedIn: boolean; // 로그인 상태를 나타내는 Boolean 값
  username: string | null; // 로그인한 사용자 이름을 저장
  setLogin: (username: string) => void; // 로그인 시 상태 업데이트
  setLogout: () => void; // 로그아웃 시 상태 초기화
}

const useAuthStore = create<AuthState>((set) => ({
  isLoggedIn: false,
  username: null,
  setLogin: (username) => set({ isLoggedIn: true, username }),
  setLogout: () => set({ isLoggedIn: false, username: null }),
}));

export default useAuthStore;
