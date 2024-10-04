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

const showLoadMoreButton = () => loadMoreButton.style.display = 'block';
const hideLoadMoreButton = () => loadMoreButton.style.display = 'none';

const showLoader = () => loader.classList.add('i-b-display');
const hideLoader = () => loader.classList.remove('i-b-display');

const handleError = (error) => {
    console.error(error);
    iziToast.error({
        message: 'An error occurred. Please try again.',
        position: 'topRight'
    });
};

const updateGallery = async () => {
    try {
        const { hits, total } = await fetchData(lastSearchQuery, page, per_page);
        render(hits);        
        lightbox.refresh();

        const totalPages = Math.ceil(total / per_page);

        if (hits.length === 0) {
            hideLoadMoreButton();
            iziToast.info({
                message: "Sorry, nothing was found for your request.",
                position: 'topRight'
            });
        };
        if (total > per_page) showLoadMoreButton();
        if (page === totalPages) {
            iziToast.info({
                message: "We're sorry, but you've reached the end of search results.",
                position: 'topRight'
            });
            hideLoadMoreButton();
        }
    } catch (error) {
        handleError(error);
    } finally {
        hideLoader();
    }
};

form.addEventListener('submit', async (e) => {
    e.preventDefault();
    gallery.innerHTML = '';
    const searchQuery = input.value.trim();

    if (!searchQuery) {
        iziToast.error({
            position: 'topRight',
            message: 'Please enter your search query'
        });
        hideLoadMoreButton();
        return;
    }

    lastSearchQuery = searchQuery;
    page = 1;
    showLoader();
    await updateGallery();
    form.elements.search.value = '';
});

loadMoreButton.addEventListener('click', async () => {
    showLoader();
    page += 1;
    await updateGallery();
    smoothScroll();
});

window.addEventListener('load', hideLoadMoreButton);
