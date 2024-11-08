// FittingThumbnails.tsx
interface FittingThumbnailsProps {
  images: string[];
}

export default function FittingThumbnails({ images }: FittingThumbnailsProps) {
  return (
    <div className='grid grid-cols-2 gap-4 p-4 w-full max-w-[600px]'>
      {images.map((imageUrl, index) => (
        <div
          key={index}
          className='w-full aspect-square bg-gray-200 rounded-lg overflow-hidden flex items-center justify-center'
        >
          <img
            src={imageUrl}
            alt={`피팅 ${index + 1}`}
            className='w-full h-full object-cover'
          />
        </div>
      ))}
    </div>
  );
}
