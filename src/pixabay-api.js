import axios from 'axios';
const queryBuilder = axios.create({
  baseURL: 'https://pixabay.com/api/',
  timeout: 1000,
  headers: {
    'Access-Control-Allow-Origin': '*',
    'Content-Type': 'application/json',
  },
});

const API_KEY = '40778765-86fa5418ec3c51ba5231bc1ca';

const BASE_URL = 'https://pixabay.com/api/';

// Не зміг зробити запит через axios, свариться CROS, No 'Access-Control-Allow-Origin'
//
// export const getImages = async param => {
//   try {
//     const responce = await queryBuilder.get('', {
//       params: {
//         key: API_KEY,
//         q: param,
//         image_type: 'photo',
//         orientation: 'horizontal',
//         safesearch: true,
//       },
//       headers: {
//         'Access-Control-Allow-Origin': '*',
//       },
//     });
//     console.log(responce);
//   } catch (error) {
//     console.log(error);
//   }
// };

export const getImages = async (param, page) => {
  const response = await fetch(
    `${BASE_URL}/?key=${API_KEY}&q=${param}&image_type=photo&orientation=horizontal&safesearch=true&page=${page}&per_page=40`
  );
  const cards = await response.json();
  return cards;
};
