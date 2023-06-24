<template>
    <div class="common-layout">
        <el-container>
            <el-header>
                <el-row :gutter="20">
                    <el-col :span="6" ><div class="grid-content ep-bg-purple"  />个人信息中心</el-col>
                    <el-col :span="6"><div class="grid-content ep-bg-purple" /></el-col>
                    <el-col :span="6"><div class="grid-content ep-bg-purple" /></el-col>
                    <el-col :span="6"><div class="grid-content ep-bg-purple" />
                        <el-dropdown>
                            <el-button type="primary">
                                操作<el-icon class="el-icon--right"><arrow-down /></el-icon>
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

            <el-container>
                <el-aside width="200px" style="background: #a6a9de;height: 581px">


                    <el-menu
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
                                <el-menu-item index="1-7" @click="onExamRegistration">考试</el-menu-item>
                            </el-menu-item-group>


                        </el-sub-menu>

                    </el-menu>
                </el-aside>

                <el-main >
                    <el-image :src="healthy.imageUrl" style=" height: 350px;width: 400px"></el-image>
                    <br>
                    <br>
                    <el-upload
                    action=""
                    :http-request="upload"
                    :show-file-list="false">
                    <el-button class="avatar-update">上传健康证明</el-button>
                        <br>

                </el-upload>
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
import * as $store from "vue-tsc/out/shared";
import upload from "@icon-park/vue-next/lib/icons/Upload";
import axios from "axios";

export default {
    name: "StudentsHomeView",
    computed: {
        upload() {
            return upload
        },

    },

    data(){


        return{
        }
    },
    setup(){

        const upload = (file) => {
            const formData = new FormData();
            formData.append("smfile", file.file);
            axios
                .post("/api/v2/upload", formData, {
                    headers: {
                        "Content-Type": "multipart/form-data",
                        "Authorization": "xh6KJgvlS2ZWDNps1BEk24oz6lAH3p2v",
                    },
                })
                .then((res) => {
                    console.log(res);
                    healthy.imageUrl=res.data.data.url;
                    console.log(healthy.imageUrl);
                    // location.reload()
                    // console.log("上传成功");
                    request.post("/health-entity/updateHealty",healthy)
                        .then(res=>{
                            console.log(res);
                            console.log("上传成功");
                        })
                        .catch(err=>{
                            console.log(err);
                            console.log("上传失败");
                        })
                });
        };

        const router = new useRouter()

        const myPageInfo=reactive({
            userId:'',
            healthyPictureUrl:'',
        })
        const healthy=reactive({
            healthId:'',
            height:'',
            weight:'',
            imageUrl:'',
            studentId:'',
            surgicalHistory:'',
            allergyHistory:'',
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
        return{
            onEsc,
            onPersonInfo,
            OnSubjectOne,
            OnSubjectTwo,
            OnSubjectThreePractice,
            OnSubjectThreeTheory,
            onHealthy,
            onExam,
            onExamRegistration,
            myPageInfo,
            upload,
            healthy
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
       request.get("/health-entity/getHealthyDataByStudentId/"+this.myPageInfo.userId).then(res=>{
           console.log(res.data)
          this.healthy.allergyHistory=res.data.allergyHistory
           this.healthy.healthId=res.data.healthId
           this.healthy.height=res.data.height
           this.healthy.weight=res.data.weight
           this.healthy.imageUrl=res.data.imageUrl
           this.healthy.studentId=res.data.studentId
           this.healthy.surgicalHistory=res.data.surgicalHistory

       })

    }
}
</script>

<style scoped>

</style>