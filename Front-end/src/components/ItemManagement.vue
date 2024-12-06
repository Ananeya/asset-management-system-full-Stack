<template>
  <div v-if="userRole === 'storekeeper' || userRole === 'employee'" class="p-6 bg-white rounded-lg shadow-md">
    <h2 class="text-2xl font-bold mb-4">Item Management</h2>

    <!-- Search Items -->
    <div class="mb-4">
      <input
        v-model="searchQuery"
        @keyup.enter="searchItems"
        type="text"
        placeholder="Search items by name or category"
        class="w-full p-2 border rounded"
      />
      <button @click="searchItems" class="mt-2 p-2 bg-indigo-600 text-white rounded hover:bg-indigo-700">
        Search
      </button>
    </div>

    <!-- Item List -->
    <ul class="mb-4">
      <li v-for="item in items" :key="item._id" class="p-4 border-b">
        <router-link :to="`/items/${item._id}`">{{ item.name }}</router-link>
        <button 
          v-if="userRole === 'storekeeper'" 
          @click="assignItem(item._id)" 
          class="ml-4 p-2 bg-green-600 text-white rounded hover:bg-green-700">
          Assign Item
        </button>
        <button @click="reassignItem(item._id)" class="ml-4 p-2 bg-yellow-600 text-white rounded hover:bg-yellow-700">
          Reassign Item
        </button>
      </li>
    </ul>

    <!-- Assign Item Modal -->
    <div v-if="isModalOpen" class="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50">
      <div class="bg-white p-6 rounded-lg shadow-md">
        <h3 class="text-xl font-bold mb-4">Assign Item</h3>
        <input
          v-model="userId"
          type="text"
          placeholder="User ID"
          class="w-full p-2 border rounded mb-4"
        />
        <button @click="confirmAssign" class="p-2 bg-indigo-600 text-white rounded hover:bg-indigo-700">
          Confirm Assignment
        </button>
        <button @click="isModalOpen = false" class="p-2 bg-red-600 text-white rounded hover:bg-red-700 ml-2">
          Cancel
        </button>
      </div>
    </div>

    <button @click="manageItem" class="mt-4 p-2 bg-indigo-600 text-white rounded hover:bg-indigo-700">
      Manage Item
    </button>
  </div>
  <div v-else>
    <p class="text-red-500">Access denied. You do not have permission to view this page.</p>
  </div>
</template>

<script>
import { ref } from 'vue';
import { api } from '../api'; // Adjust the import path as necessary

export default {
  name: 'ItemManagement',
  data() {
    return {
      searchQuery: '',
      items: [],
      isModalOpen: false,
      selectedItemId: null,
      userId: '',
      userRole: '', // Store user role
    };
  },
  created() {
    // Fetch user role from local storage or state management
    const user = JSON.parse(localStorage.getItem('user'));
    this.userRole = user ? user.role : ''; // Set user role
    this.searchItems(); // Fetch items on component creation
  },
  methods: {
    async searchItems() {
      try {
        if (!this.searchQuery.trim()) {
          const response = await api.fetchItems();
          this.items = response.data;
        } else {
          const response = await api.searchItems(this.searchQuery);
          this.items = response.data;
        }
      } catch (error) {
        console.error('Error searching items:', error);
      }
    },
    assignItem(itemId) {
      this.selectedItemId = itemId;
      this.isModalOpen = true;
    },
    async confirmAssign() {
      try {
        await api.assignItem(this.selectedItemId, this.userId); // Implement the API call
        this.isModalOpen = false;
        this.userId = ''; // Reset userId
        this.searchItems(); // Refresh the item list
      } catch (error) {
        console.error('Error assigning item:', error);
      }
    },
    async manageItem() {
      try {
        // Call the API to manage items
        const response = await api.fetchItems(); // Adjust the API call as needed
        console.log('Items fetched:', response.data);
        // Handle the response as needed (e.g., update state, show items)
      } catch (error) {
        console.error('Error managing items:', error);
      }
    },
    async reassignItem(itemId) {
      try {
        const newUserId = prompt("Enter new user ID for reassignment:");
        if (newUserId) {
          await api.reassignItem(itemId, newUserId);
          alert('Item reassigned successfully');
          this.searchItems(); // Refresh the item list
        }
      } catch (error) {
        console.error('Error reassigning item:', error);
      }
    },
  },
};
</script>

<style scoped>
/* Add any additional styles here */
</style>
