<template>
  <div class="row">
    <div class="col-xl-4 col-lg-5 col-md-6">
      <div class="add-device-box" @click="openModal">
        <i class="big-plus-icon">+</i>
        <p>Add New Device</p>
      </div>
    </div>
    <div class="col-xl-8 col-lg-7 col-md-6">
      <div class="device-list">
        <div 
          class="device-box" 
          v-for="device in devices" 
          :key="device.id"
        >
          <p>{{ device.name }}</p>
        </div>
      </div>
    </div>
    <add-device-modal ref="addDeviceModal"/>
  </div>
</template>

<script>
import AddDeviceModal from './Devices/device-modal.vue'

export default {
  components: {
    AddDeviceModal
  },
  data() {
    return {
      devices: [],
    };
  },
  methods: {
    openModal() {
      this.$refs.addDeviceModal.openModal();
    },
    closeModal() {
      this.$refs.addDeviceModal.closeModal();
    },
    addDevice(name) {
      if (name.trim()) {
        this.devices.push({
          id: Date.now(),
          name: name,
        });
        this.closeModal();
      }
    },
  },
};
</script>

<style>
.add-device-box {
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  height: 150px;
  border: 2px dashed #ccc;
  border-radius: 8px;
  cursor: pointer;
  transition: background-color 0.3s;
}
.add-device-box:hover {
  background-color: #f5f5f5;
}
.big-plus-icon {
  font-size: 48px;
  color: #555;
}
.device-list {
  display: flex;
  flex-wrap: wrap;
  gap: 10px;
}
.device-box {
  background-color: #f9f9f9;
  border: 1px solid #ddd;
  border-radius: 8px;
  padding: 10px 20px;
  text-align: center;
}
</style>
