<template>
  <nav class="bg-indigo-600">
    <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
      <div class="flex items-center justify-between h-16">
        <div class="flex items-center">
          <a href="/" class="text-white font-bold text-xl hover:text-gray-200">Asset Management</a>
        </div>
        <div class="flex items-center space-x-4">
          <router-link to="/login" class="text-white hover:bg-indigo-500 px-3 py-2 rounded-md text-sm font-medium">Login</router-link>
          <router-link to="/register" class="bg-white text-indigo-600 hover:bg-indigo-50 px-3 py-2 rounded-md text-sm font-medium">Register</router-link>
        </div>
      </div>
    </div>
  </nav>
</template>