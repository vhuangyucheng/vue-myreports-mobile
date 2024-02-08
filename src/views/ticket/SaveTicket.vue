<script setup>
import goBackArrow from "../../store/goBackArrow";
import {showNotify} from "vant";
import axios from "axios";

const store = goBackArrow();
store.goBackArrow();
store.setPageName("增加工单AddTicket");

function getFormattedDate() {
  let today = new Date();
  let year = today.getFullYear();
  let month = (today.getMonth() + 1).toString().padStart(2, '0'); // Month is 0-based
  let day = today.getDate().toString().padStart(2, '0');
  return year + month + day;
}

const requestOnSubmit = (values) => {
  if (formState.lineChecked === 0 || formState.priorityChecked === 0 || formState.statusChecked === 0 || formState.durationChecked === 0
      || formState.issuerChecked === 0 || formState.responderChecked === 0 || formState.shiftChecked === 0) {
    showNotify({
      // type: 'success',
      message: '请先全部填写表格, Please finish Selection completely',
      position: 'top',
      duration: 7000,
    });
    return null;
  }
  let shiftId = parseInt(getFormattedDate() + formState.lineChecked + formState.shiftChecked)
  // console.log(shiftId)
  axios({
    url: "/apiStringer/ticket/saveAndUpdate",
    method: "POST",
    data: {
      ticketShiftId: shiftId,
      ticketLine: values.lineChecked,
      ticketPriority: values.priorityChecked,
      ticketStatus: values.statusChecked,
      ticketDuration: values.durationChecked,
      ticketIssuer: values.issuerChecked,
      ticketResponder: values.responderChecked,
      ticketMessage: values.requestMessage,
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

const replyOnSubmit = (values) => {
  axios({
    url: "/apiStringer/ticket/saveAndUpdate",
    method: "POST",
    data: {

      ticketReply: values.reply,
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
  ticketId: 0,
  lineChecked: 0,
  priorityChecked: 0,
  statusChecked: 0,
  durationChecked: 0,
  issuerChecked: 0,
  responderChecked: 0,
  requestMessage: '',
  shiftChecked: 0
})

const replyFormState = reactive({
  reply: ''
})


</script>
<template>
  <van-form @submit="requestOnSubmit">
    <van-cell-group inset>


      <van-field name="lineChecked" label="线体">
        <template #input>
          <van-radio-group v-model="formState.lineChecked" direction="horizontal">
            <van-radio name="1">Line#1</van-radio>
            <van-radio name="2">Line#2</van-radio>
          </van-radio-group>
        </template>
      </van-field>

      <van-field name="shiftChecked" label="班别Shift">
        <template #input>
          <van-radio-group v-model="formState.shiftChecked" direction="horizontal">
            <van-radio name="1">Day</van-radio>
            <van-radio name="2">Night</van-radio>
          </van-radio-group>
        </template>
      </van-field>

      <van-field name="priorityChecked" label="优先度Priority">
        <template #input>
          <van-radio-group v-model="formState.priorityChecked" direction="horizontal">
            <van-radio name="1">最高Critical</van-radio>
            <van-radio name="2">高Major</van-radio>
            <van-radio name="3">低Minor</van-radio>
          </van-radio-group>
        </template>
      </van-field>

      <van-field name="statusChecked" label="状态status">
        <template #input>
          <van-radio-group v-model="formState.statusChecked" direction="horizontal">
            <van-radio name="1">Open</van-radio>
            <van-radio name="2">Close</van-radio>
          </van-radio-group>
        </template>
      </van-field>

      <van-field name="durationChecked" label="是否常驻Duration">
        <template #input>
          <van-radio-group v-model="formState.durationChecked" direction="horizontal">
            <van-radio name="1">That day</van-radio>
            <van-radio name="2">permanent</van-radio>
          </van-radio-group>
        </template>
      </van-field>

      <van-field name="issuerChecked" label="发起Issuer">
        <template #input>
          <van-radio-group v-model="formState.issuerChecked" direction="horizontal">
            <van-radio name="1">生产Prod</van-radio>
            <van-radio name="2">QC</van-radio>
            <van-radio name="3">设备Equip</van-radio>
          </van-radio-group>
        </template>
      </van-field>

      <van-field name="responderChecked" label="应答Responder">
        <template #input>
          <van-radio-group v-model="formState.responderChecked" direction="horizontal">
            <van-radio name="1">生产Prod</van-radio>
            <van-radio name="2">QC</van-radio>
            <van-radio name="3">设备Equip</van-radio>
          </van-radio-group>
        </template>
      </van-field>

      <van-field
          name="requestMessage"
          v-model="formState.requestMessage"
          rows="3"
          autosize
          label="留言Message"
          type="textarea"
          placeholder="请输入留言Please comment"
          :rules="[{ required: true, message: '请输入留言Please comment' }]"
      />
    </van-cell-group>

    <div style="margin: 16px;">
      <van-button round block type="primary" native-type="submit">
        提交Submit
      </van-button>
    </div>
  </van-form>

  <div v-if="formState.ticketId !== 0">
    <van-form @submit="replyOnSubmit">
      <van-cell-group inset>
        <van-field
            name="reply"
            v-model="replyFormState.reply"
            rows="3"
            autosize
            label="回复Reply"
            type="textarea"
            placeholder="请输入回复Please Reply"
            :rules="[{ required: true, message: '请输入回复Please Reply' }]"
        />
      </van-cell-group>

      <div style="margin: 16px;">
        <van-button round block type="primary" native-type="submit">
          回复Reply
        </van-button>
      </div>
    </van-form>
  </div>
</template>

<style scoped>

</style>