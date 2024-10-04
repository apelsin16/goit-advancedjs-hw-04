import iziToast from "izitoast";
import SimpleLightbox from "simplelightbox";
import "izitoast/dist/css/iziToast.min.css";
import "simplelightbox/dist/simple-lightbox.min.css";
import { fetchData } from "./js/pixabay-api";
import { render, smoothScroll } from "./js/render-functions";

const form = document.querySelector('form');
const input = document.querySelector("#search-input");
const gallery = document.querySelector('.gallery');
const loadMoreButton = document.querySelector('.load-more');
const loader = document.querySelector('.loader');

const lightbox = new SimpleLightbox('.gallery a');

let page = 1;
const per_page = 15;
let lastSearchQuery = '';

const toggleLoadMoreButton = hideButton => {
    if(!gallery.hasChildNodes() || hideButton) {
        loadMoreButton.style.display = 'none';
    } else {
        loadMoreButton.style.display = 'block';
    }
}

const toggleLoader = hideLoader => {
    if(hideLoader) {
        loader.classList.remove('i-b-display');
    } else {
        loader.classList.add('i-b-display');
    }
}

form.addEventListener('submit', async e => {
    e.preventDefault();
    gallery.innerHTML = '';
    const searchQuery = input.value.trim();
    lastSearchQuery = '';
    page = 1;
    toggleLoader();    
    if(!searchQuery) {
        iziToast.error({
            position: 'topRight',
            message: 'Please enter your search query'
        });
        form.elements.search.value = '';
        return;
    }
    try {
        const {hits, total} = await fetchData(searchQuery, page, per_page);
        render(hits);
        lightbox.refresh();
        const totalPages = Math.ceil(total/per_page);
        if(total > per_page) {
            toggleLoadMoreButton();
        }
        if(page === totalPages) {
            iziToast.info({
                message: "We're sorry, but you've reached the end of search results.",
                position: 'topRight'            
            });
            
            toggleLoadMoreButton(true);
        };

    } 
    catch (error) {
        console.log(error);
    }
    finally {
        toggleLoader(true);
    }
    
    lastSearchQuery = searchQuery;
    form.elements.search.value = '';   
});

loadMoreButton.addEventListener('click', async (e) => {
    e.preventDefault();
    toggleLoader();
    page += 1;    
    try {
        const {hits, total} = await fetchData(lastSearchQuery, page, per_page);
        render(hits);
        smoothScroll();
        lightbox.refresh();
        const totalPages = Math.ceil(total/per_page);
        if(total > per_page) {
            toggleLoadMoreButton();
        }
        if(page === totalPages) {
            iziToast.info({
                message: "We're sorry, but you've reached the end of search results.",
                position: 'topRight'            
            });
            
            toggleLoadMoreButton(true);
        };

    } 
    catch (error) {
        console.log(error);
    }
    finally {
        toggleLoader(true);
    }
})

window.addEventListener('load', () => {
    toggleLoadMoreButton();
});




