<script setup>
import goBackArrow from "../../store/goBackArrow";

const store = goBackArrow();
store.disableGoBackArrow();
store.setPageName("工单列表ListTicket");

import {showToast} from 'vant';

const value1 = ref(1);
const value2 = ref(0);
const option1 = [
  {text: 'Status:全部ALL', value: 0},
  {text: 'Status:Open', value: 1},
  {text: 'Status:Close', value: 2},
];
const option2 = [
  {text: '常驻Duration:ALL', value: 0},
  {text: 'Duration:ThatDay', value: 1},
  {text: 'Duration:Permanent', value: 2},
];

const dataList = ref([]);
const loading = ref(false);
const finished = ref(false);
const refreshing = ref(false);

const onLoad = () => {
  setTimeout(() => {
    if (refreshing.value) {
      dataList.value = [];
      refreshing.value = false;
    }
    getDataList();
    loading.value = false;

    finished.value = true;
  }, 1000);
};

const onRefresh = () => {
  // 清空列表数据
  finished.value = false;

  // 重新加载数据
  // 将 loading 设置为 true，表示处于加载状态
  loading.value = true;
  onLoad();
};

const offset = ref({y: 400});
const offset2 = ref({y: 500});

const onOffsetChange = (offset) => {
  // showToast(`x: ${offset.x.toFixed(0)}, y: ${offset.y.toFixed(0)}`);
};

const onOffsetChange2 = (offset) => {
  // showToast(`x: ${offset.x.toFixed(0)}, y: ${offset.y.toFixed(0)}`);
};

const router = useRouter();
const onCreate = () => {
  router.push({path: 'saveTicket'})
}

import axios from "axios";

const getDataList = () => {
  axios(
      {
        url: "/apiStringer/ticket/listTicket",
        method: "POST",
        data: {
          "ticketDuration": 0,
          "ticketStatus": 1
        },
        contentType: "json",
        processData: false,
        dataType: "json"
      }
  ).then(function (response) {
    dataList.value = response.data.data;
    console.log(dataList)
  });
}
getDataList();
</script>

<template>
  <van-dropdown-menu swipe-threshold="4">
    <van-dropdown-item v-model="value1" :options="option1"/>
    <van-dropdown-item v-model="value2" :options="option2"/>
  </van-dropdown-menu>

  <van-pull-refresh v-model="refreshing" @refresh="onRefresh" style="min-height: 100vh;">
    <van-list
        v-model:loading="loading"
        :finished="finished"
        finished-text="最后一行you're at the end"
        @load="onLoad"
    >
      <van-cell v-for="item in dataList" :key="item.ticketId" :title="22" :label="111" value="33">
      </van-cell>
    </van-list>
  </van-pull-refresh>
  <van-back-top/>
  <van-floating-bubble
      axis="xy"
      icon="plus"
      magnetic="x"
      v-model:offset="offset"
      @offset-change="onOffsetChange"
      @click="onCreate"
  />
  <van-floating-bubble
      axis="xy"
      icon="replay"
      magnetic="x"
      v-model:offset="offset2"
      @offset-change="onOffsetChange2"
      @click="onRefresh"
  />
</template>


<style scoped>

</style>