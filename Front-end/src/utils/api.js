import TokenManager from './tokenManager';


const API_BASE_URL = 'http://localhost:5000/api'; // Update this if your back-end is hosted elsewhere

class ApiService {
  static async request(endpoint, options = {}) {
    const headers = {
      'Content-Type': 'application/json',
      ...TokenManager.getAuthHeader(),
    };

    const response = await fetch(`${API_BASE_URL}${endpoint}`, {
      ...options,
      headers,
    });

    if (!response.ok) {
      throw new Error('Network response was not ok');
    }

    return response.json();
  }

  static async getItems() {
    return this.request('/items');
  }

  static async addItem(itemData) {
    return this.request('/items', {
      method: 'POST',
      body: JSON.stringify(itemData),
    });
  }

  // Add more methods as needed
}

export default ApiService;
