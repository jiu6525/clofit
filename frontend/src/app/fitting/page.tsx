'use client';

import { useState } from 'react';

import LeftTitleTopbar from '@/components/LeftTitleTopbar';
import CenteredTitleTopbar from '@/components/CenteredTitleTopbar';

export default function FittingPage() {
  const [step, setStep] = useState(1); // 단계 관리

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
      {/* 단계에 따라 다른 탑바 표시 */}
      {step === 1 ? (
        <LeftTitleTopbar title='피팅' />
      ) : (
        <CenteredTitleTopbar title={getTitleForStep()} onBack={prevStep} />
      )}

      <div className='content'>
        {step === 1 && (
          <div className='intro'>
            <p>추가한 옷장 아이템으로 가상 피팅을 시작해 보세요.</p>
            <button onClick={nextStep} className='start-button'>
              피팅 하러 가기
            </button>
          </div>
        )}

        {step === 2 && (
          <div className='image-selection'>
            <p>전신 사진을 선택하세요.</p>
            <button onClick={nextStep} className='next-button'>
              다음
            </button>
          </div>
        )}

        {step === 3 && (
          <div className='image-selection'>
            <p>상의 이미지를 선택하세요.</p>
            <button onClick={nextStep} className='next-button'>
              다음
            </button>
          </div>
        )}

        {step === 4 && (
          <div className='image-selection'>
            <p>하의 이미지를 선택하세요.</p>
            <button onClick={nextStep} className='next-button'>
              결과 보기
            </button>
          </div>
        )}

        {step === 5 && (
          <div className='result'>
            <p>선택한 이미지로 가상 피팅 결과입니다.</p>
            <button onClick={() => setStep(1)} className='restart-button'>
              다시 하기
            </button>
          </div>
        )}
      </div>
    </div>
  );
}
