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
      qrcodeStart: values.QRCodeStart,
      qrcodeEnd: values.QRCodeEnd,
      qrcodeStart2: values.QRCodeStart2,
      qrcodeEnd2: values.QRCodeEnd2,
      qrcodeAmount: values.QRCodeAmount,
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
  QRCodeStart: '',
  QRCodeEnd: '',
  QRCodeStart2: '',
  QRCodeEnd2: '',
  QRCodeAmount: '',
})
</script>

<template>
  <div>
    <van-form @submit="onSubmit">
      <van-cell-group inset>
        <van-field
            v-model="formState.QRCodeStart"
            name="QRCodeStart"
            label="条码开始"
            placeholder="QRCodeStart"
            :rules="[{ required: true, message: '请填QRCodeStart' }]"
        />
        <van-field
            v-model="formState.QRCodeEnd"
            name="QRCodeEnd"
            label="条码结束"
            placeholder="QRCodeEnd"
            :rules="[{ required: true, message: '请填QRCodeEnd' }]"
        />
        <van-field
            v-model="formState.QRCodeStart2"
            name="QRCodeStart2"
            label="条码开始2"
            placeholder="QRCodeStart(2"

        />
        <van-field
            v-model="formState.QRCodeEnd2"
            name="QRCodeEnd2"
            label="条码结束2"
            placeholder="QRCodeEnd(2"

        />
        <van-field
            v-model="formState.QRCodeAmount"
            name="QRCodeAmount"
            label="条码数量"
            placeholder="QRCodeAmount"
            :rules="[{ required: true, message: '请填QRCodeAmount' }]"
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