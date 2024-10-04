import axios from "axios";

const API_KEY = '46251746-b7ef5ea5c8ec4690d00bddcb0';
const url = 'https://pixabay.com/api/';

export const fetchData = async (searchString, page, per_page = 15) => {
    const searchParams = {
        key: API_KEY,
        q: searchString,
        image_type: 'photo',
        orientation: 'horizontal',
        safesearch: true,
        per_page,
        page
    };
    const { data } = await axios.get(url, { params: searchParams });
    return data;
};