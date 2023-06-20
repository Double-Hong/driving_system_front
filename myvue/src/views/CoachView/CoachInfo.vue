<template>
  <h1 style="text-align: center">个人信息</h1>
  <!--  展示个人信息-->
  <br><br><br>
  <div style="position: absolute;background-color: black;width: 100%;height: 2px;top: 17%"></div>
  <div id="personInfo" style="background-color: white;text-align: center">

    <el-descriptions :border="true" :column="2" size="large" title="简介">
      <template v-slot:title>



        <div style="text-align: center;width: 100%;position: absolute;">
          简介
          <el-button @click="editInfo" style="position: absolute;right: 5%">
            <setting theme="outline" size="24" fill="#333" :strokeWidth="2"/>
          </el-button>
        </div>
        <br>
      </template>
      <el-descriptions-item label="姓名" width="100px">
        <template v-slot:label>
          <!--          <me style="position: absolute;" id="icon1" theme="outline" size="30" fill="#333" :strokeWidth="2" strokeLinecap="butt"/>-->
          <!--          <label style="position:absolute;left: 20%">姓名</label>-->
          <!--          <br>-->
          <div style="text-align: center">
            <worker theme="outline" style="position: absolute;" size="28" fill="#333" :strokeWidth="2"/>
            &nbsp&nbsp&nbsp&nbsp&nbsp&nbsp&nbsp&nbsp&nbsp<label>姓名</label>
          </div>

        </template>
        {{ userData.personInfo.coachName }}
      </el-descriptions-item>
      <el-descriptions-item label="登录名" width="100px">
        <template v-slot:label>
          <div style="text-align: center">
            <me style="position: absolute;" theme="outline" size="28" fill="#333" strokeLinecap="butt" :strokeWidth="2"/>
            &nbsp&nbsp&nbsp&nbsp&nbsp&nbsp&nbsp&nbsp&nbsp<label>登录名</label>
          </div>

        </template>
        {{ userData.personInfo.username }}
      </el-descriptions-item>
      <el-descriptions-item label="性别">
        <template v-slot:label>
          <div style="text-align: center">
            <male v-if="userData.personInfo.gender==='男'" style="position: absolute;" theme="outline" size="28"
                  :strokeWidth="2"
                  fill="#333"/>
            <female v-else-if="userData.personInfo.gender==='女'" theme="outline" style="position: absolute;" size="28"
                    :strokeWidth="2"
                    fill="#333"/>
            <help v-else theme="outline" style="position: absolute;" size="28" fill="#333" :strokeWidth="2"/>
            &nbsp&nbsp&nbsp&nbsp&nbsp&nbsp&nbsp&nbsp&nbsp<label>性别</label>
          </div>
        </template>
        <el-tag>{{ userData.personInfo.gender }}</el-tag>
      </el-descriptions-item>
      <el-descriptions-item label="电话">
        <template v-slot:label>
          <div style="text-align: center">
            <phone-telephone style="position: absolute;" theme="outline" size="28" fill="#333" :strokeWidth="2"/>
            &nbsp&nbsp&nbsp&nbsp&nbsp&nbsp&nbsp&nbsp&nbsp<label>电话</label>
          </div>

        </template>
        {{ userData.personInfo.phone }}
      </el-descriptions-item>
      <el-descriptions-item label="邮箱">
        <template v-slot:label>
          <div style="text-align: center">
            <mail style="position: absolute;" theme="outline" size="28" fill="#333" :strokeWidth="2"/>
            &nbsp&nbsp&nbsp&nbsp&nbsp&nbsp&nbsp&nbsp&nbsp<label>邮箱</label>
          </div>

        </template>
        {{ userData.personInfo.email }}
      </el-descriptions-item>
      <el-descriptions-item label="教龄">
        <template v-slot:label>
          <div style="text-align: center">
            <classroom style="position: absolute;" theme="outline" size="28" fill="#333" :strokeWidth="2"/>
            &nbsp&nbsp&nbsp&nbsp&nbsp&nbsp&nbsp&nbsp&nbsp<label>教龄</label>
          </div>

        </template>
        {{ userData.personInfo.teachingAge }}年
      </el-descriptions-item>
      <el-descriptions-item label="类型" label-class-name="typeLabel">
        <template v-slot:label>
          <div style="text-align: center">
            <all-application style="position: absolute;" theme="outline" size="28" fill="#333" :strokeWidth="2"/>
            &nbsp&nbsp&nbsp&nbsp&nbsp&nbsp&nbsp&nbsp&nbsp<label>类型</label>
          </div>

        </template>
        {{ userData.personInfo.type }}
      </el-descriptions-item>

    </el-descriptions>
    <br><br><br>
    <el-card class="box-card">
      <template #header>
        <div class="card-header">
          <align-text-center-one style="position: absolute;" theme="outline" size="28" fill="#333" :strokeWidth="2"/>
          &nbsp&nbsp&nbsp&nbsp&nbsp&nbsp&nbsp&nbsp&nbsp <span>个人介绍</span>
          <el-button style="position: absolute;right: 5%" @click="editIntroduction">
            <edit theme="outline" size="28" fill="#333" :strokeWidth="2"/>
          </el-button>
        </div>
      </template>
      <div>
        <p>{{ userData.personInfo.introduction }}</p>
      </div>
    </el-card>


  </div>


  <el-dialog
      v-model="editVisible"
      width="30%"
      title="编辑个人信息"
      style="text-align: center"
  >
    <el-form label-width="100px">
      <el-form-item label="姓名">
        <el-input v-model="userData.editInfo.coachName" placeholder="请输入姓名"></el-input>
      </el-form-item>
      <el-form-item label="登录名">
        <el-input v-model="userData.editInfo.username" placeholder="用户名" disabled></el-input>
      </el-form-item>
      <el-form-item label="电话">
        <el-input v-model="userData.editInfo.phone" placeholder="电话" show-word-limit maxlength="11"
                  clearable></el-input>
      </el-form-item>
      <el-form-item label="邮箱">
        <el-input v-model="userData.editInfo.email" placeholder="邮箱"></el-input>
      </el-form-item>
      <el-form-item label="性别">
        <el-radio-group v-model="userData.editInfo.gender">
          <el-radio label="男" size="large">男</el-radio>
          <el-radio label="女" size="large">女</el-radio>
          <el-radio label="其它" size="large">其它</el-radio>
        </el-radio-group>
      </el-form-item>
    </el-form>
    <el-button @click="sureEdit">确认</el-button>
    <el-button @click="editVisible=false">取消</el-button>
  </el-dialog>

  <el-dialog
      v-model="editIntroductionVisible"
      width="30%"
      title="编辑个人介绍"
      style="text-align: center"
  >
    <el-form label-width="100px">
      <el-form-item label="个人介绍">
        <el-input type="textarea" v-model="userData.editInfo.introduction" placeholder="请输入个人介绍"
                  maxlength="200" show-word-limit></el-input>
      </el-form-item>
      <el-button @click="sureEditIntroduction">确认</el-button>
    </el-form>
  </el-dialog>

</template>

<script setup lang="ts">
import {inject, ref} from "vue";
import {reactive} from "vue";
import request from "@/request/request";
import {
  Me,
  Worker,
  Male,
  Female,
  PhoneTelephone,
  Mail,
  Classroom,
  AllApplication,
  AlignTextCenterOne,
  Help,
  Setting,
  Edit,
} from "@icon-park/vue-next";
import {ElMessage} from "element-plus";

interface userInfo {
  coachId: string,
  coachName: string,
  email: string,
  gender: string,
  introduction: string,
  password: string,
  phone: string,
  schoolName: string,
  teachingAge: string,
  type: string,
  username: string,

}

const peopleId = inject('peopleId')
const userData = reactive({
  personInfo: {} as userInfo,
  editInfo: {} as userInfo
})
console.log(peopleId)
request.get("/coach-entity/getCoach/" + peopleId).then(res => {
  userData.personInfo = res.data
  console.log(userData.personInfo)

})

const editVisible = ref(false)
const editInfo = () => {
  editVisible.value = true
  userData.editInfo = JSON.parse(JSON.stringify(userData.personInfo))
}

const sureEdit = () => {
  request.post("/coach-entity/updateCoach", userData.editInfo).then(res => {
    if (res.data != null) {
      ElMessage({
        message: '修改成功',
        type: 'success',
        showClose: true,
      })
    } else {
      ElMessage({
        message: '修改失败',
        type: 'error',
        showClose: true,
      })
    }
    userData.personInfo = res.data
    editVisible.value = false
  })
}

const editIntroductionVisible = ref(false)
const editIntroduction = () => {
  userData.editInfo = JSON.parse(JSON.stringify(userData.personInfo))
  editIntroductionVisible.value = true
}

const sureEditIntroduction = () => {
  request.post("/coach-entity/updateCoach", userData.editInfo).then(res => {
    if (res.data != null) {
      ElMessage({
        message: '修改成功',
        type: 'success',
        showClose: true,
      })
    } else {
      ElMessage({
        message: '修改失败',
        type: 'error',
        showClose: true,
      })
    }
    userData.personInfo = res.data
    editIntroductionVisible.value = false
  })
}

</script>

<style scoped>


</style>