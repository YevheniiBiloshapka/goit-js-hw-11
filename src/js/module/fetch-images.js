const axios = require('axios').default;

export class ImageAPI {
  baseURL = 'https://pixabay.com/api/';
  params = {
    key: '29885299-b4c69978fe670a05b23642baf',
    image_type: 'photo',
    orientation: 'horizontal',
    safesearch: true,
    per_page: 40,
  };

  async fetchImage(query) {
    if (query) {
      this.params.q = query;
    }
    const config = {
      params: this.params,
    };
    return await axios.get(this.baseURL, config);
  }

  increasePage() {
    this.params.page += 1;
  }
  setPage() {
    this.params.page = 1;
  }
}
