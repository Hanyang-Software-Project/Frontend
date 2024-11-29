<template>
  <div v-if="isVisible" class="modal-overlay" @click.self="closeModal">
    <card class="card" title="Edit Household Information">
      <form @submit.prevent="updateProfile" class="form">
        <div class="row">
          <fg-input
            type="text"
            label="Household Name"
            placeholder="FamilyName"
            v-model="user.company"
          >
          </fg-input>
        </div>
        <div class="row">
          <fg-input
            type="text"
            label="Address"
            placeholder="Home Address"
            v-model="user.address"
          >
          </fg-input>
        </div>
        <div class="row">
          <fg-input
            type="text"
            label="City"
            placeholder="City"
            v-model="user.city"
          >
          </fg-input>
        </div>
        <div class="row">
          <fg-input
            type="number"
            label="Postal Code"
            placeholder="ZIP Code"
            v-model="user.postalCode"
          >
          </fg-input>
        </div>
        <div class="button-group text-center">
          <button class="update-btn" @click="updateProfile">Update Profile</button>
          <button class="close-btn" @click="closeModal">Close</button>
        </div>
      </form>
    </card>
  </div>
</template>

<script>
export default {
  data() {
    return {
      isVisible: false,
      user: {
        company: "",
        address: "",
        city: "",
        postalCode: ""
      },
    };
  },
  methods: {
    openModal() {
      this.isVisible = true;
    },
    closeModal() {
      this.isVisible = false;
    },
    updateProfile() {
      alert(`Profile Updated: ${JSON.stringify(this.user)}`);
      this.closeModal();
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
  background-color: rgba(0, 0, 0, 0.5);
  display: flex;
  justify-content: center;
  align-items: center;
  z-index: 1000;
}

.card {
  background-color: white;
  padding: 20px;
  border-radius: 8px;
  box-shadow: 0 2px 10px rgba(0, 0, 0, 0.3);
  width: auto;
  max-width: 90%;
}

.button-group {
  margin-top: 20px; /* Space between input fields and buttons */
}

.update-btn, .close-btn {
  margin: 0 10px; /* Spacing between buttons */
  padding: 10px 20px; /* Larger clickable area */
  border: none;
  border-radius: 5px;
  cursor: pointer;
  color: white; /* Text color */
  font-weight: bold;
}

.update-btn {
  background-color: #4CAF50; /* Green background for update */
}

.close-btn {
  background-color: #f44336; /* Red background for close */
}
</style>
