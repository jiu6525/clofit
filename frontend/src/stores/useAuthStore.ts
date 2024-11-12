import { create } from 'zustand';

interface UserState {
  memberId: number | null;
  role: string | null;
  name: string | null;
  username: string | null;
  email: string | null;
  setUserInfo: (userInfo: Partial<UserState>) => void;
  clearUserInfo: () => void;
}

const useAuthStore = create<UserState>((set) => ({
  memberId: null,
  role: null,
  name: null,
  username: null,
  email: null,

  // 사용자 정보를 설정하는 함수
  setUserInfo: (userInfo) => set((state) => ({ ...state, ...userInfo })),

  // 로그아웃 시 상태 초기화
  clearUserInfo: () =>
    set({
      memberId: null,
      role: null,
      name: null,
      username: null,
      email: null,
    }),
}));

export default useAuthStore;
