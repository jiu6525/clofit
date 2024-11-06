'use client'; // 클라이언트 컴포넌트로 설정

import FullBodySelection from './components/FullBodySelection';
import TopSelection from './components/TopSelection';
import BottomSelection from './components/BottomSelection';

export default function FittingStep({ params }: { params: { step: string } }) {
  const { step } = params;

  switch (step) {
    case 'fullbody':
      return <FullBodySelection />;
    case 'top':
      return <TopSelection />;
    case 'bottom':
      return <BottomSelection />;
    default:
      return <div>잘못된 페이지입니다.</div>;
  }
}
