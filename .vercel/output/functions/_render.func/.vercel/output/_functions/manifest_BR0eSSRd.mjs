import 'cookie';
import 'kleur/colors';
import { N as NOOP_MIDDLEWARE_FN } from './chunks/astro-designed-error-pages_URR2gpkk.mjs';
import 'es-module-lexer';
import { g as decodeKey } from './chunks/astro/server_BFQc7uhM.mjs';
import 'clsx';

function sanitizeParams(params) {
  return Object.fromEntries(
    Object.entries(params).map(([key, value]) => {
      if (typeof value === "string") {
        return [key, value.normalize().replace(/#/g, "%23").replace(/\?/g, "%3F")];
      }
      return [key, value];
    })
  );
}
function getParameter(part, params) {
  if (part.spread) {
    return params[part.content.slice(3)] || "";
  }
  if (part.dynamic) {
    if (!params[part.content]) {
      throw new TypeError(`Missing parameter: ${part.content}`);
    }
    return params[part.content];
  }
  return part.content.normalize().replace(/\?/g, "%3F").replace(/#/g, "%23").replace(/%5B/g, "[").replace(/%5D/g, "]");
}
function getSegment(segment, params) {
  const segmentPath = segment.map((part) => getParameter(part, params)).join("");
  return segmentPath ? "/" + segmentPath : "";
}
function getRouteGenerator(segments, addTrailingSlash) {
  return (params) => {
    const sanitizedParams = sanitizeParams(params);
    let trailing = "";
    if (addTrailingSlash === "always" && segments.length) {
      trailing = "/";
    }
    const path = segments.map((segment) => getSegment(segment, sanitizedParams)).join("") + trailing;
    return path || "/";
  };
}

function deserializeRouteData(rawRouteData) {
  return {
    route: rawRouteData.route,
    type: rawRouteData.type,
    pattern: new RegExp(rawRouteData.pattern),
    params: rawRouteData.params,
    component: rawRouteData.component,
    generate: getRouteGenerator(rawRouteData.segments, rawRouteData._meta.trailingSlash),
    pathname: rawRouteData.pathname || void 0,
    segments: rawRouteData.segments,
    prerender: rawRouteData.prerender,
    redirect: rawRouteData.redirect,
    redirectRoute: rawRouteData.redirectRoute ? deserializeRouteData(rawRouteData.redirectRoute) : void 0,
    fallbackRoutes: rawRouteData.fallbackRoutes.map((fallback) => {
      return deserializeRouteData(fallback);
    }),
    isIndex: rawRouteData.isIndex
  };
}

function deserializeManifest(serializedManifest) {
  const routes = [];
  for (const serializedRoute of serializedManifest.routes) {
    routes.push({
      ...serializedRoute,
      routeData: deserializeRouteData(serializedRoute.routeData)
    });
    const route = serializedRoute;
    route.routeData = deserializeRouteData(serializedRoute.routeData);
  }
  const assets = new Set(serializedManifest.assets);
  const componentMetadata = new Map(serializedManifest.componentMetadata);
  const inlinedScripts = new Map(serializedManifest.inlinedScripts);
  const clientDirectives = new Map(serializedManifest.clientDirectives);
  const serverIslandNameMap = new Map(serializedManifest.serverIslandNameMap);
  const key = decodeKey(serializedManifest.key);
  return {
    // in case user middleware exists, this no-op middleware will be reassigned (see plugin-ssr.ts)
    middleware() {
      return { onRequest: NOOP_MIDDLEWARE_FN };
    },
    ...serializedManifest,
    assets,
    componentMetadata,
    inlinedScripts,
    clientDirectives,
    routes,
    serverIslandNameMap,
    key
  };
}

const manifest = deserializeManifest({"hrefRoot":"file:///J:/SoundBUttonsAPi/Sites/memessoundboard.com/","adapterName":"@astrojs/vercel/serverless","routes":[{"file":"about/index.html","links":[],"scripts":[],"styles":[],"routeData":{"route":"/about","isIndex":false,"type":"page","pattern":"^\\/about\\/?$","segments":[[{"content":"about","dynamic":false,"spread":false}]],"params":[],"component":"src/pages/about.astro","pathname":"/about","prerender":true,"fallbackRoutes":[],"_meta":{"trailingSlash":"ignore"}}},{"file":"api/search-sounds","links":[],"scripts":[],"styles":[],"routeData":{"route":"/api/search-sounds","isIndex":false,"type":"endpoint","pattern":"^\\/api\\/search-sounds\\/?$","segments":[[{"content":"api","dynamic":false,"spread":false}],[{"content":"search-sounds","dynamic":false,"spread":false}]],"params":[],"component":"src/pages/api/search-sounds.ts","pathname":"/api/search-sounds","prerender":true,"fallbackRoutes":[],"_meta":{"trailingSlash":"ignore"}}},{"file":"contact/index.html","links":[],"scripts":[],"styles":[],"routeData":{"route":"/contact","isIndex":false,"type":"page","pattern":"^\\/contact\\/?$","segments":[[{"content":"contact","dynamic":false,"spread":false}]],"params":[],"component":"src/pages/contact.astro","pathname":"/contact","prerender":true,"fallbackRoutes":[],"_meta":{"trailingSlash":"ignore"}}},{"file":"disclaimer/index.html","links":[],"scripts":[],"styles":[],"routeData":{"route":"/disclaimer","isIndex":false,"type":"page","pattern":"^\\/disclaimer\\/?$","segments":[[{"content":"disclaimer","dynamic":false,"spread":false}]],"params":[],"component":"src/pages/disclaimer.astro","pathname":"/disclaimer","prerender":true,"fallbackRoutes":[],"_meta":{"trailingSlash":"ignore"}}},{"file":"dmca/index.html","links":[],"scripts":[],"styles":[],"routeData":{"route":"/dmca","isIndex":false,"type":"page","pattern":"^\\/dmca\\/?$","segments":[[{"content":"dmca","dynamic":false,"spread":false}]],"params":[],"component":"src/pages/dmca.astro","pathname":"/dmca","prerender":true,"fallbackRoutes":[],"_meta":{"trailingSlash":"ignore"}}},{"file":"favorites/index.html","links":[],"scripts":[],"styles":[],"routeData":{"route":"/favorites","isIndex":false,"type":"page","pattern":"^\\/favorites\\/?$","segments":[[{"content":"favorites","dynamic":false,"spread":false}]],"params":[],"component":"src/pages/favorites.astro","pathname":"/favorites","prerender":true,"fallbackRoutes":[],"_meta":{"trailingSlash":"ignore"}}},{"file":"login/index.html","links":[],"scripts":[],"styles":[],"routeData":{"route":"/login","isIndex":false,"type":"page","pattern":"^\\/login\\/?$","segments":[[{"content":"login","dynamic":false,"spread":false}]],"params":[],"component":"src/pages/login.astro","pathname":"/login","prerender":true,"fallbackRoutes":[],"_meta":{"trailingSlash":"ignore"}}},{"file":"new/index.html","links":[],"scripts":[],"styles":[],"routeData":{"route":"/new","isIndex":false,"type":"page","pattern":"^\\/new\\/?$","segments":[[{"content":"new","dynamic":false,"spread":false}]],"params":[],"component":"src/pages/new.astro","pathname":"/new","prerender":true,"fallbackRoutes":[],"_meta":{"trailingSlash":"ignore"}}},{"file":"play-random/index.html","links":[],"scripts":[],"styles":[],"routeData":{"route":"/play-random","isIndex":false,"type":"page","pattern":"^\\/play-random\\/?$","segments":[[{"content":"play-random","dynamic":false,"spread":false}]],"params":[],"component":"src/pages/play-random.astro","pathname":"/play-random","prerender":true,"fallbackRoutes":[],"_meta":{"trailingSlash":"ignore"}}},{"file":"privacy-policy/index.html","links":[],"scripts":[],"styles":[],"routeData":{"route":"/privacy-policy","isIndex":false,"type":"page","pattern":"^\\/privacy-policy\\/?$","segments":[[{"content":"privacy-policy","dynamic":false,"spread":false}]],"params":[],"component":"src/pages/privacy-policy.astro","pathname":"/privacy-policy","prerender":true,"fallbackRoutes":[],"_meta":{"trailingSlash":"ignore"}}},{"file":"profile/index.html","links":[],"scripts":[],"styles":[],"routeData":{"route":"/profile","isIndex":false,"type":"page","pattern":"^\\/profile\\/?$","segments":[[{"content":"profile","dynamic":false,"spread":false}]],"params":[],"component":"src/pages/profile.astro","pathname":"/profile","prerender":true,"fallbackRoutes":[],"_meta":{"trailingSlash":"ignore"}}},{"file":"signup/index.html","links":[],"scripts":[],"styles":[],"routeData":{"route":"/signup","isIndex":false,"type":"page","pattern":"^\\/signup\\/?$","segments":[[{"content":"signup","dynamic":false,"spread":false}]],"params":[],"component":"src/pages/signup.astro","pathname":"/signup","prerender":true,"fallbackRoutes":[],"_meta":{"trailingSlash":"ignore"}}},{"file":"terms-and-conditions/index.html","links":[],"scripts":[],"styles":[],"routeData":{"route":"/terms-and-conditions","isIndex":false,"type":"page","pattern":"^\\/terms-and-conditions\\/?$","segments":[[{"content":"terms-and-conditions","dynamic":false,"spread":false}]],"params":[],"component":"src/pages/terms-and-conditions.astro","pathname":"/terms-and-conditions","prerender":true,"fallbackRoutes":[],"_meta":{"trailingSlash":"ignore"}}},{"file":"trending/index.html","links":[],"scripts":[],"styles":[],"routeData":{"route":"/trending","isIndex":false,"type":"page","pattern":"^\\/trending\\/?$","segments":[[{"content":"trending","dynamic":false,"spread":false}]],"params":[],"component":"src/pages/trending.astro","pathname":"/trending","prerender":true,"fallbackRoutes":[],"_meta":{"trailingSlash":"ignore"}}},{"file":"upload/index.html","links":[],"scripts":[],"styles":[],"routeData":{"route":"/upload","isIndex":false,"type":"page","pattern":"^\\/upload\\/?$","segments":[[{"content":"upload","dynamic":false,"spread":false}]],"params":[],"component":"src/pages/upload.astro","pathname":"/upload","prerender":true,"fallbackRoutes":[],"_meta":{"trailingSlash":"ignore"}}},{"file":"index.html","links":[],"scripts":[],"styles":[],"routeData":{"route":"/","isIndex":true,"type":"page","pattern":"^\\/$","segments":[],"params":[],"component":"src/pages/index.astro","pathname":"/","prerender":true,"fallbackRoutes":[],"_meta":{"trailingSlash":"ignore"}}},{"file":"","links":[],"scripts":[],"styles":[],"routeData":{"type":"endpoint","isIndex":false,"route":"/_image","pattern":"^\\/_image$","segments":[[{"content":"_image","dynamic":false,"spread":false}]],"params":[],"component":"node_modules/astro/dist/assets/endpoint/generic.js","pathname":"/_image","prerender":false,"fallbackRoutes":[],"_meta":{"trailingSlash":"ignore"}}},{"file":"","links":[],"scripts":[{"type":"external","value":"/_astro/hoisted.CsCDDzIJ.js"}],"styles":[{"type":"inline","content":".footer-links-grid[data-astro-cid-sz7xmlte]{display:grid;grid-template-columns:1fr 1fr;gap:2rem;width:100%}.footer-links-column[data-astro-cid-sz7xmlte]{flex:1}.footer-links-column[data-astro-cid-sz7xmlte] .footer-links[data-astro-cid-sz7xmlte]{margin:0;padding:0;list-style:none}.footer-links-column[data-astro-cid-sz7xmlte] .footer-links[data-astro-cid-sz7xmlte] li[data-astro-cid-sz7xmlte]{margin-bottom:.5rem}.footer-links-column[data-astro-cid-sz7xmlte] .footer-links[data-astro-cid-sz7xmlte] li[data-astro-cid-sz7xmlte]:last-child{margin-bottom:0}.footer-links-column[data-astro-cid-sz7xmlte] .footer-links[data-astro-cid-sz7xmlte] a[data-astro-cid-sz7xmlte]{color:var(--text-secondary);text-decoration:none;font-size:.9rem;transition:color .2s ease}.footer-links-column[data-astro-cid-sz7xmlte] .footer-links[data-astro-cid-sz7xmlte] a[data-astro-cid-sz7xmlte]:hover{color:var(--primary-color)}.footer-social[data-astro-cid-sz7xmlte]{text-align:center;padding:2rem 0;border-top:1px solid rgba(255,255,255,.1);margin-top:2rem}.footer-social-title[data-astro-cid-sz7xmlte]{color:var(--text-secondary);font-size:1.1rem;font-weight:600;margin-bottom:1rem}.social-icons[data-astro-cid-sz7xmlte]{display:flex;justify-content:center;gap:1.5rem;align-items:center}.social-icon[data-astro-cid-sz7xmlte]{display:inline-flex;align-items:center;justify-content:center;width:40px;height:40px;border-radius:50%;background:#ffffff1a;color:var(--text-secondary);text-decoration:none;transition:all .3s ease}.social-icon[data-astro-cid-sz7xmlte]:hover{background:var(--primary-color);color:var(--white);transform:translateY(-2px)}.social-icon[data-astro-cid-sz7xmlte] svg[data-astro-cid-sz7xmlte]{width:20px;height:20px}@media (max-width: 768px){.footer-links-grid[data-astro-cid-sz7xmlte]{grid-template-columns:1fr;gap:1rem}.social-icons[data-astro-cid-sz7xmlte]{gap:1rem}.social-icon[data-astro-cid-sz7xmlte]{width:35px;height:35px}.social-icon[data-astro-cid-sz7xmlte] svg[data-astro-cid-sz7xmlte]{width:18px;height:18px}}\n"},{"type":"external","src":"/_astro/_id_.CLkxBGI2.css"},{"type":"external","src":"/_astro/_query_.vLVu5laV.css"}],"routeData":{"route":"/search/[...query]","isIndex":false,"type":"page","pattern":"^\\/search(?:\\/(.*?))?\\/?$","segments":[[{"content":"search","dynamic":false,"spread":false}],[{"content":"...query","dynamic":true,"spread":true}]],"params":["...query"],"component":"src/pages/search/[...query].astro","prerender":false,"fallbackRoutes":[],"_meta":{"trailingSlash":"ignore"}}}],"base":"/","trailingSlash":"ignore","compressHTML":true,"componentMetadata":[["J:/SoundBUttonsAPi/Sites/memessoundboard.com/src/pages/about.astro",{"propagation":"none","containsHead":true}],["J:/SoundBUttonsAPi/Sites/memessoundboard.com/src/pages/contact.astro",{"propagation":"none","containsHead":true}],["J:/SoundBUttonsAPi/Sites/memessoundboard.com/src/pages/disclaimer.astro",{"propagation":"none","containsHead":true}],["J:/SoundBUttonsAPi/Sites/memessoundboard.com/src/pages/dmca.astro",{"propagation":"none","containsHead":true}],["J:/SoundBUttonsAPi/Sites/memessoundboard.com/src/pages/favorites.astro",{"propagation":"none","containsHead":true}],["J:/SoundBUttonsAPi/Sites/memessoundboard.com/src/pages/instant/[...slug].astro",{"propagation":"none","containsHead":true}],["J:/SoundBUttonsAPi/Sites/memessoundboard.com/src/pages/login.astro",{"propagation":"none","containsHead":true}],["J:/SoundBUttonsAPi/Sites/memessoundboard.com/src/pages/new.astro",{"propagation":"none","containsHead":true}],["J:/SoundBUttonsAPi/Sites/memessoundboard.com/src/pages/play-random.astro",{"propagation":"none","containsHead":true}],["J:/SoundBUttonsAPi/Sites/memessoundboard.com/src/pages/privacy-policy.astro",{"propagation":"none","containsHead":true}],["J:/SoundBUttonsAPi/Sites/memessoundboard.com/src/pages/profile.astro",{"propagation":"none","containsHead":true}],["J:/SoundBUttonsAPi/Sites/memessoundboard.com/src/pages/search/[...query].astro",{"propagation":"none","containsHead":true}],["J:/SoundBUttonsAPi/Sites/memessoundboard.com/src/pages/signup.astro",{"propagation":"none","containsHead":true}],["J:/SoundBUttonsAPi/Sites/memessoundboard.com/src/pages/terms-and-conditions.astro",{"propagation":"none","containsHead":true}],["J:/SoundBUttonsAPi/Sites/memessoundboard.com/src/pages/trending.astro",{"propagation":"none","containsHead":true}],["J:/SoundBUttonsAPi/Sites/memessoundboard.com/src/pages/upload.astro",{"propagation":"none","containsHead":true}],["J:/SoundBUttonsAPi/Sites/memessoundboard.com/src/pages/[slug]/[id].astro",{"propagation":"none","containsHead":true}],["J:/SoundBUttonsAPi/Sites/memessoundboard.com/src/pages/index.astro",{"propagation":"none","containsHead":true}]],"renderers":[],"clientDirectives":[["idle","(()=>{var l=(o,t)=>{let i=async()=>{await(await o())()},e=typeof t.value==\"object\"?t.value:void 0,s={timeout:e==null?void 0:e.timeout};\"requestIdleCallback\"in window?window.requestIdleCallback(i,s):setTimeout(i,s.timeout||200)};(self.Astro||(self.Astro={})).idle=l;window.dispatchEvent(new Event(\"astro:idle\"));})();"],["load","(()=>{var e=async t=>{await(await t())()};(self.Astro||(self.Astro={})).load=e;window.dispatchEvent(new Event(\"astro:load\"));})();"],["media","(()=>{var s=(i,t)=>{let a=async()=>{await(await i())()};if(t.value){let e=matchMedia(t.value);e.matches?a():e.addEventListener(\"change\",a,{once:!0})}};(self.Astro||(self.Astro={})).media=s;window.dispatchEvent(new Event(\"astro:media\"));})();"],["only","(()=>{var e=async t=>{await(await t())()};(self.Astro||(self.Astro={})).only=e;window.dispatchEvent(new Event(\"astro:only\"));})();"],["visible","(()=>{var l=(s,i,o)=>{let r=async()=>{await(await s())()},t=typeof i.value==\"object\"?i.value:void 0,c={rootMargin:t==null?void 0:t.rootMargin},n=new IntersectionObserver(e=>{for(let a of e)if(a.isIntersecting){n.disconnect(),r();break}},c);for(let e of o.children)n.observe(e)};(self.Astro||(self.Astro={})).visible=l;window.dispatchEvent(new Event(\"astro:visible\"));})();"]],"entryModules":{"\u0000@astrojs-ssr-adapter":"_@astrojs-ssr-adapter.mjs","\u0000noop-middleware":"_noop-middleware.mjs","\u0000@astrojs-ssr-virtual-entry":"entry.mjs","\u0000@astro-renderers":"renderers.mjs","\u0000@astro-page:src/pages/about@_@astro":"pages/about.astro.mjs","\u0000@astro-page:src/pages/api/search-sounds@_@ts":"pages/api/search-sounds.astro.mjs","\u0000@astro-page:src/pages/contact@_@astro":"pages/contact.astro.mjs","\u0000@astro-page:src/pages/disclaimer@_@astro":"pages/disclaimer.astro.mjs","\u0000@astro-page:src/pages/dmca@_@astro":"pages/dmca.astro.mjs","\u0000@astro-page:src/pages/favorites@_@astro":"pages/favorites.astro.mjs","\u0000@astro-page:src/pages/instant/[...slug]@_@astro":"pages/instant/_---slug_.astro.mjs","\u0000@astro-page:src/pages/login@_@astro":"pages/login.astro.mjs","\u0000@astro-page:src/pages/new@_@astro":"pages/new.astro.mjs","\u0000@astro-page:src/pages/play-random@_@astro":"pages/play-random.astro.mjs","\u0000@astro-page:src/pages/privacy-policy@_@astro":"pages/privacy-policy.astro.mjs","\u0000@astro-page:src/pages/profile@_@astro":"pages/profile.astro.mjs","\u0000@astro-page:src/pages/search/[...query]@_@astro":"pages/search/_---query_.astro.mjs","\u0000@astro-page:src/pages/signup@_@astro":"pages/signup.astro.mjs","\u0000@astro-page:src/pages/terms-and-conditions@_@astro":"pages/terms-and-conditions.astro.mjs","\u0000@astro-page:src/pages/trending@_@astro":"pages/trending.astro.mjs","\u0000@astro-page:src/pages/upload@_@astro":"pages/upload.astro.mjs","\u0000@astro-page:src/pages/[slug]/[id]@_@astro":"pages/_slug_/_id_.astro.mjs","\u0000@astro-page:src/pages/index@_@astro":"pages/index.astro.mjs","\u0000@astro-page:node_modules/astro/dist/assets/endpoint/generic@_@js":"pages/_image.astro.mjs","J:/SoundBUttonsAPi/Sites/memessoundboard.com/node_modules/astro/dist/env/setup.js":"chunks/astro/env-setup_Cr6XTFvb.mjs","\u0000@astrojs-manifest":"manifest_BR0eSSRd.mjs","/astro/hoisted.js?q=1":"_astro/hoisted.18laAo2V.js","/astro/hoisted.js?q=2":"_astro/hoisted.Cra2A-_U.js","/astro/hoisted.js?q=3":"_astro/hoisted.qR2uT4oA.js","/astro/hoisted.js?q=4":"_astro/hoisted.b8CA8VaU.js","/astro/hoisted.js?q=5":"_astro/hoisted.Dd3CVtMa.js","J:/SoundBUttonsAPi/Sites/memessoundboard.com/src/lib/api.ts":"_astro/api.Ba0nkDO7.js","J:/SoundBUttonsAPi/Sites/memessoundboard.com/src/lib/auth.ts":"_astro/auth.BPmtC0_i.js","/astro/hoisted.js?q=0":"_astro/hoisted.CBFeR7G6.js","/astro/hoisted.js?q=6":"_astro/hoisted.CsCDDzIJ.js","/astro/hoisted.js?q=7":"_astro/hoisted.CLv4g-nk.js","astro:scripts/before-hydration.js":""},"inlinedScripts":[],"assets":["/_astro/_id_.CLkxBGI2.css","/_astro/_query_.vLVu5laV.css","/_astro/_slug_.B-G-YWVH.css","/_astro/about.Bd-bTSuj.css","/_astro/favorites.6w-DBM4U.css","/_astro/profile.DZyQOJtB.css","/_astro/upload.DOM-wwA3.css","/android-chrome-192x192.png","/android-chrome-512x512.png","/apple-touch-icon.png","/favicon-16x16.png","/favicon-32x32.png","/favicon.ico","/site.webmanifest","/images/og-image.jpg","/images/transparent_button_small.png","/styles/global.css","/_astro/api.Ba0nkDO7.js","/_astro/auth.BPmtC0_i.js","/_astro/hoisted.18laAo2V.js","/_astro/hoisted.b8CA8VaU.js","/_astro/hoisted.CBFeR7G6.js","/_astro/hoisted.CLv4g-nk.js","/_astro/hoisted.Cra2A-_U.js","/_astro/hoisted.CsCDDzIJ.js","/_astro/hoisted.Dd3CVtMa.js","/_astro/hoisted.qR2uT4oA.js","/about/index.html","/api/search-sounds","/contact/index.html","/disclaimer/index.html","/dmca/index.html","/favorites/index.html","/login/index.html","/new/index.html","/play-random/index.html","/privacy-policy/index.html","/profile/index.html","/signup/index.html","/terms-and-conditions/index.html","/trending/index.html","/upload/index.html","/index.html"],"buildFormat":"directory","checkOrigin":false,"serverIslandNameMap":[],"key":"73YVoD1jGLSNN0IFOTX7+w0KGruiAbos2HOKYhT3704=","experimentalEnvGetSecretEnabled":false});

export { manifest };
