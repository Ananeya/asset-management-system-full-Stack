<template>
  <div class="max-w-md mx-auto mt-10">
    <h2 class="text-2xl font-bold text-center">Login</h2>
    <form @submit.prevent="login" class="mt-4">
      <input v-model="email" type="email" placeholder="Email" class="w-full p-2 border rounded" required />
      <input v-model="password" type="password" placeholder="Password" class="w-full p-2 border rounded mt-2" required />
      <button type="submit" class="w-full p-2 mt-4 text-white bg-indigo-600 rounded hover:bg-indigo-700">Login</button>
    </form>
  </div>
</template>

<script>
export default {
  data() {
    return {
      email: '',
      password: '',
    };
  },
  methods: {
    async login() {
      // Implement login logic here
    },
  },
};
</script>
