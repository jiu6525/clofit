'use client';

import { useRouter, useSearchParams } from 'next/navigation';

type SearchParamsHandlerProps = {
  imageUrl: string;
  imageId: number;
};

export default function SearchParamsHandler({
  imageUrl,
  imageId,
}: SearchParamsHandlerProps) {
  const router = useRouter();
  const searchParams = useSearchParams();
  const type = searchParams?.get('type') || 'top';

  const handleImageSelect = () => {
    router.push(
      `/fitting/add/clothes?type=${type}&baseImageUrl=${encodeURIComponent(
        imageUrl
      )}`
    );
  };

  return (
    <button
      onClick={handleImageSelect}
      className='relative border-2 border-gray-300 hover:border-blue-500 rounded-lg overflow-hidden aspect-[5/6]'
    >
      <img
        src={imageUrl}
        alt={`전신 사진 ${imageId}`}
        className='object-contain w-full h-full'
      />
    </button>
  );
}
