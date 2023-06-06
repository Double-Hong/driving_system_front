<template>
<p>AdminMain</p>
  <el-button @click="goToStudentInfo">
    学生信息
  </el-button>

  <div id="children">
    <router-view/>
  </div>
</template>

<script lang="ts">
import {defineComponent, reactive} from "vue";
import router from "@/router";
import {useRouter} from "vue-router";

export default defineComponent({
  name: "AdminMain",

  created() {
    const myRouter = useRouter()
    this.pageInfo.peopleId = <string>myRouter.currentRoute.value.params.peopleId
  },
  setup(){
    const pageInfo = reactive({
      peopleId: '',
    })


    const goToStudentInfo = () => {
      router.push({
        path: '/adminMain/' + pageInfo.peopleId + '/studentInfo'
      })
    }

    return{
      pageInfo,
      goToStudentInfo
    }
  }

})
</script>

<style scoped>
#children{
  position: absolute;
  width: 85%;
  height: 85%;
  top:15%;
  left: 15%;
  background-color: aqua;
}
</style>