import { c as createComponent, a as createAstro, r as renderTemplate, d as renderComponent, f as defineScriptVars, e as renderHead, b as addAttribute } from '../../chunks/astro/server_BFQc7uhM.mjs';
import 'kleur/colors';
import { $ as $$Footer, a as $$Header } from '../../chunks/Footer_D37DPDm2.mjs';
import { $ as $$SoundButton } from '../../chunks/SoundButton_C6E-kq4D.mjs';
import { s as searchSounds } from '../../chunks/api_DcMkkd7W.mjs';
/* empty css                                      */
export { renderers } from '../../renderers.mjs';

var __freeze = Object.freeze;
var __defProp = Object.defineProperty;
var __template = (cooked, raw) => __freeze(__defProp(cooked, "raw", { value: __freeze(raw || cooked.slice()) }));
var _a;
const $$Astro = createAstro();
const prerender = false;
const $$ = createComponent(async ($$result, $$props, $$slots) => {
  const Astro2 = $$result.createAstro($$Astro, $$props, $$slots);
  Astro2.self = $$;
  const { query: rawQuery } = Astro2.params;
  const query = rawQuery ? decodeURIComponent(rawQuery) : "";
  let searchResults = [];
  let totalCount = 0;
  let nextPage = 2;
  let hasQuery = false;
  if (query && query.trim()) {
    hasQuery = true;
    try {
      const response = await searchSounds(query.trim(), 1, 55);
      searchResults = response.results;
      totalCount = response.count;
      if (response.next) {
        nextPage = 2;
      } else {
        nextPage = 0;
      }
    } catch (error) {
      console.error("Search error:", error);
      searchResults = [];
      totalCount = 0;
      nextPage = 0;
    }
  }
  const searchTerm = query.trim();
  const pageTitle = searchTerm ? `${searchTerm} Sound Effect Buttons | Meme Soundboard` : "Search Sound Buttons - MemesSoundBoard";
  const pageDescription = searchTerm ? `Find meme buttons and soundboard unblocked results for ${searchTerm}. Play, explore, and download your favorite meme sounds.` : "Search through thousands of sound buttons and meme sounds. Find the perfect sound effect for your needs.";
  const pageKeywords = searchTerm ? `${searchTerm.toLowerCase()}, search sound buttons, meme sounds, sound effects, ${searchTerm.toLowerCase()} sounds` : "search sound buttons, find sounds, sound effects search, meme soundboard search";
  const canonicalUrl = `https://MemesSoundBoard/search${searchTerm ? `/${encodeURIComponent(searchTerm)}` : ""}`;
  const ogImage = "/images/og-image.jpg";
  return renderTemplate(_a || (_a = __template(['<html lang="en" data-astro-cid-tsvgy2xa> <head><meta charset="UTF-8"><meta name="viewport" content="width=device-width, initial-scale=1.0"><!-- Primary Meta Tags --><title>', '</title><meta name="title"', '><meta name="description"', '><meta name="keywords"', '><meta name="author" content="MemesSoundBoard"><meta name="robots" content="index, follow"><meta name="language" content="English"><meta name="revisit-after" content="7 days"><!-- Canonical URL --><link rel="canonical"', '><!-- Open Graph / Facebook --><meta property="og:type" content="website"><meta property="og:url"', '><meta property="og:title"', '><meta property="og:description"', '><meta property="og:image"', '><meta property="og:site_name" content="MemesSoundBoard"><meta property="og:locale" content="en_US"><!-- Twitter --><meta name="twitter:card" content="summary_large_image"><meta name="twitter:url"', '><meta name="twitter:title"', '><meta name="twitter:description"', '><meta name="twitter:image"', '><!-- Favicon Links --><link rel="icon" type="image/x-icon" href="/favicon.ico"><link rel="icon" type="image/png" sizes="16x16" href="/favicon-16x16.png"><link rel="icon" type="image/png" sizes="32x32" href="/favicon-32x32.png"><link rel="apple-touch-icon" sizes="180x180" href="/apple-touch-icon.png"><link rel="manifest" href="/site.webmanifest"><link rel="stylesheet" href="/styles/global.css">', "</head> <body data-astro-cid-tsvgy2xa> ", ' <main class="main-content" data-astro-cid-tsvgy2xa> <!-- Breadcrumbs --> <nav class="breadcrumbs" data-astro-cid-tsvgy2xa> <a href="/" data-astro-cid-tsvgy2xa>Home</a> / <span data-astro-cid-tsvgy2xa>Search</span> </nav> <!-- Hero Section --> <div class="hero-section search-hero" data-astro-cid-tsvgy2xa> <h1 class="main-title centered-title" data-astro-cid-tsvgy2xa> ', " </h1> ", " </div> <!-- Search Results Section --> ", " <!-- No Results --> ", " <!-- No Search Query --> ", ' <script type="module">', `
        const loadMoreButton = document.getElementById('loadMoreSounds');
        const searchResultsGrid = document.getElementById('searchResultsGrid');
        let currentPage = nextPage;
        let currentTotalCount = totalCount;

        if (loadMoreButton) {
          loadMoreButton.addEventListener('click', async () => {
            if (currentPage === 0) return; // No more pages

            loadMoreButton.textContent = 'Loading...';
            loadMoreButton.disabled = true;

            try {
              const response = await fetch(\`/api/search-sounds?name=\${encodeURIComponent(query)}&page=\${currentPage}&page_size=55\`);
              if (!response.ok) {
                throw new Error(\`HTTP error! status: \${response.status}\`);
              }
              const data = await response.json();
              const newSounds = data.results;
              currentTotalCount = data.count;

              // Helper to create slug (duplicated from SoundButton to ensure consistency)
              function slugify(text) {
                  return text.toLowerCase().trim().replace(/[^\\w\\s-]/g, '').replace(/[\\s_-]+/g, '-').replace(/^-+|-+$/g, '');
              }

              // Generate HTML for new sounds (matching SoundButton.astro structure)
              const newHtml = newSounds.map(sound => {
                const buttonColor = ['#FF5733', '#33FF57', '#3357FF', '#FF33A1', '#A133FF', '#33FFF5', '#F5FF33'][sound.id % 7];
                const isFavorited = sound.is_favorited;

                return \`
                  <div class="instant">
                    <div
                      class="sprite-wrapper"
                      data-audio-url="/api/sounds/\${sound.id}/audio"
                      data-sound-id="\${sound.id}"
                    >
                      <div
                        class="inner-btn"
                        style="background: \${buttonColor};"
                      ></div>
                      <div class="button-ring"></div>
                    </div>

                    <a href="/instant/\${slugify(sound.name)}-\${sound.id}" class="instant-link link-secondary" onclick="event.stopPropagation()" onmousedown="event.stopPropagation()" ontouchstart="event.stopPropagation()">\${sound.name}</a>

                    <div class="result-page-instant-sharebox">
                      <button type="button" class="instant-action-button favorite-btn" data-sound-id="\${sound.id}" title="Add \${sound.name} to favorites">
                        <svg width="20" height="20" viewBox="0 0 24 24" fill="\${isFavorited ? "currentColor" : "none"}" stroke="currentColor" stroke-width="2" style="font-size: 1.3rem; color: red;">
                          <path d="M20.84 4.61a5.5 5.5 0 0 0-7.78 0L12 5.67l-1.06-1.06a5.5 5.5 0 0 0-7.78 7.78l1.06 1.06L12 21.23l7.78-7.78 1.06-1.06a5.5 5.5 0 0 0 0-7.78z"/>
                        </svg>
                      </button>
                      <button type="button" class="instant-action-button webshare" data-sound-id="\${sound.id}" title="Share \${sound.name}">
                        <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" style="font-size: 1.3rem; color: cornflowerblue;">
                          <circle cx="18" cy="5" r="3"/>
                          <circle cx="6" cy="12" r="3"/>
                          <circle cx="18" cy="19" r="3"/>
                          <line x1="8.59" y1="13.51" x2="15.42" y2="17.49"/>
                          <line x1="15.41" y1="6.51" x2="8.59" y2="10.49"/>
                        </svg>
                      </button>
                      <a href="/api/sounds/\${sound.id}/audio?download=true" download="\${sound.name}" class="instant-action-button download-btn" title="Download \${sound.name}">
                        <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" style="font-size: 1.3rem; color: #2ECC71;">
                          <path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4"/>
                          <polyline points="7 10 12 15 17 10"/>
                          <line x1="12" y1="15" x2="12" y2="3"/>
                        </svg>
                      </a>
                    </div>
                  </div>
                \`;
              }).join('');

              // Append new sounds
              searchResultsGrid.insertAdjacentHTML('beforeend', newHtml);

              // Re-initialize buttons
              if (window.SoundBoard) {
                window.SoundBoard.initAllSoundButtons();
                window.SoundBoard.initActionButtons();
              }

              if (data.next) {
                currentPage++;
              } else {
                currentPage = 0; // No more pages
                loadMoreButton.remove();
              }
            } catch (error) {
              console.error('Error loading more sounds:', error);
              loadMoreButton.textContent = 'Error - Try Again';
              loadMoreButton.disabled = false;
            } finally {
              if (currentPage > 0) {
                loadMoreButton.textContent = 'Load More';
                loadMoreButton.disabled = false;
              }
            }
          });
        }
      <\/script> </main> `, "  </body> </html>"], ['<html lang="en" data-astro-cid-tsvgy2xa> <head><meta charset="UTF-8"><meta name="viewport" content="width=device-width, initial-scale=1.0"><!-- Primary Meta Tags --><title>', '</title><meta name="title"', '><meta name="description"', '><meta name="keywords"', '><meta name="author" content="MemesSoundBoard"><meta name="robots" content="index, follow"><meta name="language" content="English"><meta name="revisit-after" content="7 days"><!-- Canonical URL --><link rel="canonical"', '><!-- Open Graph / Facebook --><meta property="og:type" content="website"><meta property="og:url"', '><meta property="og:title"', '><meta property="og:description"', '><meta property="og:image"', '><meta property="og:site_name" content="MemesSoundBoard"><meta property="og:locale" content="en_US"><!-- Twitter --><meta name="twitter:card" content="summary_large_image"><meta name="twitter:url"', '><meta name="twitter:title"', '><meta name="twitter:description"', '><meta name="twitter:image"', '><!-- Favicon Links --><link rel="icon" type="image/x-icon" href="/favicon.ico"><link rel="icon" type="image/png" sizes="16x16" href="/favicon-16x16.png"><link rel="icon" type="image/png" sizes="32x32" href="/favicon-32x32.png"><link rel="apple-touch-icon" sizes="180x180" href="/apple-touch-icon.png"><link rel="manifest" href="/site.webmanifest"><link rel="stylesheet" href="/styles/global.css">', "</head> <body data-astro-cid-tsvgy2xa> ", ' <main class="main-content" data-astro-cid-tsvgy2xa> <!-- Breadcrumbs --> <nav class="breadcrumbs" data-astro-cid-tsvgy2xa> <a href="/" data-astro-cid-tsvgy2xa>Home</a> / <span data-astro-cid-tsvgy2xa>Search</span> </nav> <!-- Hero Section --> <div class="hero-section search-hero" data-astro-cid-tsvgy2xa> <h1 class="main-title centered-title" data-astro-cid-tsvgy2xa> ', " </h1> ", " </div> <!-- Search Results Section --> ", " <!-- No Results --> ", " <!-- No Search Query --> ", ' <script type="module">', `
        const loadMoreButton = document.getElementById('loadMoreSounds');
        const searchResultsGrid = document.getElementById('searchResultsGrid');
        let currentPage = nextPage;
        let currentTotalCount = totalCount;

        if (loadMoreButton) {
          loadMoreButton.addEventListener('click', async () => {
            if (currentPage === 0) return; // No more pages

            loadMoreButton.textContent = 'Loading...';
            loadMoreButton.disabled = true;

            try {
              const response = await fetch(\\\`/api/search-sounds?name=\\\${encodeURIComponent(query)}&page=\\\${currentPage}&page_size=55\\\`);
              if (!response.ok) {
                throw new Error(\\\`HTTP error! status: \\\${response.status}\\\`);
              }
              const data = await response.json();
              const newSounds = data.results;
              currentTotalCount = data.count;

              // Helper to create slug (duplicated from SoundButton to ensure consistency)
              function slugify(text) {
                  return text.toLowerCase().trim().replace(/[^\\\\w\\\\s-]/g, '').replace(/[\\\\s_-]+/g, '-').replace(/^-+|-+$/g, '');
              }

              // Generate HTML for new sounds (matching SoundButton.astro structure)
              const newHtml = newSounds.map(sound => {
                const buttonColor = ['#FF5733', '#33FF57', '#3357FF', '#FF33A1', '#A133FF', '#33FFF5', '#F5FF33'][sound.id % 7];
                const isFavorited = sound.is_favorited;

                return \\\`
                  <div class="instant">
                    <div
                      class="sprite-wrapper"
                      data-audio-url="/api/sounds/\\\${sound.id}/audio"
                      data-sound-id="\\\${sound.id}"
                    >
                      <div
                        class="inner-btn"
                        style="background: \\\${buttonColor};"
                      ></div>
                      <div class="button-ring"></div>
                    </div>

                    <a href="/instant/\\\${slugify(sound.name)}-\\\${sound.id}" class="instant-link link-secondary" onclick="event.stopPropagation()" onmousedown="event.stopPropagation()" ontouchstart="event.stopPropagation()">\\\${sound.name}</a>

                    <div class="result-page-instant-sharebox">
                      <button type="button" class="instant-action-button favorite-btn" data-sound-id="\\\${sound.id}" title="Add \\\${sound.name} to favorites">
                        <svg width="20" height="20" viewBox="0 0 24 24" fill="\\\${isFavorited ? "currentColor" : "none"}" stroke="currentColor" stroke-width="2" style="font-size: 1.3rem; color: red;">
                          <path d="M20.84 4.61a5.5 5.5 0 0 0-7.78 0L12 5.67l-1.06-1.06a5.5 5.5 0 0 0-7.78 7.78l1.06 1.06L12 21.23l7.78-7.78 1.06-1.06a5.5 5.5 0 0 0 0-7.78z"/>
                        </svg>
                      </button>
                      <button type="button" class="instant-action-button webshare" data-sound-id="\\\${sound.id}" title="Share \\\${sound.name}">
                        <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" style="font-size: 1.3rem; color: cornflowerblue;">
                          <circle cx="18" cy="5" r="3"/>
                          <circle cx="6" cy="12" r="3"/>
                          <circle cx="18" cy="19" r="3"/>
                          <line x1="8.59" y1="13.51" x2="15.42" y2="17.49"/>
                          <line x1="15.41" y1="6.51" x2="8.59" y2="10.49"/>
                        </svg>
                      </button>
                      <a href="/api/sounds/\\\${sound.id}/audio?download=true" download="\\\${sound.name}" class="instant-action-button download-btn" title="Download \\\${sound.name}">
                        <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" style="font-size: 1.3rem; color: #2ECC71;">
                          <path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4"/>
                          <polyline points="7 10 12 15 17 10"/>
                          <line x1="12" y1="15" x2="12" y2="3"/>
                        </svg>
                      </a>
                    </div>
                  </div>
                \\\`;
              }).join('');

              // Append new sounds
              searchResultsGrid.insertAdjacentHTML('beforeend', newHtml);

              // Re-initialize buttons
              if (window.SoundBoard) {
                window.SoundBoard.initAllSoundButtons();
                window.SoundBoard.initActionButtons();
              }

              if (data.next) {
                currentPage++;
              } else {
                currentPage = 0; // No more pages
                loadMoreButton.remove();
              }
            } catch (error) {
              console.error('Error loading more sounds:', error);
              loadMoreButton.textContent = 'Error - Try Again';
              loadMoreButton.disabled = false;
            } finally {
              if (currentPage > 0) {
                loadMoreButton.textContent = 'Load More';
                loadMoreButton.disabled = false;
              }
            }
          });
        }
      <\/script> </main> `, "  </body> </html>"])), pageTitle, addAttribute(pageTitle, "content"), addAttribute(pageDescription, "content"), addAttribute(pageKeywords, "content"), addAttribute(canonicalUrl, "href"), addAttribute(canonicalUrl, "content"), addAttribute(pageTitle, "content"), addAttribute(pageDescription, "content"), addAttribute(ogImage, "content"), addAttribute(canonicalUrl, "content"), addAttribute(pageTitle, "content"), addAttribute(pageDescription, "content"), addAttribute(ogImage, "content"), renderHead(), renderComponent($$result, "Header", $$Header, { "data-astro-cid-tsvgy2xa": true }), hasQuery ? `${searchTerm} Sound Effect Buttons` : "Search Sound Buttons", hasQuery && renderTemplate`<p class="main-description centered-description" data-astro-cid-tsvgy2xa>
Found ${totalCount} sound${totalCount !== 1 ? "s" : ""} matching "${searchTerm}"
</p>`, hasQuery && searchResults.length > 0 && renderTemplate`<section class="sounds-section search-results-section" data-astro-cid-tsvgy2xa> <div class="section-header" data-astro-cid-tsvgy2xa> <div class="section-title-wrapper" data-astro-cid-tsvgy2xa> <h2 class="section-title" data-astro-cid-tsvgy2xa>Search Results : ${searchTerm}</h2> </div> </div> <div class="sounds-grid" id="searchResultsGrid" data-astro-cid-tsvgy2xa> ${searchResults.map((sound) => renderTemplate`${renderComponent($$result, "SoundButton", $$SoundButton, { "sound": sound, "data-astro-cid-tsvgy2xa": true })}`)} </div> </section>`, hasQuery && searchResults.length === 0 && renderTemplate`<section class="sounds-section" data-astro-cid-tsvgy2xa> <div class="section-header" data-astro-cid-tsvgy2xa> <div class="section-title-wrapper" data-astro-cid-tsvgy2xa> <h2 class="section-title" data-astro-cid-tsvgy2xa>Sound Buttons : Search Results</h2> </div> </div> <hr class="section-divider" data-astro-cid-tsvgy2xa> <div class="no-results-container" data-astro-cid-tsvgy2xa> <div class="no-results-icon" data-astro-cid-tsvgy2xa> <svg width="80" height="80" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5" data-astro-cid-tsvgy2xa> <circle cx="11" cy="11" r="8" data-astro-cid-tsvgy2xa></circle> <path d="m21 21-4.35-4.35" data-astro-cid-tsvgy2xa></path> <line x1="8" y1="11" x2="14" y2="11" data-astro-cid-tsvgy2xa></line> </svg> </div> <h3 class="no-results-title" data-astro-cid-tsvgy2xa>No Results Found</h3> <p class="no-results-text" data-astro-cid-tsvgy2xa>
We couldn't find any sounds matching "<strong data-astro-cid-tsvgy2xa>${searchTerm}</strong>". Try different keywords or browse all sounds.
</p> <div class="no-results-actions" data-astro-cid-tsvgy2xa> <a href="/" class="btn-primary" data-astro-cid-tsvgy2xa>Browse All Sounds</a> <button onclick="history.back()" class="btn-secondary" data-astro-cid-tsvgy2xa>Go Back</button> </div> </div> </section>`, !hasQuery && renderTemplate`<section class="sounds-section" data-astro-cid-tsvgy2xa> <div class="section-header" data-astro-cid-tsvgy2xa> <div class="section-title-wrapper" data-astro-cid-tsvgy2xa> <h2 class="section-title" data-astro-cid-tsvgy2xa>Start Your Search</h2> </div> </div> <hr class="section-divider" data-astro-cid-tsvgy2xa> <div class="no-search-container" data-astro-cid-tsvgy2xa> <div class="search-prompt-icon" data-astro-cid-tsvgy2xa> <svg width="80" height="80" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5" data-astro-cid-tsvgy2xa> <circle cx="11" cy="11" r="8" data-astro-cid-tsvgy2xa></circle> <path d="m21 21-4.35-4.35" data-astro-cid-tsvgy2xa></path> </svg> </div> <h3 class="no-search-title" data-astro-cid-tsvgy2xa>Search for Sound Buttons</h3> <p class="no-search-text" data-astro-cid-tsvgy2xa>
Use the search bar above to find your favorite sound buttons, meme sounds, and sound effects.
</p> <div class="popular-searches" data-astro-cid-tsvgy2xa> <h4 data-astro-cid-tsvgy2xa>Popular Searches:</h4> <div class="popular-tags" data-astro-cid-tsvgy2xa> <a href="/search/meme" class="tag-link" data-astro-cid-tsvgy2xa>meme</a> <a href="/search/funny" class="tag-link" data-astro-cid-tsvgy2xa>funny</a> <a href="/search/sound%20effects" class="tag-link" data-astro-cid-tsvgy2xa>sound effects</a> <a href="/search/gaming" class="tag-link" data-astro-cid-tsvgy2xa>gaming</a> <a href="/search/prank" class="tag-link" data-astro-cid-tsvgy2xa>prank</a> <a href="/search/reaction" class="tag-link" data-astro-cid-tsvgy2xa>reaction</a> </div> </div> <div class="browse-action" data-astro-cid-tsvgy2xa> <a href="/" class="explore-more-button" data-astro-cid-tsvgy2xa>
Browse All Sounds
<svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" data-astro-cid-tsvgy2xa> <polygon points="5 3 19 12 5 21 5 3" data-astro-cid-tsvgy2xa></polygon> </svg> </a> </div> </div> </section>`, defineScriptVars({ query, nextPage, totalCount }), renderComponent($$result, "Footer", $$Footer, { "data-astro-cid-tsvgy2xa": true }));
}, "J:/SoundBUttonsAPi/Sites/memessoundboard.com/src/pages/search/[...query].astro", void 0);

const $$file = "J:/SoundBUttonsAPi/Sites/memessoundboard.com/src/pages/search/[...query].astro";
const $$url = "/search/[...query]";

const _page = /*#__PURE__*/Object.freeze(/*#__PURE__*/Object.defineProperty({
  __proto__: null,
  default: $$,
  file: $$file,
  prerender,
  url: $$url
}, Symbol.toStringTag, { value: 'Module' }));

const page = () => _page;

export { page };
