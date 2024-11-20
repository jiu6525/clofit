import { create } from 'zustand';
import axiosInstance from '@/api/axiosInstance';

interface OriginPictureItem {
  id: number;
  imageUrl: string;
}

interface ApiResponseItem {
  originPictureId: number;
  imgUrl: string;
}

interface PhotoStore {
  photos: OriginPictureItem[];
  fetchPhotos: () => Promise<void>;
}

const usePhotoStore = create<PhotoStore>((set) => ({
  photos: [],
  fetchPhotos: async () => {
    try {
      const response = await axiosInstance.get<ApiResponseItem[]>(
        '/origin-picture/base-image',
        {
          params: {
            memberId: 1, // 적절한 memberId로 대체하세요.
          },
        }
      );

      const formattedPhotos = response.data.map((item) => ({
        id: item.originPictureId,
        imageUrl: item.imgUrl,
      }));

      set({ photos: formattedPhotos.reverse() });
    } catch (error) {
      console.error('Error fetching photos:', error);
    }
  },
}));

export default usePhotoStore;
