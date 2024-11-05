'use client';

import { useState } from 'react';
import LeftTitleTopbar from '@/components/LeftTitleTopbar';
import CenteredTitleTopbar from '@/components/CenteredTitleTopbar';
import FittingContent from './components/FittingContent';

export default function FittingPage() {
  const [step, setStep] = useState(1);

  const nextStep = () => setStep((prev) => prev + 1);
  const prevStep = () => setStep((prev) => (prev > 1 ? prev - 1 : prev));

  const getTitleForStep = () => {
    switch (step) {
      case 2:
        return '전신 사진 선택';
      case 3:
        return '상의 선택';
      case 4:
        return '하의 선택';
      default:
        return '';
    }
  };

  return (
    <div className='fitting-page'>
      {step === 1 ? (
        <LeftTitleTopbar title='피팅' />
      ) : (
        <CenteredTitleTopbar title={getTitleForStep()} onBack={prevStep} />
      )}

      {/* FittingContent 컴포넌트를 항상 렌더링 */}
      <FittingContent onStartFitting={nextStep} />
    </div>
  );
}
