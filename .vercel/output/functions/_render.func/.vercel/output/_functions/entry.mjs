import { renderers } from './renderers.mjs';
import { c as createExports } from './chunks/entrypoint_DK6Lbbjt.mjs';
import { manifest } from './manifest_BR0eSSRd.mjs';

const _page0 = () => import('./pages/_image.astro.mjs');
const _page1 = () => import('./pages/about.astro.mjs');
const _page2 = () => import('./pages/api/search-sounds.astro.mjs');
const _page3 = () => import('./pages/contact.astro.mjs');
const _page4 = () => import('./pages/disclaimer.astro.mjs');
const _page5 = () => import('./pages/dmca.astro.mjs');
const _page6 = () => import('./pages/favorites.astro.mjs');
const _page7 = () => import('./pages/instant/_---slug_.astro.mjs');
const _page8 = () => import('./pages/login.astro.mjs');
const _page9 = () => import('./pages/new.astro.mjs');
const _page10 = () => import('./pages/play-random.astro.mjs');
const _page11 = () => import('./pages/privacy-policy.astro.mjs');
const _page12 = () => import('./pages/profile.astro.mjs');
const _page13 = () => import('./pages/search/_---query_.astro.mjs');
const _page14 = () => import('./pages/signup.astro.mjs');
const _page15 = () => import('./pages/terms-and-conditions.astro.mjs');
const _page16 = () => import('./pages/trending.astro.mjs');
const _page17 = () => import('./pages/upload.astro.mjs');
const _page18 = () => import('./pages/_slug_/_id_.astro.mjs');
const _page19 = () => import('./pages/index.astro.mjs');

const pageMap = new Map([
    ["node_modules/astro/dist/assets/endpoint/generic.js", _page0],
    ["src/pages/about.astro", _page1],
    ["src/pages/api/search-sounds.ts", _page2],
    ["src/pages/contact.astro", _page3],
    ["src/pages/disclaimer.astro", _page4],
    ["src/pages/dmca.astro", _page5],
    ["src/pages/favorites.astro", _page6],
    ["src/pages/instant/[...slug].astro", _page7],
    ["src/pages/login.astro", _page8],
    ["src/pages/new.astro", _page9],
    ["src/pages/play-random.astro", _page10],
    ["src/pages/privacy-policy.astro", _page11],
    ["src/pages/profile.astro", _page12],
    ["src/pages/search/[...query].astro", _page13],
    ["src/pages/signup.astro", _page14],
    ["src/pages/terms-and-conditions.astro", _page15],
    ["src/pages/trending.astro", _page16],
    ["src/pages/upload.astro", _page17],
    ["src/pages/[slug]/[id].astro", _page18],
    ["src/pages/index.astro", _page19]
]);
const serverIslandMap = new Map();
const _manifest = Object.assign(manifest, {
    pageMap,
    serverIslandMap,
    renderers,
    middleware: () => import('./_noop-middleware.mjs')
});
const _args = {
    "middlewareSecret": "8fece38e-891e-42a2-b3fd-44939af7db05",
    "skewProtection": false
};
const _exports = createExports(_manifest, _args);
const __astrojsSsrVirtualEntry = _exports.default;

export { __astrojsSsrVirtualEntry as default, pageMap };
