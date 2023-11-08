<script setup>
const images = [
  'public/s4a-module-with-pallet.jpg',
    '/welcome.png',
    '/panel.png',

];
</script>

<template>
  <van-swipe  :autoplay="4000"  :height="600">
    <van-swipe-item v-for="image in images" :key="image">
      <img :src="image" class="fill-container" />
    </van-swipe-item>
  </van-swipe>
</template>

<style scoped>
.fill-container {
  width: 100%; /* Make the image width 100% of the container's width */
  height: 100%; /* Make the image height 100% of the container's height */
}
</style>