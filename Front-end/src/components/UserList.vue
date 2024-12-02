<template>
  <div class="mt-10">
    <h2 class="text-2xl font-bold">Users</h2>
    <ul class="mt-4">
      <li v-for="user in users" :key="user._id" class="p-4 border-b">
        {{ user.username }}
      </li>
    </ul>
  </div>
</template>

<script>
export default {
  data() {
    return {
      users: [],
    };
  },
  async created() {
    // Fetch users from the API
  },
};
</script>
