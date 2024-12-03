<template>
  <div v-if="userRole === 'storekeeper'" class="p-6 bg-white rounded-lg shadow-md">
    <h2 class="text-2xl font-bold mb-4">Delete Item</h2>
    <input v-model="itemId" type="text" placeholder="Item ID" class="w-full p-2 border rounded mb-4" />
    <button @click="deleteItem" class="mt-4 p-2 bg-red-600 text-white rounded hover:bg-red-700">Delete Item</button>
  </div>
  <div v-else>
    <p class="text-red-500">Access denied. You do not have permission to view this page.</p>
  </div>
</template>

<script>
import { ref } from 'vue';
import { api } from '../api';

export default {
  name: 'DeleteItem',
  data() {
    return {
      itemId: '',
    };
  },
  methods: {
    async deleteItem() {
      try {
        await api.deleteItem(this.itemId);
        alert('Item deleted successfully');
      } catch (error) {
        console.error('Error deleting item:', error);
      }
    },
  },
};
</script>

<style scoped>
/* Add any additional styles here */
</style>
