<template>
  <div class="bg-gray-100 min-h-screen p-6">
    <div class="max-w-2xl mx-auto bg-white rounded-lg shadow p-6">
      <h2 class="text-2xl font-bold mb-6">Edit Item</h2>
      
      <form @submit.prevent="handleSubmit" class="space-y-4">
        <div>
          <label class="block text-sm font-medium text-gray-700">Name</label>
          <input
            v-model="itemData.name"
            type="text"
            class="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500"
            required
          />
        </div>

        <div>
          <label class="block text-sm font-medium text-gray-700">Category</label>
          <input
            v-model="itemData.category"
            type="text"
            class="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500"
            required
          />
        </div>

        <div>
          <label class="block text-sm font-medium text-gray-700">Description</label>
          <textarea
            v-model="itemData.description"
            class="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500"
          ></textarea>
        </div>

        <div>
          <label class="block text-sm font-medium text-gray-700">Availability</label>
          <select
            v-model="itemData.availability"
            class="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500"
          >
            <option :value="true">Available</option>
            <option :value="false">Not Available</option>
          </select>
        </div>

        <div class="flex justify-end space-x-3">
          <button
            type="button"
            @click="$router.push('/manage-items')"
            class="px-4 py-2 border border-gray-300 rounded-md text-sm font-medium text-gray-700 hover:bg-gray-50"
          >
            Cancel
          </button>
          <button
            type="submit"
            class="px-4 py-2 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-indigo-600 hover:bg-indigo-700"
          >
            Save Changes
          </button>
        </div>
      </form>
    </div>
  </div>
</template>

<script>
import { ref, onMounted } from 'vue';
import { useRoute, useRouter } from 'vue-router';
import { api } from '../api';

export default {
  name: 'EditItem',
  setup() {
    const route = useRoute();
    const router = useRouter();
    const itemData = ref({
      name: '',
      category: '',
      description: '',
      availability: true
    });

    onMounted(() => {
      // Get item data from route state or fetch from API
      if (route.state?.item) {
        itemData.value = { ...route.state.item };
      } else {
        fetchItem();
      }
    });

    const fetchItem = async () => {
      try {
        const response = await api.fetchItem(route.params.id);
        itemData.value = response.data;
      } catch (error) {
        console.error('Error fetching item:', error);
      }
    };

    const handleSubmit = async () => {
      try {
        await api.updateItem(route.params.id, itemData.value);
        router.push('/manage-items');
      } catch (error) {
        console.error('Error updating item:', error);
      }
    };

    return {
      itemData,
      handleSubmit
    };
  }
};
</script>
