import { useEffect, useRef } from 'react';
import { AiOutlinePlus } from 'react-icons/ai';
import usePhotoStore from '@/stores/usePhotoStore';
import axiosInstance from '@/api/axiosInstance';

export default function MyOriginPicture() {
  const { photos, fetchPhotos } = usePhotoStore();
  const isFetched = useRef(false); // fetchPhotos 호출 여부 기록

  // 초기 데이터 호출
  useEffect(() => {
    if (!isFetched.current) {
      isFetched.current = true;
      fetchPhotos().catch((error) =>
        console.error('사진 불러오기 실패:', error)
      );
    }
  }, [fetchPhotos]);

  // 파일 선택 및 자동 업로드
  const handleFileChange = async (
    event: React.ChangeEvent<HTMLInputElement>
  ) => {
    if (event.target.files && event.target.files.length > 0) {
      const file = event.target.files[0];

      const formData = new FormData();
      formData.append('memberId', '1'); // 실제 memberId로 대체하세요.
      formData.append('files', file);

      try {
        const response = await axiosInstance.post(
          '/origin-picture/upload',
          formData,
          {
            headers: {
              'Content-Type': 'multipart/form-data',
            },
          }
        );
        console.log('업로드 성공:', response.data);
        fetchPhotos(); // 업로드 후 사진 목록 새로고침
      } catch (error) {
        console.error('업로드 실패:', error);
        alert('업로드에 실패했습니다. 다시 시도해 주세요.');
      }
    }
  };

  return (
    <div className='grid grid-cols-3 w-full'>
      {photos.map((photo) => (
        <div
          key={photo.id}
          className='aspect-[5/6] bg-gray-200 overflow-hidden'
        >
          <img
            src={photo.imageUrl}
            alt={`Photo ${photo.id}`}
            className='w-full h-full object-cover'
          />
        </div>
      ))}

      {/* 추가 버튼 */}
      <div className='aspect-[5/6] flex items-center justify-center bg-gray-200 cursor-pointer'>
        <input
          type='file'
          accept='image/*'
          onChange={handleFileChange}
          className='hidden'
          id='file-upload'
        />
        <label htmlFor='file-upload' className='cursor-pointer'>
          <AiOutlinePlus className='text-4xl text-gray-500' />
        </label>
      </div>
    </div>
  );
}
