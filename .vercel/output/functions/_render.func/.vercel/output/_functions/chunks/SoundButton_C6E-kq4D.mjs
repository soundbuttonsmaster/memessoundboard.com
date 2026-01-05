import { c as createComponent, a as createAstro, m as maybeRenderHead, b as addAttribute, r as renderTemplate } from './astro/server_BFQc7uhM.mjs';
import 'kleur/colors';
import 'clsx';
import { A as API_BASE_URL } from './api_DcMkkd7W.mjs';
/* empty css                        */

const $$Astro = createAstro();
const $$SoundButton = createComponent(async ($$result, $$props, $$slots) => {
  const Astro2 = $$result.createAstro($$Astro, $$props, $$slots);
  Astro2.self = $$SoundButton;
  const { sound } = Astro2.props;
  const buttonId = `sound-${sound.id}`;
  function slugify(text) {
    return text.toLowerCase().trim().replace(/[^\w\s-]/g, "").replace(/[\s_-]+/g, "-").replace(/^-+|-+$/g, "");
  }
  function generateColor(id) {
    const colors = [
      "#FF1744",
      // Vibrant red
      "#2979FF",
      // Bright blue
      "#00E676",
      // Bright green
      "#FF9800",
      // Bright orange
      "#E91E63",
      // Hot pink
      "#9C27B0",
      // Purple
      "#00BCD4",
      // Cyan
      "#FFC107",
      // Amber
      "#F44336",
      // Red
      "#2196F3",
      // Blue
      "#4CAF50",
      // Green
      "#FF5722",
      // Deep orange
      "#9C27B0",
      // Purple
      "#00ACC1",
      // Teal
      "#FFEB3B",
      // Yellow
      "#E91E63",
      // Pink
      "#3F51B5",
      // Indigo
      "#8BC34A",
      // Light green
      "#FF6F00",
      // Orange
      "#D81B60",
      // Pink
      "#1976D2",
      // Blue
      "#388E3C",
      // Green
      "#E64A19",
      // Red orange
      "#7B1FA2",
      // Purple
      "#0097A7",
      // Cyan
      "#FBC02D",
      // Yellow
      "#C2185B",
      // Pink
      "#303F9F",
      // Indigo
      "#689F38",
      // Light green
      "#EF6C00",
      // Orange
      "#AD1457",
      // Pink
      "#0D47A1",
      // Dark blue
      "#2E7D32",
      // Dark green
      "#BF360C",
      // Deep orange
      "#6A1B9A",
      // Deep purple
      "#00695C",
      // Teal
      "#F57F17",
      // Yellow orange
      "#880E4F",
      // Dark pink
      "#1B5E20",
      // Dark green
      "#B71C1C",
      // Dark red
      "#4A148C",
      // Dark purple
      "#004D40",
      // Dark teal
      "#E65100",
      // Orange red
      "#4A148C",
      // Dark purple
      "#00695C",
      // Dark teal
      "#F57F17",
      // Yellow orange
      "#AD1457",
      // Dark pink
      "#1B5E20",
      // Dark green
      "#B71C1C"
      // Dark red
    ];
    return colors[id % colors.length];
  }
  const buttonColor = generateColor(sound.id);
  return renderTemplate`${maybeRenderHead()}<div class="instant" data-astro-cid-azhwxneb> <!-- Sprite wrapper with colored button behind --> <div class="sprite-wrapper" role="button"${addAttribute(`Play ${sound.name}`, "aria-label")}${addAttribute(sound.id, "data-sound-id")}${addAttribute(`${API_BASE_URL}/sounds/${sound.id}/audio`, "data-audio-url")}${addAttribute(buttonId, "id")} data-astro-cid-azhwxneb> <!-- Ring SVG overlay with dynamic color --> <div class="button-ring-svg"${addAttribute(`--button-color: ${buttonColor};`, "style")} data-astro-cid-azhwxneb> <!-- Default state SVG (Taller/Unpressed) --> <svg class="button-svg default-svg"${addAttribute(`svg-def-${sound.id}`, "id")} xmlns="http://www.w3.org/2000/svg" viewBox="0 0 508.88 499.32" data-astro-cid-azhwxneb> <defs data-astro-cid-azhwxneb> <linearGradient${addAttribute(`lg1-def-${sound.id}`, "id")} x1="92.43" y1="263.72" x2="416.42" y2="263.72" gradientUnits="userSpaceOnUse" data-astro-cid-azhwxneb> <stop offset="0" stop-color="var(--button-color)" stop-opacity="0.8" data-astro-cid-azhwxneb></stop> <stop offset="0.24" stop-color="var(--button-color)" data-astro-cid-azhwxneb></stop> <stop offset="0.5" stop-color="var(--button-color)" stop-opacity="0.7" data-astro-cid-azhwxneb></stop> <stop offset="1" stop-color="var(--button-color)" stop-opacity="0.6" data-astro-cid-azhwxneb></stop> </linearGradient> <radialGradient${addAttribute(`rg1-def-${sound.id}`, "id")} cx="264.99" cy="167.81" r="119.71" gradientTransform="translate(-30.63 12.57) rotate(-.72) scale(1.04 1.02) skewX(2.4)" gradientUnits="userSpaceOnUse" data-astro-cid-azhwxneb> <stop offset="0" stop-color="var(--button-color)" data-astro-cid-azhwxneb></stop> <stop offset="1" stop-color="black" stop-opacity="0.3" data-astro-cid-azhwxneb></stop> </radialGradient> <linearGradient${addAttribute(`lg2-def-${sound.id}`, "id")} x1="905.54" y1="-339.28" x2="1020.84" y2="-139.59" gradientTransform="translate(1217.61 -59.25) rotate(-180)" gradientUnits="userSpaceOnUse" data-astro-cid-azhwxneb> <stop offset=".05" stop-color="#fff" stop-opacity=".83" data-astro-cid-azhwxneb></stop> <stop offset=".25" stop-color="#fff" stop-opacity="0" data-astro-cid-azhwxneb></stop> </linearGradient> <linearGradient${addAttribute(`lg3-def-${sound.id}`, "id")} x1="184.03" y1="58.27" x2="316.98" y2="288.54" gradientUnits="userSpaceOnUse" data-astro-cid-azhwxneb> <stop offset=".05" stop-color="#fff" stop-opacity=".83" data-astro-cid-azhwxneb></stop> <stop offset=".73" stop-color="#fff" stop-opacity="0" data-astro-cid-azhwxneb></stop> </linearGradient> </defs> <g data-astro-cid-azhwxneb> <path fill="#6d6e71" d="M454.44,265.74v58.01c0,27.68-19.51,55.17-58.54,76.16-78.06,42.17-204.9,42.17-282.95,0-39.03-20.99-58.54-48.48-58.54-76.16v-58.01h400.04Z" data-astro-cid-azhwxneb></path> <path fill="#939598" d="M454.44,261.91v54.03c0,25.78-19.51,51.38-58.54,70.93-78.06,39.27-204.9,39.27-282.95,0-39.03-19.55-58.54-45.15-58.54-70.93v-54.03h400.04Z" data-astro-cid-azhwxneb></path> <path fill="#a7a9ac" d="M395.92,343.57c-78.13,45.11-204.82,45.11-282.95,0-78.14-45.11-78.14-118.25,0-163.36,78.13-45.11,204.82-45.11,282.95,0,78.14,45.11,78.14,118.25,0,163.36Z" data-astro-cid-azhwxneb></path> <path${addAttribute(`url(#lg1-def-${sound.id})`, "fill")} d="M416.42,180.95v71.97c0,24.03-15.81,47.9-47.41,66.12-63.22,36.61-165.95,36.61-229.17,0-31.61-18.22-47.41-42.09-47.41-66.12v-71.97h323.99Z" data-astro-cid-azhwxneb></path> <path fill="var(--button-color)" d="M369.02,247.08c-63.28,36.53-165.88,36.53-229.16,0-63.28-36.54-63.28-95.77,0-132.31,63.28-36.54,165.88-36.53,229.16,0,63.28,36.54,63.28,95.77,0,132.31Z" data-astro-cid-azhwxneb></path> <path${addAttribute(`url(#rg1-def-${sound.id})`, "fill")} d="M366.96,239.18c-57.88,34.35-154.76,35.56-216.37,2.71-61.62-32.85-64.65-87.34-6.76-121.69,57.88-34.35,154.76-35.56,216.37-2.71,61.62,32.85,64.65,87.34,6.76,121.69Z" data-astro-cid-azhwxneb></path> </g> <g data-astro-cid-azhwxneb> <path${addAttribute(`url(#lg2-def-${sound.id})`, "fill")} d="M254.93,274.48c-41.23,0-82.51-9.03-114-27.1-31.16-17.86-48.34-41.8-48.37-67.41-.04-25.43,16.88-49.22,47.63-66.96,62.59-36.14,164.75-36.15,227.73-.02,31.15,17.86,48.33,41.8,48.37,67.4.04,25.44-16.89,49.23-47.65,66.98-31.29,18.07-72.48,27.11-113.71,27.11ZM253.93,91.63c-40.18,0-80.31,8.8-110.79,26.41-28.87,16.66-44.75,38.65-44.72,61.92.03,23.45,16.17,45.6,45.44,62.38h0c61.36,35.21,160.88,35.21,221.84,0,28.88-16.67,44.77-38.67,44.74-61.94-.03-23.44-16.17-45.59-45.44-62.37-30.68-17.6-70.9-26.4-111.07-26.4Z" data-astro-cid-azhwxneb></path> <ellipse${addAttribute(`url(#lg3-def-${sound.id})`, "fill")} cx="254.43" cy="180.19" rx="162" ry="94.12" opacity=".6" data-astro-cid-azhwxneb></ellipse> </g> </svg> <!-- Pressed state SVG (Compressed) --> <svg class="button-svg pressed-svg"${addAttribute(`svg-pr-${sound.id}`, "id")} xmlns="http://www.w3.org/2000/svg" viewBox="0 0 508.88 499.32" data-astro-cid-azhwxneb> <defs data-astro-cid-azhwxneb> <linearGradient${addAttribute(`lg1-pr-${sound.id}`, "id")} x1="92.64" y1="259.72" x2="416.24" y2="259.72" gradientUnits="userSpaceOnUse" data-astro-cid-azhwxneb> <stop offset="0" stop-color="var(--button-color)" stop-opacity="0.8" data-astro-cid-azhwxneb></stop> <stop offset="0.24" stop-color="var(--button-color)" data-astro-cid-azhwxneb></stop> <stop offset="0.5" stop-color="var(--button-color)" stop-opacity="0.7" data-astro-cid-azhwxneb></stop> <stop offset="1" stop-color="var(--button-color)" stop-opacity="0.6" data-astro-cid-azhwxneb></stop> </linearGradient> <radialGradient${addAttribute(`rg1-pr-${sound.id}`, "id")} cx="261.9" cy="224.91" r="119.56" gradientTransform="translate(-30.63 3.85) rotate(-.63) scale(1.04 .9) skewX(2.56)" gradientUnits="userSpaceOnUse" data-astro-cid-azhwxneb> <stop offset="0" stop-color="var(--button-color)" data-astro-cid-azhwxneb></stop> <stop offset="1" stop-color="black" stop-opacity="0.3" data-astro-cid-azhwxneb></stop> </radialGradient> <linearGradient${addAttribute(`lg2-pr-${sound.id}`, "id")} x1="909.13" y1="-356.22" x2="1017.21" y2="-169.02" gradientTransform="translate(1217.61 -59.25) rotate(-180)" gradientUnits="userSpaceOnUse" data-astro-cid-azhwxneb> <stop offset=".05" stop-color="#fff" stop-opacity=".83" data-astro-cid-azhwxneb></stop> <stop offset=".25" stop-color="#fff" stop-opacity="0" data-astro-cid-azhwxneb></stop> </linearGradient> <linearGradient${addAttribute(`lg3-pr-${sound.id}`, "id")} x1="188.44" y1="89.07" x2="313.09" y2="304.96" gradientUnits="userSpaceOnUse" data-astro-cid-azhwxneb> <stop offset=".05" stop-color="#fff" stop-opacity=".83" data-astro-cid-azhwxneb></stop> <stop offset=".73" stop-color="#fff" stop-opacity="0" data-astro-cid-azhwxneb></stop> </linearGradient> </defs> <g data-astro-cid-azhwxneb> <path fill="#6d6e71" d="M454.44,265.74v58.01c0,27.68-19.51,55.17-58.54,76.16-78.06,42.17-204.9,42.17-282.95,0-39.03-20.99-58.54-48.48-58.54-76.16v-58.01h400.04Z" data-astro-cid-azhwxneb></path> <path fill="#939598" d="M454.44,261.91v54.03c0,25.78-19.51,51.38-58.54,70.93-78.06,39.27-204.9,39.27-282.95,0-39.03-19.55-58.54-45.15-58.54-70.93v-54.03h400.04Z" data-astro-cid-azhwxneb></path> <path fill="#a7a9ac" d="M395.92,343.57c-78.13,45.11-204.82,45.11-282.95,0-78.14-45.11-78.14-118.25,0-163.36,78.13-45.11,204.82-45.11,282.95,0,78.14,45.11,78.14,118.25,0,163.36Z" data-astro-cid-azhwxneb></path> <path${addAttribute(`url(#lg1-pr-${sound.id})`, "fill")} d="M416.24,199.34v51.58c0,2.5-.25,5.03-.8,7.53-.22,1.1-.49,2.22-.85,3.32-4.75,15.77-20,30.9-45.73,42.98-63.12,29.83-165.73,29.83-228.87,0-25.74-12.08-40.95-27.22-45.73-42.98-.33-1.1-.6-2.22-.82-3.32-.55-2.5-.8-5.03-.8-7.53v-51.58c.05-.05.11-.11.16-.14.22-2.31.63-4.61,1.26-6.89h320.74c.63,2.28,1.04,4.59,1.26,6.89.05.03.11.08.16.14Z" data-astro-cid-azhwxneb></path> <path fill="var(--button-color)" d="M416.24,201.4v3.96c-.88,19.06-14.69,37.98-41.47,53.09-1.89,1.07-3.85,2.11-5.88,3.16-.11.05-.22.11-.33.16-63.12,31.94-165.1,31.94-228.24,0-.11-.05-.22-.11-.33-.16-2.03-1.04-3.98-2.09-5.88-3.16-26.78-15.11-40.59-34.03-41.47-53.09v-3.96c.03-.74.08-1.46.16-2.2.22-2.31.63-4.61,1.26-6.89,4.56-17.25,19.86-33.89,45.92-47.16,63.2-32.13,165.7-32.13,228.9.03,26.06,13.24,41.36,29.88,45.92,47.13.63,2.28,1.04,4.59,1.26,6.89.08.74.14,1.46.16,2.2Z" data-astro-cid-azhwxneb></path> <path${addAttribute(`url(#rg1-pr-${sound.id})`, "fill")} d="M366.83,254.66c-57.81,30.23-154.57,31.3-216.11,2.38-61.54-28.92-64.57-76.87-6.75-107.1,57.81-30.23,154.57-31.3,216.11-2.38,61.54,28.92,64.57,76.87,6.75,107.1Z" data-astro-cid-azhwxneb></path> </g> <g data-astro-cid-azhwxneb> <path${addAttribute(`url(#lg2-pr-${sound.id})`, "fill")} d="M254.95,285.68c-41.18,0-82.41-7.88-113.86-23.66-31.12-15.59-48.28-36.49-48.31-58.84-.04-22.2,16.86-42.96,47.57-58.45,62.51-31.55,164.55-31.55,227.46-.01,31.12,15.59,48.27,36.48,48.31,58.83.04,22.2-16.87,42.97-47.59,58.46-31.25,15.77-72.39,23.66-113.57,23.66ZM253.94,126.07c-40.13,0-80.21,7.68-110.66,23.05-28.83,14.54-44.7,33.74-44.66,54.05.03,20.46,16.15,39.8,45.39,54.45h0c61.29,30.73,160.69,30.73,221.57,0,28.85-14.55,44.72-33.75,44.68-54.07-.03-20.46-16.15-39.8-45.39-54.44-30.64-15.36-70.81-23.05-110.93-23.05Z" data-astro-cid-azhwxneb></path> <ellipse${addAttribute(`url(#lg3-pr-${sound.id})`, "fill")} cx="254.44" cy="203.38" rx="161.8" ry="82.15" opacity=".6" data-astro-cid-azhwxneb></ellipse> </g> </svg> </div> <a${addAttribute(`/instant/${slugify(sound.name)}-${sound.id}`, "href")} class="instant-link link-secondary" onclick="event.stopPropagation()" onmousedown="event.stopPropagation()" ontouchstart="event.stopPropagation()" data-astro-cid-azhwxneb>${sound.name}</a> <div class="result-page-instant-sharebox" data-astro-cid-azhwxneb> <button type="button" class="instant-action-button favorite-btn"${addAttribute(sound.id, "data-sound-id")}${addAttribute(`Add ${sound.name} to favorites`, "title")} data-astro-cid-azhwxneb> <svg width="20" height="20" viewBox="0 0 24 24"${addAttribute(sound.is_favorited ? "currentColor" : "none", "fill")} stroke="currentColor" stroke-width="2" style="font-size: 1.3rem; color: red;" data-astro-cid-azhwxneb> <path d="M20.84 4.61a5.5 5.5 0 0 0-7.78 0L12 5.67l-1.06-1.06a5.5 5.5 0 0 0-7.78 7.78l1.06 1.06L12 21.23l7.78-7.78 1.06-1.06a5.5 5.5 0 0 0 0-7.78z" data-astro-cid-azhwxneb></path> </svg> </button> <button type="button" class="instant-action-button webshare"${addAttribute(sound.id, "data-sound-id")}${addAttribute(`Share ${sound.name}`, "title")} data-astro-cid-azhwxneb> <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" style="font-size: 1.3rem; color: cornflowerblue;" data-astro-cid-azhwxneb> <circle cx="18" cy="5" r="3" data-astro-cid-azhwxneb></circle> <circle cx="6" cy="12" r="3" data-astro-cid-azhwxneb></circle> <circle cx="18" cy="19" r="3" data-astro-cid-azhwxneb></circle> <line x1="8.59" y1="13.51" x2="15.42" y2="17.49" data-astro-cid-azhwxneb></line> <line x1="15.41" y1="6.51" x2="8.59" y2="10.49" data-astro-cid-azhwxneb></line> </svg> </button> <a${addAttribute(`${API_BASE_URL}/sounds/${sound.id}/audio?download=true`, "href")}${addAttribute(sound.name, "download")} class="instant-action-button download-btn"${addAttribute(`Download ${sound.name}`, "title")} data-astro-cid-azhwxneb> <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" style="font-size: 1.3rem; color: #2ECC71;" data-astro-cid-azhwxneb> <path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4" data-astro-cid-azhwxneb></path> <polyline points="7 10 12 15 17 10" data-astro-cid-azhwxneb></polyline> <line x1="12" y1="15" x2="12" y2="3" data-astro-cid-azhwxneb></line> </svg> </a> </div> </div>  </div>`;
}, "J:/SoundBUttonsAPi/Sites/memessoundboard.com/src/components/SoundButton.astro", void 0);

export { $$SoundButton as $ };
