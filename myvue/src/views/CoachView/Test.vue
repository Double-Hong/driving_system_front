<template>
<!--顶部-->
  <el-card class="box-card">
    <el-radio-group v-model="radio1" size="large">
      <el-radio-button label="科目二" @click="showCard1 = true"/>
      <el-radio-button label="科目三" @click="showCard1 = false"/>
    </el-radio-group>
  </el-card>
  <div v-if="showCard1"  id="search">
    <el-card>
      <el-row>
        <el-col :span="18">
          <!-- clearable属性是设置为可以一键删除文本框的内容 -->
          <el-input v-model="searchName" placeholder="用户名" clearable></el-input>
          <el-button type="primary" @click="findByName" :icon="Search"/></el-col>
      </el-row>
      <el-table :data="pageData.student" style="width: 100%">
        <el-table-column prop="studentId" label="学号" width="200"></el-table-column>
        <el-table-column prop="studentName" label="姓名" width="200" />
        <el-table-column prop="practiceTimeTwo" label="科目二时长" width="200" />
        <el-table-column label="本次打卡时长">
          <template #default="scope">
            <el-input-number v-model="pageData.addTime2[scope.$index]"></el-input-number>
          </template>
        </el-table-column>
        <el-table-column label="操作">
          <template #default="scope">
            <el-button size="small" @click="submit(scope.row,scope.$index)"
            >
              <repair theme="outline" size="24" fill="#333" :strokeWidth="2" strokeLinecap="butt"/>
              提交
            </el-button
            >
          </template>
        </el-table-column>
      </el-table>
    </el-card>
  </div>


  <div v-if="!showCard1" id="search">
    <el-card>
      <el-row>
        <el-col :span="18">
          <!-- clearable属性是设置为可以一键删除文本框的内容 -->
          <el-input v-model="searchName" placeholder="用户名" clearable></el-input>
          <el-button type="primary" @click="findByName" :icon="Search"/></el-col>
      </el-row>
      <el-table :data="pageData.student" style="width: 100%">
        <el-table-column prop="studentId" label="学号" width="200"></el-table-column>
        <el-table-column prop="studentName" label="姓名" width="200" />
        <el-table-column prop="practiceTimeThree" label="科目三时长" width="200"/>
        <el-table-column label="本次打卡时长">
          <template #default="scope">
            <el-input-number v-model="pageData.addTime3[scope.$index]"></el-input-number>
          </template>
        </el-table-column>
        <el-table-column label="操作">
          <template #default="scope">
            <el-button size="small" @click="submit(scope.row,scope.$index)"
            >
              <repair theme="outline" size="24" fill="#333" :strokeWidth="2" strokeLinecap="butt"/>
              提交
            </el-button
            >
          </template>
        </el-table-column>
      </el-table>
    </el-card>
  </div>

</template>
<script lang="ts" setup>
import {computed, onMounted, reactive, readonly, ref, watch} from 'vue'
import type {UploadProps, UploadUserFile} from 'element-plus'
import {Delete, Repair, Search} from "@icon-park/vue-next";
import axios, {create} from "axios";
import {ElMessage} from "element-plus";
import {toNumber} from "lodash";


const radio1 = ref('科目二')
const showCard1 = ref(true)
interface studentCondition{
  conditionId:string,
  studentId:string,
  studentName:string,
  practiceTimeTwo:number,
  practiceTimeThree:number,
}
const searchName= ref()
const pageData = reactive({
  student:[] as studentCondition[],
  addTime2:[0],
  addTime3:[0],
  updataStudent:{} as studentCondition,
  unEditStudent:[] as studentCondition[],
})
//获取所有信息
const getAllData = () =>{
  // console.log(pageData.searchName)
  axios.post(" http://localhost:9090/student-condition-view/getAllCondition").then(res=>{
    pageData.student=res.data.data
  })
}


watch(
    () => pageData.student,
    (newVal, oldVal) => {
      updateVisibleData(newVal)
    }
)

/**
 * 更新可见的数据
 * @param {Array} data - 原始数据数组
 */
const updateVisibleData = (data: studentCondition[]) => {
  pageData.unEditStudent.length = 0
  data.forEach((item: studentCondition) => {
    if (item.applicationState !== 1) {
      visibleData.push(item)
    }
  })
}

//通过名字查找学生
const findByName = () =>{
  axios.post("http://localhost:9090/student-condition-view/student_condition/" + searchName.value).then(res=>{
    pageData.student=res.data.data
  })
}
const submit = (row:studentCondition,index:number) =>{
  pageData.updataStudent.studentName=row.studentName
  pageData.updataStudent.studentId=row.conditionId
  pageData.updataStudent.conditionId=row.conditionId
  pageData.updataStudent.practiceTimeTwo=row.practiceTimeTwo+pageData.addTime2[index]
  pageData.updataStudent.practiceTimeThree=row.practiceTimeThree+pageData.addTime3[index]
  console.log(pageData.updataStudent)
  axios.post("http://localhost:9090/student-condition-view/updateStudentCondition" , pageData.updataStudent).then(res=>{
    if (res.data.message === "success") {
      ElMessage({
        message: '修改成功',
        type: 'success',
        showClose: true,
      })
    } else {
      ElMessage({
        message: '修改失败',
        type: 'error',
        showClose: true,
      })
    }
  })
}
//用于初始化数据
onMounted(() => {
getAllData();
pageData.addTime3=new Array(20).fill(0);
  pageData.addTime2=new Array(20).fill(0);
});


</script>
<style scoped>
#search .el-input {
  width: 200px;
  margin-right: 10px;
}
</style>