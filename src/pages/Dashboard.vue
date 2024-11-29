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
    <div class="row">
      <div class="col-12">
        <table-card
          title="Notifications"
          sub-title="24 Hours notifications"
        >
          <table class="table">
            <thead>
              <tr>
                <th>Notification Type</th>
                <th>Room Location</th>
                <th>Device</th>
                <th>Time</th>
              </tr>
            </thead>
            <tbody>
              <tr v-for="item in notifications" :key="item.id" :class="`text-${item.status}`">
                <td>{{ item.type }}</td>
                <td>{{ item.room }}</td>
                <td>{{ item.device }}</td>
                <td>{{ item.time }}</td>
              </tr>
            </tbody>
          </table>
        </table-card>
      </div>

      
    </div>
  </div>
</template>
<script>
import { StatsCard, TableCard } from "@/components/index";
import Chartist from "chartist";

export default {
  components: {
    StatsCard,
    TableCard,
  },
  data() {
    return {
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
          value: "23",
          footerText: "In the last hour",
          footerIcon: "ti-timer",
        },
      ],
      notifications: [
        {
          id: 1,
          type: "Warning",
          room: "Living Room",
          device: "Air Conditioner",
          time: "14:35",
          status: "warning", // Represents yellow color
        },
        {
          id: 2,
          type: "Critical",
          room: "Kitchen",
          device: "Refrigerator",
          time: "09:20",
          status: "danger", // Represents red color
        },
        {
          id: 3,
          type: "Info",
          room: "Bedroom",
          device: "Lamp",
          time: "23:15",
          status: "success", // Represents green color
        },
      ],
      // Add the missing activityChart data
      activityChart: {
        data: {
          labels: ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug"],
          series: [[5, 10, 15, 20, 25, 30, 35, 40]],
        },
        options: {
          low: 0,
          showArea: true,
          height: "245px",
          axisX: {
            showGrid: false,
          },
          lineSmooth: Chartist.Interpolation.simple({
            divisor: 2,
          }),
        },
      },
    };
  },
};
</script>

<style></style>
