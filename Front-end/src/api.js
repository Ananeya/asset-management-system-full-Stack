import axios from 'axios';

const API_URL = 'http://localhost:5000/api'; // Adjust the URL as needed

export const api = {
  login: (email, password) => axios.post(`${API_URL}/auth/login`, { email, password }),
  register: (userData) => axios.post(`${API_URL}/auth/register`, userData),
  fetchDashboardData: () => axios.get(`${API_URL}/dashboard`, {
    headers: {
      Authorization: localStorage.getItem('authToken'),
    },
  }),
  requestItem: (category, reason) => axios.post(`${API_URL}/request`, { category, reason }),
  fetchItems: () => axios.get(`${API_URL}/items`, {
    headers: {
      Authorization: localStorage.getItem('authToken'),
    },
  }),
  addItem: (itemData) => axios.post(`${API_URL}/items`, itemData, {
    headers: {
      Authorization: localStorage.getItem('authToken'),
    },
  }),
  updateItem: async (itemId, itemData) => {
    try {
      const response = await fetch(`${API_URL}/api/items/${itemId}`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${getToken()}` // Ensure you have authentication
        },
        body: JSON.stringify(itemData)
      });
      return await response.json();
    } catch (error) {
      console.error('Error updating item:', error);
      throw error;
    }
  },
  deleteItem: (itemId) => axios.delete(`${API_URL}/items/${itemId}`),
  getAssignedItems: () => axios.get(`${API_URL}/items/assigned`, {
    headers: {
      Authorization: localStorage.getItem('authToken'),
    },
  }),
  reportIssue: (itemId, issueData) => axios.post(`${API_URL}/items/${itemId}/report-issue`, issueData, {
    headers: {
      Authorization: localStorage.getItem('authToken'),
    },
  }),
  requestItem: (requestData) => axios.post(`${API_URL}/items/request`, requestData, {
    headers: {
      Authorization: localStorage.getItem('authToken'),
    },
  }),
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
  returnItem: (itemId) => axios.post(`${API_URL}/items/${itemId}/return`, {}, {
    headers: {
      Authorization: localStorage.getItem('authToken'),
    },
  }),
  getItemStats: () => axios.get(`${API_URL}/items/stats`, {
    headers: {
      Authorization: localStorage.getItem('authToken'),
    },
  }),
  searchItems: (query) => axios.get(`${API_URL}/items/search?query=${query}`, {
    headers: {
      Authorization: localStorage.getItem('authToken'),
    },
  }),
  getRecentActivity: () => axios.get(`${API_URL}/items/recent-activity`, {
    headers: {
      Authorization: localStorage.getItem('authToken'),
    },
  }),
};
