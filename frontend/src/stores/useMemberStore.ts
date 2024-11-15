import { create } from 'zustand';

interface MemberState {
  personalColor: string;
  setPersonalColor: (color: string) => void;
}

const useMemberStore = create<MemberState>((set) => ({
  personalColor: '',
  setPersonalColor: (color) => set({ personalColor: color }),
}));

export default useMemberStore;
