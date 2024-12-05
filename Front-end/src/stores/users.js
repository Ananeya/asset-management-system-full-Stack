import { defineStore } from 'pinia';
import { api } from '../api';

export const useUsersStore = defineStore('users', {
  state: () => ({
    employees: [],
    loading: false,
    error: null,
  }),

  actions: {
    async fetchEmployees() {
      this.loading = true;
      try {
        const response = await api.getEmployees();
        this.employees = response.data;
        this.error = null;
      } catch (error) {
        this.error = error.message;
      } finally {
        this.loading = false;
      }
    },
  },

  getters: {
    getEmployeeById: (state) => (id) => state.employees.find(emp => emp._id === id),
  },
}); 