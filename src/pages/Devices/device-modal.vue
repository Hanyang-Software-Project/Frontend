<template>
    <div v-if="isVisible" class="modal-overlay" @click.self="closeModal">
      <div class="modal">
        <h4>Add Device</h4>
        <input 
          :value="newDeviceName"
          @input="$emit('update-name', $event.target.value)"
          placeholder="Enter device name" 
          class="form-control"
        />
        <div class="modal-actions">
          <button @click="$emit('add-device')">Add</button>
          <button @click="closeModal">Cancel</button>
        </div>
      </div>
    </div>
  </template>
  
  <script>
  export default {
    props: ['newDeviceName'],
    data() {
      return {
        isVisible: false,
      };
    },
    methods: {
      openModal() {
        this.isVisible = true;
      },
      closeModal() {
        this.isVisible = false;
      },
    },
  };
  </script>
  