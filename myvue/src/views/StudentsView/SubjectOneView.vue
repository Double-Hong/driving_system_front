<template>
    <div class="common-layout">
        <el-container>
            <el-header>
                <el-row :gutter="20">
                    <el-col :span="6" ><div class="grid-content ep-bg-purple"  /><el-avatar :size="size" :src="circleUrl" /></el-col>
                    <el-col :span="6"><div class="grid-content ep-bg-purple" />
                      科目一学习
                    </el-col>
                    <el-col :span="6"><div class="grid-content ep-bg-purple" /></el-col>
                    <el-col :span="6"><div class="grid-content ep-bg-purple" />
                        <el-dropdown>
                            <el-button type="primary" style="margin-left: 300px">
                                操作<el-icon class="el-icon--right"></el-icon>
                            </el-button>
                            <template #dropdown>
                                <el-dropdown-menu>
                                    <el-dropdown-item> <el-button @click="onPersonInfo">个人信息中心</el-button></el-dropdown-item>
                                    <el-dropdown-item> <el-button @click="onHealthy">绑定健康信息</el-button></el-dropdown-item>
                                    <el-dropdown-item><el-button @click="onEsc">退出登录</el-button></el-dropdown-item>
                                </el-dropdown-menu>
                            </template>
                        </el-dropdown>

                    </el-col>
                </el-row>
            </el-header>

            <el-container style="margin-top: 50px;">
                <el-aside width="200px" style="background: #a6a9de;height: 581px">


                    <el-menu
                            default-active="2"
                            class="el-menu-vertical-demo"
                            background-color="#a6a9de"
                            :default-openeds="openeds"
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

                <el-main >
                  <el-main >
                    <h1 style="margin-left: 40%">注意！</h1>
                    <span style="margin-left: 30%">进行一定学习时长的视频学习才能获得科目一考试资格</span>
                    <div style="display: flex;">
                      <!-- <el-row :gutter="16" style="">-->
                      <el-card style="margin-left:15% ;margin-top: 5%; width: 300px;height: 400px" >
                        <template #header>
                          <div class="card-header">
                            <span>视频学习</span>
                            <el-button class="button" style="margin-left: 90px">点击进入</el-button>
                          </div>
                        </template>
                        <el-image src="https://www.aerohome.com.cn/images/upload/20210428/161959139469.jpg"></el-image>
                      </el-card>

                      <el-card class="box-card" style="width: 300px;margin-top: 5%;height: 400px;margin-left: 10%">
                        <template #header>
                          <div class="card-header">
                            <span>试题学习</span>
                            <el-button class="button" style="margin-left: 90px">点击进入</el-button>
                          </div>
                        </template>
                        <el-image src="https://bpic.588ku.com/element_origin_min_pic/21/04/06/f0d082f8abaefe5e0f9ebc74f6a89f0c.jpg"></el-image>
                      </el-card>
                      <!-- </el-row>-->

                    </div>

                  </el-main>

                </el-main>
            </el-container>
        </el-container>
    </div>


</template>
import { ref } from 'vue'
import {
Document,
Menu as IconMenu,
Location,
Setting,
} from '@element-plus/icons-vue'

<script>
import { useRouter} from "vue-router";
import {reactive, ref} from "vue";
import request from "@/request/request";
import health from "@icon-park/vue-next/lib/icons/Health";

export default {
    name: "StudentsHomeView",

    data(){

        return{

        }
    },
    setup(){
       const  size=ref("large")
       const circleUrl=ref('https://tupian.qqw21.com/article/UploadPic/2021-1/20211722215532214.jpg')

        const router = new useRouter()

        const myPageInfo=reactive({
            userId:'',
        })

        const onEsc = () => {
            router.push({
                path:'/'
            })

        }
        const onPersonInfo = () => {
            router.push({
                path:'/PersonInfo/'+myPageInfo.userId
            })

        }
        const OnSubjectOne = () => {
            router.push({
                path:'/SubjectOne/'+myPageInfo.userId
            })
        }
        const OnSubjectTwo = () => {
            router.push({
                path:'/SubjectTwo/'+myPageInfo.userId
            })
        }
        const onHealthy = () => {
            router.push({
                path:'/Healthy/'+myPageInfo.userId
            })
        }


        const OnSubjectThreePractice = () => {
            router.push({
                path:'/SubjectThreePractice/'+myPageInfo.userId
            })
        }
        const OnSubjectThreeTheory = () => {
            router.push({
                path:'/SubjectThreeTheory/'+myPageInfo.userId
            })
        }
        const onExam = () => {
            router.push({
                path:'/Exam/'+myPageInfo.userId
            })
        }
        const onExamRegistration = () => {
            router.push({
                path:'/ExamRegistration/'+myPageInfo.userId
            })
        }
        const openeds = ref(["1-2","1-3","1-4","1-5","1-6","1-7"])
        return{
            onEsc,
            openeds,
            onPersonInfo,
            OnSubjectOne,
            OnSubjectTwo,
            OnSubjectThreePractice,
            OnSubjectThreeTheory,
            onHealthy,
            onExam,
            onExamRegistration,
            myPageInfo,
          circleUrl,
          size,

        }
    },
    methods:{

    },
    created() {
        const myRoute= new useRouter()
        this.myPageInfo.userId =  myRoute.currentRoute.value.params.userid
        // request.get("/student-entity/selectStudentById/"+this.myPageInfo.userId).then(res=>{
        //     console.log(res.data)
        //
        // })

    }
}
</script>

<style scoped>

</style>