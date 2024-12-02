<template>
  <div class="mt-10">
    <h2 class="text-2xl font-bold">Dashboard</h2>
    <p>Total Items: {{ totalItems }}</p>
    <p>Available Items: {{ availableItems }}</p>
    <p>Pending Issues: {{ pendingIssues }}</p>
  </div>
</template>

<script>
export default {
  data() {
    return {
      totalItems: 0,
      availableItems: 0,
      pendingIssues: 0,
    };
  },
  async created() {
    // Fetch dashboard stats from the API
  },
};
</script>
