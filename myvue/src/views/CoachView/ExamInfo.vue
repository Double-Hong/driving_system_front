<template>
  <h1>考试管理</h1>
  <el-table :data="tableData" style="width: 100%">
    <el-table-column prop="examinationName" label="考试名"/>
    <el-table-column prop="examinationOpenTime" label="开始时间"/>
    <el-table-column prop="examinationCloseTime" label="结束时间"/>
    <el-table-column prop="examinationTime" label="考试时间"/>
    <el-table-column width="400">
      <template #header>
        <el-input v-model="examSearch" size="default" style="width: 200px;" placeholder="搜索考试" clearable/>
        <el-button @click="searchExam">搜索</el-button>
        <el-button @click="addExam">添加</el-button>

      </template>
      <template #default="scope">
        <el-button @click="editOneExam(scope.row)">编辑</el-button>
        <el-button @click="editExamQuestions(scope.row)" type="primary">编辑考试内容</el-button>
        <el-button @click="deleteExam(scope.row)" type="danger">删除</el-button>
      </template>
    </el-table-column>
  </el-table>
  <el-dialog
      title="确认删除"
      width="30%"
      v-model="deleteExamVisible">
    <h2>{{ pageInfo.deleteExamName }}</h2>
    <br>
    <br>
    <el-button @click="makeSureDeleteExam">确认</el-button>
    <el-button @click="deleteExamVisible=false">取消</el-button>
  </el-dialog>
  <el-dialog
      title="新增考试"
      width="30%"
      v-model="addExamVisible"
  >
    <el-form label-width="100">
      <el-form-item label="考试名称">
        <el-input v-model="addExamData.examinationName" clearable></el-input>
      </el-form-item>
      <el-form-item label="考试开始时间">
        <el-date-picker
            v-model="addExamData.examinationOpenTime"
            type="datetime"
            placeholder="Select date and time"
            value-format="YYYY-MM-DD HH:mm:ss"
        />
      </el-form-item>
      <el-form-item label="考试结束时间">
        <el-date-picker
            v-model="addExamData.examinationCloseTime"
            type="datetime"
            placeholder="Select date and time"
            value-format="YYYY-MM-DD HH:mm:ss"
        />
      </el-form-item>
      <el-form-item label="考试时间">
        <el-input v-model="addExamData.examinationTime" />
      </el-form-item>
    </el-form>
    <el-button @click="makeSureAddExam">确认</el-button>
    <el-button @click="addExamVisible=false">取消</el-button>
  </el-dialog>
  <el-dialog
      title="编辑考试信息"
      width="30%"
      v-model="editExamVisible"
  >
    <el-form label-width="100">
      <el-form-item label="考试名称">
        <el-input v-model="editData.examinationName" clearable></el-input>
      </el-form-item>
      <el-form-item label="考试开始时间">
        <el-date-picker
            v-model="editData.examinationOpenTime"
            type="datetime"
            placeholder="Select date and time"
        />
      </el-form-item>
      <el-form-item label="考试结束时间">
        <el-date-picker
            v-model="editData.examinationCloseTime"
            type="datetime"
            placeholder="Select date and time"
        />
      </el-form-item>
      <el-form-item label="考试时间">
        <el-input v-model="editData.examinationTime" />
      </el-form-item>
    </el-form>
    <el-button @click="makeSureEditExam">确认</el-button>
    <el-button @click="editExamVisible=false">取消</el-button>
  </el-dialog>
  <el-dialog
      title="编辑考试内容"
      width="90%"
      v-model="questionsVisible"
  >
    <h2>选择题</h2><label>选择题总分:{{ pageInfo.choiceFullFraction }}</label>
    <el-table :data="choiceData">
      <el-table-column prop="multipleChoiceDescribe" label="题目" width="200"/>
      <el-table-column prop="option1" label="A"/>
      <el-table-column prop="option2" label="B"/>
      <el-table-column prop="option3" label="C"/>
      <el-table-column prop="option4" label="D"/>
      <el-table-column prop="correctAnswer" label="正确答案"/>
      <el-table-column prop="fraction" label="分值"/>
      <el-table-column align="right">
        <template #header>
          <el-button @click="addChoiceView" :round="true">添加选择题</el-button>
        </template>
      </el-table-column>

      <el-table-column width="190">
        <template #default="scope">
          <el-button @click="modifyFraction(scope.row)">修改分值</el-button>
          <el-button type="danger" @click="deleteOneQuestionInExam(scope.row)">删除</el-button>
        </template>
      </el-table-column>
    </el-table>
    <h2>填空题</h2><label>填空题总分:{{ pageInfo.blankFullFraction }}</label>
    <el-table :data="blankData">
      <el-table-column prop="blankTopicDescribe" label="题目" width="500"/>
      <el-table-column prop="correctAnswer" label="答案"/>
      <el-table-column prop="fraction" label="分值"/>
      <el-table-column align="right">
        <template #header>
          <el-button @click="addBlankView" :round="true">添加填空题</el-button>
        </template>
      </el-table-column>
      <el-table-column width="190">

        <template #default="scope">
          <el-button @click="modifyBlankFraction(scope.row)">修改分值</el-button>
          <el-button type="danger" @click="deleteOneQuestionInExamBlank(scope.row)">删除</el-button>
        </template>
      </el-table-column>
    </el-table>
  </el-dialog>
  <el-dialog
      title="修改分值"
      width="30%"
      v-model="modifyFractionVisible"
  >
    <el-input-number v-model="pageInfo.fraction" :min="1" :max="100"/>
    <br><br>
    <el-button @click="makeSureModifyFraction">确认</el-button>
  </el-dialog>
  <el-dialog
      title="修改分值"
      width="30%"
      v-model="modifyBlankFractionVisible"
  >
    <el-input-number v-model="pageInfo.blankFraction" :min="1" :max="100"/>
    <br><br>
    <el-button @click="makeSureModifyBlankFraction">确认</el-button>
  </el-dialog>
  <el-dialog
      title="添加选择题(已选择的题不会在下列显示)"
      width="80%"
      v-model="addChoiceVisible"
      :before-close="beforeClose"
  >
    <el-input style="position: absolute;left: 3%;top: 7%;width: 200px" v-model="choiceSearch"
              placeholder="在题库中搜寻题目" clearable></el-input>
    <el-button style="position: absolute;left: 20%;top: 7%" type="primary" @click="searchChoice">查找</el-button>
    <br>
    <el-table :data="allChoiceData">
      <el-table-column prop="multipleChoiceDescribe" label="题目" width="200"/>
      <el-table-column prop="option1" label="A"/>
      <el-table-column prop="option2" label="B"/>
      <el-table-column prop="option3" label="C"/>
      <el-table-column prop="option4" label="D"/>
      <el-table-column prop="correctAnswer" label="正确答案"/>
      <el-table-column>
        <template #default="scope">
          <el-button @click="addChoice(scope.row)" type="primary">添加此题</el-button>
        </template>
      </el-table-column>
    </el-table>
  </el-dialog>
  <el-dialog
      title="添加填空题(已选择的题不会在下列显示)"
      width="80%"
      v-model="addBlankVisible"
      :before-close="beforeCloseBlank"
  >
    <el-input style="position: absolute;left: 3%;top: 7%;width: 200px" v-model="blankSearch"
              placeholder="在题库中搜寻题目" clearable></el-input>
    <el-button style="position: absolute;left: 20%;top: 7%" type="primary" @click="searchBlank">查找</el-button>
    <br>
    <el-table :data="allBlankData">
      <el-table-column prop="blankTopicDescribe" label="题目" width="500"/>
      <el-table-column prop="correctAnswer" label="正确答案" width="500"/>
      <el-table-column>
        <template #default="scope">
          <el-button @click="addBlank(scope.row)" type="primary">添加此题</el-button>
        </template>
      </el-table-column>
    </el-table>
  </el-dialog>

</template>

<script lang="ts">
import {defineComponent, reactive, ref} from "vue";
import {useRouter} from "vue-router";
import axios from "axios";
import {ElMessage} from "element-plus";

export default defineComponent({
  name: "ExaminationView",
  created() {
    const myRouter = useRouter()
    this.pageInfo.peopleId = "001"
    this.pageInfo.orgId = "重庆交通驾校"
    axios.get("http://localhost:9090/examination-entity/getAllExaminationByOrginzationId" + this.pageInfo.orgId).then(res => {
      this.tableData = res.data
    })
  },
  setup() {
    const pageInfo = reactive({
      orgId: '',
      peopleId: '',
      examId: '',//点击的考试ID,
      fraction: '',//选中的选择题的分数
      choiceId: '',//选中的选择题目ID
      choiceFullFraction: 0,//选择题总分
      blankFullFraction: 0,//填空题总分
      blankFraction: '',//选中的填空题的分数
      blankId: '',//选中填空题的ID
      deleteExamId: '',
      deleteExamName: '',
    })
    const editExamVisible = ref(false)
    const questionsVisible = ref(false)

    //考试信息
    interface examination {
      examinationId: string,
      examinationName: string,
      examinationOpenTime: string,
      examinationCloseTime: string,
      examinationTime: string,
      organizationId: string,
      examinationType:string,
      examinationSubject:string,
    }

    //考试与题目关系
    interface examAndQuestionsShip {
      examinationId: string,
      multipleChoiceId: string,
      fraction: string,
    }

    //表格考试数据
    const tableData = ref([{
      examinationId: '',
      examinationName: '',
      examinationOpenTime: '',
      examinationCloseTime: '',
      examinationTime: '',
      organizationId: '',
    }
    ])
    //编辑考试数据
    const editData = reactive({
      examinationId: '',
      examinationName: '',
      examinationOpenTime: '',
      examinationCloseTime: '',
      examinationTime: '',
      organizationId: '',
    })
    //新增考试数据
    const addExamData = reactive({
      examinationId: '',
      examinationName: '',
      examinationOpenTime: '',
      examinationCloseTime: '',
      examinationTime: '',
      organizationId: '',
    })
    //考试选择题数据（只有题目ID）
    const choiceShip = ref([{
      examinationId: '',
      multipleChoiceId: '',
      fraction: '1',
    }])

    //选择题数据（具体数据）
    interface choiceData {
      multipleChoiceId: string,
      multipleChoiceDescribe: string,
      option1: string,
      option2: string,
      option3: string,
      option4: string,
      correctAnswer: string,
      fraction: string,
    }

    //考试填空题数据（只有题目ID）
    const blankShip = ref([{
      examinationId: '',
      blankTopicId: '',
      fraction: '1',
    }])

    //填空题数据（具体数据）
    interface blankData {
      blankTopicId: string,
      blankTopicDescribe: string,
      correctAnswer: string,
      fraction: string
    }

    //考试所选选择题信息
    const choiceData = ref([{
      multipleChoiceId: '',
      multipleChoiceDescribe: '',
      option1: '',
      option2: '',
      option3: '',
      option4: '',
      correctAnswer: '',
      fraction: '',
    }
    ])
    //搜索考试
    const examSearch = ref('')
    const searchExam = () => {
      if (examSearch.value === '') {
        axios.get("http://localhost:9090/examination-entity/getAllExaminationByOrginzationId" + pageInfo.orgId).then(res => {
          tableData.value = res.data
        })
      } else {
        axios.get("http://localhost:9090/examination-entity/findExam/" + examSearch.value + "," + pageInfo.orgId).then(res => {
          tableData.value = res.data
        })
      }
    }
    //考试所选填空题信息
    const blankData = ref([{
      blankTopicId: '',
      blankTopicDescribe: '',
      correctAnswer: '',
      fraction: ''
    }])
    //所有选择题信息
    const allChoiceData = ref([{
      multipleChoiceId: '',
      multipleChoiceDescribe: '',
      option1: '',
      option2: '',
      option3: '',
      option4: '',
      correctAnswer: '',
    }])
    const allBlankData = ref([{
      blankTopicId: '',
      blankTopicDescribe: '',
      correctAnswer: '',
    }])
    //点击编辑按钮
    const editOneExam = (row: examination) => {
      editData.examinationId = row.examinationId
      editData.examinationOpenTime = row.examinationOpenTime
      editData.examinationCloseTime = row.examinationCloseTime
      editData.examinationName = row.examinationName
      editData.examinationTime = row.examinationTime
      editData.organizationId = row.organizationId
      editExamVisible.value = true
    }

    //添加考试
    const addExamVisible = ref(false)
    const addExam = () => {
      addExamData.examinationId = ''
      addExamData.examinationTime = ''
      addExamData.examinationName = ''
      addExamData.examinationOpenTime = ''
      addExamData.examinationCloseTime = ''
      addExamData.organizationId = pageInfo.orgId
      addExamVisible.value = true
    }
    const makeSureAddExam = () => {

      console.log(addExamData)
      axios.post("http://localhost:9090/examination-entity/addExam", addExamData).then(res => {
        if (res.data === 1) {
          ElMessage({
            showClose: true,
            message: '添加成功',
            type: 'success',
          })
          addExamVisible.value = false
          axios.get("http://localhost:9090/examination-entity/getAllExaminationByOrginzationId" + pageInfo.orgId).then(res => {
            tableData.value = res.data
          })
        }
      })
    }
    //删除考试
    const deleteExamVisible = ref(false)
    const deleteExam = (row: examination) => {
      deleteExamVisible.value = true
      pageInfo.deleteExamId = row.examinationId
      pageInfo.deleteExamName = row.examinationName

    }
    const makeSureDeleteExam = () => {
      axios.get("http://localhost:9090/examination-entity/deleteExamById/" + pageInfo.deleteExamId).then(res => {
        if (res.data === 1) {
          ElMessage({
            showClose: true,
            message: '删除成功',
            type: 'success'
          })
          deleteExamVisible.value = false
          axios.get("http://localhost:9090/examination-entity/getAllExaminationByOrginzationId" + pageInfo.orgId).then(res => {
            tableData.value = res.data
          })
        }
      })
    }
    //确认修改
    const makeSureEditExam = () => {
      axios.post("http://localhost:9090/examination-entity/modifyExamInfo", editData).then(res => {
        if (res.data === 1) {
          ElMessage({
            showClose: true,
            message: '修改成功',
            type: 'success'
          })
          editExamVisible.value = false
          axios.get("http://localhost:9090/examination-entity/getAllExaminationByOrginzationId" + pageInfo.orgId).then(res => {
            tableData.value = res.data
          })
        }
      })
    }
    //编辑考试内容
    const editExamQuestions = (row: examination) => {
      pageInfo.examId = row.examinationId
      axios.get("http://localhost:9090/examination-and-multiple-choice-entity/getAllMultipleById/" + row.examinationId).then(res => {
        choiceData.value = res.data
        axios.get("http://localhost:9090/examination-and-multiple-choice-entity/getAllchoiceInfoByEid/" + row.examinationId).then(res => {
          choiceShip.value = res.data
          pageInfo.choiceFullFraction = 0
          for (let i = 0; i < res.data.length; i++) {
            choiceData.value[i].fraction = choiceShip.value[i].fraction
            pageInfo.choiceFullFraction = pageInfo.choiceFullFraction + Number(choiceShip.value[i].fraction)
          }
        })
      })
      axios.get("http://localhost:9090/examination-and-blank-topic-entity/getAllBlankTopicById/" + row.examinationId).then(res => {
        blankData.value = res.data
        axios.get("http://localhost:9090/examination-and-blank-topic-entity/getAllBlankById/" + row.examinationId).then(res => {
          blankShip.value = res.data
          pageInfo.blankFullFraction = 0
          for (let i = 0; i < res.data.length; i++) {
            blankData.value[i].fraction = blankShip.value[i].fraction
            pageInfo.blankFullFraction = pageInfo.blankFullFraction + Number(blankShip.value[i].fraction)
          }
        })
      })
      questionsVisible.value = true
    }
    //删除该考试中的一道选择题题目
    const deleteOneQuestionInExam = (row: choiceData) => {
      axios.get("http://localhost:9090/examination-and-multiple-choice-entity/deleteChoiceAndExamShip/" + pageInfo.examId + "," + row.multipleChoiceId).then(res => {
        if (res.data === 1) {
          ElMessage({
            showClose: true,
            message: "删除成功",
            type: 'success'
          })
          axios.get("http://localhost:9090/examination-and-multiple-choice-entity/getAllMultipleById/" + pageInfo.examId).then(res => {
            choiceData.value = res.data
            axios.get("http://localhost:9090/examination-and-multiple-choice-entity/getAllchoiceInfoByEid/" + pageInfo.examId).then(res => {
              choiceShip.value = res.data
              pageInfo.choiceFullFraction = 0
              for (var i = 0; i < res.data.length; i++) {
                choiceData.value[i].fraction = choiceShip.value[i].fraction
                pageInfo.choiceFullFraction = pageInfo.choiceFullFraction + Number(choiceShip.value[i].fraction)
              }
            })
          })
        }
      })
    }
    //删除该考试中的一道填空题题目
    const deleteOneQuestionInExamBlank = (row: blankData) => {
      axios.get("http://localhost:9090/examination-and-blank-topic-entity/deleteOneBlank/" + pageInfo.examId + "," + row.blankTopicId).then(res => {
        if (res.data === 1) {
          ElMessage({
            showClose: true,
            message: "删除成功",
            type: 'success'
          })
          axios.get("http://localhost:9090/examination-and-blank-topic-entity/getAllBlankTopicById/" + pageInfo.examId).then(res => {
            blankData.value = res.data
            axios.get("http://localhost:9090/examination-and-blank-topic-entity/getAllBlankById/" + pageInfo.examId).then(res => {
              blankShip.value = res.data
              pageInfo.blankFullFraction = 0
              for (let i = 0; i < res.data.length; i++) {
                blankData.value[i].fraction = blankShip.value[i].fraction
                pageInfo.blankFullFraction = pageInfo.blankFullFraction + Number(blankShip.value[i].fraction)
              }
            })
          })
        }
      })
    }
    //修改选择题分值
    const modifyFractionVisible = ref(false)
    const modifyFraction = (row: choiceData) => {
      modifyFractionVisible.value = true
      pageInfo.fraction = row.fraction
      pageInfo.choiceId = row.multipleChoiceId
    }
    const makeSureModifyFraction = () => {
      axios.get("http://localhost:9090/examination-and-multiple-choice-entity/modifyFractionInOneExam/" + pageInfo.examId + "," + pageInfo.choiceId + "," + pageInfo.fraction).then(res => {
        if (res.data === 1) {
          ElMessage({
            showClose: true,
            message: '修改成功',
            type: 'success'
          })
          modifyFractionVisible.value = false
          axios.get("http://localhost:9090/examination-and-multiple-choice-entity/getAllMultipleById/" + pageInfo.examId).then(res => {
            choiceData.value = res.data
            axios.get("http://localhost:9090/examination-and-multiple-choice-entity/getAllchoiceInfoByEid/" + pageInfo.examId).then(res => {
              choiceShip.value = res.data
              pageInfo.choiceFullFraction = 0
              for (var i = 0; i < res.data.length; i++) {
                choiceData.value[i].fraction = choiceShip.value[i].fraction
                pageInfo.choiceFullFraction = pageInfo.choiceFullFraction + Number(choiceShip.value[i].fraction)
              }
            })
          })
        }
      })
    }
    //修改填空题分值
    const modifyBlankFractionVisible = ref(false)
    const modifyBlankFraction = (row: blankData) => {
      modifyBlankFractionVisible.value = true
      pageInfo.blankFraction = row.fraction
      pageInfo.blankId = row.blankTopicId
    }
    const makeSureModifyBlankFraction = () => {
      axios.get("http://localhost:9090/examination-and-blank-topic-entity/modifyBlankFraction/" + pageInfo.examId + "," + pageInfo.blankId + "," + pageInfo.blankFraction).then(res => {
        if (res.data === 1) {
          ElMessage({
            showClose: true,
            message: '修改成功',
            type: 'success'
          })
          modifyBlankFractionVisible.value = false
          axios.get("http://localhost:9090/examination-and-blank-topic-entity/getAllBlankTopicById/" + pageInfo.examId).then(res => {
            blankData.value = res.data
            axios.get("http://localhost:9090/examination-and-blank-topic-entity/getAllBlankById/" + pageInfo.examId).then(res => {
              blankShip.value = res.data
              pageInfo.blankFullFraction = 0
              for (let i = 0; i < res.data.length; i++) {
                blankData.value[i].fraction = blankShip.value[i].fraction
                pageInfo.blankFullFraction = pageInfo.blankFullFraction + Number(blankShip.value[i].fraction)
              }
            })
          })
        }
      })
    }
    //添加选择题
    const addChoiceVisible = ref(false)
    const addChoiceView = () => {
      choiceSearch.value = ''
      addChoiceVisible.value = true
      //添加选择题时只显示未选择的选择题
      axios.get("http://localhost:9090/multiple-choice-entity/getChoiceInfoByExamId/" + pageInfo.examId).then(res => {
        allChoiceData.value = res.data
      })
    }
    const addChoiceShipData = ref({
      examinationId: '',
      multipleChoiceId: '',
      fraction: '1',
      answer: '',
    })
    const addChoice = (row: choiceData) => {
      addChoiceShipData.value.multipleChoiceId = row.multipleChoiceId
      addChoiceShipData.value.examinationId = pageInfo.examId
      axios.post("http://localhost:9090/examination-and-multiple-choice-entity/addOneChoice", addChoiceShipData.value).then(res => {
        if (res.data === 1) {
          ElMessage({
            showClose: true,
            message: "添加成功",
            type: 'success'
          })
          axios.get("http://localhost:9090/multiple-choice-entity/getChoiceInfoByExamId/" + pageInfo.examId).then(res => {
            allChoiceData.value = res.data
          })

        }
      })
    }
    const addBlankVisible = ref(false)
    const addBlankData = ref({
      examinationId: '',
      blankTopicId: '',
      fraction: '1',
      answer: ''
    })
    const addBlankView = () => {
      addBlankVisible.value = true
      axios.get("http://localhost:9090/blank-topic-entity/getBlankInfoByExamId/" + pageInfo.examId).then(res => {
        allBlankData.value = res.data
      })
    }
    const addBlank = (row: blankData) => {
      addBlankData.value.blankTopicId = row.blankTopicId
      addBlankData.value.examinationId = pageInfo.examId
      axios.post("http://localhost:9090/examination-and-blank-topic-entity/addOneBlank", addBlankData.value).then(res => {
        if (res.data === 1) {
          ElMessage({
            showClose: true,
            message: "添加成功",
            type: 'success'
          })
          axios.get("http://localhost:9090/blank-topic-entity/getBlankInfoByExamId/" + pageInfo.examId).then(res => {
            allBlankData.value = res.data
          })
        }
      })
    }
    const beforeCloseBlank = () => {
      axios.get("http://localhost:9090/examination-and-blank-topic-entity/getAllBlankTopicById/" + pageInfo.examId).then(res => {
        blankData.value = res.data
        axios.get("http://localhost:9090/examination-and-blank-topic-entity/getAllBlankById/" + pageInfo.examId).then(res => {
          blankShip.value = res.data
          pageInfo.blankFullFraction = 0
          for (let i = 0; i < res.data.length; i++) {
            blankData.value[i].fraction = blankShip.value[i].fraction
            pageInfo.blankFullFraction = pageInfo.blankFullFraction + Number(blankShip.value[i].fraction)
          }
        })
      })
      addBlankVisible.value = false
    }
    //关闭添加选择题对话框时再刷新一次已选的表格
    const beforeClose = () => {
      axios.get("http://localhost:9090/examination-and-multiple-choice-entity/getAllMultipleById/" + pageInfo.examId).then(res => {
        choiceData.value = res.data
        axios.get("http://localhost:9090/examination-and-multiple-choice-entity/getAllchoiceInfoByEid/" + pageInfo.examId).then(res => {
          choiceShip.value = res.data
          pageInfo.choiceFullFraction = 0
          for (var i = 0; i < res.data.length; i++) {
            choiceData.value[i].fraction = choiceShip.value[i].fraction
            pageInfo.choiceFullFraction = pageInfo.choiceFullFraction + Number(choiceShip.value[i].fraction)
          }
        })
      })
      addChoiceVisible.value = false
    }
    //搜索选择题
    const choiceSearch = ref('')
    const searchChoice = () => {
      if (choiceSearch.value === '') {
        axios.get("http://localhost:9090/multiple-choice-entity/getChoiceInfoByExamId/" + pageInfo.examId).then(res => {
          allChoiceData.value = res.data
        })
      } else {
        axios.get("http://localhost:9090/multiple-choice-entity/findChoice/" + choiceSearch.value + "," + pageInfo.examId).then(res => {
          allChoiceData.value = res.data
        })
      }
    }
    const blankSearch = ref('')
    const searchBlank = () => {
      if (blankSearch.value === '') {
        axios.get("http://localhost:9090/blank-topic-entity/getBlankInfoByExamId/" + pageInfo.examId).then(res => {
          allBlankData.value = res.data
        })
      } else {
        axios.get("http://localhost:9090/blank-topic-entity/findBlank/" + pageInfo.examId + "," + blankSearch.value).then(res => {
          allBlankData.value = res.data
        })
      }
    }
    return {
      pageInfo,
      tableData,
      editExamVisible,
      questionsVisible,
      modifyFractionVisible,
      editData,
      editOneExam,
      makeSureEditExam,
      editExamQuestions,
      choiceShip,
      choiceData,
      deleteOneQuestionInExam,
      deleteOneQuestionInExamBlank,
      modifyFraction,
      makeSureModifyFraction,
      addChoiceVisible,
      addChoiceView,
      allChoiceData,
      addChoice,
      addChoiceShipData,
      beforeClose,
      choiceSearch,
      searchChoice,
      blankShip,
      blankData,
      modifyBlankFractionVisible,
      modifyBlankFraction,
      makeSureModifyBlankFraction,
      addBlankData,
      addBlankVisible,
      addBlankView,
      allBlankData,
      addBlank,
      beforeCloseBlank,
      blankSearch,
      searchBlank,
      deleteExam,
      deleteExamVisible,
      makeSureDeleteExam,
      examSearch,
      searchExam,
      addExam,
      addExamVisible,
      addExamData,
      makeSureAddExam,
    }
  }
})

</script>

<style scoped>
</style>