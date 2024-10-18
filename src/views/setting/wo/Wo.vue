<script setup>
import {showNotify} from 'vant';
import axios from "axios";


const onSubmit = (values) => {
  console.log(values)

  let wip = 0
  let contains1 = false;
  let contains2 = false;
  let counter = 0;


  for (let key in values.checkboxGroup) {
    if (values.checkboxGroup[key].includes('1')) {
      contains1 = true;
    }
    if (values.checkboxGroup[key].includes('2')) {
      contains2 = true;
    }
    counter++;
  }

  wip = counter * 6 + 52;
  if (contains1 ) {
    wip = wip + 2;
  }

  axios({
    url: "/apiStringer/setting/setSetting",
    method: "POST",
    data: {
      currentWo:values.WO,
    },
    contentType: "json",
    processData: false,
    dataType: "json",
  }).then(function (response) {
    if (response.data.code === '1') {
      showNotify({
        type: 'success',
        message: '提交成功Submit Succeed',
        position: 'top',
        duration: 7000,
      });
    } else {
      showNotify({
        // type: 'success',
        message: '提交失败,联系主管Submit Failed, contact your supervisor',
        position: 'top',
        duration: 7000,
      });
    }
  }).catch(error => {
    showNotify({
      // type: 'success',
      message: "服务器问题，请联系IT, Server error, please contact IT",
      position: 'top',
      duration: 7000,
    });
  })
}

const formState = reactive({

  WO:'',

})
const checked = ref([]);
</script>

<template>
  <div>
    <van-form @submit="onSubmit">
      <van-cell-group inset>
        <van-field
            v-model="formState.WO"
            name="WO"
            label="工单号"
            placeholder="WO"
        />


        <div style="margin: 16px">
          <van-button round block type="primary" native-type="submit">
            提交Submit
          </van-button>
        </div>
      </van-cell-group>
    </van-form>
  </div>
</template>

<style scoped>

</style>