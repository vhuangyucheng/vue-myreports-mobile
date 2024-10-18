<script setup>
import goBackArrow from "../../store/goBackArrow";

const store = goBackArrow();
store.disableGoBackArrow();
store.setPageName("设置Setting");

let active = ref()
let lineChecked = ref('');
let shiftChecked = ref('');

let minDate = new Date(2023, 11, 1)
let submitDate = ref(0);
const DateResult = ref('');
const showCalendar = ref(false);
const onConfirm = (date) => {
  DateResult.value = `${date.getMonth() + 1}/${date.getDate()}`;
  showCalendar.value = false;
  const month = (date.getMonth() + 1) < 10 ? ("0" + (date.getMonth() + 1).toString()) : ((date.getMonth() + 1).toString())
  const day = (date.getDate()) < 10 ? ("0" + (date.getDate()).toString()) : ((date.getDate()).toString())
  submitDate.value = (Number((date.getFullYear()).toString() + month + day));
};


const sidebarOnChange = (index) => {
  console.log(index)
}

</script>
<template>
  <div class="display-flex">
    <van-sidebar v-model="active" @change="sidebarOnChange">
      <van-sidebar-item title="WIP" to="/setting/wip"/>
      <van-sidebar-item title="Wo" to="/setting/wo"/>
    </van-sidebar>
    <div class="sidebar-content">
      <routerView/>
    </div>
  </div>

</template>

<style scoped>
.display-flex {
  display: flex;
}

.sidebar-content {
  width: 100%
}
</style>