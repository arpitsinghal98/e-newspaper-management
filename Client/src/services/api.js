// client/src/services/api.js
import axios from 'axios';

const API_URL = 'http://localhost:9000/api';

export const getArticles = () => axios.get(`${API_URL}/articles`);
export const getArticle = (id) => axios.get(`${API_URL}/articles/${id}`);
export const createArticle = (data) => axios.post(`${API_URL}/articles`, data);
export const updateArticle = (id, data) => axios.put(`${API_URL}/articles/${id}`, data);
export const deleteArticle = (id) => axios.delete(`${API_URL}/articles/${id}`);
