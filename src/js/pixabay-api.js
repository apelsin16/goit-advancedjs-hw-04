import axios from "axios";
import iziToast from "izitoast";
import "izitoast/dist/css/iziToast.min.css";

import { render } from "./render-functions";

const loader = document.querySelector('.loader');

const url = 'https://pixabay.com/api/';

export const fetchData = async (searchParams, moreLoad) => {
    if (!searchParams.q) {
        iziToast.warning({
            message: 'Пошуковий запит не може бути порожнім!',
            position: 'topRight',
        });
        return;
    }

    loader.classList.add('i-b-display');

    try {
        const { data } = await axios.get(url, { params: searchParams });

        if (data.total === 0) {
            iziToast.error({
                message: 'Sorry, no images match your search query. Please try again!',
                position: 'topRight',
            });
        } else {
            render(data,() => moreLoad(data.total));  
        }
    } catch (error) {
        iziToast.error({
            message: 'Something went wrong. Please try again later!',
            position: 'topRight',
        });
        console.error(error);
    } finally {
        loader.classList.remove('i-b-display');
    }
};