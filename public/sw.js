/* Build replaces the version and core assets for each release. */
const VERSION = "__SITE_VERSION__";
const CORE_ASSETS = ["./", "./index.html", "./manifest.json"];
const PREFIX = "personal-website-";
const CACHE = `${PREFIX}${VERSION}`;
const scope = new URL(self.registration.scope);
const indexUrl = new URL("index.html", scope).href;

self.addEventListener("install", (event) => {
  // Keep existing pages on their current worker until they are closed.
  event.waitUntil(caches.open(CACHE).then((cache) => cache.addAll(CORE_ASSETS)));
});

self.addEventListener("activate", (event) => {
  event.waitUntil(caches.keys().then((keys) => Promise.all(
    keys.filter((key) => key.startsWith(PREFIX) && key !== CACHE)
      .map((key) => caches.delete(key)),
  )).then(() => self.clients.claim()));
});

async function cached(request) {
  const url = new URL(typeof request === "string" ? request : request.url, scope);
  // Public hashed assets are identical for this origin. Module requests include
  // Origin while precache requests do not; Vary: Origin must not cause a miss.
  const immutableAsset = url.pathname.startsWith(new URL("assets/", scope).pathname) &&
    /-[\w-]+\.(js|css)$/.test(url.pathname);
  return caches.open(CACHE)
    .then((cache) => cache.match(request, { ignoreVary: immutableAsset }))
    .catch(() => undefined);
}

async function fetchAndCache(request, navigation = false) {
  const response = await fetch(request);
  if (response.ok && response.type === "basic") {
    // Quota/storage failures must not turn a successful fetch into an error.
    await caches.open(CACHE)
      .then((cache) => cache.put(navigation ? indexUrl : request, response.clone()))
      .catch(() => {});
  }
  return response;
}

async function networkFirst(request, navigation = false) {
  try {
    const response = await fetchAndCache(request, navigation);
    if (response.status < 500) return response;
    return (await cached(navigation ? indexUrl : request)) || response;
  } catch {
    const hit = await cached(navigation ? indexUrl : request);
    // Never serve HTML in place of a script, image or feed.
    return hit || Response.error();
  }
}

self.addEventListener("fetch", (event) => {
  const request = event.request;
  const url = new URL(request.url);
  if (request.method !== "GET" || url.origin !== scope.origin ||
      !url.pathname.startsWith(scope.pathname)) return;

  const path = url.pathname.slice(scope.pathname.length);
  if (request.mode === "navigate" || path === "index.html" ||
      path === "feed.xml" || path === "manifest.json") {
    event.respondWith(networkFirst(request, request.mode === "navigate"));
    return;
  }

  if (request.destination === "image" || path.startsWith("images/")) {
    const refresh = fetchAndCache(request).catch(() => undefined);
    event.waitUntil(refresh.then(() => undefined));
    event.respondWith(cached(request).then(async (hit) => hit || await refresh || Response.error()));
    return;
  }

  if (path.startsWith("assets/") && /\.(js|css)$/.test(path)) {
    event.respondWith(cached(request).then((hit) => hit || networkFirst(request)));
  }
});
