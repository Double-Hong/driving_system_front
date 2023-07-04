<template>
  <!--  顶部-->
  <el-card class="box-card">
    <el-radio-group v-model="radio1" size="large">
      <el-radio-button label="未办申请" @click="showCard1 = true"/>
      <el-radio-button label="所有申请" @click="showCard1 = false"/>
    </el-radio-group>
  </el-card>

  <!--  未办申请信息-->
  <div v-if="showCard1">
    <el-card class="box-card">
      <el-table ref="tableRef" :data="visibleData" stripe style="width: 100%">
        <el-table-column prop="studentName" label="姓名" width="150"/>
        <el-table-column prop="practiceDatetime" label="申请时间" width="200"/>
        <el-table-column label="申请状态">
          <template #default="scope">
            <el-switch
                v-model.number="studentData.allApplication[scope.$index].applicationState"
                class="mb-2"
                style="--el-switch-on-color: #13ce66; --el-switch-off-color: #ff4949"
                :active-value="1"
                :inactive-value="0"
                active-text="同意"
                sortable
            />
          </template>
        </el-table-column>
        <el-table-column>
          <template #default="scope">
            <el-button size="small" @click="submit(scope.$index,scope.row)"
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

  <!--  所有学生信息-->
  <div  v-if="!showCard1">
    <el-card class="box-card">
      <el-table :data="studentData.allApplication" stripe style="width: 100%">
        <el-table-column prop="studentName" label="姓名" width="150"/>
        <el-table-column prop="practiceDatetime" label="申请时间" width="200"/>
        <el-table-column>
          <template #default="scope">
            <el-switch
                v-model="studentData.allApplication[scope.$index].applicationState"
                class="mb-2"
                style="--el-switch-on-color: #13ce66; --el-switch-off-color: #ff4949"
                :active-value="1"
                :inactive-value="0"
                active-text="同意"
                disabled
            />
          </template>
        </el-table-column>
      </el-table>
    </el-card>
  </div>
</template>
<script lang="ts" setup>
import {computed, onMounted, reactive, readonly, ref, watch} from 'vue'
import type {UploadProps, UploadUserFile} from 'element-plus'
import {Delete, Repair} from "@icon-park/vue-next";
import axios, {create} from "axios";
import {ElMessage} from "element-plus";
import {toNumber} from "lodash";


const radio1 = ref('未办申请')
const showCard1 = ref(true)
interface studentInfo{
  practiceDatetime:string
  applicationState:number
  studentName:string
  studentId:number
  practiceId:number
  coachId:number
}

const studentData= reactive({
  allApplication:[{
    practiceDatetime:"",
    applicationState:0,
    studentName:"",
    studentId:0,
    practiceId:0,
    coachId:0,
  }],
  unEditApplication:[{
    practiceDatetime:"",
    applicationState:0,
    studentName:"",
    studentId:0,
    practiceId:0,
    coachId:0,
  }],
  editApplication:{} as studentInfo
})
//获取所有信息
const getAllApplication = () =>{
  axios.get("http://localhost:9090/practice-application-entity").then(res=> {
        studentData.allApplication=res.data.data
        studentData.unEditApplication=res.data.data
      }
  )
}
onMounted(() => {
  getAllApplication();
  // getUnEditApplication()
});

// 使用 filter 方法筛选出 applicationState 为 false 的数据

const getUnEditApplication = () =>{

}
const visibleData = reactive([] as studentInfo[])

watch(
    () => studentData.allApplication,
    (newVal, oldVal) => {
      updateVisibleData(newVal)
    }
)

/**
 * 更新可见的数据
 * @param {Array} data - 原始数据数组
 */
const updateVisibleData = (data: studentInfo[]) => {
  visibleData.length = 0
  data.forEach((item: studentInfo) => {
    if (item.applicationState !== 1) {
      visibleData.push(item)
    }
  })
}


const submit = (index:number,row:studentInfo) =>{
  studentData.editApplication.applicationState=1
  studentData.editApplication.studentName=row.studentName
  studentData.editApplication.practiceDatetime=row.practiceDatetime
  studentData.editApplication.studentId=row.studentId
  studentData.editApplication.coachId=row.coachId
  studentData.editApplication.practiceId=row.practiceId
  console.log(studentData.editApplication)
  axios.post("http://localhost:9090/practice-application-entity/updateApplication",studentData.editApplication).then(res=>{
    console.log(res.data)
    if (res.data.message === "success") {
      ElMessage({
        message: '修改成功',
        type: 'success',
        showClose: true,
      })
      getAllApplication()
    } else {
      ElMessage({
        message: '修改失败',
        type: 'error',
        showClose: true,
      })
    }
  })
}

</script>
