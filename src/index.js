import Notiflix from 'notiflix';
import { getImages } from './pixabay-api';
const form = document.querySelector('.search-form');
form.addEventListener('submit', loadImages);
const gallery = document.querySelector('.gallery');
const button = document.querySelector('.load-more');
button.addEventListener('click', loadMore);
let page = 1;
let value;
async function loadImages(event) {
  event.preventDefault();
  button.style.display = 'none';
  page = 1;
  value = event.target.elements.searchQuery.value;
  const data = await getImages(value, page);
  if (data.hits.length === 0) {
    Notiflix.Notify.failure(
      'Sorry, there are no images matching your search query. Please try again.'
    );
    return;
  }
  let cardsMarkup = renderImages(data.hits);
  gallery.innerHTML = cardsMarkup;
  if (data.totalHits - 40 * page >= 0) {
    button.style.display = 'block';
  }
  page++;
}

function renderImages(hits) {
  return hits
    .map(
      ({
        webformatURL,
        largeImageURL,
        tags,
        likes,
        views,
        comments,
        downloads,
      }) => {
        return `<div class="photo-card">
            <img src="${webformatURL}" alt="${tags}" loading="lazy" width="264px" height="176px" />
            <div class="info">
                <p class="info-item">
                <b>Likes</b>
                <span>${likes}</span>
                </p>
                <p class="info-item">
                <b>Views</b>
                <span>${views}</span>
                </p>
                <p class="info-item">
                <b>Comments</b>
                <span>${comments}</span>
                </p>
                <p class="info-item">
                <b>Downloads</b>
                <span>${downloads}</span>
                </p>
            </div>
        </div>
        `;
      }
    )
    .join('');
}

async function loadMore() {
  button.style.display = 'none';
  const data = await getImages(value, page);
  let cardsMarkup = renderImages(data.hits);
  gallery.insertAdjacentHTML('beforeend', cardsMarkup);
  if (data.hits.length === 0) {
    Notiflix.Notify.warning(
      "We're sorry, but you've reached the end of search results."
    );
    return;
  }
  button.style.display = 'block';
  page++;
}
