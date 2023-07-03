<template>
    <div class="common-layout">
        <el-container>
            <el-header>
                <el-row :gutter="20">
                    <el-col :span="6">
                        <div class="grid-content ep-bg-purple"/>

                    </el-col>
                    <el-col :span="6">
                        <div class="grid-content ep-bg-purple"/>
                      个人信息中心
                    </el-col>
                    <el-col :span="6">
                        <div class="grid-content ep-bg-purple"/>
                    </el-col>
                    <el-col :span="6">
                        <div class="grid-content ep-bg-purple"/>
                        <el-dropdown>
                            <el-button type="primary" style="margin-left: 300px">
                                操作
                                <el-icon class="el-icon--right">

                                </el-icon>
                            </el-button>
                            <template #dropdown>
                                <el-dropdown-menu>
                                    <el-dropdown-item>
                                        <el-button @click="onPersonInfo">个人信息中心</el-button>
                                    </el-dropdown-item>
                                    <el-dropdown-item>
                                        <el-button @click="onHealthy">绑定健康信息</el-button>
                                    </el-dropdown-item>
                                    <el-dropdown-item>
                                        <el-button @click="onEsc">退出登录</el-button>
                                    </el-dropdown-item>
                                </el-dropdown-menu>
                            </template>
                        </el-dropdown>

                    </el-col>
                </el-row>
            </el-header>

            <el-container>
                <el-aside width="200px" style="background: #a6a9de;height: 581px">


                    <el-menu
                        :default-openeds="openeds"
                            default-active="2"
                            class="el-menu-vertical-demo"
                            background-color="#a6a9de"

                    >

                        <el-sub-menu index="1">
                            <template #title>
                                <!--                <el-icon><location /></el-icon>-->
                                <span>菜单</span>
                            </template>
                            <el-menu-item-group>
                                <el-menu-item index="1-2" @click="OnSubjectOne">科目一学习</el-menu-item>
                                <el-menu-item index="1-3" @click="OnSubjectTwo">科目二学习</el-menu-item>
                                <el-menu-item index="1-4" @click="OnSubjectThreePractice">科目三实践学习</el-menu-item>
                                <el-menu-item index="1-5" @click="OnSubjectThreeTheory">科目三理论学习</el-menu-item>
                                <el-menu-item index="1-6" @click="onExam">考试</el-menu-item>
                                <el-menu-item index="1-7" @click="onExamRegistration">考试报名</el-menu-item>
                            </el-menu-item-group>


                        </el-sub-menu>

                    </el-menu>
                </el-aside>

                <el-main>
                    <el-descriptions
                            title="学生基本信息"
                            direction="vertical"
                            :column="4"

                            border
                            v-model="personData"
                            width="200px"
                    >


                        <el-descriptions-item label="电话" label-align="left" align="center"
                                              v-model="personData.phone">
                            <template v-slot:label>
                                <phone-telephone theme="outline" size="24" fill="#333"/>
                                <label>电话</label>
                            </template>
                            {{ personData.phone }}
                        </el-descriptions-item>
                        <el-descriptions-item label="性别" label-align="left" align="center"
                                              v-model="personData.gender">

                            <template v-slot:label>

                                <female v-if="personData.gender==='女'" theme="outline" size="24" fill="#333"/>
                                <male v-if="personData.gender==='男'" theme="outline" size="24" fill="#333"/>
                                <label>性别</label>
                            </template>
                            {{ personData.gender }}
                        </el-descriptions-item>
                        <el-descriptions-item label="驾校" label-align="left" align="center"
                                              v-model="personData.schoolName">
                            <template v-slot:label>
                                <school theme="outline" size="24" fill="#333"/>
                                <label>驾校</label>
                            </template>
                            <el-tag size="small">
                                {{ personData.schoolName }}
                            </el-tag>
                        </el-descriptions-item>
                        <el-descriptions-item label="教练" label-align="left" align="center"
                                              v-model="myPageInfo.coachName">
                            <template v-slot:label>
                                <edit-name theme="outline" size="24" fill="#333"/>
                                <label>教练</label>
                            </template>
                            {{ myPageInfo.coachName }}
                        </el-descriptions-item>
                        <el-descriptions-item label="学生姓名" label-align="left" align="center"
                                              v-model="personData.studentName">
                            <template v-slot:label>
                                <edit-name theme="outline" size="24" fill="#333"/>
                                <label>学生姓名</label>
                            </template>
                            {{ personData.studentName }}
                        </el-descriptions-item>
                        <el-descriptions-item label="学生学习驾照类型" label-align="left" align="center"
                                              v-model="personData.studyType">
                            <template v-slot:label>
                                <manual-gear theme="outline" size="24" fill="#333"/>
                                <label> 学生学习驾照类型</label>
                            </template>
                            {{ personData.studyType }}
                        </el-descriptions-item>
                        <el-descriptions-item label="邮箱" label-align="left" align="center"
                                              v-model="personData.email">
                            <template v-slot:label>
                                <accept-email theme="outline" size="24" fill="#333"/>
                                <label>邮箱</label>
                            </template>
                            {{ personData.email }}
                        </el-descriptions-item>
                        <el-descriptions-item label="生日" label-align="left" align="center"
                                              v-model="personData.birthday">
                            <template v-slot:label>
                                <birthday-cake theme="outline" size="24" fill="#333"/>
                                <label>生日</label>
                            </template>
                            {{ personData.birthday }}
                        </el-descriptions-item>

                    </el-descriptions>

                    <br>
                    <div style="display: flex">
                        <div style="flex: 1"></div>
                        <el-button @click="onCoach">更换教练</el-button>
                        <el-button @click="onChangePassWord">修改密码</el-button>
                        <el-button @click="onChangePersonInfo">修改基本信息</el-button>
                        <div style="flex: 1"></div>
                    </div>

                </el-main>
            </el-container>
        </el-container>
    </div>
     <el-dialog v-model="changePassWordDialogVisible" title="修改密码" width="30%" center>
       <el-form-item label="旧密码">
            <el-input v-model="changePassWordInfo.oldPassword" show-password></el-input>
        </el-form-item>
        <el-form-item label="新密码">
            <el-input v-model="changePassWordInfo.newPassword" show-password ></el-input>
        </el-form-item>
        <el-form-item label="确认密码">
            <el-input v-model="changePassWordInfo.confirmPassword"  show-password></el-input>
        </el-form-item>
         <template #footer>
      <span class="dialog-footer">
        <el-button @click="changePassWordDialogVisible = false">取消</el-button>
        <el-button type="primary" @click="makeSureChangePassWordInfo">
          修改
        </el-button>
      </span>
         </template>


     </el-dialog>
    <el-dialog v-model="ChangePersonInfoDialogVisible" title="修改基本信息" width="30%" center>
        <el-form-item label="用户名">
            <el-input v-model="changeInfo.username"></el-input>
        </el-form-item>
        <el-form-item label="性别">
            <el-radio-group v-model="changeInfo.gender">
                <el-radio label="男">男</el-radio>
                <el-radio label="女">女</el-radio>
                <el-radio label="其他">其他</el-radio>
            </el-radio-group>
        </el-form-item>
        <el-form-item label="电话">
            <el-input v-model="changeInfo.phone" maxlength="11" show-word-limit type="text"></el-input>
        </el-form-item>
        <el-form-item label="邮箱">
            <el-input v-model="changeInfo.email"></el-input>
        </el-form-item>
        <el-form-item label="生日">
            <el-date-picker
                v-model="changeInfo.birthday"
                type="date"
                placeholder="选择你的生日"

            />
        </el-form-item>
        <el-form-item label="学生名字">
            <el-input v-model="changeInfo.studentName"></el-input>
        </el-form-item>
        <template #footer>
      <span class="dialog-footer">
        <el-button @click="ChangePersonInfoDialogVisible = false">取消</el-button>
        <el-button type="primary" @click="makeSureChangePersonInfo">
          修改
        </el-button>
      </span>
        </template>
    </el-dialog>
    <el-dialog
       v-model="ChangeCoachDialogVisible"
        width="30%"
        title="重新选择教练"
       center
    >
        <el-select v-model="changeInfo.coachId" class="m-2" :placeholder="myPageInfo.coachName" size="large">
            <el-option
                v-for="option in options.option"

                :label="option.coachName"
                :value="option.coachId"
            />
        </el-select>
        <template #footer>
      <span class="dialog-footer">
        <el-button @click="ChangeCoachDialogVisible = false">取消</el-button>
        <el-button type="primary" @click="makeSureChangeCoach">
          修改
        </el-button>
      </span>
        </template>
    </el-dialog>


</template>
import { ref } from 'vue'
import {
Document,
Menu as IconMenu,
Location,
Setting,
} from '@element-plus/icons-vue'

<script lang="ts">
import {useRouter} from "vue-router";
import {defineComponent, reactive, ref} from "vue";
import request from "@/request/request";
import router from "@/router";
import {ElMessage} from "element-plus";
import {
    ManualGear,
    EditName,
    BirthdayCake,
    Male,
    Female,
    PhoneTelephone,
    School,
    AcceptEmail
} from '@icon-park/vue-next'




export default defineComponent({

    name: "StudentsHomeView",
    components: {
        EditName,
        PhoneTelephone,
        School,
        Female,
        Male,
        ManualGear,
        AcceptEmail,
        BirthdayCake,
    },
    data() {
        return {}
    },
    setup() {
      const myPageInfo = reactive({
        userId:'',
        coachId: '',
        coachName: '',
        password:'',
        schoolName:'',
      })


        const ChangeCoachDialogVisible=ref(false)
          const onChangePassWord=()=>{
              changePassWordDialogVisible.value=true
              request.get("/student-entity/selectStudentById/" + myPageInfo.userId).then(res=>{
                  changeInfo.password=res.data.password
                  changeInfo.email=res.data.email
                  changeInfo.phone=res.data.phone
                  changeInfo.gender=res.data.gender
                  changeInfo.username=res.data.username
                  changeInfo.birthday=res.data.birthday
                  changeInfo.studentName=res.data.studentName
                  changeInfo.coachId=res.data.coachId

                  changeInfo.headPhoto=res.data.headPhoto
                  changeInfo.studentId=res.data.studentId
                  changeInfo.healthId=res.data.healthId
                  changeInfo.schoolName=res.data.schoolName
                  changeInfo.studyType=res.data.studyType

              })
          }
          const  onCoach = () => {
              ChangeCoachDialogVisible.value=true
              request.get("/student-entity/selectStudentById/" + myPageInfo.userId).then(res=>{
                  changeInfo.password=res.data.password
                  changeInfo.email=res.data.email
                  changeInfo.phone=res.data.phone
                  changeInfo.gender=res.data.gender
                  changeInfo.username=res.data.username
                  changeInfo.birthday=res.data.birthday
                  changeInfo.studentName=res.data.studentName
                  changeInfo.coachId=res.data.coachId

                  changeInfo.headPhoto=res.data.headPhoto
                  changeInfo.studentId=res.data.studentId
                  changeInfo.healthId=res.data.healthId
                  changeInfo.schoolName=res.data.schoolName
                  changeInfo.studyType=res.data.studyType

              })
          }
          const makeSureChangePassWordInfo=()=>{
             if (changePassWordInfo.oldPassword !== myPageInfo.password) {
                  ElMessage.error('旧密码错误')
                  return
              }

              if(changePassWordInfo.oldPassword===''||changePassWordInfo.newPassword===''||changePassWordInfo.confirmPassword===''){
                  ElMessage.error('请填写完整信息')
                  return
              }
              if(changePassWordInfo.newPassword!==changePassWordInfo.confirmPassword){
                  ElMessage.error('两次密码不一致')
                  return
              }
              changeInfo.password=changePassWordInfo.newPassword
              request.post("/student-entity/updateStudentById",changeInfo).then(res=>{
                console.log(res.data)
                  if (res.data === 1){
                      ElMessage.success('修改密码成功')
                      changePassWordDialogVisible.value=false
                      request.get("/student-entity/selectStudentById/" + myPageInfo.userId).then(res => {
                          // console.log(res.data)
                          personData.birthday = res.data.birthday
                          personData.coachId = res.data.coachId
                          personData.email = res.data.email
                          personData.phone = res.data.phone
                          personData.headPhoto = res.data.headPhoto
                          personData.gender = res.data.gender
                          personData.healthId = res.data.healthId
                          personData.password = res.data.password
                          personData.schoolName = res.data.schoolName
                          personData.studentId = res.data.studentId
                          personData.studentName = res.data.studentName
                          personData.studyType = res.data.studyType
                          personData.username = res.data.username
                          myPageInfo.coachId = res.data.coachId
                          myPageInfo.password=res.data.password
                          myPageInfo.schoolName=res.data.schoolName
                          request.get("/coach-entity/getCoachById/" + myPageInfo.coachId).then(res => {
                              myPageInfo.coachName = res.data.coachName
                          })
                      })
                  }

              }).catch(err=>{
                  ElMessage.error('修改密码失败')
              })

          }
          const changePassWordDialogVisible=ref(false)

         const  changePassWordInfo=reactive({
            oldPassword:'',
            newPassword:'',
            confirmPassword:''
         })




        const onEsc = () => {
            router.push({
                path: '/'
            })

        }
        const onPersonInfo = () => {
            router.push({
                path: '/PersonInfo/' + myPageInfo.userId
            })

        }
        const OnSubjectOne = () => {
            router.push({
                path: '/SubjectOne/' + myPageInfo.userId
            })
        }
        const OnSubjectTwo = () => {
            router.push({
                path: '/SubjectTwo/' + myPageInfo.userId
            })
        }
        const onHealthy = () => {
            router.push({
                path: '/Healthy/' + myPageInfo.userId
            })
        }


        const OnSubjectThreePractice = () => {
            router.push({
                path: '/SubjectThreePractice/' + myPageInfo.userId
            })
        }
        const OnSubjectThreeTheory = () => {
            router.push({
                path: '/SubjectThreeTheory/' + myPageInfo.userId
            })
        }
        const onExam = () => {
            router.push({
                path: '/Exam/' + myPageInfo.userId
            })
        }
        const onExamRegistration = () => {
            router.push({
                path: '/ExamRegistration/' + myPageInfo.userId
            })
        }

        const personData = reactive({

            username: '',
            phone: '',
            gender: '',
            schoolName: '',
            studentName: '',
            studyType: '',
            email: '',
            birthday: '',
            coachId: '',
            password: '',
            studentId: '',
            headPhoto: '',
            healthId: '',

        })
        const ChangePersonInfoDialogVisible = ref(false)
        const changeInfo = reactive({
            username: '',
            phone: '',
            gender: '',
            schoolName: '',
            studentName: '',
            studyType: '',
            email: '',
            birthday: '',
            coachId: '',
            password: '',
            studentId: '',
          headPhoto: '',
            healthId: '',


        })
        const makeSureChangePersonInfo=()=>{
            if (changeInfo.username === ""){
                ElMessage({
                    message:"用户名不能为空",
                    type:'error'
                })
                return
            }
            if (changeInfo.studentName === ""){
                ElMessage({
                    message:"学生名字不能为空",
                    type:'error'
                })
                return
            }
            if (changeInfo.phone === "") {
                ElMessage({
                    message: "电话不能为空",
                    type: 'error'
                })
                return
            }

             request.post("/student-entity/updateStudentById",changeInfo).then(res=>{
                 if (res.data === 1){
                     ElMessage({
                         message:"修改成功",
                         type:'success'
                     })
                      ChangePersonInfoDialogVisible.value = false
                     request.get("/student-entity/selectStudentById/" + myPageInfo.userId).then(res => {
                         // console.log(res.data)
                         personData.birthday = res.data.birthday
                         personData.coachId = res.data.coachId
                         personData.email = res.data.email
                         personData.phone = res.data.phone
                         personData.headPhoto = res.data.headPhoto
                         personData.gender = res.data.gender
                         personData.healthId = res.data.healthId
                         personData.password = res.data.password
                         personData.schoolName = res.data.schoolName
                         personData.studentId = res.data.studentId
                         personData.studentName = res.data.studentName
                         personData.studyType = res.data.studyType
                         personData.username = res.data.username
                         myPageInfo.coachId = res.data.coachId
                         myPageInfo.password=res.data.password
                         myPageInfo.schoolName=res.data.schoolName
                         request.get("/coach-entity/getCoachById/" + myPageInfo.coachId).then(res => {
                             myPageInfo.coachName = res.data.coachName
                         })
                     })
                 }else {
                     ElMessage({
                         message:"修改失败",
                         type:'error'
                     })
                 }

             })
        }
        const onChangePersonInfo = () => {
            ChangePersonInfoDialogVisible.value = true
            changeInfo.birthday= personData.birthday
            changeInfo.coachId= personData.coachId
            changeInfo.gender=personData.gender
            changeInfo.email=personData.email
            changeInfo.phone=personData.phone
            changeInfo.username=personData.username
            changeInfo.studentName=personData.studentName
            changeInfo.schoolName=personData.schoolName
            changeInfo.studyType=personData.studyType
            changeInfo.password=personData.password
            changeInfo.studentId=personData.studentId
            changeInfo.headPhoto=personData.headPhoto
            changeInfo.healthId=personData.healthId


        }

        const  options=reactive({
            option:[{
                coachId:'',
                coachName:'',
                email:'',
                password:'',
                phone:'',
                gender:'',
                type:'',
                teachingAge:'',
                introduction:'',
                schoolName:'',
            }]
        })
        const  makeSureChangeCoach=()=>{
          request.post("/student-entity/updateStudentById",changeInfo).then(res=>{
            console.log(res.data)
            if (res.data === 1){
              ElMessage.success('换绑教练成功')
              ChangeCoachDialogVisible.value=false
              request.get("/student-entity/selectStudentById/" + myPageInfo.userId).then(res => {
                // console.log(res.data)
                personData.birthday = res.data.birthday
                personData.coachId = res.data.coachId
                personData.email = res.data.email
                personData.phone = res.data.phone
                personData.headPhoto = res.data.headPhoto
                personData.gender = res.data.gender
                personData.healthId = res.data.healthId
                personData.password = res.data.password
                personData.schoolName = res.data.schoolName
                personData.studentId = res.data.studentId
                personData.studentName = res.data.studentName
                personData.studyType = res.data.studyType
                personData.username = res.data.username
                myPageInfo.coachId = res.data.coachId
                myPageInfo.password=res.data.password
                myPageInfo.schoolName=res.data.schoolName
                request.get("/coach-entity/getCoachById/" + myPageInfo.coachId).then(res => {
                  myPageInfo.coachName = res.data.coachName
                })
              })
            }

          }).catch(err=>{
            ElMessage.error('换绑教练失败')
          })
        }
      const openeds=ref(["1-2","1-3","1-4","1-5","1-6","1-7"])
        return {
            options,
            onEsc,
            openeds,
            onPersonInfo,
            OnSubjectOne,
            OnSubjectTwo,
            OnSubjectThreePractice,
            OnSubjectThreeTheory,
            onHealthy,
            onExam,
            ChangeCoachDialogVisible,
            onExamRegistration,
            personData,
            myPageInfo,
            onChangePersonInfo,
            ChangePersonInfoDialogVisible,
            changeInfo,
            makeSureChangePersonInfo,
            changePassWordInfo,
            changePassWordDialogVisible,
            makeSureChangePassWordInfo,
            onChangePassWord,
            onCoach,
            makeSureChangeCoach,
        }
    },
    methods: {

    },
    created(){

    const myRoute =  useRouter()
    this.myPageInfo.userId = <string>myRoute.currentRoute.value.params.userid


    request.get("/student-entity/selectStudentById/" + this.myPageInfo.userId).then(res => {

      this.personData.birthday = res.data.birthday
      this.personData.coachId = res.data.coachId
      this.personData.email = res.data.email
      this.personData.phone = res.data.phone
      this.personData.headPhoto = res.data.headPhoto
      this.personData.gender = res.data.gender
      this.personData.healthId = res.data.healthId
      this.personData.password = res.data.password
      this.personData.schoolName = res.data.schoolName
      this.personData.studentId = res.data.studentId
      this.personData.studentName = res.data.studentName
      this.personData.studyType = res.data.studyType
      this.personData.username = res.data.username
      this.myPageInfo.coachId = res.data.coachId
      this.myPageInfo.password=res.data.password
      this.myPageInfo.schoolName=res.data.schoolName
      request.get("/coach-entity/getCoachById/" + this.myPageInfo.coachId).then(res => {
        this.myPageInfo.coachName = res.data.coachName
      })
      request.get("/coach-entity/getAllCoachBySchoolName/"+this.myPageInfo.schoolName).then(res=>{
        // console.log(res.data)
        this.options.option=res.data

      })
    })

    }
})
</script>

<style scoped>

</style>









































































































































