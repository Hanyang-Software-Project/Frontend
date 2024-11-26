<template>
  <div class="alarm-tab">
    <h3>Alarms</h3>
    <table>
      <thead>
        <tr>
          <th>Threat Type</th>
          <th>Time</th>
          <th>Device</th>
        </tr>
      </thead>
      <tbody>
        <tr v-for="alarm in alarms" :key="alarm.id">
          <td>{{ alarm.threat_type }}</td>
          <td>{{ alarm.time }}</td>
          <td>{{ alarm.device }}</td>
        </tr>
      </tbody>
    </table>
  </div>
</template>

<script>
import axios from 'axios'; // Ensure axios is installed or use the Fetch API

export default {
  name: 'AlarmTab',
  data() {
    return {
      alarms: [] // Initial empty array for alarm data
    };
  },
  created() {
    this.fetchAlarms();
  },
  methods: {
    fetchAlarms() {
      axios.get('/api/alarms')
        .then(response => {
          this.alarms = response.data; // Assign response data to alarms array
        })
        .catch(error => {
          console.error('Error fetching alarms:', error);
        });
    }
  }
}
</script>

<style scoped>
.alarm-tab {
  margin-top: 20px;
}
table {
  width: 100%;
  border-collapse: collapse;
}
th, td {
  border: 1px solid #ddd;
  padding: 8px;
  text-align: left;
}
</style>
