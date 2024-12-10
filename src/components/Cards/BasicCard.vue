<template>
    <div class="basic-card-box" @click="onClick" :style="{borderColor: borderColor, borderStyle: borderStyle}">
        <i v-if="iconClass !== undefined" :class="iconClass + ' box-icon'">{{ iconContent }}</i>
        <div v-if="imgSrc !== undefined" class="img-container">
            <img
              :src="imgSrc"
              :alt="imgAlt"
              class="card-img"
            />
          </div>
        <p>{{ textContent }}</p>
    </div>
</template>
<script>
export default{
    props: {
        textContent: String,
        iconClass: String,
        imgSrc: String,
        imgAlt: {
            type: String,
            default: ''
        },
        onClick: Function,
        borderStyle: {
            type: String,
            default: 'solid'
        },
        borderColor: {
            type: String,
            default: '#ccc'
        },
        iconContent: {
            type: String,
            default: ''
        }
    }
}
</script>
<style>
.basic-card-box {
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  height: 150px;
  border-width: 2px;
  border-radius: 8px;
  cursor: pointer;
  transition: background-color 0.3s;
}
.basic-card-box:hover {
  background-color: #f5f5f5;
}

.box-icon {
  font-size: 48px;
  color: #555;
}

.img-container {
  width: 70px;
  height: 70px;
  display: flex;
  justify-content: center;
  align-items: center;
}

.card-img {
  width: 100%;
  height: 100%;
  object-fit: contain;
}
</style>