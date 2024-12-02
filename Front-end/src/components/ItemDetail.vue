<template>
  <div class="mt-10">
    <h2 class="text-2xl font-bold">{{ item.name }}</h2>
    <p>{{ item.description }}</p>
    <button @click="assignItem" class="mt-4 p-2 text-white bg-indigo-600 rounded hover:bg-indigo-700">Assign Item</button>
  </div>
</template>

<script>
export default {
  data() {
    return {
      item: {},
    };
  },
  async created() {
    // Fetch item details from the API
  },
  methods: {
    async assignItem() {
      // Implement item assignment logic here
    },
  },
};
</script>
