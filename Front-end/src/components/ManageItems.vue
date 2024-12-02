<template>
  <div class="bg-gray-100 min-h-screen">
    <!-- Navigation -->
    <nav class="bg-indigo-600">
      <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div class="flex items-center justify-between h-16">
          <router-link to="/" class="text-white font-bold text-xl hover:text-gray-200">
            Asset Management System
          </router-link>
          <button @click="logout" class="text-white hover:text-gray-200 p-3">
            Logout
          </button>
        </div>
      </div>
    </nav>

    <!-- Main Content -->
    <main class="max-w-7xl mx-auto py-6 sm:px-6 lg:px-8">
      <!-- Search and Filter Section -->
      <div class="bg-white shadow rounded-lg mb-6">
        <div class="px-4 py-5 sm:p-6">
          <div class="grid grid-cols-1 md:grid-cols-3 gap-4">
            <div>
              <input v-model="searchQuery" type="text" placeholder="Search items..."
                class="shadow-sm focus:ring-indigo-500 focus:border-indigo-500 block w-full sm:text-sm border-gray-300 rounded-md">
            </div>
            <div>
              <select v-model="selectedCategory" class="shadow-sm focus:ring-indigo-500 focus:border-indigo-500 block w-full sm:text-sm border-gray-300 rounded-md">
                <option value="">All Categories</option>
                <option v-for="category in categories" :key="category" :value="category">{{ category }}</option>
              </select>
            </div>
            <div>
              <select v-model="selectedAvailability" class="shadow-sm focus:ring-indigo-500 focus:border-indigo-500 block w-full sm:text-sm border-gray-300 rounded-md">
                <option value="">All Status</option>
                <option value="true">Available</option>
                <option value="false">Assigned</option>
              </select>
            </div>
          </div>
        </div>
      </div>

      <!-- Items List -->
      <div class="bg-white shadow rounded-lg">
        <div class="px-4 py-5 sm:p-6">
          <div class="flex justify-between items-center mb-4">
            <h2 class="text-lg font-medium text-gray-900">Items</h2>
            <router-link 
              :to="{ name: 'add-item' }" 
              class="inline-flex items-center px-4 py-2 border border-transparent text-sm font-medium rounded-md text-white bg-indigo-600 hover:bg-indigo-700">
              Add New Item
            </router-link>
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
              <tbody class="bg-white divide-y divide-gray-200">
                <tr v-for="item in filteredItems" :key="item._id">
                  <td class="px-6 py-4 whitespace-nowrap">{{ item.name }}</td>
                  <td class="px-6 py-4 whitespace-nowrap">{{ item.category }}</td>
                  <td class="px-6 py-4 whitespace-nowrap">{{ item.availability ? 'Available' : 'Assigned' }}</td>
                  <td class="px-6 py-4 whitespace-nowrap">{{ item.assignedTo ? item.assignedTo.username : 'N/A' }}</td>
                  <td class="px-6 py-4 whitespace-nowrap">
                    <button @click="editItem(item)" class="text-indigo-600 hover:text-indigo-900">Edit</button>
                    <button @click="deleteItem(item._id)" class="text-red-600 hover:text-red-900 ml-4">Delete</button>
                  </td>
                </tr>
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </main>
  </div>
</template>

<script>
import { ref, computed } from 'vue';
import { api } from '../api';

export default {
  name: 'ManageItems',
  setup() {
    const items = ref([]);
    const searchQuery = ref('');
    const selectedCategory = ref('');
    const selectedAvailability = ref('');
    const categories = ref(['Electronics', 'Furniture', 'Stationery']); // Example categories

    const filteredItems = computed(() => {
      return items.value.filter(item => {
        return (
          (searchQuery.value === '' || item.name.toLowerCase().includes(searchQuery.value.toLowerCase())) &&
          (selectedCategory.value === '' || item.category === selectedCategory.value) &&
          (selectedAvailability.value === '' || item.availability.toString() === selectedAvailability.value)
        );
      });
    });

    const fetchItems = async () => {
      try {
        const response = await api.fetchItems();
        items.value = response.data;
      } catch (error) {
        console.error('Error fetching items:', error);
      }
    };

    const addItem = () => {
      // Logic to add a new item
    };

    const editItem = (item) => {
      // Logic to edit an item
    };

    const deleteItem = async (itemId) => {
      try {
        await api.deleteItem(itemId);
        fetchItems(); // Refresh the list after deletion
      } catch (error) {
        console.error('Error deleting item:', error);
      }
    };

    const navigateToAddItem = () => {
      this.$router.push({ name: 'add-item' });
    };

    fetchItems();

    return {
      items,
      searchQuery,
      selectedCategory,
      selectedAvailability,
      categories,
      filteredItems,
      addItem,
      editItem,
      deleteItem,
      navigateToAddItem,
    };
  },
};
</script>

<style scoped>
/* Add any additional styles here */
</style>
