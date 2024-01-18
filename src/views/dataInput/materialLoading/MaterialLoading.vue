<script setup>
import {showNotify} from 'vant';
import axios from "axios";

const props = defineProps(['lineChecked', 'shiftChecked', 'submitDate'])
// console.log(props.lineChecked)
// console.log(props.shiftChecked)
// console.log(props.submitDate)
watch(() => props.lineChecked, (newVal, oldVal) => {
  // console.log('1监听引用类型数据dataList')
  // console.log('new', newVal)
  // console.log('old', oldVal)
})

const onSubmit = (values) => {

  if (props.lineChecked === '' || props.shiftChecked === '' || props.submitDate === 0) {
    showNotify({
      // type: 'success',
      message: '请先完成日期和班别, Please finish Date and Shift Selection',
      position: 'top',
      duration: 1000,
    });
    return null;
  }
  let shiftId = parseInt(props.submitDate.toString() + props.lineChecked + props.shiftChecked)
  // console.log(shiftId)
  axios({
    url: "/apiStringer/shiftRecord/saveAndUpdate",
    method: "POST",
    data: {
      shiftId: shiftId,
      glassDefect: values.glassDefect,
      evaglassDefect: values.evaglassDefect,
      backsheetDefect: values.backsheetDefect,
      evabacksheetDefect: values.evabacksheetDefect,
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
  glassDefect: '',
  evaglassDefect: '',
  backsheetDefect: '',
  evabacksheetDefect:'',
})
</script>

<template>
  <div>
    <van-form @submit="onSubmit">
      <van-cell-group inset>
        <van-field
            v-model="formState.glassDefect"
            name="glassDefect"
            label="玻璃不良数"
            placeholder="glassDefect"
            :rules="[{ required: true, message: '请填glassDefect' }]"
        />
        <van-field
            v-model="formState.QRCevaglassDefectodeEnd"
            name="evaglassDefect"
            label="EVA报废（玻璃面"
            placeholder="evaglassDefect"
            :rules="[{ required: true, message: '请填evaglassDefect' }]"
        />
        <van-field
            v-model="formState.backsheetDefect"
            name="backsheetDefect"
            label="背板报废"
            placeholder="backsheetDefect"
            :rules="[{ required: true, message: '请填backsheetDefect' }]"
        />
        <van-field
            v-model="formState.evabacksheetDefect"
            name="evabacksheetDefect"
            label="EVA报废(背板面"
            placeholder="evabacksheetDefect"
            :rules="[{ required: true, message: '请填evabacksheetDefect' }]"
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