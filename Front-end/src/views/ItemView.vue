<template>
  <div class="bg-gray-100 min-h-screen">
    <!-- Navigation -->
    <nav class="bg-indigo-600">
      <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div class="flex items-center justify-between h-16">
          <div class="flex items-center">
            <router-link to="/" class="text-white font-bold text-xl hover:text-gray-200">
              Asset Management
            </router-link>
          </div>
          <div class="flex items-center space-x-4">
            <router-link to="/dashboard" class="text-white hover:bg-indigo-500 px-3 py-2 rounded-md text-sm font-medium">
              Dashboard
            </router-link>
            <button id="logoutBtn" class="text-white hover:bg-indigo-500 px-3 py-2 rounded-md text-sm font-medium">
              Logout
            </button>
          </div>
        </div>
      </div>
    </nav>

    <!-- Main Content -->
    <main class="max-w-7xl mx-auto py-6 sm:px-6 lg:px-8">
      <div class="bg-white shadow rounded-lg p-6">
        <div class="flex justify-between items-center mb-4">
          <h2 class="text-lg font-medium text-gray-900">Items</h2>
          <button @click="openModal" class="inline-flex items-center px-4 py-2 border border-transparent text-sm font-medium rounded-md text-white bg-indigo-600 hover:bg-indigo-700">
            Add New Item
          </button>
        </div>
        <div class="overflow-x-auto">
          <table class="min-w-full divide-y divide-gray-200">
            <thead class="bg-gray-50">
              <tr>
                <th class="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Name</th>
                <th class="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Category</th>
                <th class="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Status</th>
                <th class="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Assigned To</th>
                <th class="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Actions</th>
              </tr>
            </thead>
            <tbody id="itemsList" class="bg-white divide-y divide-gray-200">
              <tr v-for="item in items" :key="item.id">
                <td class="px-6 py-4 whitespace-nowrap text-sm text-gray-900">{{ item.name }}</td>
                <td class="px-6 py-4 whitespace-nowrap text-sm text-gray-900">{{ item.category }}</td>
                <td class="px-6 py-4 whitespace-nowrap text-sm text-gray-900">{{ item.status }}</td>
                <td class="px-6 py-4 whitespace-nowrap text-sm text-gray-900">{{ item.assignedTo }}</td>
                <td class="px-6 py-4 whitespace-nowrap text-sm font-medium">
                  <button @click="editItem(item)" class="text-indigo-600 hover:text-indigo-900">Edit</button>
                  <button @click="deleteItem(item.id)" class="text-red-600 hover:text-red-900 ml-4">Delete</button>
                </td>
              </tr>
            </tbody>
          </table>
        </div>
      </div>

      <!-- Add/Edit Item Modal -->
      <div v-if="isModalOpen" class="fixed inset-0 bg-gray-500 bg-opacity-75 flex items-center justify-center">
        <div class="bg-white rounded-lg p-8 max-w-md w-full">
          <h3 class="text-lg font-medium text-gray-900 mb-4">{{ modalTitle }}</h3>
          <form @submit.prevent="saveItem">
            <div class="space-y-4">
              <div>
                <label class="block text-sm font-medium text-gray-700">Name</label>
                <input type="text" v-model="itemForm.name" required class="mt-1 block w-full shadow-sm focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm border-gray-300 rounded-md">
              </div>
              <div>
                <label class="block text-sm font-medium text-gray-700">Category</label>
                <input type="text" v-model="itemForm.category" required class="mt-1 block w-full shadow-sm focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm border-gray-300 rounded-md">
              </div>
              <div>
                <label class="block text-sm font-medium text-gray-700">Status</label>
                <select v-model="itemForm.status" required class="mt-1 block w-full pl-3 pr-10 py-2 text-base border-gray-300 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm rounded-md">
                  <option value="available">Available</option>
                  <option value="assigned">Assigned</option>
                </select>
              </div>
              <div>
                <label class="block text-sm font-medium text-gray-700">Assigned To</label>
                <input type="text" v-model="itemForm.assignedTo" class="mt-1 block w-full shadow-sm focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm border-gray-300 rounded-md">
              </div>
            </div>
            <div class="mt-5 sm:mt-6 space-x-3">
              <button type="submit" class="inline-flex justify-center w-full sm:w-auto px-4 py-2 text-sm font-medium text-white bg-indigo-600 hover:bg-indigo-700 rounded-md">
                Save
              </button>
              <button type="button" @click="closeModal" class="inline-flex justify-center w-full sm:w-auto px-4 py-2 text-sm font-medium text-gray-700 bg-gray-100 hover:bg-gray-200 rounded-md">
                Cancel
              </button>
            </div>
          </form>
        </div>
      </div>
    </main>
  </div>
</template>

<script>
import { api } from '../api';

export default {
  name: 'ItemsView',
  data() {
    return {
      items: [],
      isModalOpen: false,
      modalTitle: 'Add New Item',
      itemForm: {
        name: '',
        category: '',
        status: 'available',
        assignedTo: '',
      },
    };
  },
  async created() {
    await this.fetchItems();
  },
  methods: {
    async fetchItems() {
      try {
        const response = await api.fetchItems(); // Ensure you have this API method
        this.items = response.data; // Adjust based on your API response
      } catch (error) {
        console.error('Failed to fetch items:', error);
      }
    },
    openModal() {
      this.isModalOpen = true;
      this.modalTitle = 'Add New Item';
      this.itemForm = { name: '', category: '', status: 'available', assignedTo: '' }; // Reset form
    },
    closeModal() {
      this.isModalOpen = false;
    },
    async saveItem() {
      try {
        if (this.modalTitle === 'Add New Item') {
          await api.addItem(this.itemForm); // Ensure you have this API method
        } else {
          await api.updateItem(this.itemForm); // Ensure you have this API method
        }
        await this.fetchItems(); // Refresh the item list
        this.closeModal();
      } catch (error) {
        console.error('Failed to save item:', error);
      }
    },
    editItem(item) {
      this.isModalOpen = true;
      this.modalTitle = 'Edit Item';
      this.itemForm = { ...item }; // Populate form with item data
    },
    async deleteItem(itemId) {
      try {
        await api.deleteItem(itemId); // Ensure you have this API method
        await this.fetchItems(); // Refresh the item list
      } catch (error) {
        console.error('Failed to delete item:', error);
      }
    },
  },
};
</script>

<style scoped>
/* Add any additional styles here */
</style>
