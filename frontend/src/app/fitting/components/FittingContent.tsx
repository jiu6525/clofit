import { GiClothes } from 'react-icons/gi';

interface FittingContentProps {
  hasData: boolean;
  onStartFitting: () => void;
  fittingImage: string;
  loading: boolean;
}

function FittingContent({
  hasData,
  onStartFitting,
  fittingImage,
  loading,
}: FittingContentProps) {
  if (loading) {
    return <div>로딩 중...</div>; // 로딩 상태 표시
  }

  return (
    <div className='content'>
      {hasData ? (
        <div className='fitting-result'>
          <img
            src={fittingImage}
            alt='가상 피팅 결과'
            className='fitting-image'
          />
        </div>
      ) : (
        <div className='no-data-container'>
          <GiClothes size={48} color='gray' className='no-data-icon' />
          <p className='no-data-message'>
            추가한 옷장 아이템으로
            <br />
            가상피팅을 시작해 보세요.
          </p>
          <button onClick={onStartFitting} className='start-button'>
            피팅 하러 가기
          </button>
        </div>
      )}
    </div>
  );
}

export default FittingContent;
