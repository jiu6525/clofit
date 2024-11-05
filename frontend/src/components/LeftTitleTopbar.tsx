'use client';

interface LeftTitleTopbarProps {
  title: string;
}

export default function LeftTitleTopbar({ title }: LeftTitleTopbarProps) {
  return (
    <div className='topbar'>
      <h1 className='text-xl font-bold'>{title}</h1>
    </div>
  );
}
