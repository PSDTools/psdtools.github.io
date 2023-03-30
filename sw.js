self.addEventListener('fetch', event => {
  // Skip cross-origin requests, like those for Google Analytics.
  if (event.request.url.startsWith(self.location.origin)) {
    event.respondWith(
      caches.match(event.request).then(cachedResponse => {
        if (cachedResponse) {
          return cachedResponse;
        }
 
        return caches.open(RUNTIME).then(cache => {
          return fetch(event.request).then(response => {
            // Put a copy of the response in the runtime cache.
            return cache.put(event.request, response.clone()).then(() => {
              return response;
            });
          });
        });
      })
    );
  }
});

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
