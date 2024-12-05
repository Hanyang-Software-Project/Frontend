<template>
    <div v-if="isVisible" class="modal-overlay" @click="closeModal">
      <div class="modal-content">
        <h2>WARNING</h2>
        <p>Threat detected!</p>
        <button @click="closeModal">Close</button>
      </div>
      <!-- Hidden audio element -->
      <audio ref="warningSound" src="../../assets/audios/alarm-sound.wav" @ended="audioEnded"></audio>
    </div>
  </template>
  
  <script>
  export default {
    props: {
      isVisible: {
          type: Boolean,
          default: false
      }
    },
    methods: {
      closeModal() {
        this.$emit('update:isVisible', false);
        this.stopAudio();
      },
      playAudio() {
        if (this.$refs.warningSound) {
          this.$refs.warningSound.play();
        }
      },
      stopAudio() {
        if (this.$refs.warningSound) {
          this.$refs.warningSound.pause();
          this.$refs.warningSound.currentTime = 0; // Reset audio to start
        }
      },
      audioEnded() {
        console.log("Audio has finished playing");
      }
    },
    watch: {
      isVisible(newValue) {
        if (newValue) {
          this.playAudio();
        } else {
          this.stopAudio();
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
    background-color: rgba(255, 0, 0, 0.5); /* Red overlay for warning */
    display: flex;
    justify-content: center;
    align-items: center;
    z-index: 1000;
  }
  
  .modal-content {
    background-color: #fff;
    padding: 20px;
    border-radius: 10px;
    box-shadow: 0 2px 10px rgba(0, 0, 0, 0.3);
    text-align: center;
    border: 2px solid #ff0000; /* Red border for emphasis */
    width: 300px; /* Smaller width for the modal */
  }
  
  h2 {
    color: #ff0000; /* Red heading for warning */
    font-size: 24px;
    margin-bottom: 10px;
  }
  
  p {
    color: #333;
    font-size: 18px;
  }
  
  button {
    padding: 10px 20px;
    margin-top: 20px;
    cursor: pointer;
    border: none;
    background-color: #ff0000; /* Red background for warning button */
    color: white;
    border-radius: 5px;
    font-size: 16px;
    font-weight: bold;
    transition: background-color 0.3s ease;
  }
  
  button:hover {
    background-color: #cc0000; /* Darker red for hover effect */
  }
  </style>
  