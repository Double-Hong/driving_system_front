


<template>
  <el-scrollbar>
  <div style="background: #d2d0d0;display: flow">
  <el-container class="el-container">
    <el-header>

      <el-row :gutter="20">
        <el-col :span="6"><div class="grid-content ep-bg-purple" /></el-col>
        <el-col :span="6"><div class="grid-content ep-bg-purple" />考生姓名：{{myPageInfo.userName}}</el-col>
        <el-col :span="6"><div class="grid-content ep-bg-purple" />时间：{{time.hour}}:{{time.minute}}:{{time.second}}</el-col>
        <el-col :span="6"><div class="grid-content ep-bg-purple" />
          <el-button type="primary" style="margin: 2%; margin-left: 50%" @click="sumbit()">提交</el-button>
        </el-col>
      </el-row>
    </el-header>
    <el-container style="margin-top: 5%">
      <el-aside width="200px" style="background: #948f88;margin-left: 2%">
        <spon>选择题{{examData.examMultipleChoice.length}}题，满分一百分</spon>
        <h4></h4>
      </el-aside>
      <el-main style="margin-left: 5%; display: flex ">

        <el-card   style="width: 70%">

          <el-card v-for="(item,index) in examData.examMultipleChoice" style="margin-left: 10%;margin-right: 10%;margin: 5%">

            <el-card style="text-align: left;height: 50px;width: 70% ;margin: 2%">{{index+1}}:{{ item.multipleChoiceDescribe }} </el-card>
            <el-image :src="item.photoUrl" style="height: 30%;width: 30%;margin-left: 5%"></el-image><br>
            <el-radio-group v-model="item.answer" size="large" style="margin: auto ">
              <el-radio :label="item.option1" style="">{{ item.option1 }}</el-radio>
              <el-radio :label="item.option2">{{ item.option2 }}</el-radio>
              <el-radio :label="item.option3">{{ item.option3 }}</el-radio>
              <el-radio :label="item.option4">{{ item.option4 }}</el-radio>
            </el-radio-group>
          </el-card>

        </el-card>

        <el-card  style="margin-left: 10%;width: 15%;background: #e7dada">
          <p>请在规定时间内答题！</p>
          <h4>考试时间结束自动交卷</h4>
        </el-card>
      </el-main>
    </el-container>
  </el-container>
  </div>
  </el-scrollbar>
</template>


<script setup lang="ts">


import {onMounted, reactive} from "vue";
 import request from "@/request/request";
 import {useRouter} from "vue-router";
import type {examingMultipleChoice} from "../../../myInterface/entity";

 const router = useRouter()

 const myPageInfo=reactive({
    userId:'',
     userName:'',
     examId:'',
     examTime:'',
 })
  const time=reactive({
     hour:0,
     minute:0,
     second:0,
    allTime:0,
  })
   const examData=reactive({
     examMultipleChoice:[] as examingMultipleChoice[],
   })
 onMounted(() => {
     myPageInfo.userId=<string>router.currentRoute.value.params.userId
      myPageInfo.examId=<string>router.currentRoute.value.params.examId
      myPageInfo.examTime=<string>router.currentRoute.value.params.examTime
      request.get("/student-entity/selectStudentById/"+myPageInfo.userId).then(res=>{
         myPageInfo.userName=res.data.studentName
      })
     time.allTime=myPageInfo.examTime*60;
     time.hour=Math.floor(time.allTime/3600)
      time.minute=Math.floor((time.allTime-time.hour*3600)/60)
      time.second=time.allTime-time.hour*3600-time.minute*60
    request.get("/examing-view/getExamingViewByExaminationId/"+myPageInfo.examId).then(res=>{
        examData.examMultipleChoice=res.data
      console.log(examData.examMultipleChoice)
    })

 })
 onMounted(()=>{
     setInterval(showTime,1000)
       showTime()
  })

   function sumbit(){

         let sum=0
        for (let i=0;i<examData.examMultipleChoice.length;i++) {
          if (examData.examMultipleChoice[i].answer == examData.examMultipleChoice[i].correctAnswer) {
             sum=sum+examData.examMultipleChoice[i].fraction
          }
        }
        request.get("/exam-records-entity/setExamScore/"+myPageInfo.examId+"/"+myPageInfo.userId+"/"+sum).then(res=>{

          if (res.data==1) {
            alert("提交成功！")
          }
        })
        router.push({path: '/Exam/' + myPageInfo.userId})
   }

   function showTime(){
        if (time.allTime==0){
            alert("考试时间到！")
            sumbit()
        }
        if (time.second==0&&time.minute==0){
            time.hour--
            time.minute=59
            time.second=59
            time.allTime--
        }else if (time.second==0&&time.minute>0){
            time.minute--
            time.second=59
            time.allTime--
        }else if (time.second>0){
            time.second--
            time.allTime--
        }
   }

</script>



<style scoped>
.el-container {
  height: 100%;
}

</style>