<template>
  <div>
    <div class="device-cards-container">
      <BasicCard
        textContent="Add New Device"
        iconClass="big-plus-icon"
        :onClick="openAddDeviceModal"
        borderStyle="dashed"
        iconContent="+"
        class="add-device-card"
      />
      <BasicCard
        v-for="device in devices"
        :ref="device.id"

        :textContent="device.name"
        iconClass="ti-microphone"
        :onClick="() => openShowDeviceModal(device.name)"
        borderStyle="solid"
        class="device-card"
      />
    </div>
    <ModalLayout :visible="choiceModalOpened" modalTitle="What type of device ?" @update:visible="choiceModalOpened = $event">
      Hello world
    </ModalLayout>
    <ModalLayout :visible="showDeviceModalOpened" :modalTitle="currentDevice" @update:visible="showDeviceModalOpened = $event">
      Goodbye world
    </ModalLayout>
  </div>
</template>

<script>
import ModalLayout from '../layout/ModalLayout.vue';
import BasicCard from '../components/Cards/BasicCard.vue';

export default {
  components: {
    BasicCard,
    ModalLayout
  },
  data() {
    return {
      devices: [
        {id:1, name: 'device 1'}, 
        {id:2, name: 'device 2'},
        {id:3, name: 'device 3'},
        {id:4, name: 'device 4'},
        {id:5, name: 'device 5'},
        {id:6, name: 'device 6'},
        {id:7, name: 'device 7'},
        {id:8, name: 'device 8'}
      ],
      choiceModalOpened: false,
      showDeviceModalOpened: false,
      currentDevice: ''
    };
  },
  methods: {
    openAddDeviceModal() {
      this.choiceModalOpened = true
    },
    openShowDeviceModal(deviceName){
      this.currentDevice = deviceName
      this.showDeviceModalOpened = true
    },
    addDevice(name) {
      if (name.trim()) {
        this.devices.push({
          id: Date.now(),
          name: name,
        });
        this.closeModal();
      }
    }
  },
};
</script>

<style>
.device-cards-container{
  display: flex;
  justify-content: space-evenly;
  flex-wrap: wrap;
}

.device-cards-container *{
  flex: 0 0 22%;
  margin-bottom: 20px;
}

.device-cards-container .add-device-card{
  flex-basis: 30%;
}
</style>
