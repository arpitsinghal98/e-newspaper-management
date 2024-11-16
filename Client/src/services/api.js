// client/src/services/api.js

import axios from 'axios';

const API_URL = 'http://localhost:9000/api';

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