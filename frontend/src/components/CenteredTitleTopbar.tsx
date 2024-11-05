import { FaArrowLeft } from 'react-icons/fa';

interface TopbarWithBackButtonProps {
  title: string;
  onBack: () => void;
}

export default function TopbarWithBackButton({
  title,
  onBack,
}: TopbarWithBackButtonProps) {
  return (
    <div className='topbar'>
      <button onClick={onBack} className='back-button'>
        <FaArrowLeft size={24} aria-label='뒤로 가기' />
      </button>
      <h1
        className='page-title'
        style={{ marginLeft: 'auto', marginRight: 'auto', fontWeight: 'bold' }}
      >
        {title}
      </h1>
    </div>
  );
}
