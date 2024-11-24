<template>
  <div class="modal" v-if="visible">
    <div class="modal-content">
      <h5>Invite New Member</h5>
      <input type="email" v-model="email" placeholder="Enter email address" class="email-input"/>
      <div class="button-group">
        <button @click="sendInvite" class="btn btn-primary">Send Invite</button>
        <button @click="closeModal" class="btn btn-secondary">Close</button>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  data() {
    return {
      email: '',
      visible: true,  // Visibility is controlled by this property
    };
  },
  methods: {
    sendInvite() {
      if (this.email) {
        console.log(`Invite sent to ${this.email}`);  // Replace this with your actual invite logic
        this.email = ''; // Clear the input after sending the invite
        this.closeModal(); // Close the modal after sending the invite
      } else {
        alert("Please enter a valid email address."); // Basic validation feedback
      }
    },
    closeModal() {
      this.visible = false;
      this.$emit('close'); // Emit close event to potentially handle more actions in the parent component
    }
  }
};
</script>

<style scoped>
.modal {
  position: fixed;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  width: 400px;
  background-color: white;
  padding: 20px;
  box-shadow: 0 4px 8px rgba(0,0,0,0.1);
  z-index: 1000;
  border-radius: 8px;
}

.modal-content {
  display: flex;
  flex-direction: column;
}

.email-input {
  margin-bottom: 20px;
  padding: 10px;
  font-size: 16px;
  border: 1px solid #ccc;
  border-radius: 4px;
}

.button-group {
  display: flex;
  justify-content: space-between;
}

.btn {
  padding: 10px 20px;
  border: none;
  border-radius: 4px;
  cursor: pointer;
}

.btn-primary {
  background-color: #007BFF;
  color: white;
}

.btn-secondary {
  background-color: #6c757d;
  color: white;
}

.btn:hover {
  opacity: 0.8;
}
</style>
