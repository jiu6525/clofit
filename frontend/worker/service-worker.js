self.addEventListener('fetch', (event) => {
  // '/fitting' API 요청을 캐치하고 Background Sync를 등록할 수 있도록 설정
  if (event.request.url.includes('/fitting')) {
    event.respondWith(
      fetch(event.request).catch(() => {
        // 네트워크 요청 실패 시 Background Sync 등록
        return self.registration.sync
          .register('sync-fitting')
          .then(() => {
            console.log('Sync registered for /fitting');
            return new Response(
              JSON.stringify({ message: 'Request queued for Background Sync' }),
              {
                headers: { 'Content-Type': 'application/json' },
              }
            );
          })
          .catch((error) => {
            console.error('Sync registration failed:', error);
            return new Response(
              JSON.stringify({
                message: 'Background Sync registration failed',
              }),
              {
                headers: { 'Content-Type': 'application/json' },
              }
            );
          });
      })
    );
  }
});

// Background Sync 이벤트 리스너
self.addEventListener('sync', (event) => {
  if (event.tag === 'sync-fitting') {
    event.waitUntil(
      fetch('http://localhost:8080/fitting', {
        // 전체 URL 사용 권장
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          memberId: 1,
          category: 1,
          modelName: 'model_image.jpg',
          clothName: ['1.png', '10.png'], // 예시로 저장된 데이터를 사용
        }),
      })
        .then((response) => {
          if (response.ok) {
            console.log('Background Sync 성공');
            self.registration.showNotification(
              'Fitting 요청이 성공적으로 전송되었습니다.'
            );
          } else {
            console.error('응답 오류:', response.statusText);
          }
        })
        .catch((err) => {
          console.error('Background Sync 요청 실패:', err);
        })
    );
  }
});
