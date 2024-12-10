<template>
  <div v-if="isVisible" class="modal-overlay2" @click.self="closeModal">
    <div class="modal-content" @click.stop>
      
      <card title="Confirm Alarm Status">
        <p>Is this a false or real alarm?</p>
        <button @click="handleAlarm('false')" class="false-alarm-btn">False Alarm</button>
        <button @click="handleAlarm('real')" class="real-alarm-btn">Real Alarm</button>
        <button @click="closeModal" class="close-btn">Close</button>
    </card>
    </div>
  </div>
</template>

<script>
import axios from 'axios'; 

export default {
  props: {
    isVisible: {
      type: Boolean,
      default: false
    },
    currentItem: Object
  },
  methods: {
    handleAlarm(type) {
      const threatFlag = type === 'real'; // Converts 'real' to true, any other value to false
      axios.put(`${process.env.VUE_APP_URI_ROOT}/alerts/${this.currentItem.alertId}`, {
        threatFlag: threatFlag
      })
      .then(() => {
        this.$emit('alarmHandled', { type, item: this.currentItem });
        console.log('Alarm status updated successfully');
      })
      .catch(error => {
        console.error('Error updating alarm status:', error);
      })
      .finally(() => {
        this.closeModal();
      });
    },
    closeModal() {
      this.$emit('update:isVisible', false);
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
  background-color: rgba(0, 0, 0, 0.5);
  display: flex;
  justify-content: center;
  align-items: center;
  z-index: 9999; /* Ensuring it covers other elements */
}

.modal-content {
  background-color: white;
  padding: 20px;
  border-radius: 8px; /* Matched from .card class */
  box-shadow: 0 2px 10px rgba(0, 0, 0, 0.3); /* Matched from .card class */
  width: auto; /* Allows content to define width */
  max-width: 90%; /* Restricts maximum width */
}

/* Button styles to match the update-btn and close-btn classes */
button {
  margin: 3px 10px; /* Spacing between buttons */
  padding: 10px 20px; /* Larger clickable area for better UX */
  border: none;
  border-radius: 5px;
  cursor: pointer;
  color: white; /* Ensures text is white */
  font-weight: bold;
  text-transform: uppercase; /* Makes text uppercase for visual consistency */
}

/* Specific styles for types of buttons */
.false-alarm-btn {
  background-color: #5a9bf1; /* Blue background for 'False Alarm' */
}

.real-alarm-btn {
  background-color: #f76e5f; /* Red background for 'Real Alarm' */
}

.close-btn {
  background-color: #555; /* Neutral darker background for 'Close' */
}
</style>
