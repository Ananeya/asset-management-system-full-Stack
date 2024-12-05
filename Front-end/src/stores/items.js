import { defineStore } from 'pinia';
import { api } from '../api';

export const useItemsStore = defineStore('items', {
  state: () => ({
    items: [],
    loading: false,
    error: null,
  }),

  actions: {
    async fetchItems() {
      this.loading = true;
      try {
        const response = await api.fetchItems();
        this.items = response.data;
        this.error = null;
      } catch (error) {
        this.error = error.message;
      } finally {
        this.loading = false;
      }
    },

    async addItem(itemData) {
      try {
        const response = await api.addItem(itemData);
        this.items.push(response.data);
        return response.data;
      } catch (error) {
        this.error = error.message;
        throw error;
      }
    },

    async updateItem(item) {
      try {
        const response = await api.updateItem(item);
        const index = this.items.findIndex(i => i._id === item._id);
        if (index !== -1) {
          this.items[index] = response.data;
        }
        return response.data;
      } catch (error) {
        this.error = error.message;
        throw error;
      }
    },

    async deleteItem(itemId) {
      try {
        await api.deleteItem(itemId);
        this.items = this.items.filter(item => item._id !== itemId);
      } catch (error) {
        this.error = error.message;
        throw error;
      }
    },

    async assignItem(itemId, userId) {
      try {
        const response = await api.reassignItem(itemId, userId);
        const index = this.items.findIndex(i => i._id === itemId);
        if (index !== -1) {
          this.items[index] = response.data;
        }
        return response.data;
      } catch (error) {
        this.error = error.message;
        throw error;
      }
    },
  },

  getters: {
    availableItems: (state) => state.items.filter(item => item.status === 'Available'),
    assignedItems: (state) => state.items.filter(item => item.status !== 'Available'),
    getItemById: (state) => (id) => state.items.find(item => item._id === id),
  },
}); 