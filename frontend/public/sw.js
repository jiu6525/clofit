if (!self.define) {
  let e,
    n = {};
  const s = (s, i) => (
    (s = new URL(s + '.js', i).href),
    n[s] ||
      new Promise((n) => {
        if ('document' in self) {
          const e = document.createElement('script');
          (e.src = s), (e.onload = n), document.head.appendChild(e);
        } else (e = s), importScripts(s), n();
      }).then(() => {
        let e = n[s];
        if (!e) throw new Error(`Module ${s} didn’t register its module`);
        return e;
      })
  );
  self.define = (i, a) => {
    const c =
      e ||
      ('document' in self ? document.currentScript.src : '') ||
      location.href;
    if (n[c]) return;
    let t = {};
    const r = (e) => s(e, c),
      o = { module: { uri: c }, exports: t, require: r };
    n[c] = Promise.all(i.map((e) => o[e] || r(e))).then((e) => (a(...e), t));
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
          revision: '00d9a3a0419fca5ecf7baa0d82146ac1',
        },
        {
          url: '/_next/static/chunks/0e762574-fe64f4ff3f7d9e36.js',
          revision: 'eGr78Bn7nfYZw9UpomUPY',
        },
        {
          url: '/_next/static/chunks/117-88eeae03e851d973.js',
          revision: 'eGr78Bn7nfYZw9UpomUPY',
        },
        {
          url: '/_next/static/chunks/145-9f794b247218115d.js',
          revision: 'eGr78Bn7nfYZw9UpomUPY',
        },
        {
          url: '/_next/static/chunks/319-67be5add21903307.js',
          revision: 'eGr78Bn7nfYZw9UpomUPY',
        },
        {
          url: '/_next/static/chunks/464-f731fb41ddfdd3d0.js',
          revision: 'eGr78Bn7nfYZw9UpomUPY',
        },
        {
          url: '/_next/static/chunks/479ba886-aaecaa6bb3730e95.js',
          revision: 'eGr78Bn7nfYZw9UpomUPY',
        },
        {
          url: '/_next/static/chunks/66ec4792-e424533d44a349e5.js',
          revision: 'eGr78Bn7nfYZw9UpomUPY',
        },
        {
          url: '/_next/static/chunks/795d4814-5ef8c94aa995b6ce.js',
          revision: 'eGr78Bn7nfYZw9UpomUPY',
        },
        {
          url: '/_next/static/chunks/8e1d74a4-1cc4eb4193743de2.js',
          revision: 'eGr78Bn7nfYZw9UpomUPY',
        },
        {
          url: '/_next/static/chunks/9c4e2130-fb2299eb57e3bdfb.js',
          revision: 'eGr78Bn7nfYZw9UpomUPY',
        },
        {
          url: '/_next/static/chunks/app/_not-found/page-bfe1d79d4ac15583.js',
          revision: 'eGr78Bn7nfYZw9UpomUPY',
        },
        {
          url: '/_next/static/chunks/app/closet/add/page-9ba39f91333f4927.js',
          revision: 'eGr78Bn7nfYZw9UpomUPY',
        },
        {
          url: '/_next/static/chunks/app/closet/page-0003065dc4241c20.js',
          revision: 'eGr78Bn7nfYZw9UpomUPY',
        },
        {
          url: '/_next/static/chunks/app/feed/page-9115cf540b9981e8.js',
          revision: 'eGr78Bn7nfYZw9UpomUPY',
        },
        {
          url: '/_next/static/chunks/app/feed/product/%5Bclothes_id%5D/page-087ca7e17fc658e5.js',
          revision: 'eGr78Bn7nfYZw9UpomUPY',
        },
        {
          url: '/_next/static/chunks/app/feed/snap/%5Bfitting_id%5D/page-b47757c765268035.js',
          revision: 'eGr78Bn7nfYZw9UpomUPY',
        },
        {
          url: '/_next/static/chunks/app/fitting/add/base-image/page-68e158ee14400649.js',
          revision: 'eGr78Bn7nfYZw9UpomUPY',
        },
        {
          url: '/_next/static/chunks/app/fitting/add/clothes/page-776a8b847921acbc.js',
          revision: 'eGr78Bn7nfYZw9UpomUPY',
        },
        {
          url: '/_next/static/chunks/app/fitting/add/confirm/page-c8483d195ac34428.js',
          revision: 'eGr78Bn7nfYZw9UpomUPY',
        },
        {
          url: '/_next/static/chunks/app/fitting/add/fullbody/page-c287f86afacefdb4.js',
          revision: 'eGr78Bn7nfYZw9UpomUPY',
        },
        {
          url: '/_next/static/chunks/app/fitting/add/model/page-30062609c6af9c87.js',
          revision: 'eGr78Bn7nfYZw9UpomUPY',
        },
        {
          url: '/_next/static/chunks/app/fitting/add/select/page-f940671f99b8b4a1.js',
          revision: 'eGr78Bn7nfYZw9UpomUPY',
        },
        {
          url: '/_next/static/chunks/app/fitting/page-8375ef2c46864328.js',
          revision: 'eGr78Bn7nfYZw9UpomUPY',
        },
        {
          url: '/_next/static/chunks/app/home/page-c8b8b2771762fd6e.js',
          revision: 'eGr78Bn7nfYZw9UpomUPY',
        },
        {
          url: '/_next/static/chunks/app/kakao-redirect/page-5938f09f9d05ee4f.js',
          revision: 'eGr78Bn7nfYZw9UpomUPY',
        },
        {
          url: '/_next/static/chunks/app/layout-f1e40b2b4351efa6.js',
          revision: 'eGr78Bn7nfYZw9UpomUPY',
        },
        {
          url: '/_next/static/chunks/app/my/page-d00c895d024d7ef2.js',
          revision: 'eGr78Bn7nfYZw9UpomUPY',
        },
        {
          url: '/_next/static/chunks/app/page-cd4282efe0f3926f.js',
          revision: 'eGr78Bn7nfYZw9UpomUPY',
        },
        {
          url: '/_next/static/chunks/ee560e2c-fbf65345ab7d5000.js',
          revision: 'eGr78Bn7nfYZw9UpomUPY',
        },
        {
          url: '/_next/static/chunks/fd9d1056-928f34a4ce0061cc.js',
          revision: 'eGr78Bn7nfYZw9UpomUPY',
        },
        {
          url: '/_next/static/chunks/framework-f66176bb897dc684.js',
          revision: 'eGr78Bn7nfYZw9UpomUPY',
        },
        {
          url: '/_next/static/chunks/main-126f1fdf589f67fa.js',
          revision: 'eGr78Bn7nfYZw9UpomUPY',
        },
        {
          url: '/_next/static/chunks/main-app-55b51298a592a373.js',
          revision: 'eGr78Bn7nfYZw9UpomUPY',
        },
        {
          url: '/_next/static/chunks/pages/_app-72b849fbd24ac258.js',
          revision: 'eGr78Bn7nfYZw9UpomUPY',
        },
        {
          url: '/_next/static/chunks/pages/_error-7ba65e1336b92748.js',
          revision: 'eGr78Bn7nfYZw9UpomUPY',
        },
        {
          url: '/_next/static/chunks/polyfills-42372ed130431b0a.js',
          revision: '846118c33b2c0e922d7b3a7676f81f6f',
        },
        {
          url: '/_next/static/chunks/webpack-c24ebed977ee6079.js',
          revision: 'eGr78Bn7nfYZw9UpomUPY',
        },
        {
          url: '/_next/static/css/22846c7de7aa7eb1.css',
          revision: '22846c7de7aa7eb1',
        },
        {
          url: '/_next/static/css/4df78f2cd73d6b26.css',
          revision: '4df78f2cd73d6b26',
        },
        {
          url: '/_next/static/eGr78Bn7nfYZw9UpomUPY/_buildManifest.js',
          revision: 'c155cce658e53418dec34664328b51ac',
        },
        {
          url: '/_next/static/eGr78Bn7nfYZw9UpomUPY/_ssgManifest.js',
          revision: 'b6652df95db52feb4daf4eca35380933',
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
          revision: '037ddf05e36a1a663795b761bddcb2fe',
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
          revision: '4d67f1adc9a4b5edef9be2fc57244496',
        },
        {
          url: '/images/mainslide2.png',
          revision: '81d4750a0adb68f3c394b61557165a2a',
        },
        {
          url: '/images/mainslide3.png',
          revision: '06e95d278c41d670c872c6159c75e552',
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
        { url: '/snap1.png', revision: 'e635e08bd7877a9b6c2ffa2c4f4bd04e' },
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
              response: n,
              event: s,
              state: i,
            }) =>
              n && 'opaqueredirect' === n.type
                ? new Response(n.body, {
                    status: 200,
                    statusText: 'OK',
                    headers: n.headers,
                  })
                : n,
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
        const n = e.pathname;
        return !n.startsWith('/api/auth/') && !!n.startsWith('/api/');
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
