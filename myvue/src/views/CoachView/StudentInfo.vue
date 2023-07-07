<template>

  <!--  顶部栏-->
  <el-card class="box-card" id="search">
    <el-row>
      <el-col :span="18">
        <!-- clearable属性是设置为可以一键删除文本框的内容 -->
        <el-input v-model="searchName" placeholder="用户名" clearable></el-input>
        <el-button type="primary" @click="findPeople" icon="Search"/>
      </el-col>
      <el-col :span="6">
        <el-button type="success" size="small" @click="exportData">导出excel</el-button>
      </el-col>
    </el-row>
  </el-card>

  <!--用户信息展示列表-->
  <el-card class="box-card">
    <el-table :data="tableData.studentList" stripe style="width: 100%"
              :header-cell-style="{background: '#409EFF', color: '#fff' }"
    >
      <el-table-column prop="studentName" label="姓名" width="100"/>
      <el-table-column prop="gender" label="性别" width="120"/>
      <el-table-column prop="email" label="邮箱" width="200"/>
      <el-table-column prop="phone" label="电话" width="120"/>
      <el-table-column prop="studyType" label="驾照类型" width="120"/>
      <el-table-column prop="birthday" label="生日" width="150"/>
      <el-table-column>
        <template #default="scope">
          <el-button size="small" @click="handleEdit(scope.$index,scope.row)"
          >
            <repair theme="outline" size="24" fill="#333" :strokeWidth="2" strokeLinecap="butt"/>
            Edit
          </el-button
          >
          <el-button
              size="small"
              type="danger"
              @click="handleDelete(scope.$index+1, scope.row)"
          >
            <delete theme="outline" size="24" fill="#333" :strokeWidth="2" strokeLinecap="butt"/>
            Delete
          </el-button
          >
          <el-button type="info" @click="openHealthDialog(scope.row)">查看健康信息</el-button>
        </template>
      </el-table-column>
    </el-table>
  </el-card>


  <!--  对话框-->
  <el-dialog
      v-model="dialogVisible"
      :title="title"
      width="30%"
  >
    <el-form :model="dialogData" label-width="80px" ref="ruleFormRef">
      <el-form-item label="姓名">
        <el-input clearable v-model="dialogData.studentName"/>
      </el-form-item>
      <el-form-item label="性别">
        <el-input clearable v-model="dialogData.gender"/>
      </el-form-item>
      <el-form-item label="邮箱">
        <el-input clearable v-model="dialogData.email"/>
      </el-form-item>
      <el-form-item label="驾照类型">
        <el-input clearable v-model="dialogData.studyType"/>
      </el-form-item>
      <el-form-item label="电话">
        <el-input clearable v-model="dialogData.phone"/>
      </el-form-item>
      <el-form-item label="生日">
        <el-input clearable v-model="dialogData.birthday"/>
      </el-form-item>
    </el-form>
    <el-button type="primary" @click="addPeople">确定</el-button>
    <el-button @click="dialogVisible=false">取消</el-button>
  </el-dialog>

  <el-dialog
      title="确认删除此联系人?"
      v-model="deleteDialogVisible"
      width="30%"
  >
    <h1>{{ myPageInfo.deleteName }}</h1>
    <br><br><br><br>
    <el-button @click="makeSureDelete">确认</el-button>
    <el-button @click="deleteDialogVisible=false">取消</el-button>
  </el-dialog>


  <!--  查看健康信息-->
  <el-dialog
      v-model="healthDialogVisible"
      title="健康信息"
      width="50%"
      style="text-align: center;"
  >
    <h1 v-if="rowHealthUrl==null">
      未上传健康信息
    </h1>
    <el-image v-else :src="rowHealthUrl">

    </el-image>
  </el-dialog>
</template>

<script lang="ts">

import {defineComponent, reactive, ref, getCurrentInstance, computed} from "vue";
import axios from "axios";
import {Repair, Delete, Search, Plus} from "@icon-park/vue-next"
import type {FormInstance, FormRules} from "element-plus";
import XLSX from 'xlsx';
import {ElMessage} from "element-plus";

interface studentInfo {
  studentName: string
  gender: string
  phone: string
  email: string
  birthday: string
  studyType: string
  studentId: string
  healthId: string
  coachId: string
}

export default defineComponent({
  name: "AddressBookView",
  computed: {
    Plus() {
      return Plus
    },
    Search() {
      return Search
    }
  },
  components: {
    Repair,
    Search,
    Delete,
  },
  created() {
    this.userInfo.id = <string>this.$route.params.peopleId
    console.log(this.userInfo.id)
    axios.get("http://localhost:9090/student-entity/getStudentByCoachId/" + this.userInfo.id
    ).then(res => {
      this.tableData.studentList = res.data

    })
  },
  setup() {
    const exportData = () => {
      /* 创建 workbook 对象 */
      const workbook = XLSX.utils.book_new();

      /* 创建 worksheet 对象 */
      const worksheet = XLSX.utils.json_to_sheet(tableData.studentList);

      /* 将 worksheet 添加到 workbook 中 */
      XLSX.utils.book_append_sheet(workbook, worksheet, 'Sheet1');

      /* 生成 Excel 文件并保存到本地 */
      XLSX.writeFile(workbook, 'data.xlsx');
    };

    const dialogData = reactive({}) as studentInfo//学生类
    const dialogVisible = ref(false)//添加对话框的可见性
    //确认删除对话框
    const deleteDialogVisible = ref(false)
    const search = ref('')
    const title = ref("")
    //教练信息
    const userInfo = reactive(
        {
          userName: "",
          myName: "",
          sex: "",
          age: "",
          birthday: "",
          phone: "",
          id: "",
        }
    )

    //搜索学生姓名
    const searchName = ref("")

    //要删除的学生信息
    const myPageInfo = reactive({
      deleteId: "",
      deleteName: "",
    })

    //修改用户
    const handleEdit = (index: number, row: studentInfo) => {
      dialogVisible.value = true
      dialogData.studentName = row.studentName
      dialogData.studyType = row.studyType
      dialogData.gender = row.gender
      dialogData.email = row.email
      dialogData.phone = row.phone
      dialogData.birthday = row.birthday
      dialogData.studentId = row.studentId
      dialogData.healthId = row.healthId
      dialogData.coachId = row.coachId
    }
    //删除用户
    const handleDelete = (index: number, row: studentInfo) => {
      deleteDialogVisible.value = true
      myPageInfo.deleteId = row.studentId
      makeSureDelete()
    }
    //确认删除
    const makeSureDelete = () => {
      axios.get("http://localhost:9090/student-entity/studentDelete/" + myPageInfo.deleteId).then(res => {
        // findPeople();
      })
      deleteDialogVisible.value = false
    }
    const tableData = reactive({
      studentList: [{
        studentId: " ",
        studentName: "",
        email: "",
        studyType: "",
        phone: "",
        gender: "",
        birthday: "",
        healthId: "",
        coachId: "",
      }
      ]
    })


    //修改联系人
    const addPeople = () => {
      dialogVisible.value = true
      console.log(dialogData)
      axios.post("http://localhost:9090/student-entity/updateStudent", dialogData).then(res => {
        //findPeople();
        if (res.data.message === "success") {
          dialogVisible.value = false
          ElMessage({
            message: '修改成功',
            type: 'success',
            showClose: true,
          })
          findPeople()
        } else {
          ElMessage({
            message: '修改失败',
            type: 'error',
            showClose: true,
          })
        }
      })
    }
    //模糊查询
    const findPeople = () => {
      axios.post("http://localhost:9090/student-entity/getStudentList/" + searchName.value).then(res => {
        tableData.studentList = res.data.data
      })
    }

    //通过id查找
    const findStudentById = (id) => {
      console.log(id)
      axios.get("http://localhost:9090/student-entity/findById/" + id).then(res => {
        // console.log(res.data.data)
        dialogData.birthday = res.data.data.birthday
        dialogData.gender = res.data.data.gender
        dialogData.studentName = res.data.data.studentName
        dialogData.studyType = res.data.data.studyType
        dialogData.email = res.data.data.email
        dialogData.phone = res.data.data.phone
      })
    }

    //查看健康信息
    const healthDialogVisible = ref(false)
    const rowHealthId = ref("")
    const rowHealthUrl = ref("")
    const openHealthDialog = (row: studentInfo) => {
      rowHealthId.value = row.healthId
      axios.get("http://localhost:9090/health-entity/getHealthById/" + row.healthId).then(res => {
        rowHealthUrl.value = res.data.imageUrl
        console.log(res.data)
        healthDialogVisible.value = true
      })

    }

    //过滤器
    const filterData = computed(() => {
      return tableData.studentList.filter(item => {
        return item.coachId.includes(userInfo.id)
      })
    })


    return {
      tableData,
      search,
      handleEdit,
      handleDelete,
      dialogVisible,
      dialogData,
      addPeople,
      myPageInfo,
      findPeople,
      deleteDialogVisible,
      makeSureDelete,
      title,
      searchName,
      userInfo,
      exportData,
      healthDialogVisible,
      rowHealthId,
      openHealthDialog,
      rowHealthUrl,
    }
  }

})
</script>

<style scoped>
#search .el-input {
  width: 200px;
  margin-right: 10px;
}

.el-dialog .el-input {
  width: 75%;
}
</style>