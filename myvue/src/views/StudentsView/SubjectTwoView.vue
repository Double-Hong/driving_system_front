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
            科目二学习
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

        <el-main>
          <h1 style="margin-left: 500px"> 科目二需要上车打卡学习,请向你的教练预约学习！</h1>

          <br>
          <br>
          <br>
          <div>
            <el-button style="margin-block: 10px" @click="addOrder">申请练车</el-button>
            <el-input placeholder="输入申请时间进行搜索" v-model="search"
                      style="width: 400px;margin-left: 100px"></el-input>
          </div>

          <el-table
              :data="filterPracticeApplicationData"
              style="width: 100%"
              :header-cell-style="{'background-color': '#a6a9de', 'color': '#000'}"
          >


            <el-table-column
                prop="coachId"
                label="教练id"
                width="auto">
            </el-table-column>
            <el-table-column
                prop="practiceType"
                label="科目"
                width="auto">
            </el-table-column>
            <el-table-column
                prop="practiceDatetime"
                label="预约时间"
                width="auto">
            </el-table-column>
            <el-table-column
                prop="applicationState"
                label="预约状态"
                width="auto"
            >
              <template #default="scope">
                <el-tag v-if="scope.row.applicationState == 0" type="danger">未通过</el-tag>
                <el-tag v-else-if="scope.row.applicationState == 1" type="success">已通过</el-tag>
                <el-tag v-else-if="scope.row.applicationState == 2" type="success">已练习</el-tag>
              </template>

            </el-table-column>
            <el-table-column
                label="操作"
                width="auto"
            >
              <template #default="scope">
                <el-button type="primary" @click="onUpdate(scope.row)">修改</el-button>
                <el-button type="danger" @click="onDelete(scope.row)">删除</el-button>
              </template>
            </el-table-column>


          </el-table>
        </el-main>
      </el-container>
    </el-container>
  </div>
  <el-dialog
      width="30%"
      title="申请练车"
      v-model="addDialogVisible"
      center
  >
    <el-form-item label="预约时间">
      <el-date-picker
          style="width: 180px"
          v-model="addPracticeApplicationData.addInfo.practiceDatetime"
          type="datetime"
          placeholder="选择日期"
          format="YYYY/MM/DD HH:mm:ss"
          value-format="YYYY-MM-DD HH:mm:ss"
          :disabled-date="disabledDate"
      />
    </el-form-item>

    <template #footer>
      <span class="dialog-footer">
        <el-button @click="addDialogVisible = false">取消</el-button>
        <el-button type="primary" @click="makeSureAdd">
          确定
        </el-button>
      </span>
    </template>
  </el-dialog>
   <el-dialog
     width="30%"
      title="修改练车时间"
     center
     v-model="updateDialogVisible"
   >
     <el-date-picker
         v-if="practiceData.updatePracticeInfo.applicationState == 0 "
         style="width: 180px"
         v-model="practiceData.updatePracticeInfo.practiceDatetime"
         type="datetime"
         placeholder="选择日期"
         format="YYYY/MM/DD HH:mm:ss"
         value-format="YYYY-MM-DD HH:mm:ss"
         :disabled-date="disabledDate"
     />
     <h1 v-else>此申请不可修改</h1>

     <template #footer>
       <el-button @click="updateDialogVisible=false">取消</el-button>
      <el-button v-if="practiceData.updatePracticeInfo.applicationState != 0 " type="primary" @click="updateDialogVisible=false">确定</el-button>
       <el-button v-else type="primary" @click="makeSureUpdate">确定</el-button>
     </template>

   </el-dialog>
  <el-dialog
   title="删除申请"
   center
   v-model="deleteDialogVisible"
   style="width: 30%"
  >
   <h1 v-if="practiceData.deletePracticeInfo.applicationState==0">确定删除此申请吗？</h1>
    <h1 v-else>此申请已通过，不可删除</h1>
    <template #footer>
      <el-button @click="deleteDialogVisible=false">取消</el-button>
      <el-button v-if="practiceData.deletePracticeInfo.applicationState!=0" type="primary" @click="deleteDialogVisible=false">确定</el-button>
      <el-button v-else type="primary" @click="makeSureDelete" >确定</el-button>
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

<script lang="ts" setup>
import {useRouter} from "vue-router";
import {computed, onMounted, onUpdated, reactive, ref} from "vue";
import request from "@/request/request";
import health from "@icon-park/vue-next/lib/icons/Health";
import type {practiceApplication, student} from "../../../myInterface/entity";
import {ElMessage, UploadUserFile} from "element-plus";
import Avatar from "@/components/Avatar.vue";
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

const deleteDialogVisible = ref(false)
const makeSureUpdate = () => {


  request.post("/practice-application-entity/updatePracticeApplication", practiceData.updatePracticeInfo).then((res) => {
    if (res.data == 1) {
      updateDialogVisible.value = false
      ElMessage({
        message: '修改成功',
        type: 'success'
      })
       practiceApplicationData.splice(practiceApplicationData.findIndex(item => item.practiceId==practiceData.updatePracticeInfo.practiceId),1)
        practiceApplicationData.push(practiceData.updatePracticeInfo)
    } else {
      ElMessage({
        message: '修改失败',
        type: 'error'
      })
    }

  })

}
const updateDialogVisible = ref(false)
const onDelete = (row: practiceApplication) => { //删除
        deleteDialogVisible.value= true
        practiceData.deletePracticeInfo = row

}
const makeSureDelete=()=>{
  request.get("/practice-application-entity/deletedById/"+practiceData.deletePracticeInfo.practiceId).then((res)=>{
    if(res.data==1){
      deleteDialogVisible.value = false
      ElMessage({
        message: '删除成功',
        type: 'success'
      })
      practiceApplicationData.splice(practiceApplicationData.findIndex(item => item.practiceId==practiceData.deletePracticeInfo.practiceId),1)
    }else{
      ElMessage({
        message: '删除失败',
        type: 'error'
      })
    }
  })
}
const addDialogVisible = ref(false)
const disabledDate = (time: Date) => {
  return time.getTime() < Date.now()
}
const onUpdate = (row: practiceApplication) => {

  practiceData.updatePracticeInfo = row

  updateDialogVisible.value = true


}
const makeSureAdd = () => {
  if (addPracticeApplicationData.addInfo.practiceDatetime == null) {
    ElMessage({
      message: '请选择预约时间',
      type: 'error'
    })
    return
  }

  request.post("/practice-application-entity/insertPracticeApplication", addPracticeApplicationData.addInfo).then((res) => {
    if (res.data == 1) {
      addDialogVisible.value = false
      ElMessage({
        message: '申请提交成功',
        type: 'success'
      })
      practiceApplicationData.splice(0,practiceApplicationData.length)
      request.get("/practice-application-entity/getPracticeApplicationByStudentId/"+myPageInfo.userId+"/"+"科目二").then((res)=>{
        practiceApplicationData.push(...res.data)
      })
    } else {
      ElMessage({
        message: '申请提交失败',
        type: 'error'
      })
    }
  })

}
const openeds = ref(["1-2", "1-3", "1-4", "1-5", "1-6", "1-7"])
const search = ref("")

const router = useRouter()

const myPageInfo = reactive({
  userId: '',
})
const studentData = reactive({
  studentInfo: {} as student
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
const practiceApplicationData: practiceApplication[] = reactive([])
const addPracticeApplicationData = reactive({
  addInfo: {} as practiceApplication
})
const practiceData= reactive({
  updatePracticeInfo: {} as practiceApplication,
  deletePracticeInfo: {} as practiceApplication
})

onMounted(() => {
  myPageInfo.userId = <string>router.currentRoute.value.params.userid
  request.get("/practice-application-entity/getPracticeApplicationByStudentId/" + myPageInfo.userId + "/" + "科目二").then((res) => {
    practiceApplicationData.push(...res.data)
  })
  request.get("/student-entity/selectStudentById/" + myPageInfo.userId).then((res) => {
    studentData.studentInfo = res.data
  })

  request.get("/student-entity/selectStudentById/" + myPageInfo.userId).then(res => {
    userData.personInfo = res.data

  })
})


const filterPracticeApplicationData = computed(() => {
  return practiceApplicationData.filter((item) => {
    return item.practiceDatetime.includes(search.value)
  })
})
const addOrder = () => {
  addDialogVisible.value = true
  addPracticeApplicationData.addInfo.practiceDatetime = ''
  addPracticeApplicationData.addInfo.practiceType = '科目二'
  addPracticeApplicationData.addInfo.applicationState =0
  addPracticeApplicationData.addInfo.coachId = studentData.studentInfo.coachId
  addPracticeApplicationData.addInfo.studentId = myPageInfo.userId
}


</script>

<style scoped>

</style>