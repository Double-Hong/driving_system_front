<template>


  <div id="myHeader">
    <h1>{{ userData.personInfo.coachName }}</h1>
    <!--    <CoachHeadPhoto :url="userData.personInfo.headPhoto" :key="new Date().getTime()" v-show="photoVisible" />-->
    <el-upload
        v-model:file-list="fileList"
        class="upload-demo"
        :http-request="uploadHeadPhoto"
        :limit="1"
    >
      <Avatar :url="userData.personInfo.headPhoto" :key="new Date().getTime()"/>
    </el-upload>
    <br>

    <el-button @click="goToAdminInfo" :type="buttonNow.adminInfo"
               style="width: 100%;position: absolute;top: 25%;left: 0">
      个人信息
    </el-button>
    <br>
    <el-button @click="goToStudentInfo" :type=buttonNow.studentInfo
               style="width: 100%;position: absolute;top: 32%;left: 0">
      学生信息
    </el-button>
    <br>
    <el-button @click="goToExamInfo" :type="buttonNow.examInfo"
               style="width: 100%;position: absolute;top:39%;left: 0;">
      考试信息
    </el-button>
    <br>
    <el-button @click="goToQuestions" :type="buttonNow.testQuestions"
               style="width: 100%;position: absolute;top:46%;left: 0">
      题目信息
    </el-button>
    <br>
    <el-button @click="goToVideo" :type="buttonNow.studyVideo"
               style="width: 100%;position: absolute;top: 53%;left: 0">
      视频信息
    </el-button>
    <br>
    <el-button @click="goToPracticeAdmin"
               style="width: 100%;position: absolute;top:60%;left: 0" :type="buttonNow.practiceAdmin">练车申请
    </el-button>
    <br>
    <el-button @click="goToTest"
               style="width: 100%;position: absolute;top: 67%;left: 0" :type="buttonNow.test">
      学时打卡
    </el-button>
    <br>
    <el-button @click="goToStudentCondition"
               style="position: absolute;width: 100%;top: 74%;left: 0" :type="buttonNow.studentCondition">学员学习进度
    </el-button>
    <div style="background-color: #181818;position: absolute;width: 1%;height: 100%;right: 0;top: 0;"></div>

    <el-button @click="exit" type="danger" style="position: absolute;bottom: 2%;left: 0;">
      <logout theme="outline" size="24" fill="#333" :strokeWidth="2"/>
      退出
    </el-button>
  </div>


  <div id="children" style="font-family: 楷体,serif">
    <router-view/>
  </div>
</template>

<script lang="ts">
import {defineComponent, ref, reactive} from "vue";
import router from "@/router";
import {useRouter} from "vue-router";
import {provide} from "vue";
import request from "@/request/request";
import {UploadUserFile} from "element-plus";
import {client} from "@/utils/myoss";
import Avatar from "@/components/Avatar.vue";
import {Logout} from "@icon-park/vue-next";

export default defineComponent({
  name: "AdminMain",
  components: {Avatar, Logout},
  created() {
    // const myRouter = useRouter()
    // this.pageInfo.peopleId = <string>myRouter.currentRoute.value.params.peopleId
    // provide('peopleId', this.pageInfo.peopleId)
    //
    // console.log(this.userData)
    // request.get("/coach-entity/getCoach/" + this.pageInfo.peopleId).then(res => {
    //   this.userData.personInfo = res.data
    //   // console.log(this.userData.personInfo)
    // })
    // this.goToAdminInfo()
  },
  setup() {
    const pageInfo = reactive({
      peopleId: '',
    })

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
      headPhoto: string,
    }

    const userData = reactive({
      personInfo: {} as userInfo,
    })

    const myRouter = useRouter()
    pageInfo.peopleId = <string>myRouter.currentRoute.value.params.peopleId
    provide('peopleId', pageInfo.peopleId)

    request.get("/coach-entity/getCoach/" + pageInfo.peopleId).then(res => {
      userData.personInfo = res.data
      goToAdminInfo()
    })
    provide("schoolName", userData.personInfo.schoolName)
    const goToAdminInfo = () => {
      buttonNow.adminInfo = "primary"
      buttonNow.studentInfo = "default"
      buttonNow.examInfo = "default"
      buttonNow.testQuestions = "default"
      buttonNow.studyVideo = "default"
      buttonNow.practiceAdmin = "default"
      buttonNow.test = "default"
      buttonNow.studentCondition = "default"
      router.push({
        path: '/coachMain/' + pageInfo.peopleId + '/CoachInfo'
      })
    }

    const goToStudentInfo = () => {
      buttonNow.studentInfo = "primary"
      buttonNow.adminInfo = "default"
      buttonNow.examInfo = "default"
      buttonNow.testQuestions = "default"
      buttonNow.studyVideo = "default"
      buttonNow.practiceAdmin = "default"
      buttonNow.test = "default"
      buttonNow.studentCondition = "default"
      router.push({
        path: '/coachMain/' + pageInfo.peopleId + '/studentInfo'
      })
    }

    const goToExamInfo = () => {
      buttonNow.adminInfo = "default"
      buttonNow.studentInfo = "default"
      buttonNow.examInfo = "primary"
      buttonNow.testQuestions = "default"
      buttonNow.studyVideo = "default"
      buttonNow.practiceAdmin = "default"
      buttonNow.test = "default"
      buttonNow.studentCondition = "default"
      router.push({
        path: '/coachMain/' + pageInfo.peopleId + '/examInfo'
      })
    }

    const goToQuestions = () => {
      buttonNow.studentInfo = "default"
      buttonNow.adminInfo = "default"
      buttonNow.examInfo = "default"
      buttonNow.testQuestions = "primary"
      buttonNow.studyVideo = "default"
      buttonNow.practiceAdmin = "default"
      buttonNow.test = "default"
      buttonNow.studentCondition = "default"
      router.push({
        path: '/coachMain/' + pageInfo.peopleId + '/testQuestions'
      })
    }

    const goToVideo = () => {
      buttonNow.studentInfo = "default"
      buttonNow.adminInfo = "default"
      buttonNow.examInfo = "default"
      buttonNow.testQuestions = "default"
      buttonNow.studyVideo = "primary"
      buttonNow.practiceAdmin = "default"
      buttonNow.test = "default"
      buttonNow.studentCondition = "default"
      router.push({
        path: '/coachMain/' + pageInfo.peopleId + '/studyVideo'
      })
    }

    const goToPracticeAdmin = () => {
      buttonNow.studentInfo = "default"
      buttonNow.adminInfo = "default"
      buttonNow.examInfo = "default"
      buttonNow.testQuestions = "default"
      buttonNow.studyVideo = "default"
      buttonNow.practiceAdmin = "primary"
      buttonNow.test = "default"
      buttonNow.studentCondition = "default"
      router.push({
        path: '/coachMain/' + pageInfo.peopleId + '/practiceAdmin'
      })
    }

    const goToTest = () => {
      buttonNow.studentInfo = "default"
      buttonNow.adminInfo = "default"
      buttonNow.examInfo = "default"
      buttonNow.testQuestions = "default"
      buttonNow.studyVideo = "default"
      buttonNow.practiceAdmin = "default"
      buttonNow.test = "primary"
      buttonNow.studentCondition = "default"
      router.push({
        path: '/coachMain/' + pageInfo.peopleId + '/test'
      })
    }

    const goToStudentCondition = () => {
      buttonNow.studentInfo = "default"
      buttonNow.adminInfo = "default"
      buttonNow.examInfo = "default"
      buttonNow.testQuestions = "default"
      buttonNow.studyVideo = "default"
      buttonNow.practiceAdmin = "default"
      buttonNow.test = "default"
      buttonNow.studentCondition = "primary"
      router.push({
        path: '/coachMain/' + pageInfo.peopleId + '/studentCondition'
      })
    }
    const exit = () => {
      router.push({
        path: '/'
      })
    }
    const buttonNow = reactive({
      adminInfo: "primary" as string,
      studentInfo: "default" as string,
      examInfo: "default" as string,
      testQuestions: "default" as string,
      studyVideo: "default" as string,
      practiceAdmin: "default" as string,
      test: "default" as string,
      studentCondition: "default" as string,
    })

    /*
    上传头像模块
     */
    const photoVisible = ref(true)
    const fileList = ref<UploadUserFile[]>([])
    const uploadHeadPhoto = (file: any) => {
      let updateHeadInfo = reactive({}) as userInfo
      updateHeadInfo = JSON.parse(JSON.stringify(userData.personInfo))
      const aliName = userData.personInfo.username + ".jpg"
      client.put("/ourFile/" + aliName, file.file).then((res: any) => {
        console.log(res)
        updateHeadInfo.headPhoto = res.url
        request.post("http://localhost:9090/coach-entity/updateCoachPhoto", updateHeadInfo).then(resp => {
          if (resp.data == 1) {
            console.log("上传成功")
            router.go(0)
            userData.personInfo.headPhoto = res.url
          }
        })
      })
    }

    return {
      pageInfo,
      goToStudentInfo,
      goToAdminInfo,
      goToExamInfo,
      userData,
      buttonNow,
      goToTest,
      goToQuestions,
      fileList,
      uploadHeadPhoto,
      photoVisible,
      goToVideo,
      goToPracticeAdmin,
      goToStudentCondition,
      exit,
    }
  }

})
</script>

<style scoped>
#myHeader {
  position: absolute;
  width: 15%;
  height: 100%;
  top: 0;
  left: 0;
//background-color: aqua; text-align: center;
}

#children {
  position: absolute;
  width: 85%;
  height: 100%;
  top: 0;
  left: 15%;
  /*background-color: aqua;*/
}


</style>