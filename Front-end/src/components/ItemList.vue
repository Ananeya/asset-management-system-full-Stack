<template>
  <div class="mt-10">
    <h2 class="text-2xl font-bold">Items</h2>
    <ul class="mt-4">
      <li v-for="item in items" :key="item._id" class="p-4 border-b">
        <router-link :to="`/items/${item._id}`">{{ item.name }}</router-link>
      </li>
    </ul>
  </div>
</template>

<script>
export default {
  data() {
    return {
      items: [],
    };
  },
  async created() {
    // Fetch items from the API
  },
};
</script>
