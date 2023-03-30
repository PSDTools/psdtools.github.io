// I will be so happy if this works
//https://css-tricks.com/add-a-service-worker-to-your-site/
// Core assets
let coreAssets = ["index.html","AppImages","manifest.json","script.js","style.css","psdr3-icon.png"];

// On install, cache core assets
self.addEventListener('install', function (event) {

	// Cache core assets
	event.waitUntil(caches.open('app').then(function (cache) {
		for (let asset of coreAssets) {
			cache.add(new Request(asset));
		}
		return cache;
	}));

});

// Listen for request events
self.addEventListener('fetch', function (event) {

	// Get the request
	let request = event.request;

	// Bug fix
	// https://stackoverflow.com/a/49719964
	if (event.request.cache === 'only-if-cached' && event.request.mode !== 'same-origin') return;

	// HTML files
	// Network-first
	if (request.headers.get('Accept').includes('text/html')) {
		event.respondWith(
			fetch(request).then(function (response) {

				// Create a copy of the response and save it to the cache
				let copy = response.clone();
				event.waitUntil(caches.open('app').then(function (cache) {
					return cache.put(request, copy);
				}));

				// Return the response
				return response;

			}).catch(function (error) {

				// If there's no item in cache, respond with a fallback
				return caches.match(request).then(function (response) {
					return response || caches.match('/offline.html');
				});

			})
		);
	}

	// CSS & JavaScript
	// Offline-first
	if (request.headers.get('Accept').includes('text/css') || request.headers.get('Accept').includes('text/javascript')) {
		event.respondWith(
			caches.match(request).then(function (response) {
				return response || fetch(request).then(function (response) {

					// Return the response
					return response;

				});
			})
		);
		return;
	}

	// Images
	// Offline-first
	if (request.headers.get('Accept').includes('image')) {
		event.respondWith(
			caches.match(request).then(function (response) {
				return response || fetch(request).then(function (response) {

					// Save a copy of it in cache
					let copy = response.clone();
					event.waitUntil(caches.open('app').then(function (cache) {
						return cache.put(request, copy);
					}));

					// Return the response
					return response;

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
