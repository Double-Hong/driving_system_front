<template>
  <h1 style="text-align: center;font-family: 楷体,serif">驾 校 报 名 系 统</h1>
  <el-card style="background-image: url('https://ts1.cn.mm.bing.net/th/id/R-C.112a7a0f12d0ac5af50eed60ee202665?rik=Ojlnobn%2bjaSAmg&riu=http%3a%2f%2fm.1234wu.com%2fbjtp%2f154.jpg&ehk=Hz1Jm%2ftTY6D3mW057kRpzZAqyBmPZ5QrOz2rusc9ybA%3d&risl=&pid=ImgRaw&r=0') ; background-size:100% 100%;position: absolute;width: 100% ;height: 80%;">
    <br><br><br><br><br><br>

    <el-card style="margin: 2%; margin-left: 30%;background-color: #f8f8f8;margin-right: 30%" >
      <el-form-item
       label="用户名"
       style="margin-left: 20%"
      >
        <me id="icon1" theme="outline" size="40" fill="#333" :strokeWidth="2" strokeLinecap="butt"/>
        <el-input style="width: 50%" v-model="form.username" clearable maxlength="20" show-word-limit></el-input>
      </el-form-item>
      <br>
      <el-form-item
       label="密码"
       style="margin-left: 20%"
      >
        <keyboard-one theme="outline" size="40" fill="#333" :strokeWidth="2"/>
        <el-input style="width: 50%" v-model="form.password" show-password clearable maxlength="20"></el-input>
      </el-form-item>
      <br>
      <el-form-item

      >
        <el-radio-group v-model="userType" size="large" style="margin-left: 25%">
          <el-radio-button label="学员" style="width: 200px" />
          <el-radio-button label="教练" style="width: 200px" />
        </el-radio-group>
      </el-form-item>
      <br>
      <div style="display: flex">
        <el-button @click="login" type="primary" style="margin-left: 20%;width: 20%">登录</el-button>
        <el-button @click="" type="primary" style="margin-left: 10%;width: 20%">注册</el-button>
      </div>

    </el-card>


  </el-card>


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