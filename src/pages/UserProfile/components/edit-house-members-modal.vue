<template>
  <div v-if="isVisible" class="modal-overlay" @click.self="closeModal">
    <card class="card card-popup" title="Edit Household Members">
      <div>
        <ul class="list-unstyled">
          <li v-for="user in users" :key="user.username" class="row mb-2">
            <div class="col-3">
              <span>{{ user.name }}</span>
            </div>
            <div class="col-3">
              <span>{{ user.username }}</span>
            </div>
            <div class="col-4">
              <span>{{ user.email }}</span>
            </div>
            <div class="col-2">
              <button class="btn btn-danger btn-sm" @click="removeUser(user.username)">Remove</button>
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
</template>

<script>
import axios from 'axios'; // Make sure axios is imported if you're using it for API calls

export default {
  data() {
    return {
      users: [], // This will store user data fetched from the API or mock data
      newUsername: '',
      email: '',
      isVisible: false,
    };
  },
  methods: {
    openModal() {
      this.isVisible = true;
      this.fetchUsers(); // Fetch users when the modal is opened
    },
    fetchUsers() {
      // Replace with actual API call to fetch users
      // axios.get('/api/users').then(response => {
      //   this.users = response.data;
      // });
      // Mock data for testing without API
      this.users = [
        { username: "mother", name: "Jane Doe", email: "jane@example.com" },
        { username: "father", name: "John Doe", email: "john@example.com" },
      ];
    },
    addUser() {
      // Here you would ideally check if the user exists and then add them to the household
      // This is a placeholder for demonstration
      let newUser = { username: this.newUsername, name: "New User", email: "new@example.com" };
      this.users.push(newUser);
      this.newUsername = ''; // Reset the input field after adding
    },
    removeUser(username) {
      this.users = this.users.filter(user => user.username !== username);
    },
    sendUpdate() {
      // Placeholder for sending update to server
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
.modal-overlay {
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  display: flex;
  justify-content: center;
  align-items: center;
  background-color: rgba(0, 0, 0, 0.6); 
  z-index: 1030; 
}
</style>
