import axios from 'axios';

const API_URL = 'http://localhost:5000/api'; // Adjust the URL as needed

export const api = {
  login: (email, password) => axios.post(`${API_URL}/auth/login`, { email, password }),
  register: (username, email, password, role) => axios.post(`${API_URL}/auth/register`, { username, email, password, role }),
  fetchDashboardData: () => axios.get(`${API_URL}/dashboard`),
  requestItem: (category, reason) => axios.post(`${API_URL}/request`, { category, reason }),
  fetchItems: () => axios.get(`${API_URL}/items`),
  addItem: (item) => axios.post(`${API_URL}/items`, item),
  updateItem: (item) => axios.put(`${API_URL}/items/${item.id}`, item),
  deleteItem: (itemId) => axios.delete(`${API_URL}/items/${itemId}`),
};
