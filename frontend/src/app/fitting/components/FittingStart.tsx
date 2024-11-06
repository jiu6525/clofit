import { useRouter } from 'next/navigation';
import ButtonRounded from '@/components/ButtonRounded';

interface FittingStartProps {
  onStartFitting?: () => void;
}

function FittingStart({ onStartFitting }: FittingStartProps) {
  const router = useRouter();

  const handleStartFitting = () => {
    router.push('/fitting/fullbody');
    if (onStartFitting) onStartFitting(); // 필요 시 추가 기능 실행
  };

  return (
    <div className='flex flex-col items-center text-center p-8 bg-white rounded-2xl'>
      {/* 아이콘 */}
      <img
        src='/images/fitting-inactive.svg'
        alt='피팅 아이템 없음'
        className='w-20 h-20 mb-5'
      />

      {/* 안내 텍스트 */}
      <p className='text-lg mb-5 leading-relaxed'>
        추가한 옷장 아이템으로
        <br />
        가상피팅을 시작해 보세요.
      </p>

      {/* 둥근 버튼 */}
      <ButtonRounded text='피팅 하러 가기' onClick={handleStartFitting} />
    </div>
  );
}

export default FittingStart;
