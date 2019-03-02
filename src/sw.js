
//JavaScript Libraries for adding offline support to web apps
// https://developers.google.com/web/tools/workbox/

/**
 * Force a service worker to become active, instead of waiting. This is
 * normally used in conjunction with `clientsClaim()`.
 *
 * @alias workbox.core.skipWaiting
 */
workbox.skipWaiting()
workbox.clientsClaim()

/**
* This method will generate a Route for you if needed and
* call [Router.registerRoute()]{@link
* workbox.routing.Router#registerRoute}.
 */
workbox.routing.registerRoute(
  new RegExp('https:.*min\.(css|js)'),
  //Resources are requested from both the cache and the network in parallel. The strategy will respond with the cached version if available,
  // otherwise wait for the network response. The cache is updated with the network response with each successful request.
  workbox.strategies.staleWhileRevalidate({
    cacheName: 'cdn-cache'
  })
)

workbox.routing.registerRoute(
  new RegExp('http://.*:4567.*\.json'),
  workbox.strategies.networkFirst()
)


//Register events fetch and push 
self.addEventListener('fetch', event => {
  if(event.request.method === "POST" || event.request.method === "DELETE") {
    event.respondWith(
      fetch(event.request).catch(err => {
        return new Response(
          JSON.stringify({ error: "This action disabled while app is offline" }), {
            headers: { 'Content-Type': 'application/json' }
          }
        )
      })
    )
  }
})

self.addEventListener('push', event => {
  event.waitUntil(self.registration.showNotification('Todo List', {
    icon: '/icon-120.png',
    body: event.data.text()
  }))
})

workbox.precaching.precacheAndRoute(self.__precacheManifest || [])
