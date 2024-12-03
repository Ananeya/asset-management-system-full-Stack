import axios from 'axios';

const API_URL = 'http://localhost:5000/api'; // Adjust the URL as needed

export const api = {
  login: (email, password) => axios.post(`${API_URL}/auth/login`, { email, password }),
  register: (username, email, password, role) => axios.post(`${API_URL}/auth/register`, { username, email, password, role }),
  fetchDashboardData: () => axios.get(`${API_URL}/dashboard`, {
    headers: {
      Authorization: localStorage.getItem('authToken'),
    },
  }),
  requestItem: (category, reason) => axios.post(`${API_URL}/request`, { category, reason }),
  fetchItems: () => axios.get(`${API_URL}/items`),
  addItem: (item) => axios.post(`${API_URL}/items`, item),
  updateItem: (item) => axios.put(`${API_URL}/items/${item.id}`, item),
  deleteItem: (itemId) => axios.delete(`${API_URL}/items/${itemId}`),
  getAssignedItems: () => axios.get(`${API_URL}/items/assigned`),
  reportIssue: (issueData) => axios.post(`${API_URL}/items/report`, issueData),
  requestItem: (requestData) => axios.post(`${API_URL}/items/request`, requestData),
  refreshToken: async () => {
    const response = await axios.post(`${API_URL}/auth/refresh-token`, {}, {
      headers: {
        Authorization: localStorage.getItem('authToken'),
      },
    });
    localStorage.setItem('authToken', response.data.token);
    return response.data;
  },
  reassignItem: (itemId, newUserId) => axios.post(`${API_URL}/items/${itemId}/reassign`, { newUserId }, {
    headers: {
      Authorization: localStorage.getItem('authToken'),
    },
  }),
  getEmployees: () => axios.get(`${API_URL}/auth/employees`, {
    headers: {
      Authorization: localStorage.getItem('authToken'),
    },
  }),
};
