import axios from "axios";
// const API_URL = "https://northcoders-news-api.herokuapp.com/api";
const API_URL = "http://vast-meadow-48089.herokuapp.com/api";

const API = {
  fetchArticles: () => {
    return axios.get(`${API_URL}/articles/`).then(obj => obj.data);
  },

  fetchComments: article_id => {
    return axios
      .get(`${API_URL}/articles/${article_id}/comments/`)
      .then(obj => obj.data.comments || []);
  },

  fetchTopics: () => {
    return axios.get(`${API_URL}/topics/`).then(obj => obj.data.topics);
  },

  fetchArticlesByTopic: topic_title => {
    return axios
      .get(`${API_URL}/topics/${topic_title}/articles/`)
      .then(obj => obj.data);
  },

  fetchAllUsers: () => {
    return axios.get(`${API_URL}/users`).then(obj => obj.data);
  },

  fetchUserArticles: username => {
    return axios
      .get(`${API_URL}/users/${username}/articles`)
      .then(obj => obj.data);
  },

  fetchUserComments: username => {
    return axios
      .get(`${API_URL}/users/${username}/comments`)
      .then(obj => obj.data);
  },

  vote: (type, id, vote) => {
    return axios
      .put(`${API_URL}/${type}/${id}/?vote=${vote}`)
      .then(obj => obj.data);
  },

  postComment: (article_id, input, username) => {
    return axios
      .post(`${API_URL}/articles/${article_id}/comments`, {
        comment: input,
        username
      })
      .then(obj => obj.data);
  },

  deleteComment: comment_id => {
    return axios.delete(`${API_URL}/comments/${comment_id}`);
  }
};

export default API;
