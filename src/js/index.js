import { Notify } from 'notiflix/build/notiflix-notify-aio';
import SimpleLightbox from 'simplelightbox';
import 'simplelightbox/dist/simple-lightbox.min.css';
import cardImage from './templates/card-image.hbs';
import { ImageAPI } from './module/fetch-images';

const imageApi = new ImageAPI();
const lightbox = new SimpleLightbox('.photo-card a');

const gallery = document.querySelector('.gallery-image');
const loadMoreBtn = document.querySelector('.load-more');
const form = document.querySelector('.search-bar');
form.addEventListener('submit', onFormSubmit);

async function onFormSubmit(e) {
  e.preventDefault();
  gallery.innerHTML = '';

  const query = e.target.elements.searchQuery.value.trim();
  if (!query) {
    Notify.info('Please, enter key word for search!');
    return;
  }
  imageApi.setPage();
  try {
    const response = await imageApi.fetchImage(query);
    const { hits, totalHits } = response.data;
    if (!hits.length) {
      throw new Error(
        'Sorry, there are no images matching your search query. Please try again'
      );
    }
    renderCardImage(hits);

    Notify.success(`Hooray! We found ${totalHits} images.`);
    if (totalHits > searchQuery.params.per_page) {
      btnLoadRef.classList.remove('visually-hidden');
      searchQuery.increasePage();
    }
  } catch (err) {
    Notify.warning(err.message);
  }
}

function renderCardImage(arr) {
  const markup = arr.map(item => cardImage(item)).join('');

  gallery.insertAdjacentHTML('beforeend', markup);
  lightbox.refresh();
}

loadMoreBtn.addEventListener('click', onClickLoadMoreBtn);

async function onClickLoadMoreBtn() {
  try {
    const response = await imageApi.fetchImage();
    const { hits, totalHits } = response.data;
    renderCardImage(hits);
    imageApi.increasePage();

    const {
      params: { page, per_page },
    } = imageApi;
    if (page > totalHits / per_page) {
      loadMoreBtn.classList.add('visually-hidden');
      throw new Error(
        "We're sorry, but you've reached the end of search results."
      );
    }
  } catch (err) {
    Notify.info(err.message);
  }
}
