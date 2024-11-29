<template>
    <div v-if="isVisible" class="modal-overlay" @click.self="closeModal">
      <div class="modal">
        <h4>Add Device</h4>
        <input 
          type="text"
          placeholder="Enter device name" 
          class="form-control"
          v-model="newDeviceName"
        />
        <div class="modal-actions">
          <button @click="confirmAddDevice">Add</button>
          <button @click="closeModal">Cancel</button>
        </div>
      </div>
    </div>
  </template>
  
  <script>
  export default {
    data() {
      return {
        isVisible: false,
        newDeviceName: "",
      };
    },
    methods: {
      openModal() {
        this.isVisible = true;
      },
      closeModal() {
        this.isVisible = false;
        this.newDeviceName = ""; // Reset the input field on modal close.
      },
      confirmAddDevice() {
        this.$emit('add-device', this.newDeviceName);
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
    background: rgba(0, 0, 0, 0.5);
    display: flex;
    justify-content: center;
    align-items: center;
  }
  .modal {
    background: white;
    padding: 20px;
    border-radius: 8px;
    width: 300px;
    text-align: center;
  }
  .modal-actions {
    margin-top: 20px;
    display: flex;
    justify-content: space-between;
  }
  </style>
  