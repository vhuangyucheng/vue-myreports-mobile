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
      stringer1Output: values.stringer1Output,
      stringer1Miswelding: values.stringer1Miswelding,
      stringer1Overwelding: values.stringer1Overwelding,
      stringer1Split: values.stringer1Split,
      stringer1Crack: values.stringer1Crack,
      stringer1Others: values.stringer1Others,
      stringer1CellsCrack: values.stringer1CellsCrack,
      stringer2Output: values.stringer2Output,
      stringer2Miswelding: values.stringer2Miswelding,
      stringer2Overwelding: values.stringer2Overwelding,
      stringer2Split: values.stringer2Split,
      stringer2Crack: values.stringer2Crack,
      stringer2Others: values.stringer2Others,
      stringer2CellsCrack: values.stringer2CellsCrack,
      stringer3Output: values.stringer3Output,
      stringer3Miswelding: values.stringer3Miswelding,
      stringer3Overwelding: values.stringer3Overwelding,
      stringer3Split: values.stringer3Split,
      stringer3Crack: values.stringer3Crack,
      stringer3Others: values.stringer3Others,
      stringer3CellsCrack: values.stringer3CellsCrack,
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
  stringer1Output: '',
  stringer1Miswelding: '',
  stringer1Overwelding: '',
  stringer1Split: '',
  stringer1Crack: '',
  stringer1Others: '',
  stringer1CellsCrack: '',
  stringer2Output: '',
  stringer2Miswelding: '',
  stringer2Overwelding: '',
  stringer2Split: '',
  stringer2Crack: '',
  stringer2Others: '',
  stringer2CellsCrack: '',
  stringer3Output: '',
  stringer3Miswelding: '',
  stringer3Overwelding: '',
  stringer3Split: '',
  stringer3Crack: '',
  stringer3Others: '',
  stringer3CellsCrack: '',
})
</script>

<template>
  <div>
    <van-form @submit="onSubmit">
      <van-cell-group inset>
        <van-field
            v-model="formState.stringer1Output"
            name="stringer1Output"
            label="1号焊机产出"
            placeholder="stringer1Output"
            :rules="[{ required: true, message: '请填数据please finish' }]"
        />
        <van-field
            v-model="formState.stringer1Miswelding"
            name="stringer1Miswelding"
            label="虚焊"
            placeholder="stringer1Miswelding"
            :rules="[{ required: true, message: '请填数据please finish' }]"
        />
        <van-field
            v-model="formState.stringer1Overwelding"
            name="stringer1Overwelding"
            label="过焊"
            placeholder="stringer1Overwelding"
            :rules="[{ required: true, message: '请填数据please finish' }]"
        />

        <van-field
            v-model="formState.stringer1Split"
            name="stringer1Split"
            label="破片"
            placeholder="stringer1Split"
            :rules="[{ required: true, message: '请填数据please finish' }]"
        />
        <van-field
            v-model="formState.stringer1Crack"
            name="stringer1Crack"
            label="隐裂"
            placeholder="stringer1Crack"
            :rules="[{ required: true, message: '请填数据please finish' }]"
        />
        <van-field
            v-model="formState.stringer1Others"
            name="stringer1Others"
            label="其他"
            placeholder="stringer1Others"
            :rules="[{ required: true, message: '请填数据please finish' }]"
        />
        <van-field
            v-model="formState.stringer1CellsCrack"
            name="stringer1CellsCrack"
            label="电池片破片"
            placeholder="stringer1CellsCrack"
            :rules="[{ required: true, message: '请填数据please finish' }]"
        />
        <van-field
            v-model="formState.stringer2Output"
            name="stringer2Output"
            label="2号焊机产出"
            placeholder="stringer2Output"
            :rules="[{ required: true, message: '请填数据please finish' }]"
        />
        <van-field
            v-model="formState.stringer2Miswelding"
            name="stringer2Miswelding"
            label="虚焊"
            placeholder="stringer2Miswelding"
            :rules="[{ required: true, message: '请填数据please finish' }]"
        />
        <van-field
            v-model="formState.stringer2Overwelding"
            name="stringer2Overwelding"
            label="过焊"
            placeholder="stringer2Overwelding"
            :rules="[{ required: true, message: '请填数据please finish' }]"
        />

        <van-field
            v-model="formState.stringer2Split"
            name="stringer2Split"
            label="破片"
            placeholder="stringer2Split"
            :rules="[{ required: true, message: '请填数据please finish' }]"
        />
        <van-field
            v-model="formState.stringer2Crack"
            name="stringer2Crack"
            label="隐裂"
            placeholder="stringer2Crack"
            :rules="[{ required: true, message: '请填数据please finish' }]"
        />
        <van-field
            v-model="formState.stringer2Others"
            name="stringer2Others"
            label="其他"
            placeholder="stringer2Others"
            :rules="[{ required: true, message: '请填数据please finish' }]"
        />
        <van-field
            v-model="formState.stringer2CellsCrack"
            name="stringer2CellsCrack"
            label="电池片破片"
            placeholder="stringer2CellsCrack"
            :rules="[{ required: true, message: '请填数据please finish' }]"
        />
        <van-field
            v-model="formState.stringer3Output"
            name="stringer3Output"
            label="3号焊机产出"
            placeholder="stringer3Output"
            :rules="[{ required: true, message: '请填数据please finish' }]"
        />
        <van-field
            v-model="formState.stringer3Miswelding"
            name="stringer3Miswelding"
            label="虚焊"
            placeholder="stringer3Miswelding"
            :rules="[{ required: true, message: '请填数据please finish' }]"
        />
        <van-field
            v-model="formState.stringer3Overwelding"
            name="stringer3Overwelding"
            label="过焊"
            placeholder="stringer3Overwelding"
            :rules="[{ required: true, message: '请填数据please finish' }]"
        />

        <van-field
            v-model="formState.stringer3Split"
            name="stringer3Split"
            label="破片"
            placeholder="stringer3Split"
            :rules="[{ required: true, message: '请填数据please finish' }]"
        />
        <van-field
            v-model="formState.stringer3Crack"
            name="stringer3Crack"
            label="隐裂"
            placeholder="stringer3Crack"
            :rules="[{ required: true, message: '请填数据please finish' }]"
        />
        <van-field
            v-model="formState.stringer3Others"
            name="stringer3Others"
            label="其他"
            placeholder="stringer3Others"
            :rules="[{ required: true, message: '请填数据please finish' }]"
        />
        <van-field
            v-model="formState.stringer3CellsCrack"
            name="stringer3CellsCrack"
            label="电池片破片"
            placeholder="stringer2CellsCrack"
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