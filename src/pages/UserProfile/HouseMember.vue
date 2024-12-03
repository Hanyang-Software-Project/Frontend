<template>
  <card class="card" title="Household Information">
    <div>
      <ul class="list-unstyled team-households">
        <li v-for="user in users" :key="user.username">
          <div class="row">
            <div class="col-3">
              <span>{{ user.name }} </span>
            </div>
            <div class="col-3">
              <span>{{ user.username }} </span>
            </div>
            <div class="col-5">
              <span>{{ user.email }}</span>
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
import axios from 'axios';
import EditHouseMemberModal from './components/edit-house-members-modal.vue';

export default {
  components: {
    EditHouseMemberModal
  },
  data() {
    return {
      householdId: 3, // Example household ID to query
      users: [], // This will store user data fetched from the API
    };
  },
  methods: {
    fetchHousehold() {
      axios.get(`http://localhost:8080/house/user/${this.householdId}`)
        .then(response => {
          console.log("API Response:", response.data); // Log the received household data
          // Check if the response data is an array and has at least one element
          if (Array.isArray(response.data) && response.data.length > 0) {
            const household = response.data[0]; // Get the first household object
            console.log("First household data:", household);
            if (household && Array.isArray(household.users)) {
              const userIds = household.users.map(user => user.userId);
              console.log("User IDs extracted from household:", userIds);
              this.fetchUserDetails(userIds);
            } else {
              console.error('No users found in the household:', household);
            }
          } else {
            console.error('Unexpected response structure or empty response:', response.data);
          }
        })
        .catch(error => {
          console.error('There was an error fetching the household:', error);
        });
    },



    fetchUserDetails(userIds) {
      userIds.forEach(userId => {
        axios.get(`http://localhost:8080/users/userDTO/${userId}`)
          .then(response => {
            console.log(`Data received for user ID ${userId}:`, response.data);
            this.users.push({
              id: response.data.id,
              username: response.data.username,
              email: response.data.email,
              createdAt: response.data.createdAt
            });
          })
          .catch(error => {
            console.error(`Error fetching user details for user ID ${userId}:`, error);
          });
      });
    },

    openEditModal() {
      console.log("Opening edit modal");
      this.$refs.editHouseInfosModal.openModal();
    }
  },
  created() {
    console.log("Component created, starting to fetch household");
    this.fetchHousehold(); // Load users, either from mock data or an API call
  },
};
</script>

<style>
.avatar img {
  width: 100%; /* Ensures the avatar images are fully responsive within their container */
}
</style>
