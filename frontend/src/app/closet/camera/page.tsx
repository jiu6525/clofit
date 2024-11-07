'use client';

import { useEffect, useRef, useState } from 'react';
import { useRouter } from 'next/navigation';

export default function CameraPage() {
  const videoRef = useRef<HTMLVideoElement>(null);
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const router = useRouter();
  const [capturedImage, setCapturedImage] = useState<string | null>(null);

  useEffect(() => {
    const startCamera = async () => {
      try {
        const stream = await navigator.mediaDevices.getUserMedia({
          video: true,
        });
        if (videoRef.current) {
          videoRef.current.srcObject = stream;
        }
      } catch (error) {
        console.error('카메라를 열 수 없습니다:', error);
      }
    };

    startCamera();

    return () => {
      if (videoRef.current && videoRef.current.srcObject) {
        (videoRef.current.srcObject as MediaStream)
          .getTracks()
          .forEach((track) => track.stop());
      }
    };
  }, []);

  const captureImage = () => {
    if (videoRef.current && canvasRef.current) {
      const canvas = canvasRef.current;
      const video = videoRef.current;

      // 캔버스 크기를 비디오 크기로 설정
      canvas.width = video.videoWidth;
      canvas.height = video.videoHeight;

      // 캔버스에 현재 비디오 프레임을 그리기
      const context = canvas.getContext('2d');
      if (context) {
        context.drawImage(video, 0, 0, canvas.width, canvas.height);
        // 캡처된 이미지 URL 생성
        const imageDataUrl = canvas.toDataURL('image/png');
        setCapturedImage(imageDataUrl);
      }
    }
  };

  return (
    <div className='flex flex-col items-center w-full min-h-screen bg-white'>
      <header className='w-full flex items-center justify-between p-4'>
        <button onClick={() => router.back()}>&larr;</button>
        <h1 className='text-xl font-semibold'>내 옷 등록하기</h1>
        <div></div>
      </header>
      <div className='flex flex-col items-center'>
        <video
          ref={videoRef}
          autoPlay
          className='w-64 h-64 bg-black rounded-md'
        ></video>
        <button
          onClick={captureImage}
          className='mt-4 px-4 py-2 bg-blue-500 text-white rounded'
        >
          촬영
        </button>
        <p className='text-gray-500 mt-4'>
          옷을 가지런히 정돈 후 촬영해주세요.
        </p>

        {/* 캔버스 요소 (캡처된 이미지 저장용, 화면에 표시 안 됨) */}
        <canvas ref={canvasRef} style={{ display: 'none' }}></canvas>

        {/* 캡처된 이미지 미리보기 */}
        {capturedImage && (
          <div className='mt-4'>
            <h2 className='text-lg font-semibold'>캡처된 이미지</h2>
            <img
              src={capturedImage}
              alt='Captured'
              className='w-64 h-64 mt-2 border border-gray-300 rounded-md'
            />
          </div>
        )}
      </div>
    </div>
  );
}
