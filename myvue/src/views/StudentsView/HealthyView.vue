<template>
  <div class="common-layout">
    <el-container>
      <el-header>
        <el-row :gutter="20">
          <el-col :span="6">
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

          </el-col>
          <el-col :span="6">健康信息</el-col>
          <el-col :span="6">
            <div class="grid-content ep-bg-purple"/>
          </el-col>
          <el-col :span="6">
            <div class="grid-content ep-bg-purple"/>
            <el-dropdown>
              <el-button type="primary" style="margin-left: 300px">
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
      <br>
      <el-container>
        <el-aside width="200px" style="background: #a6a9de;height: 581px">


          <el-menu
              default-active="2"
              class="el-menu-vertical-demo"
              background-color="#a6a9de"
              :default-openeds="openeds"
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

        <el-main style="margin-left: 30%">
          <el-image :src="healthy.imageUrl" style=" height: 60%;width: 60%"></el-image>

          <el-upload
              v-model:file-list="healtyFileList"
              :http-request="upload"
              :show-file-list="false"
              :limit="1"
          >

            <el-button style="margin-top:20% ;margin-left: 500%">上传健康证明</el-button>


          </el-upload>

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

<script lang="ts">
import {useRouter} from "vue-router";
import {reactive, ref} from "vue";
import request from "@/request/request";

import * as $store from "vue-tsc/out/shared";
import upload from "@icon-park/vue-next/lib/icons/Upload";
import axios from "axios";
import Avatar from "@/components/Avatar.vue";
import {UploadUserFile} from "element-plus";
import {student, health} from "../../../myInterface/entity";
import {client} from "@/utils/myoss";

export default {
  name: "StudentsHomeView",
  components: {Avatar},
  computed: {
    upload() {
      return upload
    },

  },

  data() {


    return {}
  },
  setup() {
    const healtyFileList = ref<UploadUserFile[]>([])
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

    const openeds = ref(["1-2", "1-3", "1-4", "1-5", "1-6", "1-7"])
    const upload = (file: any) => {
      let updateHealthInfo = reactive({}) as health
      updateHealthInfo = JSON.parse(JSON.stringify(healthy))
      const aliName = userData.personInfo.username + ".jpg"
      client.put("/healthy/" + aliName, file.file).then((res: any) => {
        updateHealthInfo.imageUrl = res.url
        request.post("/health-entity/updateHealty", updateHealthInfo).then(resp => {
          if (resp.data == 1) {
            router.go(0)
            healthy.imageUrl = res.url
          }
        })
      })
    }

    const router = new useRouter()

    const myPageInfo = reactive({
      userId: '',
      healthyPictureUrl: '',
    })
    const healthy = reactive({
      healthId: '',
      height: '',
      weight: '',
      imageUrl: '',
      studentId: '',
      surgicalHistory: '',
      allergyHistory: '',
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
    return {
      onEsc,
      onPersonInfo,
      OnSubjectOne,
      OnSubjectTwo,
      OnSubjectThreePractice,
      OnSubjectThreeTheory,
      onHealthy,
      onExam,
      onExamRegistration,
      myPageInfo,
      upload,
      healthy,
      openeds,
      fileList,
      uploadHeadPhoto,
      userData,
      healtyFileList,
    }
  },
  methods: {},
  created() {
    const myRoute = new useRouter()
    this.myPageInfo.userId = <string>myRoute.currentRoute.value.params.userid
    // request.get("/student-entity/selectStudentById/"+this.myPageInfo.userId).then(res=>{
    //     console.log(res.data)
    //
    // })
    console.log(this.myPageInfo.userId)
    request.get("/health-entity/getHealthyDataByStudentId/" + this.myPageInfo.userId).then(res => {
      this.healthy.allergyHistory = res.data.allergyHistory
      this.healthy.healthId = res.data.healthId
      this.healthy.height = res.data.height
      this.healthy.weight = res.data.weight
      this.healthy.imageUrl = res.data.imageUrl
      this.healthy.studentId = res.data.studentId
      this.healthy.surgicalHistory = res.data.surgicalHistory
      console.log(this.healthy)
    })
    request.get("/student-entity/selectStudentById/" + this.myPageInfo.userId).then(res => {
      this.userData.personInfo = res.data

    })

  }
}
</script>

<style scoped>

</style>