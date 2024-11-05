export default function EmptyCloset() {
  return (
    <div className='flex flex-col items-center justify-center h-full text-center'>
      <img
        src='/images/empty-closet-icon.svg'
        alt='Empty Closet Icon'
        className='w-16 h-16 mb-4'
      />
      <p className='text-lg font-semibold mb-2'>옷장이 비어있어요.</p>
      <p className='text-sm text-gray-500 mb-4'>
        옷장을 아이템으로 채워보세요.
      </p>
      <button className='bg-black text-white rounded-md px-4 py-2'>
        아이템 추가 하러 가기
      </button>
    </div>
  );
}
