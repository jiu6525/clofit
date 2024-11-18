import { create } from 'zustand';

interface MemberInfoResponse {
  memberName: string;
  personalColor: string;
  profileFilePath: string;
}

interface MemberStore {
  memberInfo: MemberInfoResponse | null;
  setMemberInfo: (info: MemberInfoResponse) => void;
  clearMemberInfo: () => void;
}

const useMemberStore = create<MemberStore>((set) => ({
  memberInfo: null,
  setMemberInfo: (info) => set({ memberInfo: info }),
  clearMemberInfo: () => set({ memberInfo: null }),
}));

export default useMemberStore;
