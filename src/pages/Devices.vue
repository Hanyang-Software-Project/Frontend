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
        :key="device.deviceId"
        :ref="device.deviceId"
        :textContent="device.deviceName"
        iconClass="ti-microphone"
        :onClick="() => openShowDeviceModal(device)"
        borderStyle="solid"
        class="device-card"
      />
    </div>

    <ModalLayout
      :visible="choiceModalOpened"
      modalTitle="What type of device?"
      @update:visible="choiceModalOpened = $event"
    >
      <div id="add-device-modal-content">
        <BasicCard
          textContent="Add this device"
          iconClass="ti-desktop"
          :onClick="addHostDevice"
          borderColor="black"
          class="choiceCard m-2"
        />
        <div
          class="choiceCard m-2"
          :style="{ borderColor: 'black' }"
          @click="togglePopup"
        >
          <div class="icon-container">
            <img
              src="@/assets/img/LG_DEVICES.png"
              alt="LG Smart Home"
              class="icon-image"
            />
          </div>
          <p>Add LG Smart Device</p>
        </div>
      </div>
    </ModalLayout>

    <!-- LG Devices Popup -->
    <div v-if="showPopup" class="popup-overlay" @click.self="togglePopup">
      <div class="popup">
        <button class="close-button" @click="togglePopup">×</button>
        <h3>Select a Smart Device</h3>
        <input
          type="text"
          placeholder="Search device name"
          class="search-field"
          v-model="searchQuery"
        />
        <ul class="device-list">
          <li v-for="lgDevice in filteredDevices" :key="lgDevice" @click="selectLGDevice(lgDevice)">
            {{ lgDevice }}
          </li>
        </ul>
      </div>
    </div>

    <ModalLayout
      :visible="showDeviceModalOpened"
      :modalTitle="currentDevice.deviceName"
      @update:visible="showDeviceModalOpened = $event"
    >
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
      currentDevice: {},
      showPopup: false,
      searchQuery: "",
      LGdevices: ["Washers", "Dryers", "Refrigerator", "Air Conditioners", "TV"],
      authToken: ''
    };
  },
  computed: {
    filteredDevices() {
      return this.LGdevices.filter(device =>
        device.toLowerCase().includes(this.searchQuery.toLowerCase())
      );
    }
  },
  async mounted() {
    try {
      this.authToken = 'Bearer ' + localStorage.getItem('authToken');
      this.devices = await Vue.reqFetch(
        'GET',
        'http://3.24.110.71:8080/devices/user/' + localStorage.getItem('userId'),
        {
          'Content-Type': 'application/json',
          'Authorization': this.authToken
        }
      );
    } catch (e) {
      console.log(e);
    }
  },
  methods: {
    togglePopup() {
      this.showPopup = !this.showPopup;
    },

    openAddDeviceModal() {
      this.choiceModalOpened = true;
    },

    openShowDeviceModal(device) {
      this.currentDevice = device;
      this.showDeviceModalOpened = true;
    },

    async addHostDevice() {
      const hostDeviceName = prompt("What is your new device name?");
      if (!hostDeviceName || !hostDeviceName.trim()) return;

      try {
        const addedDevice = await this.saveDevice(hostDeviceName.trim());
        Vue.createCookie('recordDeviceId', addedDevice.deviceId, 365);

        const routeData = this.$router.resolve({ name: 'recording' });
        window.open(routeData.href, '_blank');

        this.devices.push(addedDevice);
        this.choiceModalOpened = false;
      } catch (e) {
        console.log(e);
      }
    },

    async saveDevice(deviceName) {
      try {
        return await Vue.reqFetch(
          'POST',
          'http://3.24.110.71:8080/devices',
          { 'Content-Type': 'application/json', 'Authorization': this.authToken },
          {
            deviceName: deviceName,
            userId: localStorage.getItem('userId')
          }
        );
      } catch (e) {
        throw new Error(e);
      }
    },

    async removeDevice() {
      try {
        await Vue.reqFetch(
          'DELETE',
          'http://3.24.110.71:8080/devices/' + this.currentDevice.deviceId,
          { 'Authorization': this.authToken }
        );

        const hostDeviceId = Vue.getCookie('recordDeviceId');
        if (this.currentDevice.deviceId === hostDeviceId) {
          Vue.removeCookie('recordDeviceId');
        }

        this.devices = this.devices.filter(device => device.deviceId !== this.currentDevice.deviceId);
        this.showDeviceModalOpened = false;
      } catch (e) {
        console.log('Removal error:', e);
      }
    },

    async updateDevice() {
      const newName = prompt("What is your device new name?");
      if (!newName || !newName.trim()) return;

      try {
        await Vue.reqFetch(
          'PUT',
          'http://3.24.110.71:8080/devices/' + this.currentDevice.deviceId,
          { 'Content-Type': 'application/json', 'Authorization': this.authToken },
          { deviceName: newName.trim() }
        );

        this.currentDevice.deviceName = newName;
        this.showDeviceModalOpened = false;
      } catch (e) {
        console.log(e);
      }
    },

    selectLGDevice(lgDevice) {
      // Implement logic to handle the selection of an LG device from the list.
      // For example, you could prompt the user for a custom name, then call saveDevice().
      const chosenName = prompt(`You selected ${lgDevice}. Please give your device a name:`);
      if (!chosenName || !chosenName.trim()) return;

      this.saveDevice(chosenName.trim())
        .then(addedDevice => {
          this.devices.push(addedDevice);
          Vue.createCookie('recordDeviceId', addedDevice.deviceId, 365);
          this.showPopup = false;
          this.choiceModalOpened = false;
        })
        .catch(e => console.log(e));
    }
  }
};
</script>

<style scoped>
.choiceCard {
  border: 1px solid;
  display: flex;
  flex-direction: column;
  align-items: center;
  padding: 10px;
  cursor: pointer;
  width: 180px;
}

.icon-container {
  width: 70px;
  height: 70px;
  display: flex;
  justify-content: center;
  align-items: center;
}

.icon-image {
  width: 100%;
  height: 100%;
  object-fit: contain;
}

.device-cards-container {
  display: flex;
  justify-content: space-evenly;
  flex-wrap: wrap;
}

.device-cards-container > * {
  flex: 0 0 22%;
  margin-bottom: 20px;
}

.device-cards-container .add-device-card {
  flex-basis: 30%;
}

#add-device-modal-content {
  display: flex;
  justify-content: space-between;
}

#add-device-modal-content .choiceCard {
  min-width: 175px;
}

.popup-overlay {
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background-color: rgba(0,0,0,0.4);
  display: flex;
  justify-content: center;
  align-items: center;
  z-index: 20001; /* Even higher than the overlay */
  position: relative;
}

.popup {
  background: #fff;
  padding: 20px;
  border-radius: 8px;
  max-width: 300px;
  width: 130%;
  z-index: 9999;
}

.close-button {
  float: right;
  background: none;
  border: none;
  font-size: 18px;
  cursor: pointer;
}

.search-field {
  width: 100%;
  padding: 5px;
  margin-bottom: 10px;
}

.device-list {
  list-style: none;
  padding: 0;
  margin: 0;
}

.device-list li {
  padding: 5px 0;
  cursor: pointer;
  border-bottom: 1px solid #ccc;
  text-transform: capitalize;
}

.device-list li:hover {
  background: #f0f0f0;
}

@media only screen and (max-width: 600px) {
  .device-cards-container > * {
    flex-basis: 30%;
  }

  #add-device-modal-content {
    flex-direction: column;
  }
}

@media only screen and (max-width: 400px) {
  .device-cards-container > * {
    flex-basis: 47%;
  }

  .device-cards-container > * > * {
    margin: 0;
    position: relative;
    top: 15px;
  }

  #add-device-modal-content p {
    font-size: 1em;
  }
}
</style>
