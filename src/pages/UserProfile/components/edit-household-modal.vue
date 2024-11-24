<template>
    <div class="modal">
      <div class="modal-content">
        <h5>Edit Household</h5>
        <input v-model="household.name" placeholder="Household Name" />
        <select v-model="household.status">
          <option value="Available">Available</option>
          <option value="Busy">Busy</option>
          <option value="Offline">Offline</option>
        </select>
        <button @click="updateHousehold">Update</button>
        <button @click="$emit('close')">Close</button>
      </div>
    </div>
  </template>
  
  <script>
  

  export default {
    created() {
      console.log('Modal created with household:', this.household);
    },
    props: ['household'],
    methods: {
      updateHousehold() {
        // Logic to update household details
        alert('Household updated!');
        this.$emit('close');
      }
    }
  };
  </script>


<style>
  

  
</style>
  