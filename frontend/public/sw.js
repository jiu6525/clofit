if (!self.define) {
  let e,
    s = {};
  const a = (a, i) => (
    (a = new URL(a + '.js', i).href),
    s[a] ||
      new Promise((s) => {
        if ('document' in self) {
          const e = document.createElement('script');
          (e.src = a), (e.onload = s), document.head.appendChild(e);
        } else (e = a), importScripts(a), s();
      }).then(() => {
        let e = s[a];
        if (!e) throw new Error(`Module ${a} didn’t register its module`);
        return e;
      })
  );
  self.define = (i, n) => {
    const c =
      e ||
      ('document' in self ? document.currentScript.src : '') ||
      location.href;
    if (s[c]) return;
    let t = {};
    const r = (e) => a(e, c),
      f = { module: { uri: c }, exports: t, require: r };
    s[c] = Promise.all(i.map((e) => f[e] || r(e))).then((e) => (n(...e), t));
  };
}
define(['./workbox-4754cb34'], function (e) {
  'use strict';
  importScripts(),
    self.skipWaiting(),
    e.clientsClaim(),
    e.precacheAndRoute(
      [
        {
          url: '/_next/app-build-manifest.json',
          revision: '9b789b17e9b36fa209bfc30ee1fbbb03',
        },
        {
          url: '/_next/static/chunks/117-9cb386937704b098.js',
          revision: 'pWF32XT4wxqyEWHtsf2Ua',
        },
        {
          url: '/_next/static/chunks/145-9a04a9dc1922fadd.js',
          revision: 'pWF32XT4wxqyEWHtsf2Ua',
        },
        {
          url: '/_next/static/chunks/294-1b6838f0a1be637b.js',
          revision: 'pWF32XT4wxqyEWHtsf2Ua',
        },
        {
          url: '/_next/static/chunks/464-f731fb41ddfdd3d0.js',
          revision: 'pWF32XT4wxqyEWHtsf2Ua',
        },
        {
          url: '/_next/static/chunks/479ba886-03a12a939e1de005.js',
          revision: 'pWF32XT4wxqyEWHtsf2Ua',
        },
        {
          url: '/_next/static/chunks/578c2090-c6740514c7946710.js',
          revision: 'pWF32XT4wxqyEWHtsf2Ua',
        },
        {
          url: '/_next/static/chunks/795d4814-8be1d5b3fb529107.js',
          revision: 'pWF32XT4wxqyEWHtsf2Ua',
        },
        {
          url: '/_next/static/chunks/8e1d74a4-a638717d92acd6fe.js',
          revision: 'pWF32XT4wxqyEWHtsf2Ua',
        },
        {
          url: '/_next/static/chunks/9c4e2130-c70ab06c2dfbd2ea.js',
          revision: 'pWF32XT4wxqyEWHtsf2Ua',
        },
        {
          url: '/_next/static/chunks/app/_not-found/page-ed944515befc3c38.js',
          revision: 'pWF32XT4wxqyEWHtsf2Ua',
        },
        {
          url: '/_next/static/chunks/app/closet/add/page-ba2d707aead06ea2.js',
          revision: 'pWF32XT4wxqyEWHtsf2Ua',
        },
        {
          url: '/_next/static/chunks/app/closet/camera/page-8ee1e156981637b8.js',
          revision: 'pWF32XT4wxqyEWHtsf2Ua',
        },
        {
          url: '/_next/static/chunks/app/closet/page-e3bf1326cd439fef.js',
          revision: 'pWF32XT4wxqyEWHtsf2Ua',
        },
        {
          url: '/_next/static/chunks/app/feed/page-5960df61c934e073.js',
          revision: 'pWF32XT4wxqyEWHtsf2Ua',
        },
        {
          url: '/_next/static/chunks/app/fitting/%5Bstep%5D/page-1ce50ebe4ae11c5f.js',
          revision: 'pWF32XT4wxqyEWHtsf2Ua',
        },
        {
          url: '/_next/static/chunks/app/fitting/page-852ea25f2d97a359.js',
          revision: 'pWF32XT4wxqyEWHtsf2Ua',
        },
        {
          url: '/_next/static/chunks/app/home/page-0283975a61b1df3d.js',
          revision: 'pWF32XT4wxqyEWHtsf2Ua',
        },
        {
          url: '/_next/static/chunks/app/kakao-redirect/page-c4d0b4c9e8ef81ed.js',
          revision: 'pWF32XT4wxqyEWHtsf2Ua',
        },
        {
          url: '/_next/static/chunks/app/layout-a3f2116cebc60233.js',
          revision: 'pWF32XT4wxqyEWHtsf2Ua',
        },
        {
          url: '/_next/static/chunks/app/my/page-494df57f5fc1b9da.js',
          revision: 'pWF32XT4wxqyEWHtsf2Ua',
        },
        {
          url: '/_next/static/chunks/app/page-1fb999790057fc58.js',
          revision: 'pWF32XT4wxqyEWHtsf2Ua',
        },
        {
          url: '/_next/static/chunks/fca4dd8b-2b49b99502b69e74.js',
          revision: 'pWF32XT4wxqyEWHtsf2Ua',
        },
        {
          url: '/_next/static/chunks/fd9d1056-13baa9b2029d31fe.js',
          revision: 'pWF32XT4wxqyEWHtsf2Ua',
        },
        {
          url: '/_next/static/chunks/framework-f66176bb897dc684.js',
          revision: 'pWF32XT4wxqyEWHtsf2Ua',
        },
        {
          url: '/_next/static/chunks/main-5313e9f83b77f7e9.js',
          revision: 'pWF32XT4wxqyEWHtsf2Ua',
        },
        {
          url: '/_next/static/chunks/main-app-d4cbbe03a89c4521.js',
          revision: 'pWF32XT4wxqyEWHtsf2Ua',
        },
        {
          url: '/_next/static/chunks/pages/_app-72b849fbd24ac258.js',
          revision: 'pWF32XT4wxqyEWHtsf2Ua',
        },
        {
          url: '/_next/static/chunks/pages/_error-7ba65e1336b92748.js',
          revision: 'pWF32XT4wxqyEWHtsf2Ua',
        },
        {
          url: '/_next/static/chunks/polyfills-42372ed130431b0a.js',
          revision: '846118c33b2c0e922d7b3a7676f81f6f',
        },
        {
          url: '/_next/static/chunks/webpack-c24ebed977ee6079.js',
          revision: 'pWF32XT4wxqyEWHtsf2Ua',
        },
        {
          url: '/_next/static/css/3cb937a23c2a310e.css',
          revision: '3cb937a23c2a310e',
        },
        {
          url: '/_next/static/css/4df78f2cd73d6b26.css',
          revision: '4df78f2cd73d6b26',
        },
        {
          url: '/_next/static/media/ajax-loader.0b80f665.gif',
          revision: '0b80f665',
        },
        {
          url: '/_next/static/media/ff840cfebfb63b0c-s.p.woff2',
          revision: '302ec55f5b4320354ec6b35a53dead87',
        },
        { url: '/_next/static/media/slick.25572f22.eot', revision: '25572f22' },
        {
          url: '/_next/static/media/slick.653a4cbb.woff',
          revision: '653a4cbb',
        },
        { url: '/_next/static/media/slick.6aa1ee46.ttf', revision: '6aa1ee46' },
        { url: '/_next/static/media/slick.f895cfdf.svg', revision: 'f895cfdf' },
        {
          url: '/_next/static/pWF32XT4wxqyEWHtsf2Ua/_buildManifest.js',
          revision: 'c155cce658e53418dec34664328b51ac',
        },
        {
          url: '/_next/static/pWF32XT4wxqyEWHtsf2Ua/_ssgManifest.js',
          revision: 'b6652df95db52feb4daf4eca35380933',
        },
        { url: '/closet.svg', revision: 'ad2748ed457993e4b8dd23967edb1c74' },
        {
          url: '/default-profile.png',
          revision: '50425232dadb9845ad681fdf91740ae6',
        },
        { url: '/favicon.ico', revision: 'dbdb0f3978d04294ed50cf6ebd516d8c' },
        { url: '/gofitting.svg', revision: '41d36dc4fa69b918720cef76981030d5' },
        {
          url: '/icon-196x196.png',
          revision: '968c32b3311f8961cb53aa8fbe21aff5',
        },
        {
          url: '/icon-558x558.png',
          revision: 'ea18d703189067bf75b5bd92adcbdf91',
        },
        {
          url: '/images/closet-active.svg',
          revision: 'f8864b194658825cd901876b9cdc087c',
        },
        {
          url: '/images/closet-inactive.svg',
          revision: 'eaa2b8bff4c6c5dea032e727ea6c6bf2',
        },
        {
          url: '/images/empty-closet-icon.svg',
          revision: '9a0726e85289fd0c854d339a7ef53701',
        },
        {
          url: '/images/feed-active.svg',
          revision: 'b5172fea6aca82cb2e9beccc10b4648a',
        },
        {
          url: '/images/feed-inactive.svg',
          revision: '7341fa3bb07aa46d82d1cd72cd054946',
        },
        {
          url: '/images/fitting-active.svg',
          revision: '18f65fe564ad32798e85cadfbc577c83',
        },
        {
          url: '/images/fitting-inactive.svg',
          revision: 'cbfd72ad8c646f2d76e9cf53ebf5c6a2',
        },
        {
          url: '/images/home-active.svg',
          revision: 'c7d59a73c8da8f64d51de0bc99344201',
        },
        {
          url: '/images/home-inactive.svg',
          revision: 'f83e9883f1c1f05908db04658cbc816c',
        },
        {
          url: '/images/mainslide1.png',
          revision: 'daf096b6f166a1491d46b5ba1228b3bc',
        },
        {
          url: '/images/mainslide1.svg',
          revision: 'db4f79b1ec07366b49f052e4f4179169',
        },
        {
          url: '/images/mainslide2.svg',
          revision: 'd7ec6b1976c331f3343effcf15762913',
        },
        {
          url: '/images/mainslide3.png',
          revision: 'df4eae5bc43e137c721cbaa9dcc49d3a',
        },
        {
          url: '/images/mainslide3.svg',
          revision: 'b921097a8561778321f64e7728195b7b',
        },
        {
          url: '/images/my-active.svg',
          revision: 'c1b3a58e9c739888b39b2155701f0870',
        },
        {
          url: '/images/my-inactive.svg',
          revision: '0be8059c505abde90b645c33469827a7',
        },
        {
          url: '/kakao_login_large_narrow.png',
          revision: 'a18402cdd3eb17d907895ccff7957015',
        },
        { url: '/logo.svg', revision: 'e330e630932efc5ce6c94cd3ef101539' },
        { url: '/manifest.json', revision: '2311d7ff2809444d1ed09c21a546a4bc' },
        {
          url: '/onboarding.svg',
          revision: 'f2903e41c9f42c98c4f241861356826a',
        },
        { url: '/snap1.webp', revision: '615388fa35b069274d5c7618aaf43047' },
        { url: '/snap2.webp', revision: '595b0a6af3cc3e5fc39eb259d89caf3a' },
        { url: '/snap3.webp', revision: 'e5429d9bed9f9cb0f101390d514cac14' },
        { url: '/온보딩1.png', revision: 'e3fdd257c016486e971b3987e184547e' },
        {
          url: '/옷장 - 아이템 추가1.png',
          revision: '689e84c1f89aefccbdfd867560165ebe',
        },
      ],
      { ignoreURLParametersMatching: [] }
    ),
    e.cleanupOutdatedCaches(),
    e.registerRoute(
      '/',
      new e.NetworkFirst({
        cacheName: 'start-url',
        plugins: [
          {
            cacheWillUpdate: async ({
              request: e,
              response: s,
              event: a,
              state: i,
            }) =>
              s && 'opaqueredirect' === s.type
                ? new Response(s.body, {
                    status: 200,
                    statusText: 'OK',
                    headers: s.headers,
                  })
                : s,
          },
        ],
      }),
      'GET'
    ),
    e.registerRoute(
      /^https:\/\/fonts\.(?:gstatic)\.com\/.*/i,
      new e.CacheFirst({
        cacheName: 'google-fonts-webfonts',
        plugins: [
          new e.ExpirationPlugin({ maxEntries: 4, maxAgeSeconds: 31536e3 }),
        ],
      }),
      'GET'
    ),
    e.registerRoute(
      /^https:\/\/fonts\.(?:googleapis)\.com\/.*/i,
      new e.StaleWhileRevalidate({
        cacheName: 'google-fonts-stylesheets',
        plugins: [
          new e.ExpirationPlugin({ maxEntries: 4, maxAgeSeconds: 604800 }),
        ],
      }),
      'GET'
    ),
    e.registerRoute(
      /\.(?:eot|otf|ttc|ttf|woff|woff2|font.css)$/i,
      new e.StaleWhileRevalidate({
        cacheName: 'static-font-assets',
        plugins: [
          new e.ExpirationPlugin({ maxEntries: 4, maxAgeSeconds: 604800 }),
        ],
      }),
      'GET'
    ),
    e.registerRoute(
      /\.(?:jpg|jpeg|gif|png|svg|ico|webp)$/i,
      new e.StaleWhileRevalidate({
        cacheName: 'static-image-assets',
        plugins: [
          new e.ExpirationPlugin({ maxEntries: 64, maxAgeSeconds: 86400 }),
        ],
      }),
      'GET'
    ),
    e.registerRoute(
      /\/_next\/image\?url=.+$/i,
      new e.StaleWhileRevalidate({
        cacheName: 'next-image',
        plugins: [
          new e.ExpirationPlugin({ maxEntries: 64, maxAgeSeconds: 86400 }),
        ],
      }),
      'GET'
    ),
    e.registerRoute(
      /\.(?:mp3|wav|ogg)$/i,
      new e.CacheFirst({
        cacheName: 'static-audio-assets',
        plugins: [
          new e.RangeRequestsPlugin(),
          new e.ExpirationPlugin({ maxEntries: 32, maxAgeSeconds: 86400 }),
        ],
      }),
      'GET'
    ),
    e.registerRoute(
      /\.(?:mp4)$/i,
      new e.CacheFirst({
        cacheName: 'static-video-assets',
        plugins: [
          new e.RangeRequestsPlugin(),
          new e.ExpirationPlugin({ maxEntries: 32, maxAgeSeconds: 86400 }),
        ],
      }),
      'GET'
    ),
    e.registerRoute(
      /\.(?:js)$/i,
      new e.StaleWhileRevalidate({
        cacheName: 'static-js-assets',
        plugins: [
          new e.ExpirationPlugin({ maxEntries: 32, maxAgeSeconds: 86400 }),
        ],
      }),
      'GET'
    ),
    e.registerRoute(
      /\.(?:css|less)$/i,
      new e.StaleWhileRevalidate({
        cacheName: 'static-style-assets',
        plugins: [
          new e.ExpirationPlugin({ maxEntries: 32, maxAgeSeconds: 86400 }),
        ],
      }),
      'GET'
    ),
    e.registerRoute(
      /\/_next\/data\/.+\/.+\.json$/i,
      new e.StaleWhileRevalidate({
        cacheName: 'next-data',
        plugins: [
          new e.ExpirationPlugin({ maxEntries: 32, maxAgeSeconds: 86400 }),
        ],
      }),
      'GET'
    ),
    e.registerRoute(
      /\.(?:json|xml|csv)$/i,
      new e.NetworkFirst({
        cacheName: 'static-data-assets',
        plugins: [
          new e.ExpirationPlugin({ maxEntries: 32, maxAgeSeconds: 86400 }),
        ],
      }),
      'GET'
    ),
    e.registerRoute(
      ({ url: e }) => {
        if (!(self.origin === e.origin)) return !1;
        const s = e.pathname;
        return !s.startsWith('/api/auth/') && !!s.startsWith('/api/');
      },
      new e.NetworkFirst({
        cacheName: 'apis',
        networkTimeoutSeconds: 10,
        plugins: [
          new e.ExpirationPlugin({ maxEntries: 16, maxAgeSeconds: 86400 }),
        ],
      }),
      'GET'
    ),
    e.registerRoute(
      ({ url: e }) => {
        if (!(self.origin === e.origin)) return !1;
        return !e.pathname.startsWith('/api/');
      },
      new e.NetworkFirst({
        cacheName: 'others',
        networkTimeoutSeconds: 10,
        plugins: [
          new e.ExpirationPlugin({ maxEntries: 32, maxAgeSeconds: 86400 }),
        ],
      }),
      'GET'
    ),
    e.registerRoute(
      ({ url: e }) => !(self.origin === e.origin),
      new e.NetworkFirst({
        cacheName: 'cross-origin',
        networkTimeoutSeconds: 10,
        plugins: [
          new e.ExpirationPlugin({ maxEntries: 32, maxAgeSeconds: 3600 }),
        ],
      }),
      'GET'
    );
});
