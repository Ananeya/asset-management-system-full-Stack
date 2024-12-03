<template>
  <div class="max-w-md mx-auto mt-10">
    <h2 class="text-2xl font-bold text-center">Login</h2>
    <form @submit.prevent="login" class="mt-4">
      <input v-model="credentials.username" type="text" placeholder="Username" class="w-full p-2 border rounded mb-4" required />
      <input v-model="credentials.password" type="password" placeholder="Password" class="w-full p-2 border rounded mb-4" required />
      <button type="submit" class="w-full p-2 bg-indigo-600 text-white rounded hover:bg-indigo-700">Login</button>
    </form>
  </div>
</template>

<script>
import { ref } from 'vue';
import { api } from '../api'; // Ensure this path is correct

export default {
  name: 'LoginForm',
  data() {
    return {
      credentials: {
        username: '',
        password: '',
      },
    };
  },
  methods: {
    async login() {
      try {
        const response = await api.login(this.credentials); // Call the login API
        localStorage.setItem('authToken', response.token); // Store the token
        localStorage.setItem('user', JSON.stringify(response.user)); // Store user data
        this.$router.push({ name: 'item-management' }); // Redirect to item management
      } catch (error) {
        console.error('Login failed:', error);
        alert('Login failed. Please check your credentials and try again.');
      }
    },
  },
};
</script>

<style scoped>
/* Add any additional styles here */
</style>
