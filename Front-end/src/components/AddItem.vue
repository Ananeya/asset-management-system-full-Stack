<template>
  <div class="min-h-screen bg-gray-100 flex flex-col justify-center py-12 sm:px-6 lg:px-8">
    <div class="sm:mx-auto sm:w-full sm:max-w-md">
      <h2 class="mt-6 text-center text-3xl font-extrabold text-gray-900">
        Add New Item
      </h2>
      <p class="mt-2 text-center text-sm text-gray-600">
        Add a new item to the inventory system
      </p>
    </div>

    <div class="mt-8 sm:mx-auto sm:w-full sm:max-w-md">
      <div class="bg-white py-8 px-4 shadow sm:rounded-lg sm:px-10">
        <form class="space-y-6" @submit.prevent="submitForm">
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
                v-model="itemCategory"
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

          <!-- Description -->
          <div>
            <label for="description" class="block text-sm font-medium text-gray-700">
              Description
            </label>
            <div class="mt-1">
              <textarea
                id="description"
                v-model="itemDescription"
                rows="4"
                class="appearance-none block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm placeholder-gray-400 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
                placeholder="Enter item description"
              ></textarea>
            </div>
          </div>

          <!-- Quantity -->
          <div>
            <label for="quantity" class="block text-sm font-medium text-gray-700">
              Initial Quantity
            </label>
            <div class="mt-1">
              <input
                id="quantity"
                v-model="quantity"
                type="number"
                min="1"
                required
                class="appearance-none block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm placeholder-gray-400 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
                placeholder="Enter quantity"
              >
            </div>
          </div>

          <!-- Status -->
          <div>
            <label for="status" class="block text-sm font-medium text-gray-700">
              Status
            </label>
            <div class="mt-1">
              <select
                id="status"
                v-model="status"
                required
                class="appearance-none block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm placeholder-gray-400 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
              >
                <option value="Available">Available</option>
                <option value="Reserved">Reserved</option>
                <option value="Maintenance">Maintenance</option>
              </select>
            </div>
          </div>

          <div class="flex items-center justify-between space-x-3">
            <button
              type="submit"
              class="w-full flex justify-center py-2 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
            >
              Add Item
            </button>
            <router-link
              to="/manage-items"
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
import { useRouter } from 'vue-router';
import { api } from '../api';

export default {
  name: 'AddItem',
  setup() {
    const router = useRouter();
    const itemName = ref('');
    const itemCategory = ref('');
    const itemDescription = ref('');
    const quantity = ref(1);
    const status = ref('Available');

    const submitForm = async () => {
      try {
        await api.addItem({
          name: itemName.value,
          category: itemCategory.value,
          description: itemDescription.value,
          quantity: quantity.value,
          status: status.value,
        });
        
        // Show success message
        const notification = document.createElement('div');
        notification.className = 'fixed top-4 right-4 bg-green-500 text-white px-6 py-3 rounded-md shadow-lg';
        notification.textContent = 'Item added successfully';
        document.body.appendChild(notification);
        
        // Remove notification after 3 seconds
        setTimeout(() => {
          notification.remove();
        }, 3000);

        // Navigate back to manage items
        router.push({ name: 'manage-items' });
      } catch (error) {
        console.error('Error adding item:', error);
        
        // Show error message
        const notification = document.createElement('div');
        notification.className = 'fixed top-4 right-4 bg-red-500 text-white px-6 py-3 rounded-md shadow-lg';
        notification.textContent = 'Failed to add item';
        document.body.appendChild(notification);
        
        // Remove notification after 3 seconds
        setTimeout(() => {
          notification.remove();
        }, 3000);
      }
    };

    return {
      itemName,
      itemCategory,
      itemDescription,
      quantity,
      status,
      submitForm,
    };
  },
};
</script>

<style scoped>
/* Add any additional styles here */
</style> 