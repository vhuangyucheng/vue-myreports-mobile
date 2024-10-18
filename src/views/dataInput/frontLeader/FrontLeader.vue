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
      duration: 7000,
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
      cellsReceive: values.cellsReceive,
      cellsInput: values.cellsInput,
      incomingScrap: values.incomingScrap,

      incidentScrap: values.incidentScrap,
      stringerScrap: values.stringerScrap,
      cellsLeft: values.cellsLeft,
      ribbonScrap: values.ribbonScrap,
      busbarScrap: values.busbarScrap,
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
  cellsReceive: '',
  cellsInput: '',
  incomingScrap: '',

  incidentScrap: '',
  stringerScrap: '',
  cellsLeft: '',
  ribbonScrap: '',
  busbarScrap: '',
})
</script>

<template>
  <div>
    <van-form @submit="onSubmit">
      <van-cell-group inset>
        <van-field
            v-model="formState.cellsReceive"
            name="cellsReceive"
            label="总领用电池片(片数)"
            placeholder="cellsReceive(piece)"
            :rules="[{ required: true, message: '请填数据please finish' }]"
        />
        <van-field
            v-model="formState.cellsInput"
            name="cellsInput"
            label="总投入数"
            placeholder="cellsInput"
            :rules="[{ required: true, message: '请填数据please finish' }]"
        />
        <van-field
            v-model="formState.stringerScrap"
            name="stringerScrap"
            label="焊机破片"
            placeholder="stringerScrap"
            :rules="[{ required: true, message: '请填数据please finish' }]"
        />

        <van-field
            v-model="formState.incomingScrap"
            name="incomingScrap"
            label="来料破片"
            placeholder="incomingScrap"
            :rules="[{ required: true, message: '请填数据please finish' }]"
        />

        <van-field
            v-model="formState.incidentScrap"
            name="incidentScrap"
            label="生产事故破片"
            placeholder="incidentScrap"
            :rules="[{ required: true, message: '请填数据please finish' }]"
        />
        <van-field
            v-model="formState.cellsLeft"
            name="cellsLeft"
            label="总剩余数"
            placeholder="cellsLeft"
            :rules="[{ required: true, message: '请填数据please finish' }]"
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