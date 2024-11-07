'use client';

import { useEffect, useRef, useState } from 'react';
import { useRouter } from 'next/navigation';
import { IoChevronBack } from 'react-icons/io5';
import { MdCameraAlt } from 'react-icons/md';
import { VscRefresh } from 'react-icons/vsc';

export default function CameraPage() {
  const videoRef = useRef<HTMLVideoElement>(null);
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const router = useRouter();
  const [capturedImage, setCapturedImage] = useState<string | null>(null);
  const [isPreviewVisible, setIsPreviewVisible] = useState(false); // 팝업 표시 여부

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
        setIsPreviewVisible(true); // 미리보기 팝업 열기
      }
    }
  };

  const handleRetake = () => {
    setIsPreviewVisible(false); // 팝업 닫기
  };

  const handleNext = () => {
    router.push('/closet/add'); // 다음 화면으로 이동
  };

  return (
    <div className='flex flex-col items-center w-full min-h-screen bg-white'>
      <header className='w-full flex items-center justify-between p-4'>
        <button onClick={() => router.back()} className='text-xl'>
          <IoChevronBack size={24} />
        </button>
        <h1 className='text-xl font-semibold'>내 옷 등록하기</h1>
        <div></div>
      </header>
      <div className='flex flex-col items-center justify-start flex-grow mt-32'>
        <video
          ref={videoRef}
          autoPlay
          className='w-full max-w-md h-70 rounded-md'
        ></video>
        <p className='text-[#807A7A] font-medium mt-4'>
          옷을 가지런히 정돈 후 촬영해주세요.
        </p>

        {/* 카메라 아이콘 버튼 */}
        <button
          onClick={captureImage}
          className='mt-24 p-4 bg-[#171A1F] text-white rounded-full flex items-center justify-center'
        >
          <MdCameraAlt size={32} />
        </button>

        {/* 캔버스 요소 (캡처된 이미지 저장용, 화면에 표시 안 됨) */}
        <canvas ref={canvasRef} style={{ display: 'none' }}></canvas>

        {/* 팝업 미리보기 */}
        {isPreviewVisible && capturedImage && (
          <div className='fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4'>
            <div className='bg-white rounded-xl max-w-md w-full p-6 relative flex flex-col items-center'>
              {/* 상단 중앙 문구 */}
              <h2 className='text-lg font-semibold text-gray-800 mb-4'>
                미리 보기
              </h2>

              {/* 이미지 */}
              <img
                src={capturedImage}
                alt='Captured'
                className='w-full h-80 object-cover rounded-lg mb-4'
              />

              {/* '다시 찍기' 및 '다음' 버튼 */}
              <div className='flex gap-4 w-full'>
                <button
                  onClick={handleRetake}
                  className='flex items-center justify-center gap-2 flex-grow py-3 bg-gray-200 text-gray-700 font-medium rounded-md'
                  style={{ flex: 1 }}
                >
                  <VscRefresh size={20} /> {/* 아이콘 추가 */}
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
    </div>
  );
}
