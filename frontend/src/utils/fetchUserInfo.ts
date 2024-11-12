import axiosInstance from '../api/axiosInstance';
import useAuthStore from '../stores/useAuthStore';

interface UserInfoResponse {
  name: string;
}

export const fetchUserInfo = async () => {
  try {
    const response = await axiosInstance.get<UserInfoResponse>('/user');
    const { name } = response.data;
    const setUserInfo = useAuthStore.getState().setUserInfo;
    setUserInfo({ name });
  } catch (error) {
    console.error('사용자 정보 가져오기 실패:', error);
  }
};
