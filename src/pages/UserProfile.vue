<template>
  <div class="row">
    <div class="col-xl-4 col-lg-5 col-md-6">
 <!--     <user-card> </user-card>  -->
      <house-card> </house-card>
    </div>
    <div class="col-xl-8 col-lg-7 col-md-6">
      <edit-profile-form> </edit-profile-form>
    </div>
  </div>
</template>
<script>
import EditProfileForm from "./UserProfile/EditProfileForm.vue";
import UserCard from "./UserProfile/UserCard.vue";
import HouseCard from "./UserProfile/HouseCard.vue";
export default {
  components: {
    EditProfileForm,
    UserCard,
    HouseCard,
  },
};
</script>
<style></style>
