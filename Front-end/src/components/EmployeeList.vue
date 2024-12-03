<template>
  <div>
    <h2>Employees</h2>
    <ul>
      <li v-for="employee in employees" :key="employee._id">{{ employee.username }}</li>
    </ul>
  </div>
</template>

<script>
import { api } from '../api';

export default {
  data() {
    return {
      employees: [],
    };
  },
  async created() {
    try {
      const response = await api.getEmployees();
      this.employees = response.data;
    } catch (error) {
      console.error('Error fetching employees:', error);
    }
  },
};
</script>
