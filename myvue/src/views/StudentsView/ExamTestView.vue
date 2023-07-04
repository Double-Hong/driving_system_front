<template>
  <div style="background: #d2d0d0;display: flow;height: 100%">
  <el-container class="el-container">
    <el-header>
      <el-row :gutter="20">
        <el-col :span="6"><div class="grid-content ep-bg-purple" />
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
          <el-button @click="shuaxin">换一套题</el-button>
        </el-col>

        <el-col :span="6">
          <el-button style="" @click="sumbit()">提交</el-button>
        </el-col>
        <el-col :span="6"><div class="grid-content ep-bg-purple" />
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
    <el-container style="margin-top: 5%">
      <el-aside width="200px" style="background: #a6a9de;height: 581px">


        <el-menu
            default-active="2"
            class="el-menu-vertical-demo"
            background-color="#a6a9de"

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
      <el-main style="margin-left: 5%; display: flex ">
        <el-card   style="width: 70%">
          <div v-for="(item,index) in examData.examMultipleChoice" style="margin-left: 30%">
            <el-card style="text-align: left;height: 50px;width: 70% ">{{index+1}}:{{ item.multipleChoiceDescribe }} </el-card>
            <el-radio-group v-model="item.answer" size="large" style="margin: auto ">
              <el-radio :label="item.option1" style="">{{ item.option1 }}</el-radio>
              <el-radio :label="item.option2">{{ item.option2 }}</el-radio>
              <el-radio :label="item.option3">{{ item.option3 }}</el-radio>
              <el-radio :label="item.option4">{{ item.option4 }}</el-radio>
            </el-radio-group>
            <el-card v-if="flag">正确答案：{{item.correctAnswer}}</el-card>
          </div>

        </el-card>
        <el-card  style="margin-left: 10%;width: 15%;background: #e7dada">
          <p>点击提交会出现分数和正确答案</p>

        </el-card>
      </el-main>
    </el-container>
  </el-container>
  </div>
</template>


<script setup lang="ts">


import {onMounted, reactive, ref} from "vue";
import request from "@/request/request";
import {useRouter} from "vue-router";
import type {examingMultipleChoice} from "../../../myInterface/entity";
import {ElMessage, UploadUserFile} from "element-plus";
import Avatar from "@/components/Avatar.vue";
import {student} from "../../../myInterface/entity";
import {client} from "@/utils/myoss";


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


const router = useRouter()
const flag=ref(false)
const myPageInfo=reactive({
  userId:'',
})
const shuaxin=()=>{
   router.go(0)
}
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
const onHealthy = () => {
  router.push({
    path:'/Healthy/'+myPageInfo.userId
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
const examData=reactive({
  examMultipleChoice:[] as examingMultipleChoice[],
})
onMounted(() => {
  myPageInfo.userId=<string>router.currentRoute.value.params.userId

   console.log(myPageInfo.userId)
  request.get("/multiple-choice-entity/randomChoice/"+shuliang.value).then(res=>{
    examData.examMultipleChoice=res.data
  })
  request.get("/student-entity/selectStudentById/" + myPageInfo.userId).then(res => {
    userData.personInfo = res.data

  })


})
const shuliang=ref(3)
const sum=reactive(
    {
      value:0
    }
)
function sumbit(){


  for (let i=0;i<examData.examMultipleChoice.length;i++) {
    if (examData.examMultipleChoice[i].answer == examData.examMultipleChoice[i].correctAnswer) {
      sum.value=sum.value+100/shuliang.value
    }
  }
  flag.value=true
 ElMessage({
   message: '你的成绩是' + sum.value,
   type: 'success'
 })
  // router.push({path: '/Exam/' + myPageInfo.userId})
}



</script>



<style scoped>
.el-container {
  height: 100%;
}

</style>