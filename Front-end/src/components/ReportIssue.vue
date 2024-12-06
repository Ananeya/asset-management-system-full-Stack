<template>
  <div class="min-h-screen bg-gray-100 flex flex-col justify-center py-12 sm:px-6 lg:px-8">
    <div class="sm:mx-auto sm:w-full sm:max-w-md">
      <h2 class="mt-6 text-center text-3xl font-extrabold text-gray-900">
        Report an Issue
      </h2>
      <p class="mt-2 text-center text-sm text-gray-600">
        Report any problems with your assigned items
      </p>
    </div>

    <div class="mt-8 sm:mx-auto sm:w-full sm:max-w-md">
      <div class="bg-white py-8 px-4 shadow sm:rounded-lg sm:px-10">
        <form class="space-y-6" @submit.prevent="submitIssue">
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
                placeholder="Enter item name"
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
                <option value="IT Equipment">IT Equipment</option>
                <option value="Office Supplies">Office Supplies</option>
              </select>
            </div>
          </div>

          <!-- Issue Type -->
          <div>
            <label for="issueType" class="block text-sm font-medium text-gray-700">
              Issue Type
            </label>
            <div class="mt-1">
              <select
                id="issueType"
                v-model="issueType"
                required
                class="appearance-none block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm placeholder-gray-400 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
              >
                <option value="">Select issue type</option>
                <option value="Damaged">Damaged</option>
                <option value="Malfunction">Malfunction</option>
                <option value="Missing Parts">Missing Parts</option>
                <option value="Software Issue">Software Issue</option>
                <option value="Other">Other</option>
              </select>
            </div>
          </div>

          <!-- Priority Level -->
          <div>
            <label for="priority" class="block text-sm font-medium text-gray-700">
              Priority Level
            </label>
            <div class="mt-1">
              <select
                id="priority"
                v-model="priority"
                required
                class="appearance-none block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm placeholder-gray-400 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
              >
                <option value="Low">Low</option>
                <option value="Medium">Medium</option>
                <option value="High">High</option>
                <option value="Critical">Critical</option>
              </select>
            </div>
          </div>

          <!-- Issue Description -->
          <div>
            <label for="description" class="block text-sm font-medium text-gray-700">
              Description
            </label>
            <div class="mt-1">
              <textarea
                id="description"
                v-model="description"
                rows="4"
                required
                class="appearance-none block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm placeholder-gray-400 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
                placeholder="Please describe the issue in detail..."
              ></textarea>
            </div>
          </div>

          <!-- Buttons -->
          <div class="flex items-center justify-between space-x-3">
            <button
              type="submit"
              class="w-full flex justify-center py-2 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
            >
              Submit Report
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
import { ref, onMounted } from 'vue';
import { useRouter, useRoute } from 'vue-router';
import { api } from '../api';

export default {
  name: 'ReportIssue',
  setup() {
    const router = useRouter();
    const route = useRoute();
    const itemName = ref('');
    const category = ref('');
    const issueType = ref('');
    const priority = ref('Low');
    const description = ref('');

    const showNotification = (message, type = 'success') => {
      const notification = document.createElement('div');
      notification.className = `fixed top-4 right-4 px-6 py-3 rounded-md shadow-lg text-white ${
        type === 'success' ? 'bg-green-500' : 'bg-red-500'
      }`;
      notification.textContent = message;
      document.body.appendChild(notification);
      setTimeout(() => notification.remove(), 3000);
    };

    const submitIssue = async () => {
      try {
        const issueData = {
          issueType: issueType.value,
          description: description.value,
          priority: priority.value
        };
        
        await api.reportIssue(route.params.itemId, issueData);
        showNotification('Issue reported successfully');
        router.push('/dashboard');
      } catch (error) {
        console.error('Error reporting issue:', error);
        showNotification('Failed to report issue', 'error');
      }
    };

    return {
      itemName,
      category,
      issueType,
      priority,
      description,
      submitIssue,
    };
  },
};
</script>

<style scoped>
/* Add any additional styles here */
</style>
