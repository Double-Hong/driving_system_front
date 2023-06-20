<template>

  <!--  顶部栏-->
  <el-card class="box-card"  id="search">
    <el-row>
      <el-col :span="20">
        <!-- clearable属性是设置为可以一键删除文本框的内容 -->
        <el-input v-model="searchName" placeholder="用户名" clearable></el-input>
        <el-button type="primary" @click="findPeople" :icon="Search"/></el-col>
      <el-col :span="4" align="right">
        <!-- 新增按钮 -->
        <el-button @click="openUI(null)" type="primary" icon="el-icon-plus" circle></el-button></el-col>
    </el-row>
  </el-card>

  <!--用户信息展示列表-->
  <el-card class="box-card">
    <el-table :data="tableData.studentList" stripe style="width: 100%">
      <el-table-column prop="student_name" label="姓名" width="100"/>
      <el-table-column prop="gender" label="年级" width="120"/>
      <el-table-column prop="email" label="邮箱" width="200"/>
      <el-table-column prop="phone" label="电话" width="120"/>
      <el-table-column prop="study_type" label="驾照类型" width="120"/>
      <el-table-column prop="birthday" label="生日" width="150"/>
      <el-table-column>
        <template #default="scope">
          <el-button size="small" @click="openUI(scope.$index)"
          >
            <repair theme="outline" size="24" fill="#333" :strokeWidth="2" strokeLinecap="butt"/>
            Edit
          </el-button
          >
          <el-button
              size="small"
              type="danger"
              @click="handleDelete(scope.$index, scope.row)"
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
    <el-form model="dialogData" label-width="50px">
      <el-form-item label="姓名">
        <el-input clearable v-model="dialogData.student_name"/>
      </el-form-item>
      <el-form-item label="年级">
        <el-input clearable v-model="dialogData.gender"/>
      </el-form-item>
      <el-form-item label="邮箱">
        <el-input clearable v-model="dialogData.email"/>
      </el-form-item>
      <el-form-item label="驾照类型">
        <el-input clearable v-model="dialogData.study_type"/>
      </el-form-item>
      <el-form-item label="电话">
        <el-input clearable v-model="dialogData.phone"/>
      </el-form-item>
      <el-form-item label="生日">
        <el-input clearable v-model="dialogData.birthday"/>
      </el-form-item>
    </el-form>
    <el-button type="primary" @click="onSubmit">确定</el-button>
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

import {defineComponent, reactive, ref} from "vue";
import axios from "axios";
import {Repair, Delete, Search} from "@icon-park/vue-next"

export default defineComponent({
  name: "AddressBookView",
  computed: {
    Search() {
      return Search
    }
  },
  // computed: {
  //   Search() {
  //     return Search
  //   }
  // },
  components: {
    Repair,
    Search,
    Delete,
  },
  created() {
    this.userInfo.id = <string>this.$route.params.peopleId
    axios.post("http://localhost:9090/student-entity/getStudentList/"+JSON.stringify(this.searchName)
    ).then(resp => {
      this.tableData.studentList = resp.data.data
    })
  },
  setup() {

    const dialogVisible = ref(false)
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
          id:"",
        }
    )

    //学生类
    interface studentInfo{
      student_name:string
      gender:string
      birthday:string
      email:string
      study_type:string
      phone:string
      id:string
    }

    const searchName = ref("")


    //要删除的学生信息
    const myPageInfo = reactive({
      userName: "",
      deleteId: "",
      deleteName:"",
    })

    //修改用户
    const handleEdit = (index: number, row: studentInfo) => {
      dialogVisible.value = true
      dialogData.student_name = row.student_name
      dialogData.study_type=row.study_type
      dialogData.gender=row.gender
      dialogData.email=row.email
      dialogData.phone = row.phone
      dialogData.birthday=row.birthday
    }
    const onSubmit = () => {
      axios.post("http://localhost:9090/student-entity", JSON.stringify(this.dialogData)).then(res => {
        findPeople();
      })
    }

    //对话框数据
    const dialogData: studentInfo = reactive({
      student_name:"",
      email:"",
      study_type:"",
      phone:"",
      gender:"",
      birthday:"",
      id:"",
    })
    //删除用户
    const handleDelete = (index: number, row: studentInfo) => {
      deleteDialogVisible.value = true
      myPageInfo.deleteId = row.id
      makeSureDelete()
    }
    //确认删除
    const makeSureDelete = () => {
      axios.delete("http://localhost:9090/student-entity/" +  JSON.stringify(this.myPageInfo.deleteId)).then(res => {
        findPeople();
      })
      deleteDialogVisible.value = false
    }
    const tableData = reactive({
      studentList: [{
        id: " ",
        student_name:"",
        email:"",
        study_type:"",
        phone:"",
        gender:"",
        birthday:"",
      }
      ]
    })


    //添加联系人
    const addPeople = () => {
      this.dialogVisible=true
      axios.post("http://localhost:9090/student-entity/addStudent", JSON.stringify(this.dialogData)).then(res => {
        findPeople();
      })
    }
    //模糊查询
    const findPeople = () => {
      console.log(searchName.value)
      if (searchName.value === "") {
        axios.post("http://localhost:9090/student-entity/getStudentList/"+JSON.stringify(searchName.value)).then(resp => {
          tableData.studentList = resp.data.data
          console.log(resp.data)
        })
      }
      else {
        axios.post("http://localhost:9090/student-entity/getStudentList/" + JSON.stringify(searchName.value)).then(res => {
          tableData.studentList = res.data.data
          console.log(res.data)

        })
      }
    }

    //通过id查找
    const findStudentById = (id) =>{
      axios.get("http://localhost:9090/student-entity/findById/"+id).then(resp => {
        this.dialogData=resp.data.data
      })
    }

    //打开添加对话框
    const openAddDialog = () => {
      dialogVisible.value = true
      dialogData.student_name = ''
      dialogData.study_type = ''
      dialogData.email = ''
      dialogData.gender = ''
      dialogData.phone = ''
      dialogData.birthday = ''
    }
    const openUI = (id) =>{
      if(id==null){
        this.title="新增用户"
        openAddDialog()
        addPeople()
      }
      else{
        this.title = "修改用户"
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
      onSubmit,
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