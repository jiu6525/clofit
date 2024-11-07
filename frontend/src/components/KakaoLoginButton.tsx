const KAKAO_REST_API_KEY = process.env.NEXT_PUBLIC_KAKAO_REST_API_KEY;
const REDIRECT_URI = process.env.NEXT_PUBLIC_KAKAO_REDIRECT_URI;
//const kakaoLoginUrl = `https://kauth.kakao.com/oauth/authorize?response_type=code&client_id=${KAKAO_REST_API_KEY}&redirect_uri=${REDIRECT_URI}`;

const KakaoLoginButton = () => {
  return (
    //<a href={kakaoLoginUrl}>
    <a href={REDIRECT_URI}>
      <img
        src='/kakao_login_large_narrow.png'
        alt='카카오 로그인'
        width={250}
        height={45}
        style={{ cursor: 'pointer' }}
      />
    </a>
  );
};

export default KakaoLoginButton;
