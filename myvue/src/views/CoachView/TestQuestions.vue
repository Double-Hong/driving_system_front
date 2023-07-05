<template>
  <h1 style="text-align: center">试题管理</h1>
  <el-button style="position: absolute;left: 30%;top: 6.5%;" v-show="!mainVisible" @click="mainVisible=true">选择题
  </el-button>
  <!--  <el-button style="position: absolute;left: 65%;top: 6.5%;" v-show="mainVisible" @click="mainVisible=false">填空题-->
  <!--  </el-button>-->
  <div v-show="mainVisible">
    <el-input style="position: absolute;left: 3%;top: 7%;width: 200px" v-model="choiceSearch"
              placeholder="在题库中搜寻选择题" clearable></el-input>
    <el-button style="position: absolute;left: 20%;top: 7%" type="primary" @click="searchChoice">查找</el-button>
    <br>
    <h2>选择题</h2>
    <el-table :data="allChoiceData">
      <el-table-column prop="multipleChoiceDescribe" label="题目" width="200"/>
      <el-table-column prop="option1" label="A"/>
      <el-table-column prop="option2" label="B"/>
      <el-table-column prop="option3" label="C"/>
      <el-table-column prop="option4" label="D"/>
      <el-table-column prop="correctAnswer" label="正确答案"/>
      <el-table-column width="200px">
        <template #default="scope">
          <el-button @click="openEditChoicePhoto(scope.row)" icon="Search"></el-button>
          <el-button type="info" @click="editChoiceView(scope.row)" icon="Edit"></el-button>
          <el-button type="danger" @click="deleteChoiceView(scope.row)" icon="Delete"></el-button>
        </template>
        <template #header>
          <el-button @click="addChoiceView">新增选择题</el-button>
        </template>
      </el-table-column>
    </el-table>
  </div>
  <div v-show="!mainVisible">
    <el-input style="position: absolute;left: 3%;top: 7%;width: 200px" v-model="blankSearch"
              placeholder="在题库中搜寻填空题" clearable></el-input>
    <el-button style="position: absolute;left: 20%;top: 7%" type="primary" @click="searchBlank">查找</el-button>
    <br>
    <h2>填空题</h2>
    <el-table :data="allBlankData">
      <el-table-column prop="blankTopicDescribe" label="题目" width="500"/>
      <el-table-column prop="correctAnswer" label="正确答案" width="500"/>
      <el-table-column>
        <template #default="scope">
          <el-button @click="editBlankView(scope.row)" icon="Edit">编辑</el-button>
          <el-button type="danger" @click="deleteBlankView(scope.row)" icon="Delete"></el-button>
        </template>
        <template #header>
          <el-button @click="addBlankView">新增填空题</el-button>
        </template>
      </el-table-column>
    </el-table>
  </div>
  <!--增-->
  <!--选择题-->
  <el-dialog
      title="新增选择题"
      width="30%"
      v-model="addChoiceVisible"
      style="text-align: center"
  >
    <el-form label-width="100">
      <el-form-item label="题目">
        <el-input v-model="addChoiceData.multipleChoiceDescribe" clearable/>
      </el-form-item>
      <el-form-item label="A">
        <el-input v-model="addChoiceData.option1" clearable/>
      </el-form-item>
      <el-form-item label="B">
        <el-input v-model="addChoiceData.option2" clearable/>
      </el-form-item>
      <el-form-item label="C">
        <el-input v-model="addChoiceData.option3" clearable/>
      </el-form-item>
      <el-form-item label="D">
        <el-input v-model="addChoiceData.option4" clearable/>
      </el-form-item>
      <el-form-item label="正确答案">
        <el-input v-model="addChoiceData.correctAnswer" clearable/>
      </el-form-item>
      <el-button @click="makeSureAddChoice">确认</el-button>
      <el-button @click="addChoiceVisible=false">取消</el-button>
    </el-form>
  </el-dialog>
  <!--  填空题-->
  <el-dialog
      title="新增填空题"
      width="30%"
      v-model="addBlankVisible"
  >
    <el-form label-width="100">
      <el-form-item label="题目">
        <el-input v-model="addBlankData.blankTopicDescribe" clearable/>
      </el-form-item>
      <el-form-item label="正确答案">
        <el-input v-model="addBlankData.correctAnswer" clearable/>
      </el-form-item>
    </el-form>
    <el-button @click="makeSureAddBlank">确认</el-button>
    <el-button @click="addBlankVisible=false">取消</el-button>
  </el-dialog>
  <!--删-->
  <!--选择题-->
  <el-dialog
      title="确认删除"
      width="30%"
      v-model="deleteChoiceVisible"
      style="text-align: center"
  >
    <h2>{{ deleteChoiceName }}</h2>
    <br>
    <el-button @click="makeSureDeleteChoice">确认</el-button>
    <el-button @click="deleteChoiceVisible=false">取消</el-button>
  </el-dialog>
  <!--  填空题-->

  <el-dialog
      title="确认删除"
      width="30%"
      v-model="deleteBlankVisible"
  >
    <h2>{{ deleteBlankName }}</h2>
    <el-button @click="makeSureDeleteBlank">确认</el-button>
    <el-button @click="deleteBlankVisible=false">取消</el-button>
  </el-dialog>
  <!--改-->
  <!--  选择题-->
  <el-dialog
      title="修改选择题"
      width="30%"
      v-model="editChoiceVisible"
      style="text-align: center"
  >
    <el-form label-width="100">
      <el-form-item label="题目">
        <el-input v-model="editChoiceData.multipleChoiceDescribe" clearable/>
      </el-form-item>
      <el-form-item label="A">
        <el-input v-model="editChoiceData.option1" clearable/>
      </el-form-item>
      <el-form-item label="B">
        <el-input v-model="editChoiceData.option2" clearable/>
      </el-form-item>
      <el-form-item label="C">
        <el-input v-model="editChoiceData.option3" clearable/>
      </el-form-item>
      <el-form-item label="D">
        <el-input v-model="editChoiceData.option4" clearable/>
      </el-form-item>
      <el-form-item label="正确答案">
        <el-input v-model="editChoiceData.correctAnswer" clearable/>
      </el-form-item>

      <br><br><br>
      <el-button @click="makeSureEditChoice">确认</el-button>
      <el-button @click="editChoiceVisible=false">取消</el-button>
    </el-form>
  </el-dialog>

  <!--  查看、修改图片-->
  <el-dialog
      title="查看图片"
      width="50%"
      v-model="editChoicePhotoVisible"
      style="text-align: center"
  >
    <h1 v-if="editChoiceData.photoUrl==''">暂无图片</h1>
    <el-image v-else :src="editChoiceData.photoUrl">
    </el-image>

    <el-upload
        v-model:file-list="fileList"
        class="upload-demo"
        :http-request="uploadPhoto"
        :limit="1"
    >
      <br><br><br><br><br>
      <el-button>更换图片</el-button>
    </el-upload>

  </el-dialog>
  <!--  填空题-->
  <el-dialog
      title="修改填空题"
      width="30%"
      v-model="editBlankVisible"
  >
    <el-form label-width="100">
      <el-form-item label="题目">
        <el-input v-model="editBlankData.blankTopicDescribe" clearable/>
      </el-form-item>
      <el-form-item label="正确答案">
        <el-input v-model="editBlankData.correctAnswer" clearable/>
      </el-form-item>
    </el-form>
    <el-button @click="makeSureEditBlank">确认</el-button>
    <el-button @click="editBlankVisible=false">取消</el-button>
  </el-dialog>
  <!--查-->

</template>

<script lang="ts">
import {defineComponent, reactive, ref} from "vue";
import {useRouter} from "vue-router";
import axios from "axios";
import {ElMessage, UploadUserFile} from "element-plus";
import {client} from "@/utils/myoss";

export default defineComponent({
  name: "TestQuestions",
  created() {
    const myRouter = useRouter()
    this.pageInfo.peopleId = <string>myRouter.currentRoute.value.params.peopleId
    this.pageInfo.orgId = <string>myRouter.currentRoute.value.params.orgId
    axios.get("http://localhost:9090/multiple-choice-entity/getAllChoiceInfo").then(res => {
      this.allChoiceData = res.data
    })
    axios.get("http://localhost:9090/blank-topic-entity/getAllBlank").then(res => {
      this.allBlankData = res.data
    })
  },
  setup() {
    const pageInfo = reactive({
      peopleId: '',
      orgId: '',
    })
    const mainVisible = ref(true)

    interface choiceData {
      multipleChoiceId: string,
      multipleChoiceDescribe: string,
      option1: string,
      option2: string,
      option3: string,
      option4: string,
      correctAnswer: string,
      photoUrl: string,
    }

    interface blankData {
      blankTopicId: string,
      blankTopicDescribe: string,
      correctAnswer: string,
    }

    const allChoiceData = ref([{
      multipleChoiceId: '',
      multipleChoiceDescribe: '',
      option1: '',
      option2: '',
      option3: '',
      option4: '',
      correctAnswer: '',
      photoUrl: '',
    }])
    const allBlankData = ref([{
      blankTopicId: '',
      blankTopicDescribe: '',
      correctAnswer: '',
    }])
    //增
    const addChoiceVisible = ref(false)
    const addBlankVisible = ref(false)
    const addChoiceData = ref({
      multipleChoiceId: '',
      multipleChoiceDescribe: '',
      option1: '',
      option2: '',
      option3: '',
      option4: '',
      correctAnswer: '',
      photoUrl: '',
    })
    const addBlankData = ref({
      blankTopicId: '',
      blankTopicDescribe: '',
      correctAnswer: '',
    })
    const addChoiceView = () => {
      addChoiceData.value.multipleChoiceId = ''
      addChoiceData.value.multipleChoiceDescribe = ''
      addChoiceData.value.option1 = ''
      addChoiceData.value.option2 = ''
      addChoiceData.value.option3 = ''
      addChoiceData.value.option4 = ''
      addChoiceData.value.correctAnswer = ''
      addChoiceVisible.value = true
    }
    const addBlankView = () => {
      addBlankData.value.blankTopicId = ''
      addBlankData.value.blankTopicDescribe = ''
      addBlankData.value.correctAnswer = ''
      addBlankVisible.value = true
    }
    const makeSureAddChoice = () => {
      axios.post("http://localhost:9090/multiple-choice-entity/addChoice", addChoiceData.value).then(res => {
        if (res.data != null) {
          ElMessage({
            showClose: true,
            message: '添加成功',
            type: 'success',
          })
          allChoiceData.value = res.data
          addChoiceVisible.value = false
        }
      })
    }
    const makeSureAddBlank = () => {
      axios.post("http://localhost:9090/blank-topic-entity/addBlank", addBlankData.value).then(res => {
        if (res.data != null) {
          ElMessage({
            showClose: true,
            message: '添加成功',
            type: 'success',
          })
          allBlankData.value = res.data
          addBlankVisible.value = false
        }
      })
    }
    //删
    const deleteChoiceVisible = ref(false)
    const deleteBlankVisible = ref(false)
    const deleteChoiceId = ref('')
    const deleteChoiceUrl = ref('')
    const deleteChoiceName = ref('')
    const deleteBlankId = ref('')
    const deleteBlankName = ref('')
    const deleteChoiceView = (row: choiceData) => {
      deleteChoiceId.value = row.multipleChoiceId
      deleteChoiceName.value = row.multipleChoiceDescribe
      deleteChoiceUrl.value = row.photoUrl
      deleteChoiceVisible.value = true
    }
    const deleteBlankView = (row: blankData) => {
      deleteBlankId.value = row.blankTopicId
      deleteBlankName.value = row.blankTopicDescribe
      deleteBlankVisible.value = true
    }
    const makeSureDeleteChoice = () => {
      axios.get("http://localhost:9090/multiple-choice-entity/deleteChoiceById/" + deleteChoiceId.value).then(res => {
        if (res.data != null) {
          ElMessage({
            showClose: true,
            message: '删除成功',
            type: 'success',
          })
          allChoiceData.value = res.data
          deleteChoiceVisible.value = false
        }
        if (deleteChoiceUrl.value != '') {
          client.delete("/questionPhoto/" + deleteChoiceId.value+'.jpg').then(res => {
            console.log(res)
          })
        }
      })
    }
    const makeSureDeleteBlank = () => {
      axios.get("http://localhost:9090/blank-topic-entity/deleteBlankById/" + deleteBlankId.value).then(res => {
        if (res.data != null) {
          ElMessage({
            showClose: true,
            message: '删除成功',
            type: 'success',
          })
          allBlankData.value = res.data
          deleteBlankVisible.value = false
        }
      })
    }
    //改
    const editChoiceData = ref({
      multipleChoiceId: '',
      multipleChoiceDescribe: '',
      option1: '',
      option2: '',
      option3: '',
      option4: '',
      correctAnswer: '',
      photoUrl: '',
    })
    const editBlankData = ref({
      blankTopicId: '',
      blankTopicDescribe: '',
      correctAnswer: '',
    })
    const editChoiceVisible = ref(false)
    const editChoiceView = (row: choiceData) => {
      editChoiceData.value.multipleChoiceId = row.multipleChoiceId
      editChoiceData.value.multipleChoiceDescribe = row.multipleChoiceDescribe
      editChoiceData.value.option1 = row.option1
      editChoiceData.value.option2 = row.option2
      editChoiceData.value.option3 = row.option3
      editChoiceData.value.option4 = row.option4
      editChoiceData.value.correctAnswer = row.correctAnswer
      editChoiceData.value.photoUrl = row.photoUrl
      editChoiceVisible.value = true
      console.log(row)
    }
    const makeSureEditChoice = () => {
      axios.post("http://localhost:9090/multiple-choice-entity/editChoiceById", editChoiceData.value).then(res => {
        if (res.data != null) {
          ElMessage({
            showClose: true,
            message: '修改成功',
            type: 'success',
          })
          editChoiceVisible.value = false
          allChoiceData.value = res.data
        }
      })
    }
    const editBlankVisible = ref(false)
    const editBlankView = (row: blankData) => {
      editBlankData.value.blankTopicId = row.blankTopicId
      editBlankData.value.blankTopicDescribe = row.blankTopicDescribe
      editBlankData.value.correctAnswer = row.correctAnswer
      editBlankVisible.value = true
    }
    const makeSureEditBlank = () => {
      axios.post("http://localhost:9090/blank-topic-entity/editBlankById", editBlankData.value).then(res => {
        if (res.data != null) {
          ElMessage({
            showClose: true,
            message: '修改成功',
            type: 'success',
          })
          allBlankData.value = res.data
          editBlankVisible.value = false
        }
      })
    }
    //查
    const choiceSearch = ref('')
    const blankSearch = ref('')
    const searchChoice = () => {
      if (choiceSearch.value === '') {
        axios.get("http://localhost:9090/multiple-choice-entity/getAllChoiceInfo").then(res => {
          allChoiceData.value = res.data
        })
      } else {
        axios.get("http://localhost:9090/multiple-choice-entity/findChoiceAll/" + choiceSearch.value).then(res => {
          allChoiceData.value = res.data
        })
      }
    }
    const searchBlank = () => {
      if (blankSearch.value === '') {
        axios.get("http://localhost:9090/blank-topic-entity/getAllBlank").then(res => {
          allBlankData.value = res.data
        })
      } else {
        axios.get("http://localhost:9090/blank-topic-entity/findBlankAll/" + blankSearch.value).then(res => {
          allBlankData.value = res.data
        })
      }
    }

    //查看编辑图片
    const editChoicePhotoVisible = ref(false)
    const openEditChoicePhoto = (row: choiceData) => {
      editChoiceData.value.multipleChoiceId = row.multipleChoiceId
      editChoiceData.value.multipleChoiceDescribe = row.multipleChoiceDescribe
      editChoiceData.value.option1 = row.option1
      editChoiceData.value.option2 = row.option2
      editChoiceData.value.option3 = row.option3
      editChoiceData.value.option4 = row.option4
      editChoiceData.value.correctAnswer = row.correctAnswer
      editChoiceData.value.photoUrl = row.photoUrl
      fileList.value = []
      editChoicePhotoVisible.value = true
    }

    const fileList = ref<UploadUserFile[]>([])
    const uploadPhoto = (file: any) => {
      const aliName = editChoiceData.value.multipleChoiceId + '.jpg'
      client.put("/questionPhoto/"+aliName,file.file).then((res:any)=>{
        console.log(res)
        editChoiceData.value.photoUrl=res.url
        axios.post("http://localhost:9090/multiple-choice-entity/editChoiceById", editChoiceData.value).then(resp => {
          if (resp.data != null) {
            ElMessage({
              showClose: true,
              message: '更换成功',
              type: 'success',
            })
            allChoiceData.value.splice(0,allChoiceData.value.length)
            allChoiceData.value.push(...resp.data)
            editChoicePhotoVisible.value = false
          }
        })
      })
    }
    return {
      pageInfo,
      allChoiceData,
      mainVisible,
      allBlankData,
      addChoiceVisible,
      addBlankVisible,
      addChoiceData,
      addBlankData,
      addChoiceView,
      addBlankView,
      makeSureAddChoice,
      makeSureAddBlank,
      deleteChoiceVisible,
      deleteBlankVisible,
      deleteChoiceId,
      deleteChoiceName,
      deleteBlankId,
      deleteBlankName,
      deleteChoiceView,
      deleteBlankView,
      makeSureDeleteChoice,
      makeSureDeleteBlank,
      editChoiceData,
      editBlankData,
      editChoiceVisible,
      editChoiceView,
      makeSureEditChoice,
      editBlankVisible,
      editBlankView,
      makeSureEditBlank,
      choiceSearch,
      blankSearch,
      searchChoice,
      searchBlank,
      editChoicePhotoVisible,
      openEditChoicePhoto,
      fileList,
      uploadPhoto,
    }
  }
})
</script>

<style scoped>

</style>