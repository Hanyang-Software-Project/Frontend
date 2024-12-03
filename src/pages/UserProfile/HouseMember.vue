<template>
  <card class="card" title="Household Information">
    <div>
      <ul class="list-unstyled team-households">
        <li v-for="user in users" :key="user.username">
          <div class="row">
            <div class="col-3">
              <i class="ti-user large-icon"></i>
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
          console.log("API Response:", response.data); 
          if (Array.isArray(response.data) && response.data.length > 0) {
            const household = response.data[0]; 
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

<style scoped>
.avatar img {
  width: 100%; /* Ensures the avatar images are fully responsive within their container */
}
.large-icon {
  font-size: 35px;  /* You can adjust the size as needed */
}
/* Container styling */
.team-households {
  list-style: none;
  padding: 0;
  margin: 0;
}

.team-households li {
  border-bottom: 1px solid #e1e1e1; /* subtle bottom border for each item */
  padding: 10px 0; /* vertical padding for spacing */
  transition: background-color 0.3s; /* smooth transition for hover effect */
}

/* Row layout adjustments */
.row {
  align-items: center; /* vertically center the content in the row */
}

/* Icon styling */
.large-icon {
  font-size: 24px; /* larger icon */
  color: #3498db; /* icon color */
  vertical-align: middle; /* align icon vertically with text */
}

/* Username and email styles */
.team-households span {
  display: block; /* ensure each element appears on a new line */
  color: #333; /* text color for better readability */
  font-size: 14px; /* suitable font size */
  padding-left: 10px; /* spacing from icon or other elements */
}

/* Hover effect for each list item */
.team-households li:hover {
  background-color: #f9f9f9; /* light grey background on hover */
}
</style>

