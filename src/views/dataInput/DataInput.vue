<script setup>
import goBackArrow from "../../store/goBackArrow";
const store = goBackArrow();
store.disableGoBackArrow();
store.setPageName("数据录入DataInput");

let active = ref()
let lineChecked = ref('');
let shiftChecked = ref('');

let minDate =  new Date(2023, 11, 1)
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
          <van-sidebar-item title="条码QRCode" to="/DataInput/Qrcode"/>

          <van-sidebar-item title="焊机Stringer" to="/DataInput/Stringer"/>
          <van-sidebar-item title="叠焊Bussing" to="/DataInput/Bussing"/>
          <van-sidebar-item title="1st EL" to="/DataInput/FirstEL"/>
          <van-sidebar-item title="前道组长FrontLeader" to="/DataInput/FrontLeader"/>
          <van-sidebar-item title="层压Lamination" to="/DataInput/Lamination"/>
          <van-sidebar-item title="组框Framing" to="/DataInput/Framing"/>
          <van-sidebar-item title="2nd EL" to="/DataInput/SecondEL"/>
          <van-sidebar-item title="QC" to="/DataInput/BackLeader"/>
          <van-sidebar-item title="Packing" to="/DataInput/Packing"/>


        </van-sidebar>
        <div class="sidebar-content">
          <van-form >
            <van-cell-group inset>
          <van-field
              v-model="DateResult"
              is-link
              readonly
              name="calendar"
              label="日期"
              placeholder="点击选择Date Selection"
              @click="showCalendar = true"

          />
          <van-calendar v-model:show="showCalendar" :min-date="minDate" @confirm="onConfirm"/>

          <van-field name="radio" label="线体">
            <template #input>
              <van-radio-group v-model="lineChecked" direction="horizontal">
                <van-radio name="1">Line#1</van-radio>
                <van-radio name="2">Line#2</van-radio>
              </van-radio-group>
            </template>
          </van-field>

          <van-field name="radio" label="班别">
            <template #input>
              <van-radio-group v-model="shiftChecked" direction="horizontal">
                <van-radio name="1">早班Day</van-radio>
                <van-radio name="2">晚班Night</van-radio>
                <van-radio name="3">深夜班NN</van-radio>

              </van-radio-group>
            </template>
          </van-field>
      </van-cell-group>
    </van-form>
    <van-divider
        :style="{ color: '#1989fa', borderColor: '#1989fa', padding: '0 16px' }">
      先填日期班别,再提交数据 <br/>Finish Above and Below Submit
    </van-divider>

    <routerView :lineChecked="lineChecked" :shiftChecked="shiftChecked" :submitDate="submitDate"/>
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