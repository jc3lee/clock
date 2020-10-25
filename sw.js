const cacheName = "STATIC_CACHE_1"

const resourcesToCache = [
  "./src/index.html",
  "./src/main.js",
  "./src/moment.js",
  "./src/output.css",
  "./src/assets/images/morning.jpg",
  "./src/assets/images/afternoon.jpg",
  "./src/assets/images/evening.jpg",
  "./src/assets/fonts/Merriweather-Regular.ttf",
  "./src/assets/fonts/Merriweather-Bold.ttf",
  "./src/assets/fonts/Orbitron-VariableFont_wght.ttf",
]

self.addEventListener("install", e => {
  console.log("installed", e)
  e.waitUntil(
    caches.open(cacheName).then(
      cache => cache.addAll(resourcesToCache)
    )
  )
})

self.addEventListener("activate", e => {
  console.log("activated", e)
})

self.addEventListener("fetch", e => {
  console.log("fetch", e)
  e.respondWith(caches.match(e.request))
    .then(cacheResponse => {
      return cacheResponse || fetch(e.request)
    })
})