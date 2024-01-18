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
      framingScrap: values.frameScrap,
      shortFrameScrap: values.shortFrameScrap,
      framingGlueScrap: values.framingGlueScrap,
      jboxScrap: values.jboxScrap,
      sealantGlueScrap: values.sealantGlueScrap,
      cornerProtectionScrap: values.cornerProtectionScrap,
      finishedgoodDegrade: values.finishedgoodDegrade,
      finishedgoodScrap: values.finishedgoodScrap,
      ivDefect: values.ivDefect,
      secondelDefect: values.secondelDefect,
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
  frameScrap: '',
  shortFrameScrap:'',
  framingGlueScrap: '',
  jboxScrap: '',
  sealantGlueScrap: '',
  cornerProtectionScrap: '',
  palletScrap: '',
  packingCartonScrap: '',
  packingStrapScrap: '',
  finishedgoodDegrade:'',
  finishedgoodScrap:'',
  ivDefect:'',
  secondelDefect:'',
})
</script>

<template>
  <div>
    <van-form @submit="onSubmit">
      <van-cell-group inset>
        <van-field
            v-model="formState.ivDefect"
            name="ivDefect"
            label="IV不良"
            placeholder="IvDefect"
            :rules="[{ required: true, message: '请填数据please finish' }]"
        />
        <van-field
            v-model="formState.secondelDefect"
            name="secondelDefect"
            label="后道EL不良"
            placeholder="secondelDefect"
            :rules="[{ required: true, message: '请填数据please finish' }]"
        />
        <van-field
            v-model="formState.finishedgoodDegrade"
            name="finishedgoodDegrade"
            label="成品降级数"
            placeholder="finishedGoodsDowngrade"
            :rules="[{ required: true, message: '请填数据please finish' }]"
        />
        <van-field
            v-model="formState.finishedgoodScrap"
            name="finishedgoodScrap"
            label="成品报废"
            placeholder="finishedGoodsScrap"
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