'use client';

import { useEffect, useRef, useState } from 'react';
import { useRouter } from 'next/navigation';
import { IoChevronBack } from 'react-icons/io5';
import { MdCameraAlt } from 'react-icons/md';
import { VscRefresh } from 'react-icons/vsc';
import axiosInstance from '@/api/axiosInstance';

export default function CameraPage() {
  const videoRef = useRef<HTMLVideoElement>(null);
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const router = useRouter();
  const [capturedImage, setCapturedImage] = useState<string | null>(null);
  const [isPreviewVisible, setIsPreviewVisible] = useState(false);
  const [isLoading, setIsLoading] = useState(false);

  // 카메라 시작 함수
  const startCamera = async () => {
    try {
      const stream = await navigator.mediaDevices.getUserMedia({ video: true });
      if (videoRef.current) {
        videoRef.current.srcObject = stream;
      }
    } catch (error) {
      console.error('카메라를 열 수 없습니다:', error);
    }
  };

  // 카메라 중지 함수
  const stopCamera = () => {
    if (videoRef.current && videoRef.current.srcObject) {
      (videoRef.current.srcObject as MediaStream)
        .getTracks()
        .forEach((track) => track.stop());
      videoRef.current.srcObject = null;
    }
  };

  useEffect(() => {
    startCamera();

    // 페이지를 떠날 때 항상 카메라 중지
    return () => {
      stopCamera();
    };
  }, []);

  const captureImage = () => {
    if (videoRef.current && canvasRef.current) {
      const canvas = canvasRef.current;
      const video = videoRef.current;

      canvas.width = video.videoWidth;
      canvas.height = video.videoHeight;

      const context = canvas.getContext('2d');
      if (context) {
        context.drawImage(video, 0, 0, canvas.width, canvas.height);
        const imageDataUrl = canvas.toDataURL('image/png'); // 이미지를 PNG 데이터로 변환
        setCapturedImage(imageDataUrl);
        setIsPreviewVisible(true); // 미리보기 팝업 열기
        stopCamera(); // 사진 촬영 후 카메라 중지
      }
    }
  };

  const handleRetake = () => {
    setCapturedImage(null);
    setIsPreviewVisible(false);
    startCamera(); // 다시 찍기 시 카메라 재시작
  };

  const handleNext = async () => {
    if (!capturedImage) {
      alert('이미지가 없습니다.');
      return;
    }

    setIsLoading(true); // 로딩 시작
    try {
      const blob = await fetch(capturedImage).then((res) => res.blob());
      const file = new File([blob], 'captured-image.png', {
        type: 'image/png',
      });
      const formData = new FormData();
      formData.append('file', file);

      console.log('전송할 파일:', file);
      console.log('FormData:', formData);

      const response = await axiosInstance.post('/clothes/upload', formData, {
        headers: { 'Content-Type': 'multipart/form-data' },
      });

      console.log('서버 응답 데이터:', response.data);
      router.push(
        `/closet/add?data=${encodeURIComponent(JSON.stringify(response.data))}`
      );
    } catch (error) {
      console.error('이미지 업로드 중 오류 발생:', error);
      alert('이미지 업로드에 실패했습니다.');
    } finally {
      setIsLoading(false); // 로딩 종료
    }
  };

  return (
    <div className='flex flex-col items-center w-full min-h-screen bg-white'>
      <header className='w-full flex items-center justify-between p-4'>
        <button
          onClick={() => {
            stopCamera();
            router.push('/closet');
          }}
          className='text-xl'
        >
          <IoChevronBack size={24} />
        </button>
        <h1 className='text-xl font-semibold'>내 옷 등록하기</h1>
        <div></div>
      </header>
      <div className='flex flex-col items-center justify-start flex-grow mt-32'>
        {!capturedImage && (
          <video
            ref={videoRef}
            autoPlay
            className='w-full max-w-md h-70 rounded-md'
          ></video>
        )}
        <p className='text-[#807A7A] font-medium mt-4'>
          옷을 가지런히 정돈 후 촬영해주세요.
        </p>

        {/* 카메라 아이콘 버튼 */}
        {!capturedImage && (
          <button
            onClick={captureImage}
            className='mt-24 p-4 bg-[#171A1F] text-white rounded-full flex items-center justify-center'
          >
            <MdCameraAlt size={32} />
          </button>
        )}

        {/* 캔버스 요소 (캡처된 이미지 저장용, 화면에 표시 안 됨) */}
        <canvas ref={canvasRef} style={{ display: 'none' }}></canvas>

        {/* 팝업 미리보기 */}
        {isPreviewVisible && capturedImage && (
          <div className='fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4'>
            <div className='bg-white rounded-xl max-w-md w-full p-6 relative flex flex-col items-center'>
              <h2 className='text-lg font-semibold text-gray-800 mb-4'>
                미리 보기
              </h2>
              <img
                src={capturedImage}
                alt='Captured'
                className='w-full h-80 object-cover rounded-lg mb-4'
              />
              <div className='flex gap-4 w-full'>
                <button
                  onClick={handleRetake}
                  className='flex items-center justify-center gap-2 flex-grow py-3 bg-gray-200 text-gray-700 font-medium rounded-md'
                  style={{ flex: 1 }}
                >
                  <VscRefresh size={20} />
                </button>
                <button
                  onClick={handleNext}
                  className='flex-grow py-3 bg-black text-white font-medium rounded-md'
                  style={{ flex: 2 }}
                >
                  다음
                </button>
              </div>
            </div>
          </div>
        )}
      </div>

      {/* 로딩 스피너 */}
      {isLoading && (
        <div className='fixed inset-0 bg-black bg-opacity-30 flex justify-center items-center z-50'>
          <div className='w-16 h-16 border-4 border-gray-200 border-t-blue-500 rounded-full animate-spin'></div>
        </div>
      )}
    </div>
  );
}
