const withPWA = require('next-pwa')({
  dest: 'public',
  register: true,
  skipWaiting: true,
  disable: process.env.NODE_ENV === 'development', // 개발 모드에서 PWA 비활성화
  customWorkerDir: 'worker', // 커스텀 서비스 워커 파일 경로
});

module.exports = withPWA({
  images: {
    domains: ['clofit-s3-bucket.s3.amazonaws.com'], // 외부 이미지 도메인 추가
  },
  // 기타 next.js 설정
});
