import axios from "axios";
const API_URL = "https://northcoders-news-api.herokuapp.com/api/";
// const API_URL = "http://vast-meadow-48089.herokuapp.com/api";

const API = {
  fetchArticles: () => {
    return axios.get(`${API_URL}/articles/`).then(obj => obj.data.articles);
  },
  fetchComments: article_id => {
    return axios
      .get(`${API_URL}/articles/${article_id}/comments/`)
      .then(obj => obj.data.comments || []);
  },
  fetchTopics: topic => {
    return axios.get(`${API_URL}/topics/`).then(obj => obj.data.topics);
  }
};

export default API;
