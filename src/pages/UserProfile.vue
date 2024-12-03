<template>
  <div class="row">
    <div class="col-xl-6 col-lg-6 col-md-8">
      <house-member> </house-member>
    </div>
    <div class="col-xl-6 col-lg-6 col-md-4">
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
<style>
  modal-overlay {
    z-index: 1050; /* Bootstrap's modal z-index starts around 1040 */
    position: fixed;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    display: flex;
    justify-content: center;
    align-items: center;
    background-color: rgba(0, 0, 0, 0.5);
  }
</style>
