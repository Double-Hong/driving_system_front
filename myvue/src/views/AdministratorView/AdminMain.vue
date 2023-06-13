<template>
  <p>AdminMain</p>
  <el-button @click="goToStudentInfo">
    学生信息
  </el-button>

  <el-button @click="onTest">test</el-button>

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
    const myRouter = useRouter()
    this.pageInfo.peopleId = <string>myRouter.currentRoute.value.params.peopleId
    provide('peopleId', this.pageInfo.peopleId)
    console.log(this.userData)
    request.get("/coach-entity/getCoach/" + this.pageInfo.peopleId).then(res => {
      this.userData.personInfo=res.data
      // console.log(this.userData.personInfo)
    })
    this.goToAdminInfo()
  },
  setup() {
    const pageInfo = reactive({
      peopleId: '',
    })

    interface userInfo{
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
    // coachId: "",
    //     coachName: "",
    //     email: "",
    //     gender: "",
    //     introduction: "",
    //     password: "",
    //     phone: "",
    //     schoolName:"" ,
    //     teachingAge:"",
    //     type: "",
    //     username: "",
    const goToAdminInfo = () => {
      router.push({
        path: '/adminMain/' + pageInfo.peopleId + '/adminInfo'
      })
    }

    const goToStudentInfo = () => {
      router.push({
        path: '/adminMain/' + pageInfo.peopleId + '/studentInfo'
      })
    }

    const onTest = ()=>{
      console.log(userData.personInfo.password)
    }


    return {
      pageInfo,
      goToStudentInfo,
      goToAdminInfo,
      userData,
      onTest,
    }
  }

})
</script>

<style scoped>
#children {
  position: absolute;
  width: 85%;
  height: 85%;
  top: 15%;
  left: 15%;
  background-color: aqua;
}
</style>