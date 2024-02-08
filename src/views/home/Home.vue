<script setup>
import goBackArrow from "../../store/goBackArrow";
const store = goBackArrow();
store.disableGoBackArrow();
store.setPageName("主页Homepage");

const images = [
  '/s4a-module-with-pallet.png',
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