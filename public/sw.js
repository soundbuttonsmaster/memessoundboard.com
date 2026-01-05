// Service Worker for MemesSoundBoard PWA
const CACHE_NAME = 'memessoundboard-v1';
const RUNTIME_CACHE = 'memessoundboard-runtime-v1';

// Assets to cache on install
const STATIC_ASSETS = [
  '/',
  '/styles/global.css',
  '/favicon.ico',
  '/android-chrome-192x192.png',
  '/android-chrome-512x512.png',
  '/apple-touch-icon.png',
  '/images/og-image.jpg'
];

// Install event - cache static assets
self.addEventListener('install', (event) => {
  console.log('[Service Worker] Installing...');
  event.waitUntil(
    caches.open(CACHE_NAME)
      .then((cache) => {
        console.log('[Service Worker] Caching static assets');
        return cache.addAll(STATIC_ASSETS);
      })
      .then(() => self.skipWaiting())
  );
});

// Activate event - clean up old caches
self.addEventListener('activate', (event) => {
  console.log('[Service Worker] Activating...');
  event.waitUntil(
    caches.keys().then((cacheNames) => {
      return Promise.all(
        cacheNames
          .filter((cacheName) => {
            return cacheName !== CACHE_NAME && cacheName !== RUNTIME_CACHE;
          })
          .map((cacheName) => {
            console.log('[Service Worker] Deleting old cache:', cacheName);
            return caches.delete(cacheName);
          })
      );
    })
    .then(() => self.clients.claim())
  );
});

// Fetch event - serve from cache, fallback to network
self.addEventListener('fetch', (event) => {
  const { request } = event;
  const url = new URL(request.url);

  // Skip cross-origin requests
  if (url.origin !== location.origin) {
    return;
  }

  // Skip API requests (they should always be fresh)
  if (url.pathname.startsWith('/api/')) {
    return;
  }

  // Strategy: Cache First for static assets, Network First for pages
  event.respondWith(
    caches.match(request)
      .then((cachedResponse) => {
        // For static assets (CSS, images, etc.), use cache first
        if (cachedResponse && (request.url.includes('/styles/') || 
            request.url.includes('/images/') || 
            request.url.includes('.png') || 
            request.url.includes('.jpg') || 
            request.url.includes('.ico'))) {
          return cachedResponse;
        }

        // For HTML pages, try network first, fallback to cache
        return fetch(request)
          .then((response) => {
            // Don't cache non-successful responses
            if (!response || response.status !== 200 || response.type !== 'basic') {
              return response;
            }

            // Clone the response for caching
            const responseToCache = response.clone();

            // Cache successful responses
            caches.open(RUNTIME_CACHE)
              .then((cache) => {
                cache.put(request, responseToCache);
              });

            return response;
          })
          .catch(() => {
            // Network failed, try cache
            if (cachedResponse) {
              return cachedResponse;
            }
            // If it's a navigation request and we have the index cached, return that
            if (request.mode === 'navigate') {
              return caches.match('/');
            }
          });
      })
  );
});

// Handle background sync (for offline actions)
self.addEventListener('sync', (event) => {
  if (event.tag === 'sync-favorites') {
    event.waitUntil(syncFavorites());
  }
});

async function syncFavorites() {
  // This would sync favorite actions when back online
  console.log('[Service Worker] Syncing favorites...');
}

// Handle push notifications (if needed in future)
self.addEventListener('push', (event) => {
  const data = event.data ? event.data.json() : {};
  const title = data.title || 'MemesSoundBoard';
  const options = {
    body: data.body || 'New update available',
    icon: '/android-chrome-192x192.png',
    badge: '/android-chrome-192x192.png',
    vibrate: [200, 100, 200],
    tag: 'memessoundboard-notification',
    requireInteraction: false
  };

  event.waitUntil(
    self.registration.showNotification(title, options)
  );
});

// Handle notification clicks
self.addEventListener('notificationclick', (event) => {
  event.notification.close();
  event.waitUntil(
    clients.openWindow('/')
  );
});

