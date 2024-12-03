<template>
  <div v-if="userRole === 'storekeeper'" class="p-6 bg-white rounded-lg shadow-md">
    <h2 class="text-2xl font-bold mb-4">Update Item</h2>
    <input v-model="itemId" type="text" placeholder="Item ID" class="w-full p-2 border rounded mb-4" />
    <input v-model="name" type="text" placeholder="Item Name" class="w-full p-2 border rounded mb-4" />
    <input v-model="category" type="text" placeholder="Category" class="w-full p-2 border rounded mb-4" />
    <input v-model="availability" type="checkbox" class="mr-2" /> Available
    <button @click="updateItem" class="mt-4 p-2 bg-indigo-600 text-white rounded hover:bg-indigo-700">Update Item</button>
  </div>
  <div v-else>
    <p class="text-red-500">Access denied. You do not have permission to view this page.</p>
  </div>
</template>

<script>
import { ref } from 'vue';
import { api } from '../api';

export default {
  name: 'UpdateItem',
  data() {
    return {
      itemId: '',
      name: '',
      category: '',
      availability: false,
    };
  },
  methods: {
    async updateItem() {
      try {
        await api.updateItem({ id: this.itemId, name: this.name, category: this.category, availability: this.availability });
        alert('Item updated successfully');
      } catch (error) {
        console.error('Error updating item:', error);
      }
    },
  },
};
</script>

<style scoped>
/* Add any additional styles here */
</style>
