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
    const o = (e) => a(e, c),
      r = { module: { uri: c }, exports: t, require: o };
    s[c] = Promise.all(i.map((e) => r[e] || o(e))).then((e) => (n(...e), t));
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
          revision: '2ac817f40768b982636207d4d107bfc4',
        },
        {
          url: '/_next/static/chunks/117-595573e0fcc5b453.js',
          revision: 'wC-a2KDoWd0mW83PWmqET',
        },
        {
          url: '/_next/static/chunks/145-51468973e0b9252d.js',
          revision: 'wC-a2KDoWd0mW83PWmqET',
        },
        {
          url: '/_next/static/chunks/301-e93a6bbcc7ba1dc7.js',
          revision: 'wC-a2KDoWd0mW83PWmqET',
        },
        {
          url: '/_next/static/chunks/479ba886-854bdcd88774b476.js',
          revision: 'wC-a2KDoWd0mW83PWmqET',
        },
        {
          url: '/_next/static/chunks/8e1d74a4-a638717d92acd6fe.js',
          revision: 'wC-a2KDoWd0mW83PWmqET',
        },
        {
          url: '/_next/static/chunks/9c4e2130-a8cd9bead61379c0.js',
          revision: 'wC-a2KDoWd0mW83PWmqET',
        },
        {
          url: '/_next/static/chunks/app/_not-found/page-eeb46644f889bcee.js',
          revision: 'wC-a2KDoWd0mW83PWmqET',
        },
        {
          url: '/_next/static/chunks/app/closet/camera/page-911227038b36bc4f.js',
          revision: 'wC-a2KDoWd0mW83PWmqET',
        },
        {
          url: '/_next/static/chunks/app/closet/page-d51f1bbd513090e4.js',
          revision: 'wC-a2KDoWd0mW83PWmqET',
        },
        {
          url: '/_next/static/chunks/app/feed/page-4c56b7ae1a3301d4.js',
          revision: 'wC-a2KDoWd0mW83PWmqET',
        },
        {
          url: '/_next/static/chunks/app/fitting/%5Bstep%5D/page-97b8a080d8b153a6.js',
          revision: 'wC-a2KDoWd0mW83PWmqET',
        },
        {
          url: '/_next/static/chunks/app/fitting/page-51c1fa279594322f.js',
          revision: 'wC-a2KDoWd0mW83PWmqET',
        },
        {
          url: '/_next/static/chunks/app/home/page-0c0df4a76b48eb71.js',
          revision: 'wC-a2KDoWd0mW83PWmqET',
        },
        {
          url: '/_next/static/chunks/app/layout-50d6781353d89ec8.js',
          revision: 'wC-a2KDoWd0mW83PWmqET',
        },
        {
          url: '/_next/static/chunks/app/my/page-5a4ce2b2385a98d6.js',
          revision: 'wC-a2KDoWd0mW83PWmqET',
        },
        {
          url: '/_next/static/chunks/app/page-27f32f29125d3bb5.js',
          revision: 'wC-a2KDoWd0mW83PWmqET',
        },
        {
          url: '/_next/static/chunks/fca4dd8b-2b49b99502b69e74.js',
          revision: 'wC-a2KDoWd0mW83PWmqET',
        },
        {
          url: '/_next/static/chunks/fd9d1056-596a8d76c47695b1.js',
          revision: 'wC-a2KDoWd0mW83PWmqET',
        },
        {
          url: '/_next/static/chunks/framework-f66176bb897dc684.js',
          revision: 'wC-a2KDoWd0mW83PWmqET',
        },
        {
          url: '/_next/static/chunks/main-8409444fab6355d0.js',
          revision: 'wC-a2KDoWd0mW83PWmqET',
        },
        {
          url: '/_next/static/chunks/main-app-d4cbbe03a89c4521.js',
          revision: 'wC-a2KDoWd0mW83PWmqET',
        },
        {
          url: '/_next/static/chunks/pages/_app-72b849fbd24ac258.js',
          revision: 'wC-a2KDoWd0mW83PWmqET',
        },
        {
          url: '/_next/static/chunks/pages/_error-7ba65e1336b92748.js',
          revision: 'wC-a2KDoWd0mW83PWmqET',
        },
        {
          url: '/_next/static/chunks/polyfills-42372ed130431b0a.js',
          revision: '846118c33b2c0e922d7b3a7676f81f6f',
        },
        {
          url: '/_next/static/chunks/webpack-379d5cab186fa984.js',
          revision: 'wC-a2KDoWd0mW83PWmqET',
        },
        {
          url: '/_next/static/css/08f9ec7d888d63e4.css',
          revision: '08f9ec7d888d63e4',
        },
        {
          url: '/_next/static/media/ff840cfebfb63b0c-s.p.woff2',
          revision: '302ec55f5b4320354ec6b35a53dead87',
        },
        {
          url: '/_next/static/wC-a2KDoWd0mW83PWmqET/_buildManifest.js',
          revision: 'c155cce658e53418dec34664328b51ac',
        },
        {
          url: '/_next/static/wC-a2KDoWd0mW83PWmqET/_ssgManifest.js',
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
          revision: 'c3f9a63cecfb4b58a64bc1a361e504fe',
        },
        {
          url: '/images/closet-inactive.svg',
          revision: 'd0fd472d2ef658e4e6088bcda896254c',
        },
        {
          url: '/images/empty-closet-icon.svg',
          revision: '9a0726e85289fd0c854d339a7ef53701',
        },
        {
          url: '/images/feed-active.svg',
          revision: '70deb75191ed58b42bd1c0b960fb2077',
        },
        {
          url: '/images/feed-inactive.svg',
          revision: '7b050418f2237ccc5758ff27abd056a1',
        },
        {
          url: '/images/fitting-active.svg',
          revision: '4d2e5384949222b79f6e466c6c913bd2',
        },
        {
          url: '/images/fitting-inactive.svg',
          revision: '577ea874e883565acb3169af2260cdc6',
        },
        {
          url: '/images/home-active.svg',
          revision: '9802907598f99f6e2f3f0aa382d4b809',
        },
        {
          url: '/images/home-inactive.svg',
          revision: '5df03913ed08f67f7b67b8005fd99e7f',
        },
        {
          url: '/images/my-active.svg',
          revision: '698cf396a51b9777ef304e0753af4a37',
        },
        {
          url: '/images/my-inactive.svg',
          revision: 'c1e60019355f1c3622f48fb3f62137e5',
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
