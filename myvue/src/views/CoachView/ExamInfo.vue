<template>
  <h1 style="text-align: center">考试管理</h1>
  <!--  给下面这个表格的表头添加颜色-->

  <el-table :data="tableData" style="width: 100%;"
            :header-cell-style="{background: '#409EFF', color: '#fff' }"
  >
    <el-table-column prop="examinationName" label="考试名"/>
    <el-table-column prop="examinationOpenTime" label="开始时间"/>
    <el-table-column prop="examinationCloseTime" label="结束时间"/>
    <el-table-column prop="examinationTime" label="考试时间"/>
    <el-table-column prop="examinationSubject" label="考试科目"/>
    <el-table-column prop="examinationType" label="考试类型"/>
    <el-table-column prop="examinationAddress" label="考试地点"/>
    <el-table-column width="450">
      <template #header>
        <el-input v-model="examSearch" size="default" style="width: 200px;" placeholder="搜索考试" clearable/>
        <el-button @click="searchExam">搜索</el-button>
        <el-button @click="addExam">添加</el-button>

      </template>
      <template #default="scope">
        <el-button @click="editOneExam(scope.row)">编辑</el-button>
        <el-button @click="editExamQuestions(scope.row)" type="primary">编辑考试内容</el-button>
        <el-button @click="deleteExam(scope.row)" type="danger" icon="Delete"></el-button>
        <el-button @click="openExamRecords(scope.row)">查看参考人员</el-button>
      </template>
    </el-table-column>
  </el-table>
  <el-dialog
      title="确认删除"
      width="30%"
      v-model="deleteExamVisible"
      style="text-align: center"
  >
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
      style="text-align: center"
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
        <el-input v-model="addExamData.examinationTime"/>
      </el-form-item>
      <el-form-item label="考试科目">
        <el-input v-model="addExamData.examinationSubject"/>
      </el-form-item>
      <el-form-item label="考试类型">
        <el-input v-model="addExamData.examinationType"/>
      </el-form-item>
      <el-form-item label="考场位置">
        <el-input v-model="addExamData.examinationAddress"/>
      </el-form-item>
    </el-form>
    <el-button @click="makeSureAddExam">确认</el-button>
    <el-button @click="addExamVisible=false">取消</el-button>
  </el-dialog>
  <el-dialog
      title="编辑考试信息"
      width="30%"
      v-model="editExamVisible"
      style="text-align: center"
  >
    <el-form label-width="100">
      <el-form-item label="考试名称">
        <el-input v-model="editData.edit.examinationName" clearable></el-input>
      </el-form-item>
      <el-form-item label="考试开始时间">
        <el-date-picker
            v-model="editData.edit.examinationOpenTime"
            type="datetime"
            placeholder="Select date and time"
        />
      </el-form-item>
      <el-form-item label="考试结束时间">
        <el-date-picker
            v-model="editData.edit.examinationCloseTime"
            type="datetime"
            placeholder="Select date and time"
        />
      </el-form-item>
      <el-form-item label="考试时间">
        <el-input v-model="editData.edit.examinationTime"/>
      </el-form-item>
      <el-form-item label="考试科目">
        <el-input v-model="editData.edit.examinationSubject"/>
      </el-form-item>
      <el-form-item label="考试类型">
        <el-select v-model="editData.edit.examinationType">
          <el-option label="A1" value="A1"/>
          <el-option label="A2" value="A2"/>
          <el-option label="B1" value="B1"/>
          <el-option label="B2" value="B2"/>
          <el-option label="C1" value="C1"/>
          <el-option label="C2" value="C2"/>
        </el-select>
      </el-form-item>
      <el-form-item label="考场位置">
        <el-input v-model="editData.edit.examinationAddress"/>
      </el-form-item>
    </el-form>
    <el-button @click="makeSureEditExam">确认</el-button>
    <el-button @click="editExamVisible=false">取消</el-button>
  </el-dialog>
  <el-dialog
      title="编辑考试内容"
      width="90%"
      v-model="questionsVisible"
      style="text-align: center"
  >
    <div v-if="editExamSubject=='科目二'||editExamSubject=='科目三'">
      <h1>该考试为线下考试</h1>
      <br><br><br>
      <el-button icon="Close" type="danger" @click="questionsVisible=false"></el-button>
    </div>
    <div v-else>
      <h2>选择题</h2><label>选择题总分:{{ pageInfo.choiceFullFraction }}</label>
      <el-table :data="choiceData">
        <el-table-column prop="multipleChoiceDescribe" label="题目" width="200"/>
        <el-table-column prop="option1" label="A"/>
        <el-table-column prop="option2" label="B"/>
        <el-table-column prop="option3" label="C"/>
        <el-table-column prop="option4" label="D"/>
        <el-table-column prop="correctAnswer" label="正确答案"/>
        <el-table-column prop="fraction" label="分值"/>
        <el-table-column width="190">
          <template #header>
            <el-button @click="addChoiceView" :round="true">添加选择题</el-button>
          </template>
          <template #default="scope">
            <el-button @click="modifyFraction(scope.row)">修改分值</el-button>
            <el-button type="danger" @click="deleteOneQuestionInExam(scope.row)" icon="Delete"></el-button>
          </template>
        </el-table-column>
      </el-table>
    </div>
  </el-dialog>
  <el-dialog
      title="修改分值"
      width="30%"
      v-model="modifyFractionVisible"
      style="text-align: center"
  >
    <el-input-number v-model="pageInfo.fraction" :min="1" :max="100"/>
    <br><br>
    <el-button @click="makeSureModifyFraction">确认</el-button>
  </el-dialog>
  <el-dialog
      title="修改分值"
      width="30%"
      v-model="modifyBlankFractionVisible"
      style="text-align: center"
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
      style="text-align: center"
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
      style="text-align: center"
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

  <!--  查看考试参考人员-->
  <el-dialog
      title="考试参考人员"
      width="80%"
      v-model="examRecordsVisible"
      style="text-align: center"
  >
    <h1 v-if="examRecordsViewList.length!=0" style="text-align: center;font-family: 楷体,serif;">
      {{ examRecordsViewList[0].examinationName }}</h1>
    <h1 v-else>当前无人报名</h1>
    <el-button v-if="examRecordsViewList.length!=0" @click="exportData" style="position: absolute;top: 40%;left: 80%"
               type="success">导出成绩
    </el-button>
    <el-table :data="examRecordsViewList">
      <el-table-column prop="studentName" label="学生"/>

      <el-table-column prop="score" label="成绩">
        <template #default="{row}">
          <span v-if="row.score!=-1">{{ row.score }}</span>
          <span v-else>考试未开始</span>
        </template>
      </el-table-column>
      <el-table-column v-if="rowExamSubject=='科目二'||rowExamSubject=='科目三'" label="操作">
        <template #default="{row}">
          <el-button @click="inputSubjectScore(row)">录入成绩</el-button>
        </template>
      </el-table-column>
    </el-table>
  </el-dialog>

  <!--  录入成绩-->
  <el-dialog
      title="录入成绩"
      width="30%"
      v-model="inputSubjectScoreVisible"
      style="text-align: center"
  >
    <el-input-number v-model="inputRecordsEntity.score" :min="0" :max="100"/>
    <br><br>
    <el-button @click="makeSureInput">确认</el-button>
  </el-dialog>

</template>

<script lang="ts" setup>
import {onMounted, reactive, ref} from "vue";
import {useRouter} from "vue-router";
import axios from "axios";
import {ElMessage} from "element-plus";
import request from "@/request/request";
import XLSX from "xlsx";


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
  examinationType: string,
  examinationSubject: string,
  examinationAddress: string,
}

//考试记录
interface examRecords {
  examRecordsId: string,
  studentId: string,
  examinationId: string,
  score: number,
}

interface examRecordsView {
  examRecordsId: string,
  studentId: string,
  examinationId: string,
  score: number,
  studentName: string,
  examinationName: string,
}

//考试与题目关系
interface examAndQuestionsShip {
  examinationId: string,
  multipleChoiceId: string,
  fraction: string,
}

//表格考试数据
let tableData = ref([{
  examinationId: '',
  examinationName: '',
  examinationOpenTime: '',
  examinationCloseTime: '',
  examinationTime: '',
  organizationId: '',
}
])
//编辑考试数据
let editData = reactive({
  edit: {} as examination
})
//新增考试数据
const addExamData = reactive({}) as examination
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
  console.log(editData)
  console.log(row)
  // editData=Object.assign({},row)
  editData.edit = JSON.parse(JSON.stringify(row))
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
  addExamData.examinationType = ''
  addExamData.examinationSubject = ''
  addExamData.examinationAddress = ''
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
  axios.post("http://localhost:9090/examination-entity/modifyExamInfo", editData.edit).then(res => {
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
const editExamSubject = ref('')
const editExamQuestions = (row: examination) => {
  pageInfo.examId = row.examinationId
  editExamSubject.value = row.examinationSubject
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

//查看考试参考人员
const examRecordsVisible = ref(false)
const examRecordsList: examRecords[] = reactive([])
const examRecordsViewList: examRecordsView[] = reactive([])
const excelRecordsList: examRecords[] = reactive([])
const rowExamSubject = ref('')
const rowExamName = ref('')
const openExamRecords = (row: examination) => {
  rowExamSubject.value = row.examinationSubject
  rowExamName.value = row.examinationName
  request.get("/examination-student-view/getByExamId/" + row.examinationId).then(res => {
    examRecordsViewList.splice(0, examRecordsViewList.length)
    examRecordsViewList.push(...res.data)
    excelRecordsList.splice(0, excelRecordsList.length)
    excelRecordsList.push(...res.data)
    console.log(examRecordsViewList)
    examRecordsVisible.value = true
  })
}

//录入科目成绩
const inputSubjectScoreVisible = ref(false)
let inputRecordsEntity = reactive({}) as examRecordsView
const inputSubjectScore = (row: examRecordsView) => {
  inputRecordsEntity = row
  console.log(inputRecordsEntity)
  inputSubjectScoreVisible.value = true
}

const makeSureInput = () => {
  request.get("/exam-records-entity/inputExamScore/" + inputRecordsEntity.score + '/' + inputRecordsEntity.examRecordsId).then(res => {
    if (res.data == 1) {
      ElMessage({
        showClose: true,
        message: "录入成功",
        type: 'success'
      })
      request.get("/examination-student-view/getByExamId/" + inputRecordsEntity.examinationId).then(res => {
        examRecordsViewList.splice(0, examRecordsViewList.length)
        examRecordsViewList.push(...res.data)
        console.log(examRecordsViewList)
        inputSubjectScoreVisible.value = false
      })
    }
  })
}

const exportData = () => {
  /* 创建 workbook 对象 */
  const workbook = XLSX.utils.book_new();

  /* 创建 worksheet 对象 */
  const worksheet = XLSX.utils.json_to_sheet(excelRecordsList);

  /* 将 worksheet 添加到 workbook 中 */
  XLSX.utils.book_append_sheet(workbook, worksheet, 'Sheet1');

  /* 生成 Excel 文件并保存到本地 */
  XLSX.writeFile(workbook, rowExamName.value + '成绩表.xlsx');
};

onMounted(() => {
  request.get("/examination-entity/getAllExaminationByOrginzationId" + "重庆交通驾校").then(res => {
    tableData.value = res.data

    console.log(tableData.value)
    pageInfo.peopleId = "001"
    pageInfo.orgId = "重庆交通驾校"
  })
})
// return {
//   pageInfo,
//   tableData,
//   editExamVisible,
//   questionsVisible,
//   modifyFractionVisible,
//   editData,
//   editOneExam,
//   makeSureEditExam,
//   editExamQuestions,
//   choiceShip,
//   choiceData,
//   deleteOneQuestionInExam,
//   deleteOneQuestionInExamBlank,
//   modifyFraction,
//   makeSureModifyFraction,
//   addChoiceVisible,
//   addChoiceView,
//   allChoiceData,
//   addChoice,
//   addChoiceShipData,
//   beforeClose,
//   choiceSearch,
//   searchChoice,
//   blankShip,
//   blankData,
//   modifyBlankFractionVisible,
//   modifyBlankFraction,
//   makeSureModifyBlankFraction,
//   addBlankData,
//   addBlankVisible,
//   addBlankView,
//   allBlankData,
//   addBlank,
//   beforeCloseBlank,
//   blankSearch,
//   searchBlank,
//   deleteExam,
//   deleteExamVisible,
//   makeSureDeleteExam,
//   examSearch,
//   searchExam,
//   addExam,
//   addExamVisible,
//   addExamData,
//   makeSureAddExam,
//   examRecordsVisible,
//   examRecordsList,
//   openExamRecords,
// }


</script>

<style scoped>
</style>