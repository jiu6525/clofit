import axiosInstance from '../api/axiosInstance';
import useAuthStore from '../store/useAuthStore';

interface UserInfoResponse {
  name: string;
}

export const fetchUserInfo = async () => {
  try {
    const response = await axiosInstance.get<UserInfoResponse>('/user');
    const { name } = response.data;
    const setLogin = useAuthStore.getState().setLogin;
    setLogin(name);
  } catch (error) {
    console.error('사용자 정보 가져오기 실패:', error);
  }
};
