<template>
  <card class="card" title="Household Information" v-if="house && house.id">
    <div>
      <div class="row">
        <div class="col-md-5">
          <fg-input
            type="text"
            label="Household Name"
            :value="user.company"
            readonly
          ></fg-input>
        </div>
        <div class="col-md-3">
          <fg-input
            type="text"
            label="Username"
            :value="user.username"
            readonly
          ></fg-input>
        </div>
        <div class="col-md-4">
          <fg-input
            type="email"
            label="Email"
            :value="user.email"
            readonly
          ></fg-input>
        </div>
      </div>

      <div class="row">
        <div class="col-md-12">
          <fg-input
            type="text"
            label="Address"
            :value="user.address"
            readonly
          ></fg-input>
        </div>
      </div>

      <div class="row">
        <div class="col-md-4">
          <fg-input
            type="text"
            label="City"
            :value="user.city"
            readonly
          ></fg-input>
        </div>
        <div class="col-md-4">
          <fg-input
            type="text"
            label="Country"
            :value="user.country"
            readonly
          ></fg-input>
        </div>
        <div class="col-md-4">
          <fg-input
            type="number"
            label="Postal Code"
            :value="user.postalCode"
            readonly
          ></fg-input>
        </div>
      </div>

      <div class="row">
        <div class="col-md-12">
          <div class="form-group">
            <label>About Household</label>
            <textarea
              rows="5"
              class="form-control border-input"
              :value="user.aboutMe"
              readonly
            ></textarea>
          </div>
        </div>
      </div>

      <div class="text-center">
        <p-button type="info" round @click.native.prevent="openModal">
          Edit Profile
        </p-button>
      </div>
      <div class="clearfix"></div>
    </div>

    <!-- Only show the edit modal once we know house is defined -->
    <edit-house-infos-modal 
      ref="editHouseInfosModal"
      :houseId="house.id"
      :initialData="{ 
        company: house.houseName, 
        address: house.address, 
        city: 'City', 
        postalCode: 'ZIP Code' 
      }" 
    />
  </card>
</template>

<script>
import EditHouseInfosModal from './components/edit-house-infos-modal.vue';

export default {
  components: {
    EditHouseInfosModal
  },
  data() {
    return {
      user: {
        company: "",
        username: "",
        email: "",
        address: "",
        city: "",
        country: "",
        postalCode: "",
        aboutMe: ""
      },
      house: null // Declare house as a reactive property
    };
  },
  async mounted() {
    const userId = localStorage.getItem('userId');
    try {
      const response = await fetch(`${process.env.VUE_APP_URI_ROOT}/house/user/${userId}`, {
        method: 'GET',
        headers: {
          'Content-Type': 'application/json'
        }
      });
      const houses = await response.json();

      if (houses && houses.length > 0) {
        this.house = houses[0]; // Assign the fetched house to this.house

        this.user.company = this.house.houseName || "";
        this.user.address = this.house.address || "";
        this.user.username = localStorage.getItem('username') || "Username";
        this.user.email = localStorage.getItem('email') || "Email@lg.com";
        this.user.city = "City";
        this.user.country = "Country";
        this.user.postalCode = "ZIP Code";
        this.user.aboutMe = "Here can be your description";
      } else {
        console.log("No house data found for this user.");
      }
    } catch (e) {
      console.log(e);
    }
  },
  methods: {
    openModal() {
      this.$refs.editHouseInfosModal.openModal();
    }
  }
};
</script>

<style>
/* Add your styles here */
</style>
