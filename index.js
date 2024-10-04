import{a as p,S as L,i as n}from"./assets/vendor-CRCB-GUD.js";(function(){const o=document.createElement("link").relList;if(o&&o.supports&&o.supports("modulepreload"))return;for(const e of document.querySelectorAll('link[rel="modulepreload"]'))a(e);new MutationObserver(e=>{for(const s of e)if(s.type==="childList")for(const l of s.addedNodes)l.tagName==="LINK"&&l.rel==="modulepreload"&&a(l)}).observe(document,{childList:!0,subtree:!0});function r(e){const s={};return e.integrity&&(s.integrity=e.integrity),e.referrerPolicy&&(s.referrerPolicy=e.referrerPolicy),e.crossOrigin==="use-credentials"?s.credentials="include":e.crossOrigin==="anonymous"?s.credentials="omit":s.credentials="same-origin",s}function a(e){if(e.ep)return;e.ep=!0;const s=r(e);fetch(e.href,s)}})();const w="46251746-b7ef5ea5c8ec4690d00bddcb0",b="https://pixabay.com/api/",S=async(t,o,r=15)=>{const a={key:w,q:t,image_type:"photo",orientation:"horizontal",safesearch:!0,per_page:r,page:o},{data:e}=await p.get(b,{params:a});return e},v=document.querySelector(".gallery"),q=()=>{const t=document.querySelector(".gallery-link");if(t){const o=t.getBoundingClientRect().height;window.scrollBy({top:o*2,behavior:"smooth"})}},P=t=>{const o=t.map(r=>`
            <li class="gallery-item">
                <a class="gallery-link" href="${r.largeImageURL}">
                    <img 
                        class="gallery-image" 
                        src="${r.webformatURL}" 
                        data-source="${r.largeImageURL}" 
                        alt="${r.tags}"
                    />
                    <dl>
                        <dt>Likes</dt>
                        <dd>${r.likes}</dd>
                        <dt>Views</dt>
                        <dd>${r.views}</dd>
                        <dt>Comments</dt>
                        <dd>${r.comments}</dd>
                        <dt>Downloads</dt>
                        <dd>${r.downloads}</dd>
                    </dl>
                </a>
            </li>
    `).join("");v.insertAdjacentHTML("beforeend",o)},y=document.querySelector("form"),$=document.querySelector("#search-input"),R=document.querySelector(".gallery"),u=document.querySelector(".load-more"),f=document.querySelector(".loader"),M=new L(".gallery a");let i=1;const d=15;let g="";const E=()=>u.style.display="block",c=()=>u.style.display="none",m=()=>f.classList.add("i-b-display"),O=()=>f.classList.remove("i-b-display"),B=t=>{console.error(t),n.error({message:"An error occurred. Please try again.",position:"topRight"})},h=async()=>{try{const{hits:t,total:o}=await S(g,i,d);P(t),M.refresh();const r=Math.ceil(o/d);t.length===0&&(c(),n.info({message:"Sorry, nothing was found for your request.",position:"topRight"})),o>d&&E(),i===r&&(n.info({message:"We're sorry, but you've reached the end of search results.",position:"topRight"}),c())}catch(t){B(t)}finally{O()}};y.addEventListener("submit",async t=>{t.preventDefault(),R.innerHTML="";const o=$.value.trim();if(!o){n.error({position:"topRight",message:"Please enter your search query"}),c();return}g=o,i=1,m(),await h(),y.elements.search.value=""});u.addEventListener("click",async()=>{m(),i+=1,await h(),q()});window.addEventListener("load",c);
//# sourceMappingURL=index.js.map
