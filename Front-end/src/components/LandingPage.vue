<template>
  <div class="min-h-screen flex flex-col bg-gray-100">
    <!-- Navigation -->
    <nav class="bg-indigo-600">
      <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div class="flex items-center justify-between h-16">
          <div class="flex items-center">
            <a href="/" class="text-white font-bold text-xl hover:text-gray-200">
              Asset Management
            </a>
          </div>
          <!-- Desktop Menu -->
          <div class="hidden md:flex items-center space-x-4">
            <router-link
              to="/login"
              class="text-white hover:bg-indigo-500 px-3 py-2 rounded-md text-sm font-medium"
            >
              Login
            </router-link>
            <router-link
              to="/register"
              class="bg-white text-indigo-600 hover:bg-indigo-50 px-3 py-2 rounded-md text-sm font-medium"
            >
              Register
            </router-link>
          </div>
          <!-- Mobile Menu Button -->
          <div class="md:hidden">
            <button
              @click="toggleMenu"
              class="text-white focus:outline-none"
              aria-label="Toggle Menu"
            >
              <svg
                class="w-6 h-6"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  stroke-linecap="round"
                  stroke-linejoin="round"
                  stroke-width="2"
                  d="M4 6h16M4 12h16m-7 6h7"
                ></path>
              </svg>
            </button>
          </div>
        </div>
      </div>
      <!-- Mobile Menu -->
      <div
        v-if="isMenuOpen"
        class="md:hidden bg-indigo-600 px-4 py-3 space-y-1"
      >
        <router-link to="/login" class="block text-white hover:bg-indigo-500 px-3 py-2 rounded-md">
          Login
        </router-link>
        <router-link to="/register" class="block text-white hover:bg-indigo-500 px-3 py-2 rounded-md">
          Register
        </router-link>
      </div>
    </nav>

    <!-- Hero Section -->
    <div class="flex-grow bg-white">
      <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div class="text-center">
          <h1
            class="text-4xl tracking-tight font-extrabold text-gray-900 sm:text-5xl md:text-6xl"
          >
            <span class="block">Manage your assets</span>
            <span class="block text-indigo-600">
              efficiently and securely
            </span>
          </h1>
          <p
            class="mt-3 max-w-md mx-auto text-base text-gray-500 sm:text-lg md:mt-5 md:text-xl md:max-w-3xl"
          >
            Track, assign, and manage your organization's assets with our
            comprehensive asset management system.
          </p>
          <div class="mt-5 max-w-md mx-auto sm:flex sm:justify-center md:mt-8">
            <div class="rounded-md shadow">
              <router-link
                to="/register"
                class="w-full flex items-center justify-center px-8 py-3 border border-transparent text-base font-medium rounded-md text-white bg-indigo-600 hover:bg-indigo-700 md:py-4 md:text-lg md:px-10"
              >
                Get started
              </router-link>
            </div>
            <div class="mt-3 sm:mt-0 sm:ml-3">
              <router-link
                to="/login"
                class="w-full flex items-center justify-center px-8 py-3 border border-transparent text-base font-medium rounded-md text-indigo-600 bg-indigo-100 hover:bg-indigo-200 md:py-4 md:text-lg md:px-10"
              >
                Sign in
              </router-link>
            </div>
          </div>
        </div>
      </div>
    </div>

    <!-- Footer -->
    <footer class="bg-gray-800">
      <div
        class="max-w-7xl mx-auto py-6 px-4 sm:px-6 lg:px-8 text-center"
      >
        <p class="text-gray-400 text-sm">
          © 2024 Asset Management System. All rights reserved.
        </p>
      </div>
    </footer>
  </div>
</template>

<script>
export default {
  name: "LandingPage",
  data() {
    return {
      isMenuOpen: false,
    };
  },
  methods: {
    toggleMenu() {
      this.isMenuOpen = !this.isMenuOpen;
    },
  },
};
</script>

<style scoped>
/* Add any additional styles here */
</style>
