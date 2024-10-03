import iziToast from "izitoast";
import SimpleLightbox from "simplelightbox";
import "izitoast/dist/css/iziToast.min.css";
import "simplelightbox/dist/simple-lightbox.min.css";
import { fetchData } from "./js/pixabay-api";

const API_KEY = '46251746-b7ef5ea5c8ec4690d00bddcb0';

const form = document.querySelector('form');
const input = document.querySelector("#search-input");
const gallery = document.querySelector('.gallery');

const lightbox = new SimpleLightbox('.gallery a');

let page = 1;
const per_page = 15;
let lastQuery = ''

const createQuery = async () => {
    if(!input.value.trim() && !lastQuery) {
        iziToast.error({
            position: 'topRight',
            message: 'Please enter your search query'
        });
        form.elements.search.value = '';
        return;
    }
    const searchParams = {
        key: API_KEY,
        q: lastQuery ? lastQuery : input.value.trim(),
        image_type: 'photo',
        orientation: 'horizontal',
        safesearch: true,
        per_page,
        page
    };
    await fetchData(searchParams, moreLoad);
    
    lightbox.refresh();
}

export const moreLoad = async (total) => {    
    const totalPage = Math.ceil(total/per_page);
    page += 1;
    console.log(totalPage);
    console.log(page);    
    
    if(page === totalPage) {
        iziToast.info({
            message: "We're sorry, but you've reached the end of search results.",
            position: 'topRight'            
        });
        const loadMoreButton = document.querySelector('#load-more');
        loadMoreButton.remove();
        createQuery(); 
    };
}

form.addEventListener('submit', e => {
    e.preventDefault();
    gallery.innerHTML = '';
    lastQuery = '';
    page = 1;
    
    createQuery();
    
    lastQuery = input.value.trim();
    form.elements.search.value = '';
});

document.addEventListener('click', (event) => {
    if (event.target.closest('.gallery a')) {
        lightbox.open(event.target.closest('.gallery a'));
    }
});




