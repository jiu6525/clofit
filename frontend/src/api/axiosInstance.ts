import axios from 'axios';

// 기본 axios instance
const axiosInstance = axios.create({
  baseURL: process.env.NEXT_PUBLIC_API_BASE_URL, // 기본 URL 설정
  withCredentials: true, // 쿠키 포함 요청
});

export default axiosInstance;
