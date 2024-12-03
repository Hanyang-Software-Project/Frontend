<template>
  <card class="card" title="Household Information">
    <div>
      <div class="row">
        <div class="col-md-5">
          <fg-input
            type="text"
            label="Household Name"
            :value="user.company"
            readonly
          >
          </fg-input>
        </div>
        <div class="col-md-3">
          <fg-input
            type="text"
            label="Username"
            :value="user.username"
            readonly
          >
          </fg-input>
        </div>
        <div class="col-md-4">
          <fg-input
            type="email"
            label="Email"
            :value="user.email"
            readonly
          >
          </fg-input>
        </div>
      </div>

      <div class="row">
        <div class="col-md-12">
          <fg-input
            type="text"
            label="Address"
            :value="user.address"
            readonly
          >
          </fg-input>
        </div>
      </div>

      <div class="row">
        <div class="col-md-4">
          <fg-input
            type="text"
            label="City"
            :value="user.city"
            readonly
          >
          </fg-input>
        </div>
        <div class="col-md-4">
          <fg-input
            type="text"
            label="Country"
            :value="user.country"
            readonly
          >
          </fg-input>
        </div>
        <div class="col-md-4">
          <fg-input
            type="number"
            label="Postal Code"
            :value="user.postalCode"
            readonly
          >
          </fg-input>
        </div>
      </div>

      <div class="row">
        <div class="col-md-12">
          <div class="form-group">
            <label>About Me</label>
            <textarea
              rows="5"
              class="form-control border-input"
              :value="user.aboutMe"
              readonly
            >
            </textarea>
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
    <edit-house-infos-modal ref="editHouseInfosModal" />
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
          company: "FamilyName",
          username: "Username",
          email: "Email@lg.com",
          address: "Home Address",
          city: "City",
          country: "Country",
          postalCode: "ZIP Code",
          aboutMe: "Here can be your description"
        }
      };
    },
    methods: {
      openModal() {
        this.$refs.editHouseInfosModal.openModal();
      }
    },
  };
</script>

<style>
</style>
