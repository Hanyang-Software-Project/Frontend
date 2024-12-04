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
        :ref="device.deviceId"

        :textContent="device.deviceName"
        iconClass="ti-microphone"
        :onClick="() => openShowDeviceModal(device)"
        borderStyle="solid"
        class="device-card"
      />
    </div>
    <ModalLayout :visible="choiceModalOpened" modalTitle="What type of device ?" @update:visible="choiceModalOpened = $event">
      <div id="add-device-modal-content">
        <BasicCard
          textContent="Add this device"
          iconClass="ti-desktop"
          :onClick="addHostDevice"
          borderColor="black"
          class="choiceCard m-2"
        />
        <BasicCard
          textContent="Add another device"
          iconClass="ti-mobile"
          :onClick="addHostDevice"
          borderColor="black"
          class="choiceCard m-2"
        />
      </div>
    </ModalLayout>
    <ModalLayout :visible="showDeviceModalOpened" :modalTitle="currentDevice.deviceName" @update:visible="showDeviceModalOpened = $event">
      <button type="button" class="btn btn-danger" @click="removeDevice">Remove Device</button>
    </ModalLayout>
  </div>
</template>

<script>
import ModalLayout from '../layout/ModalLayout.vue';
import BasicCard from '../components/Cards/BasicCard.vue';
import Vue from 'vue';

export default {
  components: {
    BasicCard,
    ModalLayout
  },
  data() {
    return {
      devices: [],
      choiceModalOpened: false,
      showDeviceModalOpened: false,
      currentDevice: ''
    };
  },
  async mounted(){
    this.devices = await Vue.reqFetch(
      'GET',
      'http://localhost:8080/devices/user/' + localStorage.getItem('userId'),
      {
        'Content-Type': 'application/json',
        'Authorization': 'Bearer ' + localStorage.getItem('authToken')
      }
    );
  },
  methods: {
    openAddDeviceModal() {
      this.choiceModalOpened = true
    },
    openShowDeviceModal(device){
      this.currentDevice = device
      this.showDeviceModalOpened = true
    },
    addHostDevice(){
      const hostDeviceName = prompt("What is your new device name ?").trim()
      //TODO: Save device in the DB
      //TODO: Start listening in a new tab
      if(hostDeviceName !== ''){
        this.devices.push({id: this.devices.at(-1).id + 1, name: hostDeviceName})
        this.choiceModalOpened = false
      }
    },
    addOtherDevice(){
      alert("Go to this link on the other device. [link]")
      this.choiceModalOpened = false
    },
    removeDevice(){
      console.log('TODO: remove device ' + this.currentDevice.deviceId)
      this.devices = this.devices.filter(device => device.id !== this.currentDevice.deviceId)
      this.showDeviceModalOpened = false
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

#add-device-modal-content{
  display: flex;
  justify-content: space-between;
}

#add-device-modal-content .choiceCard{
  min-width: 175px;
}

@media only screen and (max-width: 600px) {
  .device-cards-container > *{
    flex-basis: 30%;
  }

  #add-device-modal-content{
    flex-direction: column;
  }
}

@media only screen and (max-width: 400px) {
  .device-cards-container *{
    flex-basis: 47%;
  }

  .device-cards-container > * > *{
    margin: 0;
    position: relative;
    top: 15px
  }

  #add-device-modal-content p {
    font-size: 1em;
  }
}
</style>
