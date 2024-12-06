<template>
  <div class="min-h-screen flex items-center justify-center bg-gray-100">
    <div class="max-w-md w-full space-y-8 p-8 bg-white rounded-lg shadow-md">
      <nav class="bg-indigo-600 p-4 rounded-md mb-6">
        <router-link to="/" class="text-white text-xl font-bold text-center block">
          Asset Management System
        </router-link>
      </nav>
      <div>
        <h2 class="text-2xl font-bold text-center">Create your account</h2>
        <p class="mt-2 text-center text-sm text-gray-600">
          Or 
          <router-link to="/login" class="font-medium text-indigo-600 hover:text-indigo-500">
            sign in to your existing account
          </router-link>
        </p>
      </div>
      
      <!-- Error Alert -->
      <div v-if="error" class="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded relative" role="alert">
        <span class="block sm:inline">{{ error }}</span>
      </div>

      <form @submit.prevent="register" class="mt-8 space-y-6">
        <div class="rounded-md shadow-sm space-y-4">
          <div>
            <label for="username" class="block text-sm font-medium text-gray-700">Username</label>
            <input id="username" v-model="username" type="text" required 
              class="appearance-none rounded-none relative block w-full px-3 py-2 border border-gray-300 placeholder-gray-500 text-gray-900 rounded-md focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 focus:z-10 sm:text-sm"
              placeholder="Username">
          </div>
          <div>
            <label for="email" class="block text-sm font-medium text-gray-700">Email address</label>
            <input id="email" v-model="email" type="email" required 
              class="appearance-none rounded-none relative block w-full px-3 py-2 border border-gray-300 placeholder-gray-500 text-gray-900 rounded-md focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 focus:z-10 sm:text-sm"
              placeholder="Email address">
          </div>
          <div>
            <label for="password" class="block text-sm font-medium text-gray-700">Password</label>
            <input id="password" v-model="password" type="password" required 
              class="appearance-none rounded-none relative block w-full px-3 py-2 border border-gray-300 placeholder-gray-500 text-gray-900 rounded-md focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 focus:z-10 sm:text-sm"
              placeholder="Password">
          </div>
          <div>
            <label for="confirmPassword" class="block text-sm font-medium text-gray-700">Confirm Password</label>
            <input id="confirmPassword" v-model="confirmPassword" type="password" required 
              class="appearance-none rounded-none relative block w-full px-3 py-2 border border-gray-300 placeholder-gray-500 text-gray-900 rounded-md focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 focus:z-10 sm:text-sm"
              placeholder="Confirm Password">
          </div>
          <div>
            <label for="role" class="block text-sm font-medium text-gray-700">Role</label>
            <select id="role" v-model="role" required
              class="appearance-none relative block w-full px-3 py-2 border border-gray-300 placeholder-gray-500 text-gray-900 rounded-md focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 focus:z-10 sm:text-sm">
              <option value="">Select Role</option>
              <option value="employee">Employee</option>
              <option value="storekeeper">Storekeeper</option>
            </select>
          </div>
        </div>

        <div>
          <button type="submit" 
            :disabled="isLoading"
            class="group relative w-full flex justify-center py-2 px-4 border border-transparent text-sm font-medium rounded-md text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500 disabled:bg-indigo-400">
            <span v-if="isLoading">Registering...</span>
            <span v-else>Register</span>
          </button>
        </div>
      </form>
    </div>
  </div>
</template>

<script>
import { api } from '../api';
import { useRouter } from 'vue-router';

export default {
  name: 'RegisterView',
  setup() {
    const router = useRouter();
    return { router };
  },
  data() {
    return {
      username: '',
      email: '',
      password: '',
      confirmPassword: '',
      role: '',
      error: null,
      isLoading: false
    };
  },
  methods: {
    async register() {
      // Reset error state
      this.error = null;

      // Validate passwords match
      if (this.password !== this.confirmPassword) {
        this.error = "Passwords do not match";
        return;
      }

      // Validate password length
      if (this.password.length < 6) {
        this.error = "Password must be at least 6 characters long";
        return;
      }

      // Validate email format
      const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
      if (!emailRegex.test(this.email)) {
        this.error = "Please enter a valid email address";
        return;
      }

      // Validate role selection
      if (!this.role) {
        this.error = "Please select a role";
        return;
      }

      try {
        this.isLoading = true;
        
        // Register the user
        const registerResponse = await api.register({
          username: this.username,
          email: this.email,
          password: this.password,
          confirmPassword: this.confirmPassword,
          role: this.role
        });

        // Automatically log in the user
        const loginResponse = await api.login(this.email, this.password);
        
        // Store auth data
        localStorage.setItem('authToken', loginResponse.data.token);
        localStorage.setItem('user', JSON.stringify(loginResponse.data.user));
        
        // Redirect to dashboard
        this.$router.push('/dashboard');
      } catch (error) {
        console.error('Registration error details:', error.response?.data);
        this.error = error.response?.data?.message || 'Registration failed. Please try again.';
      } finally {
        this.isLoading = false;
      }
    },
  },
};
</script>

<style scoped>
.disabled\:bg-indigo-400:disabled {
  background-color: #818cf8;
}
</style>