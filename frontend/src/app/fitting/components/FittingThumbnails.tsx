export default function FittingThumbnails() {
  return (
    <div className='grid grid-cols-2 gap-4 p-4 w-full max-w-[600px]'>
      {Array.from({ length: 6 }).map((_, index) => (
        <div
          key={index}
          className='w-full aspect-square bg-gray-200 rounded-lg flex items-center justify-center'
        >
          <span className='text-gray-500'>피팅 {index + 1}</span>
        </div>
      ))}
    </div>
  );
}
