<template>
  <div class="row">
    <div class="col-12">
      <table-card title="Household Notifications" sub-title="Recent Alerts">
        <table class="table">
          <thead>
            <tr>
              <th>Timestamp</th>
              <th>User ID</th>
              <th>Alarm Status</th>
              <th>Actions</th>
            </tr>
          </thead>
          <tbody>
            <tr v-for="alert in notifications" :key="alert.alertId">
              <td>{{ formatDate(alert.timestamp) }}</td>
              <td>{{ alert.userId }}</td>
              <td>{{ alert.threatFlag === null ? 'Not Set' : (alert.threatFlag ? 'Real Alarm' : 'False Alarm') }}</td>
              <td>
                <button class="btn btn-warning" @click="handleFalseAlarm(alert)">Handle Alarm</button>
              </td>
            </tr>
          </tbody>
        </table>
      </table-card>
    </div>
    <!-- Alarm Modal for immediate warnings -->
    <alarm-modal
      :isVisible="showWarningModal"
      @update:isVisible="showWarningModal = $event"
    />
    <!-- Handling Modal for user decisions -->
    <alarm-handling-modal
      :isVisible="showHandlingModal"
      :currentItem="currentItem"
      @alarmHandled="processAlarm"
      @update:isVisible="showHandlingModal = $event"
    />
  </div>
</template>

<script>
import axios from 'axios';
import { TableCard } from "@/components/index";
import AlarmModal from './AlarmModal.vue';
import AlarmHandlingModal from './AlarmHandlingModal.vue';
import { format } from 'date-fns';

export default {
  components: {
    TableCard,
    AlarmModal,
    AlarmHandlingModal
  },
  data() {
    return {
      notifications: [],
      userId: localStorage.getItem('userId'),
      showWarningModal: false,
      showHandlingModal: false,
      currentItem: null,
      refreshInterval: null,
    };
  },
  methods: {
    fetchHouseholdUsers() {
      axios.get(`http://localhost:8080/house/user/${this.userId}`)
        .then(response => {
          if (response.data.length > 0 && response.data[0].users) {
            const userIds = response.data[0].users.map(user => user.userId);
            this.fetchAlertsForUsers(userIds);
          } else {
            console.error('No users found in the household:', response.data);
          }
        })
        .catch(error => {
          console.error('Error fetching household users:', error);
        });
    },
    fetchAlertsForUsers(userIds) {
      userIds.forEach(userId => {
        axios.get(`http://localhost:8080/alerts/user/${userId}`)
          .then(response => {
            this.updateNotifications(response.data.map(alert => ({
              ...alert,
              userId: userId
            })));
          })
          .catch(error => {
            console.error(`Error fetching alerts for user ${userId}:`, error);
          });
      });
    },
    updateNotifications(fetchedAlerts) {
      const newAlerts = fetchedAlerts.filter(fetchedAlert => 
        !this.notifications.some(existingAlert => existingAlert.alertId === fetchedAlert.alertId));

      if (newAlerts.length > 0) {
        this.notifications = [...this.notifications, ...newAlerts];
        // Check for new alerts with null threatFlag
        const alertWithNullFlag = newAlerts.find(alert => alert.threatFlag === null);
        if (alertWithNullFlag) {
          this.showWarningModal = true;
        }
      }
    },
    formatDate(timestamp) {
      return format(new Date(timestamp), 'PPpp');
    },
    handleFalseAlarm(alert) {
      this.currentItem = alert;
      this.showHandlingModal = true;
    },
    processAlarm(data) {
      console.log(`Alarm processed for:`, data);
      this.showHandlingModal = false;
      this.fetchHouseholdUsers(); // Refresh data if necessary
    }
  },
  mounted() {
    this.fetchHouseholdUsers();
    this.refreshInterval = setInterval(this.fetchHouseholdUsers, 5000); // Check every 5 seconds
  },
  beforeDestroy() {
    clearInterval(this.refreshInterval);
  }
};
</script>

<style>
/* Styles for your component */
</style>
