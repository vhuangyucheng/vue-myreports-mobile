<script setup>
const active = ref(0)
const onClickLeft = () => history.back();
import goBackArrow from './store/goBackArrow';
const goBackArrowStore = goBackArrow();
goBackArrowStore.disableGoBackArrow();
goBackArrowStore.setPageName("主页Homepage")
</script>

<template>

  <van-nav-bar safe-area-inset-top
               :title="goBackArrowStore.name"
               :left-text="goBackArrowStore.leftArrow === true?'返回Back':''"
               :left-arrow="goBackArrowStore.leftArrow === true"
               @click-left="onClickLeft">
    <template #right>
      <van-icon name="/fullLogo2.svg" size="85" />
    </template>
  </van-nav-bar>


  <routerView/>

  <van-tabbar v-model="active" :safe-area-inset-bottom="true"  :placeholder="true">
    <van-tabbar-item name="search" icon="home-o"  to="/comment">评论Comment</van-tabbar-item>
    <van-tabbar-item name="home" icon="search" to="/DataInput">数据Input</van-tabbar-item>
    <van-tabbar-item name="friends" icon="friends-o" to="/ListTicket">工单Ticket</van-tabbar-item>
    <van-tabbar-item name="setting" icon="setting-o" to="/Setting">设置Setting</van-tabbar-item>
  </van-tabbar>


</template>

<style scoped>
.my-top {
  color: #1c2127;
  font-size: 20px;
  line-height: 50px;
}
</style>

