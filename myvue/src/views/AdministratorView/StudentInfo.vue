<template>
<!--  搜索框-->
  <el-card class="box-card">
    <el-row>
      <el-col :span="12"><div class="grid-content ep-bg-purple" />
        <el-input v-model="input" placeholder="请输入用户名" />
        <el-button :icon="Search" circle />
      </el-col>
      <el-col :span="12"><div class="grid-content ep-bg-purple-light" />
        <el-button type="primary" icon="el-icon-plus" circle></el-button>
      </el-col>
    </el-row>
  </el-card>

  <!--  学员信息框-->
  <el-card class="box-card">
    <el-table :data="studentForm" style="width: 100%">
      <el-table-column prop="student_name" label="Name" width="110" />
      <el-table-column prop="gender" label="Gender" width="80"/>
      <el-table-column prop="birthday" label="Birthday" width="100"/>
      <el-table-column prop="phone" label="Phone" width="180" />
      <el-table-column prop="email" label="Email" width="180" />
      <el-table-column prop="study_type" label="Study_type" width="80" />
    </el-table>
  </el-card>

<!--  添加/修改信息框-->
  <el-dialog @close="closeForm" :title="title" :visible.sync="dialogFormVisible">
    <el-form :model="studentForm" ref="studentFormRef" :rules="rules">
      <!-- prop属性是验证字段正确性时与rules里对应的验证规则匹配 -->
      <el-form-item label="用户名" prop="student_name" :label-width="formLabelWidth">
        <el-input v-model="studentForm.student_name" autoc \omplete="off"></el-input>
      </el-form-item>
      <el-form-item label="年纪" prop="gender" :label-width="formLabelWidth">
        <el-input v-model="studentForm.gender" autoc \omplete="off"></el-input>
      </el-form-item>
      <el-form-item label="生日" prop="birthday" :label-width="formLabelWidth">
        <el-input v-model="studentForm.birthday" autoc \omplete="off"></el-input>
      </el-form-item>
      <el-form-item label="联系电话" :label-width="formLabelWidth">
        <el-input v-model="studentForm.phone" autoc \omplete="off"></el-input>
      </el-form-item>
      <el-form-item label="电子邮件" prop="email" :label-width="formLabelWidth">
        <el-input v-model="studentForm.email" autoc \omplete="off"></el-input>
      </el-form-item>
      <el-form-item label="选考类型" prop="study_type" :label-width="formLabelWidth">
        <el-input v-model="studentForm.study_type" autoc \omplete="off"></el-input>
      </el-form-item>
    </el-form>
    <div slot="footer" class="dialog-footer">
      <el-button @click="dialogFormVisible = false">取 消</el-button>
      <el-button type="primary" @click="saveuser">确 定</el-button>
    </div>
  </el-dialog>


</template>

<script lang="ts">
import { reactive, ref } from 'vue'
import {defineComponent} from "vue/dist/vue";
import request from "@/request/request";
import router from "@/router";
import {ElMessage} from "element-plus";
import {KeyboardOne, Me} from "@icon-park/vue-next";


const dialogTableVisible = ref(false)
const dialogFormVisible = ref(false)
const formLabelWidth = '140px'
export default defineComponent({
  name: "StudentView",
  components: {
    Me, KeyboardOne
  },
  setup() {
    const studentForm = ref({
      student_name: '',
      birthday: '',
      phone: '',
      email: '',
      gender: '',
      study_type: ''
    })

    const search = () => {
      request.post("/student-entity/studentLogin/", studentForm.value).then((res) => {

      })
    }
    return {
      search,
      studentForm,
    }
  }
})


</script>

<style scoped>

</style>