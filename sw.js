
event.respondWith((async () => {
  const cachedResponse = await caches.match(event.request);
  if (cachedResponse) {
    return cachedResponse;
  }

  const response = await fetch(event.request);

  if (!response || response.status !== 200 || response.type !== 'basic') {
    return response;
  }

  if (ENABLE_DYNAMIC_CACHING) {
    const responseToCache = response.clone();
    const cache = await caches.open(DYNAMIC_CACHE)
    await cache.put(event.request, response.clone());
  }

  return response;
})());

// const CACHE_NAME = 'cool-cache';

// // Add whichever assets you want to pre-cache here:
// const PRECACHE_ASSETS = [
// 	'/index.html',
// 	'/help.html',
// 	'/manifest.json',
// 	'/psdr3-icon.png',
// 	'/script.js',
// 	'/style.css'
// ]

// // Listener for the install event - pre-caches our assets list on service worker install.
// self.addEventListener('install', event => {
//     event.waitUntil((async () => {
//         const cache = await caches.open(CACHE_NAME);
//         cache.addAll(PRECACHE_ASSETS);
//     })());
// });
// self.addEventListener('activate', event => {
//   event.waitUntil(clients.claim());
// });
// self.addEventListener('fetch', event => {
//   event.respondWith(async () => {
//       const cache = await caches.open(CACHE_NAME);

//       // match the request to our cache
//       const cachedResponse = await cache.match(event.request);

//       // check if we got a valid response
//       if (cachedResponse !== undefined) {
//           // Cache hit, return the resource
//           return cachedResponse;
//       } else {
//         // Otherwise, go to the network
//           return fetch(event.request)
//       };
//   });
// });
