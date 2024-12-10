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
          ></fg-input>
        </div>
        <div class="row">
          <fg-input
            type="text"
            label="Address"
            placeholder="Home Address"
            v-model="user.address"
          ></fg-input>
        </div>
        <div class="row">
          <fg-input
            type="text"
            label="City"
            placeholder="City"
            v-model="user.city"
          ></fg-input>
        </div>
        <div class="row">
          <fg-input
            type="number"
            label="Postal Code"
            placeholder="ZIP Code"
            v-model="user.postalCode"
          ></fg-input>
        </div>
        <div class="button-group text-center">
          <button class="update-btn" type="submit">Update Profile</button>
          <button class="close-btn" type="button" @click="closeModal">
            Close
          </button>
        </div>
      </form>
    </card>
  </div>
</template>

<script>
export default {
  props: {
    houseId: {
      type: Number,
      required: true
    },
    initialData: {
      type: Object,
      default: () => ({
        company: "",
        address: "",
        city: "",
        postalCode: ""
      })
    }
  },
  data() {
    return {
      isVisible: false,
      user: {
        company: "",
        address: "",
        city: "",
        postalCode: ""
      },
      authToken: ''
    };
  },
  mounted() {
    // Initialize user data from props
    this.user = { ...this.initialData };

    // Retrieve authToken from localStorage
    this.authToken = 'Bearer ' + localStorage.getItem('authToken');
  },
  methods: {
    openModal() {
      // Re-initialize form fields if needed
      this.user = { ...this.initialData };
      this.isVisible = true;
    },
    closeModal() {
      this.isVisible = false;
    },
    async updateProfile() {
      // Prepare the payload for updating the house data
      const payload = {
        houseName: this.user.company,
        address: this.user.address
        // If the API supports city/postalCode directly, include them:
        // city: this.user.city,
        // postalCode: this.user.postalCode
      };

      try {
        const response = await fetch(
          `${process.env.VUE_APP_URI_ROOT}/house/${this.houseId}`,
          {
            method: 'PUT',
            headers: {
              'Content-Type': 'application/json',
              'Authorization': this.authToken
            },
            body: JSON.stringify(payload)
          }
        );

        if (!response.ok) {
          const errorText = await response.text();
          console.error('Failed to update profile:', errorText);
          alert(`Failed to update profile: ${errorText}`);
          return;
        }

        // On success, you might want to refetch data in the parent component
        // or emit an event so the parent can refresh the displayed info.
        
        alert(`Profile Updated Successfully!`);
        this.closeModal();
      } catch (e) {
        console.error('Error updating profile:', e);
        alert('Error updating profile. Check console for details.');
      }
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
  margin-top: 20px;
}

.update-btn,
.close-btn {
  margin: 0 10px;
  padding: 10px 20px;
  border: none;
  border-radius: 5px;
  cursor: pointer;
  color: white;
  font-weight: bold;
}

.update-btn {
  background-color: #4caf50;
}

.close-btn {
  background-color: #f44336;
}
</style>
