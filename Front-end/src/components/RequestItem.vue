<template>
  <div class="max-w-md mx-auto p-6 bg-white rounded-lg shadow-md">
    <h2 class="text-2xl font-bold mb-6 text-center">Request Item</h2>
    <div class="mb-4">
      <label for="category" class="block text-sm font-medium text-gray-700">Item Category</label>
      <select v-model="category" id="category" class="mt-1 block w-full border border-gray-300 rounded-md shadow-sm focus:ring-indigo-500 focus:border-indigo-500 p-2">
        <option value="" disabled>Select Category</option>
        <option value="electronics">Electronics</option>
        <option value="furniture">Furniture</option>
        <option value="stationery">Stationery</option>
        <!-- Add more categories as needed -->
      </select>
    </div>
    <div class="mb-4">
      <label for="reason" class="block text-sm font-medium text-gray-700">Reason for Request</label>
      <textarea v-model="reason" id="reason" rows="4" class="mt-1 block w-full border border-gray-300 rounded-md shadow-sm focus:ring-indigo-500 focus:border-indigo-500 p-2" placeholder="Enter your reason here..."></textarea>
    </div>
    <button @click="submitRequest" class="w-full mt-4 p-2 bg-indigo-600 text-white rounded-md hover:bg-indigo-700 transition duration-200">
      Submit Request
    </button>
  </div>
</template>

<script>
import { ref } from 'vue';
import { api } from '../api'; // Ensure this path is correct

export default {
  name: 'RequestItem',
  data() {
    return {
      category: '',
      reason: '',
    };
  },
  methods: {
    async submitRequest() {
      try {
        await api.requestItem({ category: this.category, reason: this.reason });
        alert('Request submitted successfully');
        this.category = '';
        this.reason = '';
      } catch (error) {
        console.error('Error submitting request:', error);
        alert('Failed to submit request');
      }
    },
  },
};
</script>

<style scoped>
/* Add any additional styles here */
</style>
