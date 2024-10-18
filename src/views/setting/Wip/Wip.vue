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
      initialWip: values.initialWip,
      laminator: wip,
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
  initialWip: '',
  laminator: '',

})
const checked = ref([]);
</script>

<template>
  <div>
    <van-form @submit="onSubmit">
      <van-cell-group inset>
        <van-field
            v-model="formState.initialWip"
            name="initialWip"
            label="初始化wip"
            placeholder="initialWip"
        />
        <van-field name="checkboxGroup" label="Laminators">
          <template #input>
            <van-checkbox-group v-model="checked">

              <van-checkbox name="1-a">1-a</van-checkbox>
              <van-checkbox name="1-b">1-b</van-checkbox>
              <van-checkbox name="2-a">2-a</van-checkbox>
              <van-checkbox name="2-b">2-b</van-checkbox>
            </van-checkbox-group>
          </template>
        </van-field>
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