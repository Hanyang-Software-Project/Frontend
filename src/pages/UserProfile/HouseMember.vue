<template>
  <card class="card" title="Household Information">
    <div>
      <ul class="list-unstyled team-households">
        <li v-for="household in households" :key="household.name">
          <div class="row">
            <div class="col-3">
              <div class="avatar">
                <img
                  :src="household.image"
                  alt="Household Member"
                  class="rounded img-fluid"
                />
              </div>
            </div>
            <div class="col-9">
              <span>{{ household.name }}</span>
              <br />
              <span :class="getStatusClass(household.status)">
                <small>{{ household.status }}</small>
              </span>
            </div>
          </div>
        </li>
      </ul>
    </div>
    <div class="text-center mt-3">
      <button @click="openEditModal" class="btn btn-primary">
        Edit Household Member
      </button>
    </div>
    <!-- Ensure the EditHouseMemberModal is toggled correctly -->
    <edit-house-member-modal ref="editHouseInfosModal" />
  </card>
</template>

<script>
import EditHouseMemberModal from './components/edit-house-members-modal.vue';

export default {
  components: {
    EditHouseMemberModal
  },
  data() {
    return {
      title: "Household Members",
      households: [
        {
          image: require("@/assets/img/faces/face-0.jpg"),
          name: "Mother",
          status: "Offline",
        },
        {
          image: require("@/assets/img/faces/face-1.jpg"),
          name: "Father",
          status: "Available",
        },
        {
          image: require("@/assets/img/faces/face-2.jpg"),
          name: "Son",
          status: "Busy",
        },
      ],
    };
  },
  methods: {
    getStatusClass(status) {
      switch (status) {
        case "Offline":
          return "text-muted";  
        case "Available":
          return "text-success";
        case "Busy":
          return "text-danger";
        default:
          return "text-primary";
      }
    },
    openEditModal() {
      this.$refs.editHouseInfosModal.isVisible = true;
    }
  },
};
</script>

<style>
.avatar img {
  width: 100%; /* Ensures the avatar images are fully responsive within their container */
}

</style>
