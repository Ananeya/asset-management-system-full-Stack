import { defineStore } from 'pinia';
import { api } from '../api';

export const useAuthStore = defineStore('auth', {
  state: () => ({
    user: JSON.parse(localStorage.getItem('user')) || null,
    token: localStorage.getItem('authToken') || null,
    isAuthenticated: !!localStorage.getItem('authToken'),
  }),

  actions: {
    async login(email, password) {
      try {
        const response = await api.login(email, password);
        this.user = response.data.user;
        this.token = response.data.token;
        this.isAuthenticated = true;
        
        localStorage.setItem('user', JSON.stringify(response.data.user));
        localStorage.setItem('authToken', response.data.token);
        
        return response.data;
      } catch (error) {
        throw error;
      }
    },

    async register(username, email, password, role) {
      try {
        const response = await api.register(username, email, password, role);
        return response.data;
      } catch (error) {
        throw error;
      }
    },

    logout() {
      this.user = null;
      this.token = null;
      this.isAuthenticated = false;
      localStorage.removeItem('user');
      localStorage.removeItem('authToken');
    },
  },

  getters: {
    userRole: (state) => state.user?.role,
    isStorekeeper: (state) => state.user?.role === 'storekeeper',
    isEmployee: (state) => state.user?.role === 'employee',
  },
}); 