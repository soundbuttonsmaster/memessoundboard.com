import"./hoisted.CLv4g-nk.js";import"./hoisted.CsCDDzIJ.js";const d="http://play.soundboard.cloud/api/SoundBoard.soundbuttons.com";document.addEventListener("DOMContentLoaded",()=>{document.querySelectorAll(".load-more-button").forEach(e=>{e.addEventListener("click",async()=>{const r=e.getAttribute("data-next-url"),l=e.getAttribute("data-target"),a=document.getElementById(l);if(!r||!a)return;const c=e.textContent;e.textContent="Loading...",e.disabled=!0;try{let o=function(t){return t.toLowerCase().trim().replace(/[^\w\s-]/g,"").replace(/[\s_-]+/g,"-").replace(/^-+|-+$/g,"")};var h=o;const i=await fetch(r);if(!i.ok)throw new Error("Network response was not ok");const n=await i.json(),u=n.results||n.data||[],s=n.next,w=u.map(t=>{const v=["#FF5733","#33FF57","#3357FF","#FF33A1","#A133FF","#33FFF5","#F5FF33"][t.id%7],g=t.is_favorited;return`
              <div class="instant">
                <div 
                  class="sprite-wrapper" 
                  data-audio-url="${d}/sounds/${t.id}/audio" 
                  data-sound-id="${t.id}"
                >
                  <div 
                    class="inner-btn" 
                    style="background: ${v};"
                  ></div>
                  <div class="button-ring"></div>
                </div>
                
                <a href="/instant/${o(t.name)}-${t.id}" class="instant-link link-secondary" onclick="event.stopPropagation()" onmousedown="event.stopPropagation()" ontouchstart="event.stopPropagation()">${t.name}</a>
                
                <div class="result-page-instant-sharebox">
                  <button type="button" class="instant-action-button favorite-btn" data-sound-id="${t.id}" title="Add ${t.name} to favorites">
                    <svg width="20" height="20" viewBox="0 0 24 24" fill="${g?"currentColor":"none"}" stroke="currentColor" stroke-width="2" style="font-size: 1.3rem; color: red;">
                      <path d="M20.84 4.61a5.5 5.5 0 0 0-7.78 0L12 5.67l-1.06-1.06a5.5 5.5 0 0 0-7.78 7.78l1.06 1.06L12 21.23l7.78-7.78 1.06-1.06a5.5 5.5 0 0 0 0-7.78z"/>
                    </svg>
                  </button>
                  <button type="button" class="instant-action-button webshare" data-sound-id="${t.id}" title="Share ${t.name}">
                    <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" style="font-size: 1.3rem; color: cornflowerblue;">
                      <circle cx="18" cy="5" r="3"/>
                      <circle cx="6" cy="12" r="3"/>
                      <circle cx="18" cy="19" r="3"/>
                      <line x1="8.59" y1="13.51" x2="15.42" y2="17.49"/>
                      <line x1="15.41" y1="6.51" x2="8.59" y2="10.49"/>
                    </svg>
                  </button>
                  <a href="${d}/sounds/${t.id}/audio?download=true" download="${t.name}" class="instant-action-button download-btn" title="Download ${t.name}">
                    <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" style="font-size: 1.3rem; color: #2ECC71;">
                      <path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4"/>
                      <polyline points="7 10 12 15 17 10"/>
                      <line x1="12" y1="15" x2="12" y2="3"/>
                    </svg>
                  </a>
                </div>
              </div>
            `}).join("");a.insertAdjacentHTML("beforeend",w),window.SoundBoard&&(window.SoundBoard.initAllSoundButtons(),window.SoundBoard.initActionButtons()),s?(e.setAttribute("data-next-url",s),e.textContent=c,e.disabled=!1):e.remove()}catch(o){console.error("Error loading more sounds:",o),e.textContent="Error - Try Again",e.disabled=!1}})})});
