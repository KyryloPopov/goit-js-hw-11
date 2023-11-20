import axios from 'axios';
const queryBuilder = axios.create({
  baseURL: 'https://pixabay.com/api/',
  timeout: 1000,
  headers: { 'x-api-key': '40778765-86fa5418ec3c51ba5231bc1ca' },
});

const API_KEY = '40778765-86fa5418ec3c51ba5231bc1ca';

const BASE_URL = 'https://pixabay.com/api/';

export const getImages = async param => {
  try {
    const responce = await queryBuilder.get('', {
      params: {
        key: API_KEY,
        q: param,
        image_type: 'photo',
        orientation: 'horizontal',
        safesearch: true,
      },
    });
    console.log(responce);
  } catch (error) {
    console.log(error);
  }
};
