<template>
  <div class="mt-10">
    <h2 class="text-2xl font-bold">Dashboard</h2>
    <p>Total Items: {{ totalItems }}</p>
    <p>Available Items: {{ availableItems }}</p>
    <p>Pending Issues: {{ pendingIssues }}</p>
  </div>
</template>

<script>
import { api } from '../api';

export default {
  data() {
    return {
      totalItems: 0,
      availableItems: 0,
      pendingIssues: 0,
    };
  },
  async created() {
    try {
      const response = await api.fetchDashboardData();
      this.totalItems = response.data.totalItems;
      this.availableItems = response.data.availableItems;
      this.pendingIssues = response.data.pendingIssues;
    } catch (error) {
      console.error('Error fetching dashboard data:', error);
    }
  },
};
</script>
