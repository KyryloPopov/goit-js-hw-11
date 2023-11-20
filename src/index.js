import Notiflix from 'notiflix';
import { getImages } from './pixabay-api';
const form = document.querySelector('.search-form');
form.addEventListener('submit', renderImages);
const gallery = document.querySelector('.gallery');

function renderImages(event) {
  event.preventDefault();
  const value = event.target.elements.searchQuery.value;
  getImages(value);
}
