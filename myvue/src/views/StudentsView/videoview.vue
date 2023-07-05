<template>
  <div class="common-layout">
    <el-container>
      <el-header>
        <el-row :gutter="20" style="height: 100px">
          <el-col :span="6"  >
            <el-upload
                v-model:file-list="fileList"
                class="upload-demo"
                :http-request="uploadHeadPhoto"
                :limit="1"
            >
              <Avatar :src="userData.personInfo.headPhoto" :key="new Date().getTime()" />
            </el-upload>
          </el-col>
          <el-col :span="6"><div class="grid-content ep-bg-purple" />
            科目一学习
          </el-col>
          <el-col :span="6"><div class="grid-content ep-bg-purple" />

            <el-button @click="onSubmitTime">完成这次视频学习</el-button>
          </el-col>
          <el-col :span="6">
            <el-dropdown>
              <el-button type="primary" style="margin-left: 300px">
                操作<el-icon class="el-icon--right"></el-icon>
              </el-button>
              <template #dropdown>
                <el-dropdown-menu>
                  <el-dropdown-item> <el-button @click="onPersonInfo">个人信息中心</el-button></el-dropdown-item>
                  <el-dropdown-item> <el-button @click="onHealthy">绑定健康信息</el-button></el-dropdown-item>
                  <el-dropdown-item><el-button @click="onEsc">退出登录</el-button></el-dropdown-item>
                </el-dropdown-menu>
              </template>
            </el-dropdown>

          </el-col>
        </el-row>
      </el-header>

      <el-container style="margin-top: 50px;">
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
        <el-main >
          <div style="display: flex;width: 100%;flex-flow: row wrap;">
            <div v-for="video in VideoData.videoInfo" style="width: 33.3%;height: 100%;text-align: center">
              <el-card style="height: 100%;width: 100%;position: relative">
                <MyVideo  :url="video.videoUrl" :videoName="video.videoName"/>
                <span>{{ video.videoName }}</span>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;<span>{{ video.videoType }}</span>
              </el-card>
            </div>
          </div>

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

<script setup lang="ts">
import { useRouter} from "vue-router";
import {onMounted, reactive, ref} from "vue";
import request from "@/request/request";
import health from "@icon-park/vue-next/lib/icons/Health";
import {UploadUserFile} from "element-plus";
import {client} from "@/utils/myoss";
import type {student, video} from "../../../myInterface/entity";
import Avatar from "@/components/Avatar.vue";
import MyVideo from "@/components/MyVideo.vue";

const time=reactive({
  AllTime:0,
})
onMounted(()=>{

  jishiqi()
})

const onSubmitTime=()=>{
  let minute=time.AllTime/60
  if (minute<1){
    minute=1
  }

  request.get("/student-condition-entity/addObjectOneTimeByStudentId/"+myPageInfo.userId+'/'+<bigint>minute).then(resp=>{
    if(resp.data==1){
      time.AllTime=0
      router.push({
        path:'/SubjectOne/'+myPageInfo.userId
      })
    }
  })
}
function jishiqi(){
  setInterval(()=>{
    time.AllTime=time.AllTime+1
  },1000)
}

const fileList = ref<UploadUserFile[]>([])
const uploadHeadPhoto = ( file:any) => {
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
const VideoData=reactive({
  videoInfo:[] as video[],
})
onMounted(()=>{
  myPageInfo.userId =  <string>router.currentRoute.value.params.userid

  request.get("/student-entity/selectStudentById/" + myPageInfo.userId).then(res => {
    userData.personInfo = res.data
    request.get("/video-entity/getAllVideoInfoByStudyType/"+userData.personInfo.studyType).then(res=>{
      VideoData.videoInfo=res.data
    })
  })


})



const router =  useRouter()

const myPageInfo=reactive({
  userId:'',
})

const onEsc = () => {
  router.push({
    path:'/'
  })

}
const onPersonInfo = () => {
  router.push({
    path:'/PersonInfo/'+myPageInfo.userId
  })

}
const OnSubjectOne = () => {
  router.push({
    path:'/SubjectOne/'+myPageInfo.userId
  })
}
const OnSubjectTwo = () => {
  router.push({
    path:'/SubjectTwo/'+myPageInfo.userId
  })
}
const onHealthy = () => {
  router.push({
    path:'/Healthy/'+myPageInfo.userId
  })
}


const OnSubjectThreePractice = () => {
  router.push({
    path:'/SubjectThreePractice/'+myPageInfo.userId
  })
}
const OnSubjectThreeTheory = () => {
  router.push({
    path:'/SubjectThreeTheory/'+myPageInfo.userId
  })
}
const onExam = () => {
  router.push({
    path:'/Exam/'+myPageInfo.userId
  })
}
const onExamRegistration = () => {
  router.push({
    path:'/ExamRegistration/'+myPageInfo.userId
  })
}
const openeds = ref(["1-2","1-3","1-4","1-5","1-6","1-7"])



</script>

<style scoped>

</style>