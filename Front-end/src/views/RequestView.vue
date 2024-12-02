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
      <div class="px-4 py-6 sm:px-0">
        <div class="bg-white shadow rounded-lg p-6">
          <h2 class="text-2xl font-bold mb-6">Request Item</h2>
          <form @submit.prevent="submitRequest" class="space-y-6">
            <div>
              <label for="itemCategory" class="block text-sm font-medium text-gray-700">Item Category</label>
              <select id="itemCategory" v-model="itemCategory" required class="mt-1 block w-full pl-3 pr-10 py-2 text-base border-gray-300 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm rounded-md">
                <option value="">Select Category</option>
                <option value="laptop">Laptop</option>
                <option value="desktop">Desktop</option>
                <option value="monitor">Monitor</option>
                <option value="peripheral">Peripheral</option>
                <option value="other">Other</option>
              </select>
            </div>
            <div>
              <label for="requestReason" class="block text-sm font-medium text-gray-700">Reason for Request</label>
              <textarea id="requestReason" v-model="requestReason" required rows="4" class="mt-1 block w-full shadow-sm focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm border border-gray-300 rounded-md"></textarea>
            </div>
            <div>
              <button type="submit" class="w-full flex justify-center py-2 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500">
                Submit Request
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
  name: 'RequestView',
  data() {
    return {
      itemCategory: '',
      requestReason: '',
    };
  },
  methods: {
    async submitRequest() {
      try {
        await api.requestItem(this.itemCategory, this.requestReason);
        // Handle successful request (e.g., show a success message or redirect)
        alert('Request submitted successfully!');
        this.itemCategory = '';
        this.requestReason = '';
      } catch (error) {
        console.error('Request submission failed:', error);
        // Handle error (e.g., show an error message)
      }
    },
  },
};
</script>

<style scoped>
/* Add any additional styles here */
</style>
