const cacheName = "STATIC_CACHE_2"

const resourcesToCache = [
  "./index.html",
  "./main.js",
  "./moment.js",
  "./output.css",
  "./assets/images/morning.jpg",
  "./assets/images/afternoon.jpg",
  "./assets/images/evening.jpg",
  "./assets/fonts/Merriweather-Regular.ttf",
  "./assets/fonts/Merriweather-Bold.ttf",
  "./assets/fonts/Orbitron-VariableFont_wght.ttf",
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