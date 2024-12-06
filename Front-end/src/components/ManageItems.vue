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
                <tr v-for="item in filteredItems" :key="item._id" class="hover:bg-gray-50">
                  <td class="px-6 py-4 whitespace-nowrap">{{ item.name }}</td>
                  <td class="px-6 py-4 whitespace-nowrap">{{ item.category }}</td>
                  <td class="px-6 py-4 whitespace-nowrap">
                    <span :class="{
                      'px-2 py-1 rounded-full text-xs font-medium': true,
                      'bg-green-100 text-green-800': item.availability,
                      'bg-red-100 text-red-800': !item.availability
                    }">
                      {{ item.availability ? 'Available' : 'Assigned' }}
                    </span>
                  </td>
                  <td class="px-6 py-4 whitespace-nowrap">
                    <span v-if="item.assignedTo">{{ item.assignedTo.username }}</span>
                    <span v-else class="text-gray-400">N/A</span>
                  </td>
                  <td class="px-6 py-4 whitespace-nowrap text-sm">
                    <button 
                      @click="editItem(item)" 
                      class="px-2 py-1 rounded-full text-xs font-medium bg-blue-100 text-blue-800 hover:bg-blue-200 mr-2">
                      Edit
                    </button>
                    <button 
                      @click="assignItem(item)" 
                      class="px-2 py-1 rounded-full text-xs font-medium bg-green-100 text-green-800 hover:bg-green-200 mr-2">
                      Assign
                    </button>
                    <button 
                      @click="deleteItem(item._id)"
                      class="px-2 py-1 rounded-full text-xs font-medium bg-red-100 text-red-800 hover:bg-red-200">
                      Delete
                    </button>
                  </td>
                </tr>
                <tr v-if="filteredItems.length === 0">
                  <td colspan="5" class="px-6 py-4 text-center text-gray-500">
                    No items found
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
      // Logic to navigate to the edit item page or open a modal
      console.log('Edit item:', item);
      // Example: this.$router.push({ name: 'edit-item', params: { id: item._id } });
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
  methods: {
    async assignItem(item) {
      try {
        // You can implement your assignment logic here
        // For example, open a modal to select a user
        console.log('Assigning item:', item);
        // Example: this.$router.push({ name: 'assign-item', params: { id: item._id } });
      } catch (error) {
        console.error('Error assigning item:', error);
      }
    },
  },
};
</script>

<style scoped>
/* Add any additional styles here */
</style>
