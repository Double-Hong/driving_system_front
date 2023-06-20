<template>


  <div id="myHeader">
    <h1>{{userData.personInfo.coachName}}</h1>
    <el-button @click="goToAdminInfo" :type="buttonNow.adminInfo" style="width: 100%;position: absolute;top: 25%">
      个人信息
    </el-button>
    <br>
    <el-button @click="goToStudentInfo" :type=buttonNow.studentInfo style="width: 100%;position: absolute;top: 35%">
      学生信息
    </el-button>
    <br>
    <el-button @click="goToExamInfo" :type="buttonNow.examInfo" style="width: 100%;position: absolute;top:45%">
      考试信息
    </el-button>
    <br>
    <el-button @click="goToQuestions" :type="buttonNow.testQuestions" style="width: 100%;position: absolute;top:55%">
      题目信息
    </el-button>
    <br>
    <el-button @click="goToTest"  style="width: 100%;position: absolute;top: 75%">
      Test
    </el-button>  </div>


  <div id="children">
    <router-view/>
  </div>
</template>

<script lang="ts">
import {defineComponent, reactive, ref} from "vue";
import router from "@/router";
import {useRouter} from "vue-router";
import {provide} from "vue";
import request from "@/request/request";

export default defineComponent({
  name: "AdminMain",

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




    const goToAdminInfo = () => {
      buttonNow.adminInfo = "primary"
      buttonNow.studentInfo = "default"
      buttonNow.examInfo = "default"
      buttonNow.testQuestions= "default"
      router.push({
        path: '/coachMain/' + pageInfo.peopleId + '/CoachInfo'
      })
    }

    const goToStudentInfo = () => {
      buttonNow.studentInfo = "primary"
      buttonNow.adminInfo = "default"
      buttonNow.examInfo = "default"
      buttonNow.testQuestions= "default"
      router.push({
        path: '/coachMain/' + pageInfo.peopleId + '/studentInfo'
      })
    }

    const goToExamInfo = () =>{
      buttonNow.adminInfo = "default"
      buttonNow.studentInfo = "default"
      buttonNow.examInfo = "primary"
      buttonNow.testQuestions= "default"
      router.push({
        path: '/coachMain/' + pageInfo.peopleId + '/examInfo'
      })
    }

    const goToQuestions = () =>{
      buttonNow.studentInfo = "default"
      buttonNow.adminInfo = "default"
      buttonNow.examInfo = "default"
      buttonNow.testQuestions= "primary"
      router.push({
        path: '/coachMain/' + pageInfo.peopleId + '/testQuestions'
      })
    }

    const goToTest = () => {
      router.push({
        path: '/coachMain/' + pageInfo.peopleId +'/test'
      })
    }
    const buttonNow = reactive({
      adminInfo: "primary" as string,
      studentInfo: "default" as string,
      examInfo: "default" as string,
      testQuestions: "default" as string,
    })

    return {
      pageInfo,
      goToStudentInfo,
      goToAdminInfo,
      goToExamInfo,
      userData,
      buttonNow,
      goToTest,
      goToQuestions,
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
  background-color: aqua;

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