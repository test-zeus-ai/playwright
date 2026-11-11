/**
 * The service worker's URL. It carries the Playwright version because the CDN in front of the
 * TestZeus viewer caches `sw.bundle.js` by URL: an unversioned URL kept serving a worker from
 * an older Playwright, which refuses newer traces. Bump with the Playwright version.
 */
export const swUrl = 'sw.bundle.js?v=1.64.1';
