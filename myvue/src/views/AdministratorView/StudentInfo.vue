<template>

<!--  顶部栏-->
  <el-card class="box-card"  id="search">
    <el-row>
      <el-col :span="12">
        <!-- clearable属性是设置为可以一键删除文本框的内容 -->
        <el-input v-model="searchName" placeholder="用户名" clearable></el-input>
        <el-button type="primary" @click="findPeople" :icon="Search"/></el-col>
      <el-col :span="6" align="right">
        <!-- 新增按钮 -->
        <el-button @click="openUI(null)" type="primary" :icon="Plus" circle></el-button></el-col>
      <el-col :span="6" >
        <el-button type="success" size="small" @click="exportData">导出excel</el-button>
      </el-col>
    </el-row>
  </el-card>

<!--用户信息展示列表-->
  <el-card class="box-card">
    <el-table :data="tableData.studentList" stripe style="width: 100%">
      <el-table-column prop="studentName" label="姓名" width="100"/>
      <el-table-column prop="gender" label="性别" width="120"/>
      <el-table-column prop="email" label="邮箱" width="200"/>
      <el-table-column prop="phone" label="电话" width="120"/>
      <el-table-column prop="studyType" label="驾照类型" width="120"/>
      <el-table-column prop="birthday" label="生日" width="150"/>
      <el-table-column>
        <template #default="scope">
          <el-button size="small" @click="openUI(scope.$index+1)"
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
    <el-form :model="dialogData" label-width="80px" ref="ruleFormRef" >
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

</template>

<script lang="ts">

import {defineComponent, reactive, ref,getCurrentInstance} from "vue";
import axios from "axios";
import {Repair, Delete, Search,Plus} from "@icon-park/vue-next"
import type {FormInstance,FormRules} from "element-plus";
import XLSX from 'xlsx';

interface studentInfo {
  studentName:string
  gender:string
  phone:string
  email:string
  birthday:string
  studyType:string
  id:string
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
    axios.get("http://localhost:9090/student-entity"
    ).then(res => {
      this.tableData.studentList = res.data.data
      console.log(res.data.data)
    })
  },
  setup() {

    const items = ref([
      { name: 'Tom', age: 24, gender: 'Male' },
      { name: 'Jerry', age: 22, gender: 'Male' },
      { name: 'Alice', age: 26, gender: 'Female' },
    ]);

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

    const checkEmail = (rule, value, callback) => {
      const reg = /^[A-Za-z0-9\u4e00-\u9fa5]+@[a-zA-Z0-9_-]+(\.[a-zA-Z0-9_-]+)+$/;//邮箱验证的正则表达式
      if (!reg.test(value)) {
        return callback(new Error('邮箱格式错误'));
      }
      callback();
      setTimeout(() => {
        if (!Number.isInteger(value)) {
          callback(new Error('请输入数字值'));
        } else {
          if (value < 18) {
            callback(new Error('必须年满18岁'));
          } else {
            callback();
          }
        }
      }, 1000)}
    const rules=reactive({
      studentName: [
        { required: true, message: '请输入用户名', trigger: 'blur' },
        { min: 3, max: 50, message: '长度在 3 到 50 个字符', trigger: 'blur' }
      ],
      password: [
        { required: true, message: '请输入密码', trigger: 'blur' },
        { min: 6, max: 10, message: '长度在 6 到 10 个字符', trigger: 'blur' }
      ],
      email: [
        { required: true, message: '请输入电子邮箱', trigger: 'blur' },
        { validator: checkEmail, trigger: 'blur' }
      ],
      gender:[
        { required: true, message: '请输入性别', trigger: 'blur' },
        { min: 6, max: 10, message: '长度1个字符', trigger: 'blur' }
      ],
      phone:[
        { required: true, message: '请输入电话号码', trigger: 'blur' },
        { min: 6, max: 10, message: '长度为 11 个字符', trigger: 'blur' }
      ]
    })
    //教练信息
    const userInfo = reactive(
        {
          userName: "",
          myName: "",
          sex: "",
          age: "",
          birthday: "",
          phone: "",
          id:"",
        }
    )

    //搜索学生姓名
    const searchName = ref("")

    //要删除的学生信息
    const myPageInfo = reactive({
      deleteId: "",
      deleteName:"",
    })

    //修改用户
    const handleEdit = (index: number, row: studentInfo) => {
      dialogVisible.value = true
      this.dialogData.studentName = row.studentName
      this.dialogData.studyType=row.studyType
      this.dialogData.gender=row.gender
      this.dialogData.email=row.email
      this.dialogData.phone = row.phone
      this.dialogData.birthday=row.birthday
    }
    //删除用户
    const handleDelete = (index: number, row: studentInfo) => {
      deleteDialogVisible.value = true
      this.myPageInfo.deleteId = row.id
      makeSureDelete()
    }
    //确认删除
    const makeSureDelete = () => {
      axios.delete("http://localhost:9090/student-entity/" +  myPageInfo.deleteId).then(res => {
        findPeople();
      })
      deleteDialogVisible.value = false
    }
    const tableData = reactive({
      studentList: [{
        id: " ",
        studentName:"",
        email:"",
        studyType:"",
        phone:"",
        gender:"",
        birthday:"",
      }
      ]
    })


    //添加联系人
    const addPeople = () => {
      dialogVisible.value=true
      console.log(dialogData)
      axios.post("http://localhost:9090/student-entity/addStudent", dialogData).then(res => {
        //findPeople();
      })
    }
    //模糊查询
    const findPeople = () => {
        axios.post("http://localhost:9090/student-entity/getStudentList/" + searchName.value).then(res => {
          tableData.studentList = res.data.data
        })
    }

    //通过id查找
    const findStudentById = (id) =>{
      axios.get("http://localhost:9090/student-entity/findById/"+id).then(res => {
        dialogData.birthday=res.data.data.birthday
        dialogData.gender=res.data.data.gender
        dialogData.studentName=res.data.data.studentName
        dialogData.studyType=res.data.data.studyType
        dialogData.email=res.data.data.email
        dialogData.phone=res.data.data.phone
      })
    }

    //打开添加对话框
    const openAddDialog = () => {
      dialogVisible.value = true
      dialogData.studentName = ''
      dialogData.studyType = ''
      dialogData.email = ''
      dialogData.gender = ''
      dialogData.phone = ''
      dialogData.birthday = ''
    }
    const openUI = (id) =>{
      if(id==null){
        title.value="新增用户"
        openAddDialog()
      }
      else{
        title.value = "修改用户"
        console.log(id)
        findStudentById(id)
        addPeople()
      }

    }
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
      openAddDialog,
      deleteDialogVisible,
      makeSureDelete,
      openUI,
      title,
      searchName,
      userInfo,
      // downloadExcel,
      items,
      exportData,
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