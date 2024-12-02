<template>
  <div class="max-w-md mx-auto mt-10">
    <h2 class="text-2xl font-bold text-center">Register</h2>
    <form @submit.prevent="register" class="mt-4">
      <input v-model="username" type="text" placeholder="Username" class="w-full p-2 border rounded" required />
      <input v-model="email" type="email" placeholder="Email" class="w-full p-2 border rounded mt-2" required />
      <input v-model="password" type="password" placeholder="Password" class="w-full p-2 border rounded mt-2" required />
      <input v-model="confirmPassword" type="password" placeholder="Confirm Password" class="w-full p-2 border rounded mt-2" required />
      <button type="submit" class="w-full p-2 mt-4 text-white bg-indigo-600 rounded hover:bg-indigo-700">Register</button>
    </form>
  </div>
</template>

<script>
export default {
  data() {
    return {
      username: '',
      email: '',
      password: '',
      confirmPassword: '',
    };
  },
  methods: {
    async register() {
      // Implement registration logic here
    },
  },
};
</script>
