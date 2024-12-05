<template>
  <div>
    <!--Stats cards-->
    <div class="row">
      <div
        class="col-md-6 col-xl-3"
        v-for="stats in statsCards"
        :key="stats.title"
      >
        <stats-card>
          <div
            class="icon-big text-center"
            :class="`icon-${stats.type}`"
            slot="header"
          >
            <i :class="stats.icon"></i>
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

    <!-- Warning List -->
    <!-- Notification Table Component -->
    <div class="row">
      <div class="col-12">
        <notification-table></notification-table>
      </div>
    </div>


      
    </div>
  </div>
</template>
<script>
import { StatsCard, TableCard } from "@/components/index";
import AlarmHandlingModal from '../layout/dashboard/AlarmHandlingModal.vue';
import axios from 'axios';
import NotificationTable from '../layout/dashboard/NotificiationTable.vue'; // Adjust the path as necessary


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
      householdId: 3, // Set as a default value, can be dynamic

      tableCard: {
        title: "Notifications",
        subTitle: "24 Hours notifications",
        data: [
          {
            id: 1,
            type: "Warning",
            room: "Living Room",
            device: "Air Conditioner",
            time: "14:35",
            status: "warning", // Will correspond to a color class
          },
          {
            id: 2,
            type: "Critical",
            room: "Kitchen",
            device: "Refrigerator",
            time: "09:20",
            status: "danger", // Will correspond to a color class
          },
          {
            id: 3,
            type: "Info",
            room: "Bedroom",
            device: "Lamp",
            time: "23:15",
            status: "success", // Will correspond to a color class
          },
        ],
      },
      statsCards: [
        {
          type: "warning",
          icon: "ti-server",
          title: "Household Members",
          value: "4",
          footerText: "Update now",
          footerIcon: "ti-reload",
        },
        {
          type: "success",
          icon: "ti-wallet",
          title: "Household Devices",
          value: "5",
          footerText: "Add Device",
          footerIcon: "ti-reload",
        },
        {
          type: "danger",
          icon: "ti-pulse",
          title: "Errors",
          value: "3",
          footerText: "In the last hour",
          footerIcon: "ti-timer",
        },
      ],
      
    };
  },
  methods: {
    fetchHouseholdMembers() {
      axios.get(`http://localhost:8080/house/user/${this.householdId}`)
        .then(response => {
          if (response.data.length > 0 && response.data[0].users) {
            this.updateHouseholdMembersCount(response.data[0].users.length);
          } else {
            console.error('No users found in the household:', response.data);
            this.updateHouseholdMembersCount(0); 
          }
        })
        .catch(error => {
          console.error("Error fetching household members:", error);
          this.updateHouseholdMembersCount(0); 
        });
    },
    updateHouseholdMembersCount(memberCount) {
      const memberCard = this.statsCards.find(card => card.title === "Household Members");
      if (memberCard) {
        memberCard.value = memberCount.toString(); 
      }
    },
    created() {
      this.fetchHouseholdMembers();
    },
    openModal(item) {
      this.currentItem = item;
      this.showModal = true;
    },
    processAlarm(data) {
      console.log(`Alarm type: ${data.type} for item:`, data.item);
      // Add any additional processing or state updates here
    }
  },
};
</script>

<style></style>
