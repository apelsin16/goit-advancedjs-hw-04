import{a as h,S as L,i as l}from"./assets/vendor-CRCB-GUD.js";(function(){const o=document.createElement("link").relList;if(o&&o.supports&&o.supports("modulepreload"))return;for(const e of document.querySelectorAll('link[rel="modulepreload"]'))a(e);new MutationObserver(e=>{for(const s of e)if(s.type==="childList")for(const i of s.addedNodes)i.tagName==="LINK"&&i.rel==="modulepreload"&&a(i)}).observe(document,{childList:!0,subtree:!0});function r(e){const s={};return e.integrity&&(s.integrity=e.integrity),e.referrerPolicy&&(s.referrerPolicy=e.referrerPolicy),e.crossOrigin==="use-credentials"?s.credentials="include":e.crossOrigin==="anonymous"?s.credentials="omit":s.credentials="same-origin",s}function a(e){if(e.ep)return;e.ep=!0;const s=r(e);fetch(e.href,s)}})();const b="46251746-b7ef5ea5c8ec4690d00bddcb0",w="https://pixabay.com/api/",v=async(t,o,r=15)=>{const a={key:b,q:t,image_type:"photo",orientation:"horizontal",safesearch:!0,per_page:r,page:o},{data:e}=await h.get(w,{params:a});return e},S=document.querySelector(".gallery"),q=()=>{const t=document.querySelector(".gallery-link");if(t){const o=t.getBoundingClientRect().height;window.scrollBy({top:o*2,behavior:"smooth"})}},P=t=>{const o=t.map(r=>`
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
    `).join();S.insertAdjacentHTML("beforeend",o)},y=document.querySelector("form"),$=document.querySelector("#search-input"),M=document.querySelector(".gallery"),d=document.querySelector(".load-more"),m=document.querySelector(".loader"),R=new L(".gallery a");let n=1;const c=15;let f="";const E=()=>d.style.display="block",u=()=>d.style.display="none",g=()=>m.classList.add("i-b-display"),O=()=>m.classList.remove("i-b-display"),B=t=>{console.error(t),l.error({message:"An error occurred. Please try again.",position:"topRight"})},p=async()=>{try{const{hits:t,total:o}=await v(f,n,c);P(t),R.refresh();const r=Math.ceil(o/c);o>c&&E(),n===r&&(l.info({message:"We're sorry, but you've reached the end of search results.",position:"topRight"}),u())}catch(t){B(t)}finally{O()}};y.addEventListener("submit",async t=>{t.preventDefault(),M.innerHTML="";const o=$.value.trim();if(!o){l.error({position:"topRight",message:"Please enter your search query"}),u();return}f=o,n=1,g(),await p(),y.elements.search.value=""});d.addEventListener("click",async()=>{g(),n+=1,await p(),q()});window.addEventListener("load",u);
//# sourceMappingURL=index.js.map
