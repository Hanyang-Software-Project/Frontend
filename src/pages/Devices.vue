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
      <button type="button" class="btn btn-danger mr-2" @click="removeDevice">Remove Device</button>
      <button type="button" class="btn btn-warning ml-2" @click="updateDevice">Change Name</button>
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
      currentDevice: {}
    };
  },
  async mounted(){
    try{
      this.authToken = 'Bearer ' + localStorage.getItem('authToken')
      this.devices = await Vue.reqFetch(
        'GET',
        'http://localhost:8080/devices/user/' + localStorage.getItem('userId'),
        {
          'Content-Type': 'application/json',
          'Authorization': this.authToken
        }
      );
    } catch(e) {
      console.log(e)
    }
  },
  methods: {
    openAddDeviceModal() {
      this.choiceModalOpened = true
    },
    openShowDeviceModal(device){
      this.currentDevice = device
      this.showDeviceModalOpened = true
    },
    async addHostDevice(){
      const hostDeviceName = prompt("What is your new device name ?")
      if(!hostDeviceName || !hostDeviceName.trim()) return;

      try{
        const addedDevice = await this.saveDevice(hostDeviceName.trim())

        //TODO: Start listening in a new tab
        const routeData = this.$router.resolve({name: 'recording'});
        window.open(routeData.href, '_blank');

        this.devices.push(addedDevice)
        this.choiceModalOpened = false
      } catch(e){
        console.log(e)
      }
    },
    addOtherDevice(){
      alert("Go to this link on the other device. [link]")
      this.choiceModalOpened = false
    },
    async saveDevice(deviceName){
      try{
        return await Vue.reqFetch(
          'POST',
          'http://localhost:8080/devices',
          {'Content-Type':'application/json', Authorization: this.authToken},
          {
            deviceName: deviceName,
            userId: localStorage.getItem('userId')
          }
        )
      } catch (e) {
        throw new Error(e)
      }
    },
    async removeDevice(){
      console.log('TODO: remove device ' + this.currentDevice.deviceId)
      try{
        await Vue.reqFetch(
          'DELETE',
          'http://localhost:8080/devices/' + this.currentDevice.deviceId,
          {Authorization: this.authToken}
        );
        this.devices = this.devices.filter(device => device.deviceId !== this.currentDevice.deviceId)
        this.showDeviceModalOpened = false
      } catch(e) {
        console.log('Removal err: ' + e);
      }
    },
    async updateDevice(){
      const newName = prompt("What is your device new name ?")
      if(!newName || !newName.trim()) return;

      try{
        await Vue.reqFetch(
          'PUT',
          'http://localhost:8080/devices/' + this.currentDevice.deviceId,
          {'Content-Type':'application/json', Authorization: this.authToken},
          {
            deviceName: newName.trim()
          }
        )

        this.currentDevice.deviceName = newName
        this.showDeviceModalOpened = false
      } catch(e){
        console.log(e)
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
