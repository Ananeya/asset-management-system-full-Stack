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
      <div class="bg-white shadow rounded-lg p-6">
        <h2 class="text-lg font-medium text-gray-900 mb-4">Add New Item</h2>
        <form @submit.prevent="submitForm">
          <div class="space-y-4">
            <div>
              <label class="block text-sm font-medium text-gray-700">Name</label>
              <input v-model="itemName" type="text" required
                class="mt-1 block w-full shadow-sm focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm border-gray-300 rounded-md">
            </div>
            <div>
              <label class="block text-sm font-medium text-gray-700">Category</label>
              <input v-model="itemCategory" type="text" required
                class="mt-1 block w-full shadow-sm focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm border-gray-300 rounded-md">
            </div>
            <div>
              <label class="block text-sm font-medium text-gray-700">Description</label>
              <textarea v-model="itemDescription"
                class="mt-1 block w-full shadow-sm focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm border-gray-300 rounded-md"></textarea>
            </div>
          </div>
          <div class="mt-5 sm:mt-6 space-x-3">
            <button type="submit"
              class="inline-flex justify-center w-full sm:w-auto px-4 py-2 text-sm font-medium text-white bg-indigo-600 hover:bg-indigo-700 rounded-md">
              Save
            </button>
            <router-link to="/manage-items" class="inline-flex justify-center w-full sm:w-auto px-4 py-2 text-sm font-medium text-gray-700 bg-gray-100 hover:bg-gray-200 rounded-md">
              Cancel
            </router-link>
          </div>
        </form>
      </div>
    </main>
  </div>
</template>

<script>
import { ref } from 'vue';
import { api } from '../api';

export default {
  name: 'AddItem',
  setup() {
    const itemName = ref('');
    const itemCategory = ref('');
    const itemDescription = ref('');

    const submitForm = async () => {
      try {
        await api.addItem({
          name: itemName.value,
          category: itemCategory.value,
          description: itemDescription.value,
        });
        alert('Item added successfully');
        this.$router.push({ name: 'manage-items' });
      } catch (error) {
        console.error('Error adding item:', error);
        alert('Failed to add item');
      }
    };

    return {
      itemName,
      itemCategory,
      itemDescription,
      submitForm,
    };
  },
};
</script>

<style scoped>
/* Add any additional styles here */
</style> 