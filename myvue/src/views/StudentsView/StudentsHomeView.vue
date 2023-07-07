<template>
  <div class="common-layout">
    <el-container>
      <el-header>
        <el-row :gutter="20">
          <el-col :span="6">
            <el-upload
                v-model:file-list="fileList"
                class="upload-demo"
                :http-request="uploadHeadPhoto"
                :limit="1"
            >
              <Avatar :src="userData.personInfo.headPhoto" :key="new Date().getTime()"/>
            </el-upload>
          </el-col>
          <el-col :span="6">
            <div class="grid-content ep-bg-purple"/>
          </el-col>
          <el-col :span="6">
            <div class="grid-content ep-bg-purple"/>
          </el-col>
          <el-col :span="6">
            <div class="grid-content ep-bg-purple"/>
            <el-dropdown>
              <el-button type="primary">
                操作
                <el-icon class="el-icon--right"></el-icon>
              </el-button>
              <template #dropdown>
                <el-dropdown-menu>
                  <el-dropdown-item>
                    <el-button @click="onPersonInfo">个人信息中心</el-button>
                  </el-dropdown-item>
                  <el-dropdown-item>
                    <el-button @click="onHealthy">绑定健康信息</el-button>
                  </el-dropdown-item>
                  <el-dropdown-item>
                    <el-button @click="onEsc">退出登录</el-button>
                  </el-dropdown-item>
                </el-dropdown-menu>
              </template>
            </el-dropdown>

          </el-col>
        </el-row>
      </el-header>
      <br>
      <br>
      <br>
      <el-container>
        <el-aside width="200px" style="background: #a6a9de;height: 581px">


          <el-menu
              default-active="2"
              class="el-menu-vertical-demo"
              background-color="#a6a9de"
              :default-openeds="opends"
          >

            <el-sub-menu index="1">
              <template #title>
                <!--                <el-icon><location /></el-icon>-->
                <span>菜单</span>
              </template>
              <el-menu-item-group>
                <el-menu-item index="1-2" @click="OnSubjectOne">科目一学习</el-menu-item>
                <el-menu-item index="1-3" @click="OnSubjectTwo">科目二学习</el-menu-item>
                <el-menu-item index="1-4" @click="OnSubjectThreePractice">科目三学习</el-menu-item>
                <el-menu-item index="1-5" @click="OnSubjectThreeTheory">科目四学习</el-menu-item>
                <el-menu-item index="1-6" @click="onExam">考试</el-menu-item>
                <el-menu-item index="1-7" @click="onExamRegistration">考试报名</el-menu-item>
              </el-menu-item-group>


            </el-sub-menu>

          </el-menu>
        </el-aside>

        <el-main>
          <h1 style="margin-left: 40%;margin-top: 10%">欢迎来到驾校报名系统！</h1>
          <h2 v-if="Healthy.healthyInfo.imageUrl==''" style="margin-left: 35%;margin-top: 10%">
            请新注册的同学上传健康证明！</h2>
        </el-main>
      </el-container>
    </el-container>
  </div>


</template>
import { ref } from 'vue'
import {
Document,
Menu as IconMenu,
Location,
Setting,
} from '@element-plus/icons-vue'

<script lang="ts" setup>
import {useRouter} from "vue-router";
import {onMounted, reactive, ref} from "vue";
import request from "@/request/request";
import Avatar from "@/components/Avatar.vue";
import {UploadUserFile} from "element-plus";
import {health, student} from "../../../myInterface/entity";
import {client} from "@/utils/myoss";

const fileList = ref<UploadUserFile[]>([])
const uploadHeadPhoto = (file: any) => {
  let updateHeadInfo = reactive({}) as student
  updateHeadInfo = JSON.parse(JSON.stringify(userData.personInfo))
  const aliName = userData.personInfo.username + ".jpg"
  client.put("/studentHead/" + aliName, file.file).then((res: any) => {
    console.log(res)
    updateHeadInfo.headPhoto = res.url
    request.post("/student-entity/updateStudentById", updateHeadInfo).then(resp => {
      if (resp.data == 1) {
        router.go(0)
        userData.personInfo.headPhoto = res.url

      }
    })
  })
}
const userData = reactive({
  personInfo: {} as student,
})
const Healthy = reactive({
  healthyInfo: {} as health,
})


onMounted(() => {
  myPageInfo.userId = <string>router.currentRoute.value.params.userid
  request.get("/student-entity/selectStudentById/" + myPageInfo.userId).then(res => {
    userData.personInfo = res.data
  })
  request.get("/health-entity/getHealthyDataByStudentId/" + myPageInfo.userId).then(res => {
    Healthy.healthyInfo = res.data
  })

})

const router = new useRouter()

const myPageInfo = reactive({
  userId: '',
})

const onEsc = () => {
  router.push({
    path: '/'
  })

}
const onPersonInfo = () => {
  router.push({
    path: '/PersonInfo/' + myPageInfo.userId
  })

}
const OnSubjectOne = () => {
  router.push({
    path: '/SubjectOne/' + myPageInfo.userId
  })
}
const OnSubjectTwo = () => {
  router.push({
    path: '/SubjectTwo/' + myPageInfo.userId
  })
}
const onHealthy = () => {
  router.push({
    path: '/Healthy/' + myPageInfo.userId
  })
}


const OnSubjectThreePractice = () => {
  router.push({
    path: '/SubjectThreePractice/' + myPageInfo.userId
  })
}
const OnSubjectThreeTheory = () => {
  router.push({
    path: '/SubjectThreeTheory/' + myPageInfo.userId
  })
}
const onExam = () => {
  router.push({
    path: '/Exam/' + myPageInfo.userId
  })
}
const onExamRegistration = () => {
  router.push({
    path: '/ExamRegistration/' + myPageInfo.userId
  })
}
const opends = ref(["1-2", "1-3", "1-4", "1-5", "1-6", "1-7"])


</script>

<style scoped>

</style>