<template>
  <h1 style="text-align: center">学员学习进度</h1>
  <el-button v-if="!progressVisible" @click="progressVisible=true" icon="Menu">显示进度</el-button>
  <el-button v-else @click="progressVisible=false" icon="Menu">显示数值</el-button>
  <div style="position: absolute;width: 40%;top:11%;right: 0">
    <el-input v-model="search" style="width: 50%"/>
    <el-select v-model="select">
      <el-option label="全部" value=""/>
      <el-option label="A1" value="A1"/>
      <el-option label="A2" value="A2"/>
      <el-option label="B1" value="B1"/>
      <el-option label="B2" value="B2"/>
      <el-option label="C1" value="C1"/>
      <el-option label="C2" value="C2"/>
    </el-select>
  </div>

  <br><br><br>
  <el-table :data="filterCondition"
            :header-cell-style="{background: '#409EFF', color: '#fff' }"
  >
    <el-table-column prop="studentName" label="学生姓名"/>
    <el-table-column prop="subjectOne" label="科一成绩"/>
    <el-table-column prop="subjectTwo" label="科二成绩"/>
    <el-table-column prop="subjectThree" label="科三成绩"/>
    <el-table-column prop="subjectFour" label="科四成绩"/>
    <el-table-column prop="practiceTimeOne" label="科一学习时长">
      <template #default="scope">
        <el-progress v-if="progressVisible" :text-inside="true" :stroke-width="18"
                     :percentage="(scope.row.practiceTimeOne/9.6).toFixed(1)" status="success">
          <template #default="{percentage }">
            <span style="color: #181818">{{ (scope.row.practiceTimeOne / 9.6).toFixed(1) }}%</span>
          </template>
        </el-progress>
        <span v-else>{{ scope.row.practiceTimeOne }}分钟</span>
      </template>
    </el-table-column>
    <el-table-column prop="practiceTimeTwo" label="科二练习时长">
      <template #default="scope">
        <el-progress v-if="progressVisible" :text-inside="true" :stroke-width="18"
                     :percentage="(scope.row.practiceTimeTwo/7.2).toFixed(1)" status="success">
          <template #default="{percentage }">
            <span style="color: #181818">{{ (scope.row.practiceTimeTwo / 7.2).toFixed(1) }}%</span>
          </template>
        </el-progress>
        <span v-else>{{ scope.row.practiceTimeTwo }}分钟</span>
      </template>
    </el-table-column>
    <el-table-column prop="practiceTimeThree" label="科三练习时长">
      <template #default="scope">
        <el-progress v-if="progressVisible" :text-inside="true" :stroke-width="18"
                     :percentage="(scope.row.practiceTimeThree/7.2).toFixed(1)" status="success">
          <template #default="{percentage }">
            <span style="color: #181818">{{ (scope.row.practiceTimeThree / 7.2).toFixed(1) }}%</span>
          </template>
        </el-progress>
        <span v-else>{{ scope.row.practiceTimeThree }}分钟</span>
      </template>
    </el-table-column>
    <el-table-column prop="practiceTimeFour" label="科四学习时长">
      <template #default="scope">
        <el-progress v-if="progressVisible" :text-inside="true" :stroke-width="18"
                     :percentage="(scope.row.practiceTimeFour/9.6).toFixed(1)" status="success">
          <template #default="{percentage }">
            <span style="color: #181818">{{ (scope.row.practiceTimeFour / 9.6).toFixed(1) }}%</span>
          </template>
        </el-progress>
        <span v-else>{{ scope.row.practiceTimeFour }}分钟</span>
      </template>
    </el-table-column>
    <el-table-column prop="studyType" label="学员类型"></el-table-column>
  </el-table>
</template>

<script setup lang="ts">


import {computed, inject, onMounted, reactive, ref} from "vue";
import request from "@/request/request";

interface StudentCondition {
  studentName: string,
  studyType: string,
  conditionId: string,
  studentId: string,
  subjectOne: string,
  subjectTwo: string,
  subjectThree: string,
  subjectFour: string,
  practiceTimeOne: string,
  practiceTimeTwo: string,
  practiceTimeThree: string,
  practiceTimeFour: string,
  coachId: string
}

const studentConditionList: StudentCondition[] = reactive([])
const coachId = inject('peopleId')

onMounted(() => {
  request.get("/student_study_condition_view/getByCoachId/" + coachId).then(res => {
    console.log(res.data)
    studentConditionList.splice(0, studentConditionList.length)
    studentConditionList.push(...res.data)
  })
})

//进度条可见性
const progressVisible = ref(false)

//筛选
const search = ref('')
const select = ref('')
const filterCondition = computed(() => {
  return studentConditionList.filter((item: StudentCondition) => {
    return (item.studentName.includes(search.value)) && item.studyType.includes(select.value)
  })
})

</script>

<style scoped>

</style>