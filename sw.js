// Cache name
let cacheRestaurant = 'cacheRestaurant-7'; 

// Files list to cache
let cacheFiles = [
	'./',
	'./index.html',
    './restaurant.html',
    './js/dbhelper.js',
    './js/main.js',
    './js/restaurant_info.js',
    './data/restaurants.json',
	'./css/styles.css',
    './img/small',
    './img/medium'
]

// Installation Service worker
self.addEventListener('install', e => {
    e.waitUntil(
        caches.open(cacheRestaurant).then(cache => {
        return cache.addAll(cacheFiles);
    }).then( () => {
        return self.skipWaiting();
        })
    );
});

// Activation Service worker
self.addEventListener('activate', e => {
    e.waitUntil(caches.keys().then(cacheNames => Promise.all(cacheNames.filter(cacheName => cacheName.startsWith('cacheRestaurant') && cacheName !== cacheRestaurant).map(cacheName => caches.delete(cacheName)))))
});


// Fetch Service worker
self.addEventListener('fetch', e => {
    
    const url = new URL(e.request.url);

    if (url.pathname.includes('restaurant.html')) {
          e.respondWith(
              caches.match('restaurant.html')
              .then(response => response || fetch(e.request))
          );
          return;
    }
    
    e.respondWith(caches.match(e.request).then(response => response || fetch(e.request)));
});