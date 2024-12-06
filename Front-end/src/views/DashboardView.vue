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
                  <dd id="totalItems" class="text-lg font-medium text-gray-900">{{ stats.total || 0 }}</dd>
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
                  <dd id="availableItems" class="text-lg font-medium text-gray-900">{{ stats.available || 0 }}</dd>
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
                  <dd id="pendingIssues" class="text-lg font-medium text-gray-900">{{ stats.pendingIssues || 0 }}</dd>
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
              class="inline-flex items-center px-4 py-2 border border-transparent text-sm font-medium rounded-md text-white bg-blue-600 hover:bg-blue-700">
              Report Issue
            </router-link>
          </div>
        </div>
      </div>

      <!-- Recent Activity -->
      <div class="bg-white shadow rounded-lg">
        <div class="px-4 py-5 sm:p-6">
          <div class="flex items-center justify-between mb-6">
            <h3 class="text-lg leading-6 font-medium text-gray-900">Recent Activity</h3>
            <span class="px-3 py-1 text-xs font-medium text-indigo-600 bg-indigo-100 rounded-full">
              Last 24 hours
            </span>
          </div>
          <div class="flow-root">
            <ul id="recentActivity" class="divide-y divide-gray-200">
              <li v-for="activity in recentActivities" :key="activity._id" 
                  class="py-4 transition duration-150 ease-in-out hover:bg-gray-50">
                <div class="flex items-center space-x-4">
                  <!-- Activity Icon -->
                  <div :class="`flex-shrink-0 rounded-full p-2 ${getActivityColor(activity.type)} 
                               shadow-sm transform transition-transform duration-200 hover:scale-110`">
                    <svg class="h-5 w-5 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path 
                        stroke-linecap="round" 
                        stroke-linejoin="round" 
                        stroke-width="2" 
                        :d="getActivityIcon(activity.type)"
                      />
                    </svg>
                  </div>
                  <!-- Activity Content -->
                  <div class="flex-1 min-w-0">
                    <div class="flex items-center justify-between">
                      <p class="text-sm font-medium text-gray-900 truncate">
                        {{ activity.description }}
                      </p>
                      <span :class="`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium
                                    ${getActivityTagColor(activity.type)}`">
                        {{ activity.type }}
                      </span>
                    </div>
                    <div class="flex items-center mt-1">
                      <svg class="h-4 w-4 text-gray-400 mr-1.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" 
                              d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
                      </svg>
                      <p class="text-sm text-gray-500">
                        {{ formatDate(activity.date) }}
                      </p>
                    </div>
                  </div>
                </div>
              </li>
              <li v-if="recentActivities.length === 0" 
                  class="py-8 text-center">
                <div class="flex flex-col items-center">
                  <svg class="h-12 w-12 text-gray-400 mb-3" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="1.5"
                          d="M20 13V6a2 2 0 00-2-2H6a2 2 0 00-2 2v7m16 0v5a2 2 0 01-2 2H6a2 2 0 01-2-2v-5m16 0h-2.586a1 1 0 00-.707.293l-2.414 2.414a1 1 0 01-.707.293h-3.172a1 1 0 01-.707-.293l-2.414-2.414A1 1 0 006.586 13H4" />
                  </svg>
                  <p class="text-gray-500 text-sm">No recent activity</p>
                  <p class="text-gray-400 text-xs mt-1">Activities will appear here as they happen</p>
                </div>
              </li>
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
    const user = ref(null);
    const stats = ref({
      total: 0,
      available: 0,
      pendingIssues: 0
    });
    const recentActivities = ref([]);

    const fetchStats = async () => {
      try {
        const response = await api.getItemStats();
        stats.value = response.data;
      } catch (error) {
        console.error('Error fetching stats:', error);
      }
    };

    const fetchRecentActivity = async () => {
      try {
        const response = await api.getRecentActivity();
        recentActivities.value = response.data;
      } catch (error) {
        console.error('Error fetching recent activity:', error);
      }
    };

    const getActivityColor = (type) => {
      const colors = {
        'assigned': 'bg-green-500',
        'issue': 'bg-red-500',
        'returned': 'bg-blue-500',
        'created': 'bg-purple-500',
        'updated': 'bg-yellow-500'
      };
      return colors[type] || 'bg-gray-500';
    };

    const getActivityTagColor = (type) => {
      const colors = {
        'assigned': 'bg-green-100 text-green-800',
        'issue': 'bg-red-100 text-red-800',
        'returned': 'bg-blue-100 text-blue-800',
        'created': 'bg-purple-100 text-purple-800',
        'updated': 'bg-yellow-100 text-yellow-800'
      };
      return colors[type] || 'bg-gray-100 text-gray-800';
    };

    const getActivityIcon = (type) => {
      const icons = {
        'assigned': 'M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z',
        'issue': 'M12 8v4m0 4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z',
        'returned': 'M3 10h10a8 8 0 018 8v2M3 10l6 6m-6-6l6-6',
        'created': 'M12 4v16m8-8H4',
        'updated': 'M4 4v5h.582m15.356 2A8.001 8.001 0 004.582 9m0 0H9m11 11v-5h-.581m0 0a8.003 8.003 0 01-15.357-2m15.357 2H15'
      };
      return icons[type] || 'M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z';
    };

    const formatDate = (date) => {
      const now = new Date();
      const activityDate = new Date(date);
      const diffInHours = Math.floor((now - activityDate) / (1000 * 60 * 60));
      
      if (diffInHours < 1) {
        const diffInMinutes = Math.floor((now - activityDate) / (1000 * 60));
        return `${diffInMinutes} minute${diffInMinutes !== 1 ? 's' : ''} ago`;
      } else if (diffInHours < 24) {
        return `${diffInHours} hour${diffInHours !== 1 ? 's' : ''} ago`;
      } else {
        return activityDate.toLocaleDateString('en-US', {
          month: 'short',
          day: 'numeric',
          hour: '2-digit',
          minute: '2-digit'
        });
      }
    };

    onMounted(async () => {
      const storedUser = JSON.parse(localStorage.getItem('user'));
      user.value = storedUser;
      await Promise.all([
        fetchStats(),
        fetchRecentActivity()
      ]);
    });

    const logout = () => {
      localStorage.removeItem('authToken');
      localStorage.removeItem('user');
      window.location.href = '/login';
    };

    return {
      user,
      stats,
      recentActivities,
      logout,
      fetchStats,
      getActivityColor,
      getActivityTagColor,
      getActivityIcon,
      formatDate
    };
  }
};
</script>

<style scoped>
.activity-enter-active,
.activity-leave-active {
  transition: all 0.3s ease;
}

.activity-enter-from,
.activity-leave-to {
  opacity: 0;
  transform: translateX(-30px);
}
</style>