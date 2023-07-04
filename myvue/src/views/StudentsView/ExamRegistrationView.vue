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
              <Avatar :src="userData.personInfo.headPhoto" :key="new Date().getTime()" />
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
      <el-container>
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

        <el-main>
          <el-button @click="onRegistrate">考试报名</el-button>
          <br>
          <br>
          <el-table
           :data="ExaminationDataStudent"
           style="width: 100%"
           :header-cell-style="{'background-color': '#7175c4', 'color': '#000'}"
          >
            <el-table-column
            prop="examinationName"
            label="考试名称"
            width="auto"
            >
            </el-table-column>
            <el-table-column
             prop="studentName"
              label="考生姓名"
             width="auto"
            ></el-table-column>
            <el-table-column
                prop="examinationOpenTime"
                label="考试开始时间"
                width="auto">
            </el-table-column>
            <el-table-column
                prop="examinationCloseTime"
                label="考试结束时间"
                width="auto">
            </el-table-column>
            <el-table-column
                prop="examinationTime"
                label="考试时间（分钟）"
                width="auto"
            >
            </el-table-column>
            <el-table-column
             prop="examinationSubject"
             label="考试科目"
             width="auto"
            >
            </el-table-column>
            <el-table-column
              prop="examinationType"
              label="考试类型"
              width="auto"
            ></el-table-column>
            <el-table-column>
              <template #default="scope">
                <p v-if="scope.row.score== -1">未考试</p>
                <p v-else>{{scope.row.score}}</p>
              </template>
            </el-table-column>

          </el-table>
        </el-main>
      </el-container>
    </el-container>
  </div>
  <el-dialog
   v-model="registrateDialogVisible"
   title="考试报名"
    width="80%"

  >
  <el-table
  :data="ExaminationData"
  style="width: 100%"
  :header-cell-style="{'background-color': '#7c7e94', 'color': '#000'}"
  >
  <el-table-column
   prop="examinationName"
    label="考试名称"
    width="auto"
  >
  </el-table-column>
  <el-table-column
    prop="examinationOpenTime"
      label="考试开始时间"
      width="auto"
  ></el-table-column>
  <el-table-column
      prop="examinationCloseTime"
      label="考试结束时间"
      width="auto">
  </el-table-column>
    <el-table-column
        prop="examinationTime"
        label="考试时间（分钟）"
        width="auto"
    >
    </el-table-column>
  <el-table-column
   prop="examinationSubject"
    label="考试科目"
    width="auto"
  ></el-table-column>
<el-table-column
 prop="examinationType"
  label="考试类型"
  width="auto"
></el-table-column>
 <el-table-column
   prop="examinationAddress"
    label="考试地点"
    width="auto"
 >
 </el-table-column>
  <el-table-column
      label="操作"
      width="auto"
  >
    <template #default="scope">
      <el-button type="primary" @click="choice(scope.row)">报名</el-button>

    </template>
  </el-table-column>

  </el-table>

  </el-dialog>
  <el-dialog
  v-model="makeSureRegistrateDialogVisible"
  center
  width="30%"
  title="确认报名"
  >
   <h1 v-if="!compare(registrateData.registrateInfo.examinationCloseTime)">考试时间已过!</h1>
   <h1 v-else-if="qualification(registrateData.registrateInfo.examinationSubject)">学时不够，没有报名资格</h1>
   <h1 v-else>确定要报名这场考试吗</h1>

    <template #footer>
    <el-button @click="makeSureRegistrateDialogVisible=false">取消</el-button>
    <el-button v-if="!compare(registrateData.registrateInfo.examinationCloseTime)" type="primary" @click="makeSureRegistrateDialogVisible=false">确定</el-button>
    <el-button v-else type="primary"  @click="makeSureRegistretation">确认</el-button>
    </template>
  </el-dialog>

</template>
import { ref } from 'vue'
import {
Document,
Menu as IconMenu,
Location,
Setting,
} from '@element-plus/icons-vue'

<script setup lang="ts">
import {useRouter} from "vue-router";
import {onMounted, reactive, ref} from "vue";
import request from "@/request/request";
import health from "@icon-park/vue-next/lib/icons/Health";
import type {examination, examinationStudent, examRecords, studentCondition} from "../../../myInterface/entity";
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





const router =  useRouter()

const registrateData=reactive({
  registrateInfo:{} as examination,
})
const tijiao=reactive({
  examRegistrationInfo:{} as examRecords,
})
const ExaminationDataStudent:examinationStudent[] = reactive([])

const makeSureRegistretation=()=>{

  console.log(tijiao)

  request.post("/exam-records-entity/addExamRecord",tijiao.examRegistrationInfo).then((res)=>{
    if(res.data== 1){
      ElMessage({
        message: '报名成功',
        type: 'success'
      })
      makeSureRegistrateDialogVisible.value=false
      registrateDialogVisible.value=false
      ExaminationDataStudent.splice(0,ExaminationDataStudent.length)
      request.get("/examination-student-view/getByStudentId/"+myPageInfo.userId).then((res)=>{
        ExaminationDataStudent.push(...res.data)
      })
    }else {
      ElMessage({
        message: '已报名该考试',
        type: 'error'
      })
      makeSureRegistrateDialogVisible.value=false
    }
  })
}

const ExaminationData:examination [] = reactive([])

const registrateDialogVisible= ref(false)

const  makeSureRegistrateDialogVisible= ref(false)

const onRegistrate= () => {
  registrateDialogVisible.value = true
}
const choice = (row:examination) => {
  registrateData.registrateInfo= row
  console.log(myPageInfo.userId)
  makeSureRegistrateDialogVisible.value = true
  tijiao.examRegistrationInfo.examinationId=row.examinationId
  tijiao.examRegistrationInfo.studentId=myPageInfo.userId
  tijiao.examRegistrationInfo.score=-1

}
function compare(date1:string) {
  let date11 = new Date();
  let nowTime = date11.getFullYear()+"-"+(date11.getMonth()+1)+"-"+date11.getDate()+" "+date11.getHours()+":"+date11.getMinutes()+":"+date11.getSeconds();
  let date2 = new Date(nowTime);
  let date3 = new Date(date1);
  if (date2 < date3) {
    return true
  } else {
    return false
  }
}
const studentConditionData=reactive({
  studentConditionInfo:{} as studentCondition,
})

function qualification(sujectType:string) {
  let flag=true
   if (sujectType=="科目一"){
      if (studentConditionData.studentConditionInfo.practiceTimeOne>=720){
        flag=false
      }
   }
  if (sujectType=="科目二") {
    if (studentConditionData.studentConditionInfo.practiceTimeTwo >= 720) {
      flag = false
    }
  }
  if (sujectType=="科目三"){
    if (studentConditionData.studentConditionInfo.practiceTimeThree>=720){
      flag=false
    }
  }
  if (sujectType=="科目四"){
    flag=false
  }
  console.log(sujectType+flag)
  return flag
}

onMounted(() => {


  myPageInfo.userId = <string>router.currentRoute.value.params.userid

  request.get("/examination-student-view/getByStudentId/"+myPageInfo.userId).then((res)=>{
   ExaminationDataStudent.push(...res.data)
  })
  request.get("/examination-entity/getAllExamination").then((res)=>{
   ExaminationData.push(...res.data)
  })
  request.get("/student-condition-entity/getStudentConditionById/"+myPageInfo.userId).then((res)=>{
    console.log(res.data)
    studentConditionData.studentConditionInfo=res.data

  })

  request.get("/student-entity/selectStudentById/" + myPageInfo.userId).then(res => {
    userData.personInfo = res.data

  })

})

const myPageInfo = reactive({
  userId: '',
   choiceDate: Date,
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


</script>

<style scoped>

</style>