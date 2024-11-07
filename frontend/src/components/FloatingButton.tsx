'use client';

interface FloatingButtonProps {
  onClick: () => void;
  icon?: string;
}

export default function FloatingButton({
  onClick,
  icon = '+',
}: FloatingButtonProps) {
  return (
    <div
      className='absolute flex items-center justify-center w-14 h-14 rounded-full bg-black text-white cursor-pointer shadow-lg'
      style={{ bottom: '3vh', right: '5vw' }}
      onClick={onClick}
    >
      <span className='text-2xl'>{icon}</span>
    </div>
  );
}
