import{a as v,S as w,i as f}from"./assets/vendor-CRCB-GUD.js";(function(){const o=document.createElement("link").relList;if(o&&o.supports&&o.supports("modulepreload"))return;for(const t of document.querySelectorAll('link[rel="modulepreload"]'))a(t);new MutationObserver(t=>{for(const s of t)if(s.type==="childList")for(const d of s.addedNodes)d.tagName==="LINK"&&d.rel==="modulepreload"&&a(d)}).observe(document,{childList:!0,subtree:!0});function e(t){const s={};return t.integrity&&(s.integrity=t.integrity),t.referrerPolicy&&(s.referrerPolicy=t.referrerPolicy),t.crossOrigin==="use-credentials"?s.credentials="include":t.crossOrigin==="anonymous"?s.credentials="omit":s.credentials="same-origin",s}function a(t){if(t.ep)return;t.ep=!0;const s=e(t);fetch(t.href,s)}})();const S="46251746-b7ef5ea5c8ec4690d00bddcb0",q="https://pixabay.com/api/",m=async(r,o,e=15)=>{const a={key:S,q:r,image_type:"photo",orientation:"horizontal",safesearch:!0,per_page:e,page:o},{data:t}=await v.get(q,{params:a});return t},P=document.querySelector(".gallery"),$=()=>{const r=document.querySelector(".gallery-link");if(r){const o=r.getBoundingClientRect().height;window.scrollBy({top:o*2,behavior:"smooth"})}},p=r=>{const o=r.map(e=>`
            <li class="gallery-item">
                <a class="gallery-link" href="${e.largeImageURL}">
                    <img 
                        class="gallery-image" 
                        src="${e.webformatURL}" 
                        data-source="${e.largeImageURL}" 
                        alt="${e.tags}"
                    />
                    <dl>
                        <dt>Likes</dt>
                        <dd>${e.likes}</dd>
                        <dt>Views</dt>
                        <dd>${e.views}</dd>
                        <dt>Comments</dt>
                        <dd>${e.comments}</dd>
                        <dt>Downloads</dt>
                        <dd>${e.downloads}</dd>
                    </dl>
                </a>
            </li>
    `).join();P.insertAdjacentHTML("beforeend",o)},u=document.querySelector("form"),M=document.querySelector("#search-input"),L=document.querySelector(".gallery"),y=document.querySelector(".load-more"),h=document.querySelector(".loader"),b=new w(".gallery a");let i=1;const l=15;let g="";const c=r=>{!L.hasChildNodes()||r?y.style.display="none":y.style.display="block"},n=r=>{r?h.classList.remove("i-b-display"):h.classList.add("i-b-display")};u.addEventListener("submit",async r=>{r.preventDefault(),L.innerHTML="";const o=M.value.trim();if(g="",i=1,n(),!o){f.error({position:"topRight",message:"Please enter your search query"}),u.elements.search.value="";return}try{const{hits:e,total:a}=await m(o,i,l);p(e),b.refresh();const t=Math.ceil(a/l);a>l&&c(),i===t&&(f.info({message:"We're sorry, but you've reached the end of search results.",position:"topRight"}),c(!0))}catch(e){console.log(e)}finally{n(!0)}g=o,u.elements.search.value=""});y.addEventListener("click",async r=>{r.preventDefault(),n(),i+=1;try{const{hits:o,total:e}=await m(g,i,l);p(o),$(),b.refresh();const a=Math.ceil(e/l);e>l&&c(),i===a&&(f.info({message:"We're sorry, but you've reached the end of search results.",position:"topRight"}),c(!0))}catch(o){console.log(o)}finally{n(!0)}});window.addEventListener("load",()=>{c()});
//# sourceMappingURL=index.js.map
