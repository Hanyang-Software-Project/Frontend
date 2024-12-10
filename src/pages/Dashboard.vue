<template>
  <div>
    <div class="row">
      <div class="col-md-6 col-xl-3" v-for="stats in statsCards" :key="stats.title">
        <stats-card>
          <div class="icon-big text-center" :class="`icon-${stats.type}`" slot="header">
            <template v-if="stats.title === 'Household Devices'">
              <img class="device-icon" :src="require('@/assets/img/LG_DEVICES.png')" alt="Devices Icon" />
            </template>
            <template v-else>
              <i :class="stats.icon"></i>
            </template>
          </div>
          <div class="numbers" slot="content">
            <p>{{ stats.title }}</p>
            {{ stats.value }}
          </div>
          <div class="stats" slot="footer">
            <i :class="stats.footerIcon"></i> {{ stats.footerText }}
          </div>
        </stats-card>
      </div>
    </div>
    <div class="row">
      <div class="col-12">
        <notification-table></notification-table>
      </div>
    </div>
  </div>
</template>

<script>
import { StatsCard, TableCard } from "@/components/index";
import AlarmHandlingModal from '../layout/dashboard/AlarmHandlingModal.vue';
import axios from 'axios';
import NotificationTable from '../layout/dashboard/NotificiationTable.vue';

export default {
  components: {
    StatsCard,
    TableCard,
    AlarmHandlingModal,
    NotificationTable,
  },
  data() {
    return {
      showModal: false,
      currentItem: null,
      userId: localStorage.getItem('userId'),
      statsCards: [
        {
          type: "warning",
          icon: "ti-server",
          title: "Household Members",
          value: "0",
          footerText: "Update now",
          footerIcon: "ti-reload",
        },
        {
          type: "success",
          icon: "ti-wallet",
          title: "Household Devices",
          value: "0",
          footerText: "Add Device",
          footerIcon: "ti-reload",
        },
        {
          type: "danger",
          icon: "ti-pulse",
          title: "Notifications",
          value: "0",
          footerText: "In the last hour",
          footerIcon: "ti-timer",
        },
      ],
    };
  },
  created() {
    this.fetchHouseholdMembers();
    this.fetchHouseholdDevices();
    this.fetchNotifications();
  },
  methods: {
    fetchHouseholdMembers() {
      if (!this.userId) return;
      axios.get(`${process.env.VUE_APP_URI_ROOT}/house/user/${this.userId}`)
        .then(response => {
          if (Array.isArray(response.data) && response.data.length > 0) {
            const household = response.data[0];
            const memberCount = household.users ? household.users.length : 0;
            this.updateStatValue("Household Members", memberCount.toString());
          } else {
            this.updateStatValue("Household Members", "0");
            console.error('No household found or unexpected structure:', response.data);
          }
        })
        .catch(error => {
          this.updateStatValue("Household Members", "0");
          console.error("Error fetching household members:", error);
        });
    },
    fetchHouseholdDevices() {
      if (!this.userId) return;
      axios.get(`${process.env.VUE_APP_URI_ROOT}/devices/user/${this.userId}`)
        .then(response => {
          if (Array.isArray(response.data)) {
            const deviceCount = response.data.length;
            this.updateStatValue("Household Devices", deviceCount.toString());
          } else {
            this.updateStatValue("Household Devices", "0");
            console.error('Unexpected device response structure:', response.data);
          }
        })
        .catch(error => {
          this.updateStatValue("Household Devices", "0");
          console.error("Error fetching household devices:", error);
        });
    },
    fetchNotifications() {
      if (!this.userId) return;
      axios.get(`${process.env.VUE_APP_URI_ROOT}/alerts/user/${this.userId}`)
        .then(response => {
          if (Array.isArray(response.data)) {
            const notificationCount = response.data.length;
            this.updateStatValue("Notifications", notificationCount.toString());
          } else {
            this.updateStatValue("Notifications", "0");
            console.error('Unexpected alerts response structure:', response.data);
          }
        })
        .catch(error => {
          this.updateStatValue("Notifications", "0");
          console.error("Error fetching notifications:", error);
        });
    },
    updateStatValue(title, value) {
      const card = this.statsCards.find(card => card.title === title);
      if (card) {
        card.value = value;
      }
    },
    openModal(item) {
      this.currentItem = item;
      this.showModal = true;
    },
    processAlarm(data) {
      console.log(`Alarm type: ${data.type} for item:`, data.item);
    }
  },
};
</script>

<style scoped>
/* Make the device icon smaller */
.device-icon {
  width: 50px; /* adjust as needed */
  height: auto;
}
</style>
