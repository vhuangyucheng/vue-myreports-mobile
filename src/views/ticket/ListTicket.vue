<script setup>
import goBackArrow from "../../store/goBackArrow";

const store = goBackArrow();
store.disableGoBackArrow();
store.setPageName("工单列表ListTicket");

import {showToast} from 'vant';

const statusDrop = ref(1);
const durationDrop = ref(0);
const option1 = [
  {text: '状态Status:ALL', value: 0},
  {text: 'Status:Open', value: 1},
  {text: 'Status:Close', value: 2},
];
const option2 = [
  {text: '持续时间Duration:ALL', value: 0},
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
    getDataList(statusDrop.value, durationDrop.value);
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

function getFormattedDate() {
  let today = new Date();
  let year = today.getFullYear();
  let month = (today.getMonth() + 1).toString().padStart(2, '0'); // Month is 0-based
  let day = today.getDate().toString().padStart(2, '0');
  return year + month + day;
}

import axios from "axios";

const getDataList = (ticketStatus, ticketDuration) => {
  console.log(ticketStatus, ticketDuration)
  axios(
      {
        url: "/apiStringer/ticket/listTicket",
        method: "POST",
        data: {

          "ticketStatus": ticketStatus,
          "ticketDuration": ticketDuration,
        },
        contentType: "json",
        processData: false,
        dataType: "json"
      }
  ).then(function (response) {
    dataList.value = response.data.data;
  });
}
const dropdownOnChange1 = (value)=>{
  onRefresh()
}
const dropdownOnChange2 = (value)=>{
  onRefresh()
}

const returnMapper = (name, value) => {
  switch (name) {
    case "time":
      return new Date(value).toLocaleString()
    case "priority":
      switch (value) {
        case 1:
          return "Crit";
        case 2:
          return " Major ";
        case 3:
          return " Minor ";
      }
    case "line":
      switch (value) {
        case 1:
          return "line#1";
        case 2:
          return "line#2";
      }
    case "status":
      switch (value) {
        case 1:
          return "Open";
        case 2:
          return "Close";
      }
    case "issuer":
      switch (value) {
        case 1:
          return "Prod";
        case 2:
          return "QC";
        case 3:
          return "Equip";
      }
    case "responder":
      switch (value) {
        case 1:
          return "Prod";
        case 2:
          return "QC";
        case 3:
          return "Equip";
      }
    case "duration":
      switch (value) {
        case 1:
          return "thatDay";
        case 2:
          return "permanent";
      }
  }
}
</script>



<template>
  <van-dropdown-menu swipe-threshold="4">
    <van-dropdown-item v-model="statusDrop" :options="option1" @change="dropdownOnChange1"/>
    <van-dropdown-item v-model="durationDrop" :options="option2" @change="dropdownOnChange2"/>
  </van-dropdown-menu>

  <van-pull-refresh v-model="refreshing" @refresh="onRefresh" style="min-height: 100vh;">
    <van-list
        v-model:loading="loading"
        :finished="finished"
        finished-text="最后一行you're at the end"
        @load="onLoad"
    >
      <van-cell v-for="item in dataList" :key="item.ticketId"
                :title="returnMapper('priority', item.ticketPriority) + ' '+ returnMapper('line', item.ticketLine) +
      ' '+ returnMapper('status', item.ticketStatus) + ' '+ returnMapper('issuer', item.ticketIssuer) + ' to '+ returnMapper('responder', item.ticketResponder) +
      ' ' "
                :value="returnMapper('duration',item.ticketDuration)"
                is-link :to="'/saveTicket?ticketId='+item.ticketId"
                border>
        <template #label>
          <van-text-ellipsis rows="3" :content="returnMapper('time',item.createTime) + ' ' +  item.ticketMessage"/>
        </template>
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