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

export const render = (data, moreLoad) => {
    const fragment = new DocumentFragment();
    const buttonWrapper = document.querySelector('.button-wrapper');
    data.hits.map(element => {
        
        const link = document.createElement('a');
        link.setAttribute('href', element.largeImageURL);
        link.classList.add('gallery-link');
        
        const image = document.createElement('img');
        image.setAttribute('src', element.webformatURL);
        image.setAttribute('alt', element.tags);

        const list = document.createElement('dl');

        const dtLikes = document.createElement('dt');
        dtLikes.innerHTML = 'Likes';

        const ddLikes = document.createElement('dd');
        ddLikes.innerHTML = element.likes;

        const dtViews = document.createElement('dt');
        dtViews.innerHTML = 'Views';

        const ddViews = document.createElement('dd');
        ddViews.innerHTML = element.views;

        const dtComments = document.createElement('dt');
        dtComments.innerHTML = 'Comments';

        const ddComments = document.createElement('dd');
        ddComments.innerHTML = element.comments;

        const dtDownloads = document.createElement('dt');
        dtDownloads.innerHTML = 'Downloads';

        const ddDownloads = document.createElement('dd');
        ddDownloads.innerHTML = element.downloads;

        list.append(dtLikes);
        list.append(ddLikes);
        list.append(dtViews);
        list.append(ddViews);
        list.append(dtComments);
        list.append(ddComments);
        list.append(dtDownloads);
        list.append(ddDownloads);

        link.append(image);
        link.append(list);
        
        if(buttonWrapper) {
            gallery.insertBefore(link, buttonWrapper);
        } else {
            fragment.append(link);        
        }
    });
    
    if(!buttonWrapper) {
        const buttonWrapper = document.createElement('div');
        buttonWrapper.classList.add('button-wrapper');

        const button = document.createElement('button');
        button.innerHTML = 'Load more';
        button.setAttribute('id', 'load-more');
        button.addEventListener('click', moreLoad);
        
        buttonWrapper.append(button);
        fragment.append(buttonWrapper);
    }

    gallery.append(fragment);
    if(buttonWrapper) {
        smoothScroll();
    }
}
