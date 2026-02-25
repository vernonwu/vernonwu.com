import { renderers } from './renderers.mjs';
import { c as createExports } from './chunks/entrypoint_CHlUGEU0.mjs';
import { manifest } from './manifest_JbfeVgjc.mjs';

const _page0 = () => import('./pages/_image.astro.mjs');
const _page1 = () => import('./pages/404.astro.mjs');
const _page2 = () => import('./pages/about.astro.mjs');
const _page3 = () => import('./pages/archives.astro.mjs');
const _page4 = () => import('./pages/collection.astro.mjs');
const _page5 = () => import('./pages/notes.astro.mjs');
const _page6 = () => import('./pages/og.png.astro.mjs');
const _page7 = () => import('./pages/posts/_slug_.png.astro.mjs');
const _page8 = () => import('./pages/posts/_slug_.astro.mjs');
const _page9 = () => import('./pages/posts/_---page_.astro.mjs');
const _page10 = () => import('./pages/robots.txt.astro.mjs');
const _page11 = () => import('./pages/rss.xml.astro.mjs');
const _page12 = () => import('./pages/search.astro.mjs');
const _page13 = () => import('./pages/tags/_tag_/_---page_.astro.mjs');
const _page14 = () => import('./pages/tags.astro.mjs');
const _page15 = () => import('./pages/index.astro.mjs');

const pageMap = new Map([
    ["node_modules/.pnpm/astro@4.16.19_rollup@4.53.3_typescript@5.9.3/node_modules/astro/dist/assets/endpoint/generic.js", _page0],
    ["src/pages/404.astro", _page1],
    ["src/pages/about.md", _page2],
    ["src/pages/archives/index.astro", _page3],
    ["src/pages/collection/index.astro", _page4],
    ["src/pages/notes.md", _page5],
    ["src/pages/og.png.ts", _page6],
    ["src/pages/posts/[slug]/index.png.ts", _page7],
    ["src/pages/posts/[slug]/index.astro", _page8],
    ["src/pages/posts/[...page].astro", _page9],
    ["src/pages/robots.txt.ts", _page10],
    ["src/pages/rss.xml.ts", _page11],
    ["src/pages/search.astro", _page12],
    ["src/pages/tags/[tag]/[...page].astro", _page13],
    ["src/pages/tags/index.astro", _page14],
    ["src/pages/index.astro", _page15]
]);
const serverIslandMap = new Map();
const _manifest = Object.assign(manifest, {
    pageMap,
    serverIslandMap,
    renderers,
    middleware: () => import('./_noop-middleware.mjs')
});
const _args = {
    "middlewareSecret": "36bc6160-4585-4e3b-b94d-670c457673e2",
    "skewProtection": false
};
const _exports = createExports(_manifest, _args);
const __astrojsSsrVirtualEntry = _exports.default;

export { __astrojsSsrVirtualEntry as default, pageMap };
