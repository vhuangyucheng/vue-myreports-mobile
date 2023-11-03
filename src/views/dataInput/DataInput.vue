<script setup>
let show = ref(true);

</script>
<template>
  <van-tabs v-model:active="active" scrollspy sticky>
    <van-tab v-for="index in 8" :title="'选项 ' + index">
      内容 {{ index }}
      <br/>
      <br/>
      <br/>
      <br/>
      <br/>
      <br/>
      <br/>
      <br/>
      <div>dss</div>
    </van-tab>
  </van-tabs>
  <view style="padding-bottom: 30%;"></view>
</template>

<style scoped>

</style>