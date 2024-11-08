// my/components/MyPhotos.tsx
export default function MyPhotos() {
  const photos = new Array(6).fill(null); // 임시로 6개의 아이템을 빈 배열로 생성

  return (
    <div className='grid grid-cols-3 w-full'>
      {photos.map((_, index) => (
        <div key={index} className='aspect-square bg-gray-200'></div>
      ))}
    </div>
  );
}
