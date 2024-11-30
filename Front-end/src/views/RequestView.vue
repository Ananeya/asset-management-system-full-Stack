<template>
  <div class="max-w-7xl mx-auto py-6 sm:px-6 lg:px-8">
    <h1 class="text-2xl font-bold mb-4">Request Item</h1>
    <form id="requestForm" @submit.prevent="handleRequest">
      <div class="space-y-4">
        <div>
          <label for="itemCategory" class="block text-sm font-medium text-gray-700">Item Category</label>
          <select id="itemCategory" required class="mt-1 block w-full pl-3 pr-10 py-2 text-base border-gray-300 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm rounded-md">
            <option value="">Select Category</option>
            <option value="laptop">Laptop</option>
            <option value="desktop">Desktop</option>
            <option value="monitor">Monitor</option>
            <option value="peripheral">Peripheral</option>
            <option value="other">Other</option>
          </select>
        </div>
        <div>
          <label for="requestReason" class="block text-sm font-medium text-gray-700">Reason for Request</label>
          <textarea id="requestReason" required rows="4" class="mt-1 block w-full shadow-sm focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm border border-gray-300 rounded-md"></textarea>
        </div>
        <div>
          <button type="submit" class="w-full flex justify-center py-2 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500">Submit Request</button>
        </div>
      </div>
    </form>
  </div>
</template>

<script setup>
const handleRequest = async () => {
  // Implement request logic here
};
</script>