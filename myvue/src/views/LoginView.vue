<template>

  <div id="main">

    <div id="one">
      <me id="icon1" theme="outline" size="40" fill="#333" :strokeWidth="2" strokeLinecap="butt"/>
      <el-input style="width: 20%" v-model="form.username" clearable maxlength="20" show-word-limit></el-input>
    </div>

    <br>
    <div id="two">
      <keyboard-one theme="outline" size="40" fill="#333" :strokeWidth="2"/>
      <el-input style="width: 20%" v-model="form.password" show-password clearable maxlength="20"></el-input>
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


    const form = ref({
      username: '',
      password: ''
    })
    const login = () => {
      request.post("/student-entity/studentLogin/",form.value).then((res) => {
        console.log(res.data)
        console.log(res.data.length)
        if(res.data.length!=0){
          // router.push("/student")
        }
        else if(res.data.length==0){
          ElMessage({
            message: '用户名或密码错误',
            type: 'error'
          })
        }

      })}
      return {
        login,
        form,
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
#loginButton{
  position: absolute;
  width: 6%;
  top: 57%;
  left: 42%;
}
</style>