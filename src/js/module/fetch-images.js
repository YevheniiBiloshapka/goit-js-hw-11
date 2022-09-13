const axios = require('axios').default;

const baseURL = 'https://pixabay.com/api/';

export class ImageAPI {
  static page = 1;
  static pageSize = 40;

  static async fetchImage(query) {
    const config = {
      params: {
        key: '29885299-b4c69978fe670a05b23642baf',
        q: query,
        safesearch: true,
        orientation: 'horizontal',
        image_type: 'photo',
        page: ImageAPI.page,
        per_page: ImageAPI.pageSize,
      },
    };

    return await axios.get(`${baseURL}`, config);
  }
}
