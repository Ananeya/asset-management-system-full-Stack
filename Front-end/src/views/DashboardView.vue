<template>
  <div class="bg-gray-100 min-h-screen">
    <!-- Navigation -->
    <nav class="bg-indigo-600">
      <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div class="flex items-center justify-between h-16">
          <div class="flex items-center">
            <router-link to="/" class="text-white font-bold text-xl hover:text-gray-200">
              Asset Management System
            </router-link>
          </div>
          <div class="flex items-center">
            <span id="userInfo" class="text-white mr-4" v-if="user">
              {{ user.username }} ({{ user.role }})
            </span>
            <button 
              id="logoutBtn" 
              @click="logout" 
              class="text-white hover:text-gray-200 p-3"
            >
              Logout
            </button>
          </div>
        </div>
      </div>
    </nav>

    <!-- Main Content -->
    <main class="max-w-7xl mx-auto py-6 sm:px-6 lg:px-8">
      <!-- Stats Overview -->
      <div class="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
        <div class="bg-white overflow-hidden shadow rounded-lg">
          <div class="p-5">
            <div class="flex items-center">
              <div class="flex-shrink-0 bg-indigo-500 rounded-md p-3">
                <svg class="h-6 w-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M20 7l-8-4-8 4m16 0l-8 4m8-4v10l-8 4m0-10L4 7m8 4v10M4 7v10l8 4"/>
                </svg>
              </div>
              <div class="ml-5 w-0 flex-1">
                <dl>
                  <dt class="text-sm font-medium text-gray-500 truncate">Total Items</dt>
                  <dd id="totalItems" class="text-lg font-medium text-gray-900">Loading...</dd>
                </dl>
              </div>
            </div>
          </div>
        </div>

        <div class="bg-white overflow-hidden shadow rounded-lg">
          <div class="p-5">
            <div class="flex items-center">
              <div class="flex-shrink-0 bg-green-500 rounded-md p-3">
                <svg class="h-6 w-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z"/>
                </svg>
              </div>
              <div class="ml-5 w-0 flex-1">
                <dl>
                  <dt class="text-sm font-medium text-gray-500 truncate">Available Items</dt>
                  <dd id="availableItems" class="text-lg font-medium text-gray-900">Loading...</dd>
                </dl>
              </div>
            </div>
          </div>
        </div>

        <div class="bg-white overflow-hidden shadow rounded-lg">
          <div class="p-5">
            <div class="flex items-center">
              <div class="flex-shrink-0 bg-yellow-500 rounded-md p-3">
                <svg class="h-6 w-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z"/>
                </svg>
              </div>
              <div class="ml-5 w-0 flex-1">
                <dl>
                  <dt class="text-sm font-medium text-gray-500 truncate">Pending Issues</dt>
                  <dd id="pendingIssues" class="text-lg font-medium text-gray-900">Loading...</dd>
                </dl>
              </div>
            </div>
          </div>
        </div>
      </div>

      <!-- Quick Actions -->
      <div class="bg-white shadow rounded-lg mb-8">
        <div class="px-4 py-5 sm:p-6">
          <h3 class="text-lg leading-6 font-medium text-gray-900 mb-4">Quick Actions</h3>
          <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
            <router-link 
              :to="{ name: 'manage-items' }" 
              class="inline-flex items-center px-4 py-2 border border-transparent text-sm font-medium rounded-md text-white bg-indigo-600 hover:bg-indigo-700">
              Manage Items
            </router-link>
            <router-link 
              :to="{ name: 'request-item' }" 
              class="inline-flex items-center px-4 py-2 border border-transparent text-sm font-medium rounded-md text-white bg-purple-600 hover:bg-purple-700">
              Request Item
            </router-link>
            <router-link 
              :to="{ name: 'assigned-items' }" 
              class="inline-flex items-center px-4 py-2 border border-transparent text-sm font-medium rounded-md text-white bg-green-600 hover:bg-green-700">
              View My Items
            </router-link>
            <router-link 
              :to="{ name: 'report-issue' }" 
              class="inline-flex items-center px-4 py-2 border border-transparent text-sm font-medium rounded-md text-white bg-yellow-600 hover:bg-yellow-700">
              Report Issue
            </router-link>
          </div>
        </div>
      </div>

      <!-- Recent Activity -->
      <div class="bg-white shadow rounded-lg">
        <div class="px-4 py-5 sm:p-6">
          <h3 class="text-lg leading-6 font-medium text-gray-900 mb-4">Recent Activity</h3>
          <div class="flow-root">
            <ul id="recentActivity" class="divide-y divide-gray-200">
              <!-- Activity items will be inserted here -->
            </ul>
          </div>
        </div>
      </div>
    </main>
  </div>
</template>

<script>
import { ref, onMounted } from 'vue';
import { api } from '../api';

export default {
  name: 'DashboardView',
  setup() {
    const user = ref(null); // Reactive user object

    onMounted(() => {
      const storedUser = JSON.parse(localStorage.getItem('user')); // Retrieve user data from localStorage
      console.log('Stored User:', storedUser); // Debugging line
      user.value = storedUser; // Set user data
    });

    const logout = () => {
      localStorage.removeItem('authToken'); // Remove token
      localStorage.removeItem('user'); // Remove user data
      window.location.href = '/'; // Redirect to login page
    };

    const navigateToRequestItem = () => {
      this.$router.push({ name: 'request-item' }); // Redirect to the Request Item page
    };

    const openRequestItemModal = () => {
      // Logic to open the request item modal
      // You can use a modal component or redirect to a request item page
      this.$router.push({ name: 'request-item' });
    };

    return { user, logout, navigateToRequestItem, openRequestItemModal }; // Return user and logout method to template
  },
  data() {
    return {
      totalItems: 0,
      availableItems: 0,
      pendingIssues: 0,
      recentActivity: [],
    };
  },
  async created() {
    await this.fetchDashboardData();
  },
  methods: {
    async fetchDashboardData() {
      try {
        const response = await api.fetchDashboardData();
        this.totalItems = response.data.totalItems;
        this.availableItems = response.data.availableItems;
        this.pendingIssues = response.data.pendingIssues;
        this.recentActivity = response.data.recentActivity; // Adjust based on your API response
      } catch (error) {
        console.error('Failed to fetch dashboard data:', error);
      }
    },
    navigateTo(url) {
      window.location.href = url; // Adjust as needed for Vue Router
    },
    addNewItem() {
      // Logic to add a new item
    },
  },
};
</script>

<style scoped>

</style>