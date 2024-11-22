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
          <span slot="footer">
            <i class="ti-reload"></i> Updated 3 minutes ago
          </span>
        </table-card>
      </div>

      <div class="col-md-6 col-12">
        <chart-card
          title="2015 Sales"
          sub-title="All products including Taxes"
          :chart-data="activityChart.data"
          :chart-options="activityChart.options"
        >
          <span slot="footer">
            <i class="ti-check"></i> Data information certified
          </span>
          <div slot="legend">
          </div>
        </chart-card>
      </div>
    </div>
  </div>
</template>
<script>
import { StatsCard, ChartCard, TableCard } from "@/components/index";
import Chartist from "chartist";
export default {
  components: {
    StatsCard,
    TableCard,
  },
  /**
   * Chart data used to render stats, charts. Should be replaced with server data
   */
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
          title: "Household-Devices",
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
          status: "warning" // Represents yellow color
        },
        {
          id: 2,
          type: "Critical",
          room: "Kitchen",
          device: "Refrigerator",
          time: "09:20",
          status: "danger" // Represents red color
        },
        {
          id: 3,
          type: "Info",
          room: "Bedroom",
          device: "Lamp",
          time: "23:15",
          status: "success" // Represents green color
        },
      ],
      
      activityChart: {
        data: {
          labels: [
            "Jan",
            "Feb",
            "Mar",
            "Apr",
            "Mai",
            "Jun",
            "Jul",
            "Aug",
            "Sep",
            "Oct",
            "Nov",
            "Dec",
          ],
          series: [
            [542, 543, 520, 680, 653, 753, 326, 434, 568, 610, 756, 895],
            [230, 293, 380, 480, 503, 553, 600, 664, 698, 710, 736, 795],
          ],
        },
        options: {
          seriesBarDistance: 10,
          axisX: {
            showGrid: false,
          },
          height: "245px",
        },
      },
      preferencesChart: {
        data: {
          labels: ["62%", "32%", "6%"],
          series: [62, 32, 6],
        },
        options: {},
      },
    };
  },
};
</script>
<style></style>
