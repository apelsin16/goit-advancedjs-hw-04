const gallery = document.querySelector('.gallery');

export const smoothScroll = () => {
    const galleryItem = document.querySelector('.gallery-link');
    if (galleryItem) {
        const itemHeight = galleryItem.getBoundingClientRect().height;

        window.scrollBy({
            top: itemHeight * 2,
            behavior: 'smooth',
        });
    }
}

export const render = (hits) => {
    const markup = hits.map(element => `
            <li class="gallery-item">
                <a class="gallery-link" href="${element.largeImageURL}">
                    <img 
                        class="gallery-image" 
                        src="${element.webformatURL}" 
                        data-source="${element.largeImageURL}" 
                        alt="${element.tags}"
                    />
                    <dl>
                        <dt>Likes</dt>
                        <dd>${element.likes}</dd>
                        <dt>Views</dt>
                        <dd>${element.views}</dd>
                        <dt>Comments</dt>
                        <dd>${element.comments}</dd>
                        <dt>Downloads</dt>
                        <dd>${element.downloads}</dd>
                    </dl>
                </a>
            </li>
    `).join();
    gallery.insertAdjacentHTML('beforeend', markup);
}
