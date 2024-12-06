<template>
  <div class="min-h-screen bg-gray-100 flex flex-col justify-center py-12 sm:px-6 lg:px-8">
    <div class="sm:mx-auto sm:w-full sm:max-w-md">
      <h2 class="mt-6 text-center text-3xl font-extrabold text-gray-900">
        Request New Item
      </h2>
    </div>

    <div class="mt-8 sm:mx-auto sm:w-full sm:max-w-md">
      <div class="bg-white py-8 px-4 shadow sm:rounded-lg sm:px-10">
        <form class="space-y-6" @submit.prevent="submitRequest">
          <!-- Item Name -->
          <div>
            <label for="itemName" class="block text-sm font-medium text-gray-700">
              Item Name
            </label>
            <div class="mt-1">
              <input
                id="itemName"
                v-model="itemName"
                type="text"
                required
                class="appearance-none block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm placeholder-gray-400 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
              >
            </div>
          </div>

          <!-- Category -->
          <div>
            <label for="category" class="block text-sm font-medium text-gray-700">
              Category
            </label>
            <div class="mt-1">
              <select
                id="category"
                v-model="category"
                required
                class="appearance-none block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm placeholder-gray-400 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
              >
                <option value="">Select a category</option>
                <option value="Electronics">Electronics</option>
                <option value="Furniture">Furniture</option>
                <option value="Stationery">Stationery</option>
                <!-- Add more categories as needed -->
              </select>
            </div>
          </div>

          <!-- Reason -->
          <div>
            <label for="reason" class="block text-sm font-medium text-gray-700">
              Reason for Request
            </label>
            <div class="mt-1">
              <textarea
                id="reason"
                v-model="reason"
                rows="3"
                required
                class="appearance-none block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm placeholder-gray-400 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
              ></textarea>
            </div>
          </div>

          <!-- Urgency Level -->
          <div>
            <label for="urgency" class="block text-sm font-medium text-gray-700">
              Urgency Level
            </label>
            <div class="mt-1">
              <select
                id="urgency"
                v-model="urgency"
                required
                class="appearance-none block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm placeholder-gray-400 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
              >
                <option value="Low">Low</option>
                <option value="Medium">Medium</option>
                <option value="High">High</option>
              </select>
            </div>
          </div>

          <div class="flex items-center justify-between space-x-3">
            <button
              type="submit"
              class="w-full flex justify-center py-2 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
            >
              Submit Request
            </button>
            <router-link
              to="/dashboard"
              class="w-full flex justify-center py-2 px-4 border border-gray-300 rounded-md shadow-sm text-sm font-medium text-gray-700 bg-white hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
            >
              Cancel
            </router-link>
          </div>
        </form>
      </div>
    </div>
  </div>
</template>

<script>
import { ref } from 'vue';
import { api } from '../api';
import { useRouter } from 'vue-router';

export default {
  name: 'RequestItem',
  setup() {
    const router = useRouter();
    const itemName = ref('');
    const category = ref('');
    const reason = ref('');
    const urgency = ref('Low');

    const submitRequest = async () => {
      try {
        const requestData = {
          category: category.value,
          reason: reason.value
        };
        
        await api.requestItem(requestData);
        alert('Request submitted successfully');
        router.push('/dashboard');
      } catch (error) {
        console.error('Error submitting request:', error);
        alert('Failed to submit request');
      }
    };

    return {
      itemName,
      category,
      reason,
      urgency,
      submitRequest,
    };
  },
};
</script>

<style scoped>
/* Add any additional styles here */
</style>
