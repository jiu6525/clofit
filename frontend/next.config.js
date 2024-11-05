const withPWA = require('next-pwa')({
  dest: 'public',
  register: true,
  skipWaiting: true,
  disable: process.env.NODE_ENV === 'development', // 개발 모드에서 PWA 비활성화
});

module.exports = withPWA({
  // 기타 next.js 설정
});
