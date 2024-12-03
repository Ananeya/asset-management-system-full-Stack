<template>
  <div class="min-h-screen bg-gray-100 flex flex-col py-12 sm:px-6 lg:px-8">
    <div class="sm:mx-auto sm:w-full sm:max-w-4xl">
      <h2 class="text-center text-3xl font-extrabold text-gray-900">
        My Assigned Items
      </h2>
      <p class="mt-2 text-center text-sm text-gray-600">
        View and manage your currently assigned items
      </p>
    </div>

    <div class="mt-8 sm:mx-auto sm:w-full sm:max-w-4xl">
      <!-- Search and Filter -->
      <div class="bg-white shadow rounded-lg mb-6 p-4">
        <div class="flex flex-col md:flex-row gap-4">
          <div class="flex-1">
            <input
              v-model="searchQuery"
              type="text"
              placeholder="Search items..."
              class="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
            >
          </div>
          <div class="w-full md:w-48">
            <select
              v-model="categoryFilter"
              class="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
            >
              <option value="">All Categories</option>
              <option v-for="category in categories" :key="category" :value="category">
                {{ category }}
              </option>
            </select>
          </div>
        </div>
      </div>

      <!-- Items List -->
      <div class="bg-white shadow rounded-lg overflow-hidden">
        <div v-if="loading" class="p-8 text-center">
          <div class="animate-spin rounded-full h-12 w-12 border-b-2 border-indigo-600 mx-auto"></div>
          <p class="mt-4 text-gray-600">Loading items...</p>
        </div>

        <div v-else-if="filteredItems.length === 0" class="p-8 text-center">
          <div class="text-gray-500">
            <svg class="mx-auto h-12 w-12" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M20 13V6a2 2 0 00-2-2H6a2 2 0 00-2 2v7m16 0v5a2 2 0 01-2 2H6a2 2 0 01-2-2v-5m16 0h-2.586a1 1 0 00-.707.293l-2.414 2.414a1 1 0 01-.707.293h-3.172a1 1 0 01-.707-.293l-2.414-2.414A1 1 0 006.586 13H4" />
            </svg>
            <p class="mt-4">No items found</p>
          </div>
        </div>

        <div v-else>
          <ul class="divide-y divide-gray-200">
            <li v-for="item in filteredItems" :key="item._id" class="hover:bg-gray-50">
              <div class="px-6 py-4">
                <div class="flex items-center justify-between">
                  <div class="flex-1">
                    <h3 class="text-lg font-medium text-gray-900">{{ item.name }}</h3>
                    <div class="mt-1 flex items-center text-sm text-gray-500">
                      <span class="mr-4">Category: {{ item.category }}</span>
                      <span class="mr-4">ID: {{ item._id }}</span>
                      <span :class="{
                        'px-2 py-1 rounded-full text-xs font-medium': true,
                        'bg-green-100 text-green-800': item.status === 'Good',
                        'bg-yellow-100 text-yellow-800': item.status === 'Fair',
                        'bg-red-100 text-red-800': item.status === 'Poor'
                      }">
                        {{ item.status }}
                      </span>
                    </div>
                  </div>
                  <div class="flex items-center space-x-3">
                    <button
                      @click="reportIssue(item)"
                      class="inline-flex items-center px-3 py-1 border border-transparent text-sm font-medium rounded-md text-white bg-yellow-600 hover:bg-yellow-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-yellow-500"
                    >
                      Report Issue
                    </button>
                    <button
                      @click="returnItem(item)"
                      class="inline-flex items-center px-3 py-1 border border-transparent text-sm font-medium rounded-md text-white bg-red-600 hover:bg-red-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-red-500"
                    >
                      Return Item
                    </button>
                  </div>
                </div>
                <p v-if="item.description" class="mt-2 text-sm text-gray-500">
                  {{ item.description }}
                </p>
              </div>
            </li>
          </ul>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { ref, computed, onMounted } from 'vue';
import { useRouter } from 'vue-router';
import { api } from '../api';

export default {
  name: 'AssignedItems',
  setup() {
    const router = useRouter();
    const assignedItems = ref([]);
    const loading = ref(true);
    const searchQuery = ref('');
    const categoryFilter = ref('');
    const categories = ['Electronics', 'Furniture', 'Stationery', 'IT Equipment', 'Office Supplies'];

    const filteredItems = computed(() => {
      return assignedItems.value.filter(item => {
        const matchesSearch = item.name.toLowerCase().includes(searchQuery.value.toLowerCase()) ||
                            item.description?.toLowerCase().includes(searchQuery.value.toLowerCase());
        const matchesCategory = !categoryFilter.value || item.category === categoryFilter.value;
        return matchesSearch && matchesCategory;
      });
    });

    const fetchAssignedItems = async () => {
      try {
        loading.value = true;
        const response = await api.getAssignedItems();
        assignedItems.value = response.data;
      } catch (error) {
        console.error('Error fetching assigned items:', error);
        // Show error notification
        const notification = document.createElement('div');
        notification.className = 'fixed top-4 right-4 bg-red-500 text-white px-6 py-3 rounded-md shadow-lg';
        notification.textContent = 'Failed to fetch assigned items';
        document.body.appendChild(notification);
        setTimeout(() => notification.remove(), 3000);
      } finally {
        loading.value = false;
      }
    };

    const reportIssue = (item) => {
      router.push({ 
        name: 'report-issue',
        params: { itemId: item._id }
      });
    };

    const returnItem = async (item) => {
      try {
        await api.returnItem(item._id);
        await fetchAssignedItems(); // Refresh the list
        // Show success notification
        const notification = document.createElement('div');
        notification.className = 'fixed top-4 right-4 bg-green-500 text-white px-6 py-3 rounded-md shadow-lg';
        notification.textContent = 'Item returned successfully';
        document.body.appendChild(notification);
        setTimeout(() => notification.remove(), 3000);
      } catch (error) {
        console.error('Error returning item:', error);
        // Show error notification
        const notification = document.createElement('div');
        notification.className = 'fixed top-4 right-4 bg-red-500 text-white px-6 py-3 rounded-md shadow-lg';
        notification.textContent = 'Failed to return item';
        document.body.appendChild(notification);
        setTimeout(() => notification.remove(), 3000);
      }
    };

    onMounted(fetchAssignedItems);

    return {
      assignedItems,
      loading,
      searchQuery,
      categoryFilter,
      categories,
      filteredItems,
      reportIssue,
      returnItem,
    };
  },
};
</script>

<style scoped>
/* Add any additional styles here */
</style>
