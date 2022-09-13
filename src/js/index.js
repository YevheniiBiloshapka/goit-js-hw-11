import cardImage from './templates/card-image.hbs';
import { ImageAPI } from './module/fetch-images';

const gallery = document.querySelector('.gallery-image');
const loadMoreBtn = document.querySelector('.load-more');
const form = document.querySelector('.search-bar');
form.addEventListener('submit', onFormSubmit);

const currentPage = 1;

async function onFormSubmit(e) {
  e.preventDefault();
  gallery.innerHTML = '';
  currentPage = 1;

  const query = form.elements.searchQuery.value;
  if (query === '') {
    return;
  }
  const data = await ImageAPI.fetchImage(query);
  renderCardImage(data.data.hits);
  console.log(data.data);

  if (data.data.totalHits > 40) {
    loadMoreBtn.classList.remove('visually-hidden');
  } else {
    loadMoreBtn.classList.add('visually-hidden');
  }
}

// ? RENDER -------------------------------------------------------------
function renderCardImage(arr) {
  const markup = arr.map(item => cardImage(item)).join('');

  gallery.insertAdjacentHTML('beforeend', markup);
}
