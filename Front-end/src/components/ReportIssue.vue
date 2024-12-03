<template>
  <div class="p-6 bg-white rounded-lg shadow-md">
    <h2 class="text-2xl font-bold mb-4">Report Issue</h2>
    <input
      v-model="itemId"
      type="text"
      placeholder="Item ID"
      class="w-full p-2 border rounded mb-4"
    />
    <textarea
      v-model="issue"
      placeholder="Describe the issue"
      class="w-full p-2 border rounded mb-4"
    ></textarea>
    <button
      @click="reportIssue"
      class="mt-4 p-2 bg-indigo-600 text-white rounded hover:bg-indigo-700"
    >
      Report Issue
    </button>
  </div>
</template>

<script>
import { ref } from "vue";
import { api } from "../api";

export default {
  name: "ReportIssue",
  data() {
    return {
      itemId: "",
      issue: "",
    };
  },
  methods: {
    async reportIssue() {
      try {
        await api.reportIssue({ itemId: this.itemId, issue: this.issue });
        alert("Issue reported successfully");
      } catch (error) {
        console.error("Error reporting issue:", error);
      }
    },
  },
};
</script>

<style scoped>
/* Add any additional styles here */
</style>
