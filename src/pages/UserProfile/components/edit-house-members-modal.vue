<template>
  <div v-if="isVisible" class="modal-overlay2" @click.self="closeModal">
    <div class="modal-content" @click.stop>
      <card title="Edit Household Members">
        <div>
          <ul class="list-unstyled">
            <li v-for="user in users" :key="user.id" class="row mb-2">
              <div class="col-3">
                <i class="ti-user large-icon"></i>
              </div>
              <div class="col-3">
                <span>{{ user.username }}</span>
              </div>
              <div class="col-4">
                <span>{{ user.email }}</span>
              </div>
              <div class="col-2">
                <button class="btn btn-danger btn-sm" @click="removeUser(user.id)">Remove</button>
              </div>
            </li>
          </ul>
        </div>
        <form @submit.prevent="addUser" class="form row">
          <div class="col-8">
            <fg-input
              type="text"
              label="Add User by Username"
              placeholder="Username"
              v-model="newUsername"
            >
            </fg-input>
          </div>
          <div class="col-4 text-center">
            <button type="submit" class="btn btn-success">Add New</button>
          </div>
        </form>
        <div class="button-group text-center mt-3">
          <button class="update-btn btn btn-primary" @click="sendUpdate">Save Changes</button>
          <button class="close-btn btn btn-secondary" @click="closeModal">Close</button>
        </div>
      </card>
    </div>
  </div>
</template>

<script>
import axios from 'axios'; 

export default {
  data() {
    return {
      users: [],
      newUsername: '',
      isVisible: false,
    };
  },
  methods: {
    openModal() {
      this.isVisible = true;
      this.fetchHousehold();
    },
    fetchHousehold() {
      const householdId = localStorage.getItem('userId');
      axios.get(`http://52.62.128.15:8080/house/user/${householdId}`)
        .then(response => {
          if (Array.isArray(response.data) && response.data.length > 0) {
            const household = response.data[0];
            if (household && Array.isArray(household.users)) {
              const userIds = household.users.map(user => user.userId);
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
        axios.get(`http://52.62.128.15:8080/users/userDTO/${userId}`)
          .then(response => {
            this.users.push({
              id: response.data.id,
              username: response.data.username,
              email: response.data.email,
            });
          })
          .catch(error => {
            console.error(`Error fetching user details for user ID ${userId}:`, error);
          });
      });
    },
    addUser() {
      let newUser = { username: this.newUsername, name: "New User", email: "new@example.com" };
      axios.post(`http://52.62.128.15:8080/users`, newUser)
        .then(response => {
          this.users.push(response.data);
          this.newUsername = ''; 
        })
        .catch(error => {
          console.error('Error adding new user:', error);
        });
    },
    removeUser(userId) {
      axios.delete(`http://52.62.128.15:8080/users/${userId}`)
        .then(() => {
          this.users = this.users.filter(user => user.id !== userId);
        })
        .catch(error => {
          console.error('Error removing user:', error);
        });
    },
    sendUpdate() {
      alert('Changes saved successfully!');
      this.closeModal();
    },
    closeModal() {
      this.isVisible = false;
    }
  }
};
</script>


<style scoped>
.modal-overlay2 {
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  display: flex;
  justify-content: center;
  align-items: center;
  background-color: rgba(0, 0, 0, 0.6); 
  z-index: 9999;
}

.modal-content {
  background: white;
  padding: 20px;
  border-radius: 8px; /* Matched from .card class */
  box-shadow: 0 2px 10px rgba(0, 0, 0, 0.3); /* Matched from .card class */
  width: auto; /* Allows content to define width */
  max-width: 90%; /* Restricts maximum width */
  cursor: default; /* Ensures default cursor over the modal */
}

/* Styles for buttons within modal */
button {
  margin: 0 10px;
  padding: 10px 20px;
  border: none;
  border-radius: 5px;
  cursor: pointer;
  color: white;
  font-weight: bold;
  text-transform: uppercase;
}

.false-alarm-btn, .real-alarm-btn, .update-btn, .close-btn {
  background-color: #3498db; /* Apply consistent styling for buttons */
}

.close-btn {
  background-color: #555;
}

.btn-danger {
  background-color: #e74c3c; /* Red for critical actions like removal */
}

.btn-success {
  background-color: #2ecc71; /* Green for affirmative actions like add */
}
</style>

