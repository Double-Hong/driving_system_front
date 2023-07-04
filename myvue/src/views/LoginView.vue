<template>

  <div id="main">
    <br><br><br><br><br><br>
    <h1 style="text-align: center;font-family: 楷体,serif">驾 校 报 名 系 统</h1>
    <div id="one">
      <me id="icon1" theme="outline" size="40" fill="#333" :strokeWidth="2" strokeLinecap="butt"/>
      <el-input style="width: 20%" v-model="form.username" clearable maxlength="20" show-word-limit></el-input>
    </div>

    <br>
    <div id="two">
      <keyboard-one theme="outline" size="40" fill="#333" :strokeWidth="2"/>
      <el-input style="width: 20%" v-model="form.password" show-password clearable maxlength="20"></el-input>
    </div>

    <div id="three">
      <el-radio-group v-model="userType" size="large">
        <el-radio-button label="学员" style="width: 200px" />
        <el-radio-button label="教练" style="width: 200px" />
      </el-radio-group>
    </div>

    <el-button @click="login" id="loginButton">登录</el-button>

  </div>


</template>

<script lang="ts">
import {defineComponent, ref} from "vue";
import {Me, KeyboardOne} from '@icon-park/vue-next'
import request from "@/request/request";
import router from "@/router";
import {ElMessage} from "element-plus";

export default defineComponent({
  name: "LoginView",
  components: {
    Me, KeyboardOne
  },
  setup() {

    //用户登录信息
    const form = ref({
      username: '',
      password: ''
    })
    //用户登录类型
    const userType= ref('学员')
    //用户登录
    const login = () => {
      if(userType.value=="教练"){
        request.post("/coach-entity/coachLogin",form.value).then(res=>{
          if(res.data.length!=0){
            ElMessage({
              message: '登录成功',
              type: 'success'
            })
            router.push({
              path:'/coachMain/'+res.data[0].coachId
            })
          }
          else if(res.data.length==0){
            ElMessage({
              message: '用户名或密码错误',
              type: 'error'
            })
          }
        })
      }else{
        request.post("/student-entity/studentLogin/",form.value).then((res) => {
          if(res.data.length!=0){
            ElMessage({
              message: '登录成功',
              type: 'success'
            })
            router.push({
              path:'/students/'+res.data[0].studentId
            })
          }
          else if(res.data.length==0){
            ElMessage({
              message: '用户名或密码错误',
              type: 'error'
            })
          }
        })
      }
    }


      return {
        login,
        form,
        userType,

      }
    }

})
</script>

<style scoped>
#main {
  position: absolute;
  width: 100%;
  height: 100%;
  top: 0;
  left: 0;
  background-color: #a6a9de;
}

#one {
  position: absolute;
  width: 100%;
  top: 40%;
  left: 0;
  display: flex;
  justify-content: center;
  align-items: center;
}

#two {
  position: absolute;
  width: 100%;
  top: 50%;
  left: 0;
  display: flex;
  justify-content: center;
  align-items: center;
}
#three{
  position: absolute;
  /*background-color: #2c3e50;*/
  width: 40%;
  top: 57%;
  left:42.5% ;
}
#loginButton{
  position: absolute;
  width: 6%;
  top: 67%;
  left: 42%;
}
</style>