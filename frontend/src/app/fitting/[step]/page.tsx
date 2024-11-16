// [step]/page.tsx
'use client';

import FullBodySelection from './components/FullBodySelection';
import TopSelection from './components/TopSelection';
import BottomSelection from './components/BottomSelection';
import CompletePage from './components/CompletePage';

export default function FittingStep({ params }: { params: { step: string } }) {
  const { step } = params;

  switch (step) {
    case 'fullbody':
      return <FullBodySelection memberId={1} />;
    case 'top':
      return <TopSelection memberId={1} />;
    case 'bottom':
      return <BottomSelection memberId={1} hasSelectedTop={true} />;
    case 'complete':
      return <CompletePage />;
    default:
      return <div>잘못된 페이지입니다.</div>;
  }
}
