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
      framingOutput: values.framingOutput,
      framingScrap: values.framingScrap,
      appearanceInspection: values.appearanceInspection,
      junctionboxDefect: values.junctionboxDefect,
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
  framingOutput: '',
  framingScrap:'',
  appearanceInspection:'',
  junctionboxDefect:'',

})
</script>

<template>
  <div>
    <van-form @submit="onSubmit">
      <van-cell-group inset>
        <van-field
            v-model="formState.framingOutput"
            name="framingOutput"
            label="组框输出"
            placeholder="framingOutput"
            :rules="[{ required: true, message: '请填数据please finish' }]"
        />
        <van-field
            v-model="formState.appearanceInspection"
            name="appearanceInspection"
            label="外观检不良"
            placeholder="VisualInspectionDefect"
            :rules="[{ required: true, message: '请填数据please finish' }]"
        />
        <van-field
            v-model="formState.framingScrap"
            name="framingScrap"
            label="组框不良"
            placeholder="framingDefect"
            :rules="[{ required: true, message: '请填数据please finish' }]"
        />
        <van-field
            v-model="formState.junctionboxDefect"
            name="junctionboxDefect"
            label="接线盒不良"
            placeholder="junctionboxDefect"
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