<template>
  <div 
    v-if="notification"
    :class="[
      'fixed top-4 right-4 p-4 rounded-lg shadow-lg z-50 transition-all duration-300',
      notification.type === 'error' ? 'bg-red-100 text-red-800' : 'bg-green-100 text-green-800'
    ]"
  >
    {{ notification.message }}
  </div>
</template>

<script>
import { ref, onMounted, onUnmounted } from 'vue';

export default {
  name: 'Notification',
  setup() {
    const notification = ref(null);
    let timeout;

    const showNotification = (event) => {
      notification.value = event.detail;
      
      // Clear previous timeout
      if (timeout) clearTimeout(timeout);
      
      // Auto-hide after 3 seconds
      timeout = setTimeout(() => {
        notification.value = null;
      }, 3000);
    };

    onMounted(() => {
      window.addEventListener('show-notification', showNotification);
    });

    onUnmounted(() => {
      window.removeEventListener('show-notification', showNotification);
      if (timeout) clearTimeout(timeout);
    });

    return {
      notification
    };
  }
};
</script> 