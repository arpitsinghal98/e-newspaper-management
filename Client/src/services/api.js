// client/src/services/api.js

import axios from 'axios';

const API_URL = 'http://localhost:9000/api';

// Articles API
export const getArticles = (page = 1, limit = 10) => {
  return axios.get(`${API_URL}/articles`, {
    params: { page, limit },
  });
};

export const getArticle = (id) => axios.get(`${API_URL}/articles/${id}`);
export const createArticle = (data) => axios.post(`${API_URL}/articles`, data);
export const updateArticle = (id, data) => axios.put(`${API_URL}/articles/${id}`, data);
export const deleteArticle = (id) => axios.delete(`${API_URL}/articles/${id}`);

// Categories API
export const getCategories = (page = 1, limit = 10) => {
  return axios.get(`${API_URL}/categories`, {
    params: { page, limit },
  });
};

export const getCategory = (id) => axios.get(`${API_URL}/categories/${id}`);
export const createCategory = (data) => axios.post(`${API_URL}/categories`, data);
export const updateCategory = (id, data) => axios.put(`${API_URL}/categories/${id}`, data);
export const deleteCategory = (id) => axios.delete(`${API_URL}/categories/${id}`);

// Comments API
export const getComments = (page = 1, limit = 10) => {
  return axios.get(`${API_URL}/comments`, {
    params: { page, limit },
  });
};

export const getComment = (id) => axios.get(`${API_URL}/comments/${id}`);
export const createComment = (data) => axios.post(`${API_URL}/comments`, data);
export const updateComment = (id, data) => axios.put(`${API_URL}/comments/${id}`, data);
export const deleteComment = (id) => axios.delete(`${API_URL}/comments/${id}`);

// Fetch Table Names
export const getTables = () => {
  return axios.get(`${API_URL}/tables`); // Assuming you have an endpoint `/api/tables` in your backend
};

export const getColumns = (tableName) => {
    return axios.get(`${API_URL}/columns/${tableName}`); // Endpoint for getting column names and types
};

export const createRow = (tableName, rowData) => {
    return axios.post(`${API_URL}/create-row/${tableName}`, rowData); // Send a POST request to create a new row
};

export const getTableData = (tableName, page, limit) => {
  return axios.get(`${API_URL}/tables/${tableName}`, {
    params: { page, limit }
  });
};

export const getPrimaryKeyField = (tableName) => {
  return axios.get(`${API_URL}/primaryKey/${tableName}`);
};

// Function to get a record by primary key
export const getRecordByPrimaryKey = (tableName, primaryKeyField, primaryKeyValue) => {
  return axios.get(`${API_URL}/${tableName}/${primaryKeyField}/${primaryKeyValue}`);
};

export const updateRecord = (tableName, primaryKeyField, primaryKeyValue, updatedData) => {
  return axios.put(`${API_URL}/${tableName}/${primaryKeyField}/${primaryKeyValue}`, updatedData);
};

export const deleteRecord = (tableName, primaryKeyField, primaryKeyValue) => {
  return axios.delete(`${API_URL}/${tableName}/${primaryKeyField}/${primaryKeyValue}`);
};

export const executeSqlQuery = (query) => {
  return axios.post(`${API_URL}/execute-query`, { query });
};