import React from 'react';
import FittingStart from './FittingStart';

interface FittingContentProps {
  onStartFitting: () => void;
}

function FittingContent({ onStartFitting }: FittingContentProps) {
  return (
    <div className='flex justify-center items-start min-h-screen pt-20'>
      <FittingStart onStartFitting={onStartFitting} />
    </div>
  );
}

export default FittingContent;
