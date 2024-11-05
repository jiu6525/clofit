'use client';

import { useEffect, useState } from 'react';
import LeftTitleTopbar from '@/components/LeftTitleTopbar';
import EmptyCloset from './components/EmptyCloset';
import FilledCloset from './components/FilledCloset';

export default function Closet() {
  const [hasItems, setHasItems] = useState(true);

  useEffect(() => {
    fetchItems();
  }, []);

  // 아이템 조회 함수.
  async function fetchItems() {
    try {
      // const response = await fetch('/api/items'); // 예시 API 엔드포인트
      // const data = await response.json();
      // setHasItems(data.length > 0); // 데이터가 있으면 true, 없으면 false로 설정

      // 임시로 아이템이 있다고 설정
      setHasItems(true);
    } catch (error) {
      console.error('아이템 로딩 중 에러 발생:', error);
    }
  }

  return (
    <div>
      <LeftTitleTopbar title='옷장' />
      <div className='content'>
        {hasItems ? <FilledCloset /> : <EmptyCloset />}
      </div>
    </div>
  );
}
