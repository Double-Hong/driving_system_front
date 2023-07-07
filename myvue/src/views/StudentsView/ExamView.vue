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
            <el-table-column
                label="分数"
            >
              <template #default="scope">
                <p v-if="scope.row.score== -1">未考试</p>
                <p v-else>{{ scope.row.score }}</p>
              </template>
            </el-table-column>
            <el-table-column
                label="操作"
            >
              <template #default="exam">
                <el-button @click="onInExam(exam.row)">进入考试</el-button>
              </template>
            </el-table-column>

          </el-table>

        </el-main>
      </el-container>
    </el-container>
  </div>
  <el-dialog
      title="考试"
      v-model="examDialogVisible"
      width="30%"
      center
  >
    <h1 style="margin-left: 30%">确定进入考试？</h1>
    <span style="margin-left: 30%">考试时间为：{{ myPageInfo.examTime }}分钟</span>
    <template #footer>
      <el-button @click="examDialogVisible=false">取消</el-button>
      <el-button type="primary" @click="onInExaming">确定</el-button>
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
import Avatar from "@/components/Avatar.vue";
import {examinationStudent, student} from "../../../myInterface/entity";
import {client} from "@/utils/myoss";
import {UploadUserFile} from "element-plus";

const onInExam = (row: any) => {
  if (row.score != -1) {
    alert("已考试")
    return
  }
  if (row.examinationSubject == "科目二") {
    alert("科目二为线下考试")
    return
  }
  if (row.examinationSubject == "科目三") {
    alert("科目三为线下考试")
    return
  }

  if (!compare(row.examinationCloseTime)) {
    alert("考试已结束")
    return
  }
  if (compare(row.examinationOpenTime)) {
    alert("考试未开始")
    return
  }


  examDialogVisible.value = true
  myPageInfo.examTime = row.examinationTime
  myPageInfo.examId = row.examinationId
}

//输入的时间和现在的时间比较 现在的时间小于输入的时间返回true
function compare(date1: string) {
  let date11 = new Date();
  let nowTime = date11.getFullYear() + "-" + (date11.getMonth() + 1) + "-" + date11.getDate() + " " + date11.getHours() + ":" + date11.getMinutes() + ":" + date11.getSeconds();
  let date2 = new Date(nowTime);
  let date3 = new Date(date1);
  return date2 < date3;
}

const examDialogVisible = ref(false)
const fileList = ref<UploadUserFile[]>([])
const uploadHeadPhoto = (file: any) => {
  let updateHeadInfo = reactive({}) as student
  updateHeadInfo = JSON.parse(JSON.stringify(userData.personInfo))
  const aliName = userData.personInfo.username + ".jpg"
  client.put("/studentHead/" + aliName, file.file).then((res: any) => {
    updateHeadInfo.headPhoto = res.url
    request.post("/student-entity/updateStudentById", updateHeadInfo).then(resp => {
      if (resp.data == 1) {
        router.go(0)
        userData.personInfo.headPhoto = res.url

      }
    })
  })
}

const onInExaming = () => {
  router.push({
    path: '/examing/' + myPageInfo.userId + '/' + myPageInfo.examId + '/' + myPageInfo.examTime
  })
}

const userData = reactive({
  personInfo: {} as student,
})
const ExaminationDataStudent: examinationStudent[] = reactive([])

onMounted(() => {
  myPageInfo.userId = <string>router.currentRoute.value.params.userid
  request.get("/student-entity/selectStudentById/" + myPageInfo.userId).then(res => {
    userData.personInfo = res.data
  })
  request.get("/examination-student-view/getByStudentId/" + myPageInfo.userId).then((res) => {
    ExaminationDataStudent.push(...res.data)
    console.log(ExaminationDataStudent)
  })


})

const router = new useRouter()

const myPageInfo = reactive({
  userId: '',
  examTime: 0,
  examId: '',
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