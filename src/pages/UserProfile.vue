<template>
  <div class="row">
    <div class="col-xl-4 col-lg-5 col-md-6">
      <house-member> </house-member>
    </div>
    <div class="col-xl-8 col-lg-7 col-md-6">
      <house-infos> </house-infos>
    </div>
  </div>
</template>
<script>
import HouseInfos from "./UserProfile/HouseInfos.vue";
import HouseMember from "./UserProfile/HouseMember.vue";
export default {
  components: {
    HouseInfos,
    HouseMember,
  },
};
</script>
<style></style>
