<!-- Front-end/src/components/EditItem.vue -->
<template>
  <div class="bg-gray-100 min-h-screen p-6 flex items-center justify-center">
    <div class="max-w-2xl w-full">
      <!-- Header Section -->
      <div class="bg-white rounded-t-lg shadow px-6 py-4">
        <div class="flex justify-between items-center">
          <h2 class="text-2xl font-bold text-gray-800">Edit Item</h2>
          <router-link 
            to="/manage-items"
            class="text-gray-600 hover:text-gray-800 flex items-center"
          >
            <span class="mr-2">←</span> Back to Items
          </router-link>
        </div>
      </div>

      <!-- Main Form Section -->
      <div class="bg-white rounded-b-lg shadow px-6 py-6">
        <form @submit.prevent="handleSubmit" class="space-y-6">
          <!-- Name Field -->
          <div class="form-group">
            <label class="block text-sm font-medium text-gray-700 mb-1">
              Item Name <span class="text-red-500">*</span>
            </label>
            <input
              v-model="formData.name"
              type="text"
              required
              class="form-input"
              placeholder="Enter item name"
            />
          </div>

          <!-- Category Field -->
          <div class="form-group">
            <label class="block text-sm font-medium text-gray-700 mb-1">
              Category <span class="text-red-500">*</span>
            </label>
            <select
              v-model="formData.category"
              required
              class="form-select"
            >
              <option value="">Select a category</option>
              <option value="Laptop">Laptop</option>
              <option value="Desktop">Desktop</option>
              <option value="Monitor">Monitor</option>
              <option value="Printer">Printer</option>
              <option value="Phone">Phone</option>
              <option value="Tablet">Tablet</option>
              <option value="Accessories">Accessories</option>
              <option value="Other">Other</option>
            </select>
          </div>

          <!-- Description Field -->
          <div class="form-group">
            <label class="block text-sm font-medium text-gray-700 mb-1">
              Description
            </label>
            <textarea
              v-model="formData.description"
              rows="4"
              class="form-textarea"
              placeholder="Enter item description"
            ></textarea>
          </div>

          <!-- Availability Field -->
          <div class="form-group">
            <label class="block text-sm font-medium text-gray-700 mb-2">
              Availability Status
            </label>
            <div class="flex space-x-4">
              <label class="inline-flex items-center">
                <input
                  type="radio"
                  v-model="formData.availability"
                  :value="true"
                  class="form-radio"
                />
                <span class="ml-2 text-sm text-gray-700">Available</span>
              </label>
              <label class="inline-flex items-center">
                <input
                  type="radio"
                  v-model="formData.availability"
                  :value="false"
                  class="form-radio"
                />
                <span class="ml-2 text-sm text-gray-700">Not Available</span>
              </label>
            </div>
          </div>

          <!-- Action Buttons -->
          <div class="flex justify-end space-x-3 pt-6 border-t">
            <button
              type="button"
              @click="$router.push('/manage-items')"
              class="px-4 py-2 border border-gray-300 rounded-md text-sm font-medium text-gray-700 bg-white hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
            >
              Cancel
            </button>
            <button
              type="submit"
              :disabled="!isFormValid"
              class="px-4 py-2 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500 disabled:bg-indigo-300 disabled:cursor-not-allowed"
            >
              Save Changes
            </button>
          </div>
        </form>
      </div>
    </div>
  </div>
</template>

<script>
import { ref, computed, onMounted } from 'vue';
import { useRoute, useRouter } from 'vue-router';
import { api } from '../api';

export default {
  name: 'EditItem',
  setup() {
    const route = useRoute();
    const router = useRouter();
    
    const formData = ref({
      name: '',
      category: '',
      description: '',
      availability: true
    });

    const isFormValid = computed(() => {
      return formData.value.name && formData.value.category;
    });

    // Fetch item data when component mounts
    onMounted(async () => {
      try {
        const response = await api.fetchItem(route.params.id);
        formData.value = {
          name: response.data.name,
          category: response.data.category,
          description: response.data.description || '',
          availability: response.data.availability
        };
      } catch (error) {
        console.error('Error fetching item:', error);
      }
    });

    const handleSubmit = async () => {
      try {
        await api.updateItem(route.params.id, formData.value);
        router.push('/manage-items');
      } catch (error) {
        console.error('Error updating item:', error);
      }
    };

    return {
      formData,
      isFormValid,
      handleSubmit
    };
  }
};
</script>

<style scoped>
.form-group {
  @apply space-y-1;
}

.form-input,
.form-select,
.form-textarea {
  @apply block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm transition duration-150 ease-in-out;
}

.form-radio {
  @apply h-4 w-4 text-indigo-600 border-gray-300 focus:ring-indigo-500;
}
</style>