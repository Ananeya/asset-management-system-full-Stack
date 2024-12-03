<template>
  <div class="p-6 bg-white rounded-lg shadow-md">
    <h2 class="text-2xl font-bold mb-4">Assigned Items</h2>
    <ul>
      <li v-for="item in assignedItems" :key="item._id" class="p-4 border-b">
        {{ item.name }} - Assigned to: {{ item.assignedTo.username }}
      </li>
    </ul>
  </div>
</template>

<script>
import { ref, onMounted } from "vue";
import { api } from "../api";

export default {
  name: "AssignedItems",
  data() {
    return {
      assignedItems: [],
    };
  },
  async created() {
    await this.fetchAssignedItems();
  },
  methods: {
    async fetchAssignedItems() {
      try {
        const response = await api.getAssignedItems(); // Implement this API call
        this.assignedItems = response.data;
      } catch (error) {
        console.error("Error fetching assigned items:", error);
      }
    },
  },
};
</script>

<style scoped>
/* Add any additional styles here */
</style>
