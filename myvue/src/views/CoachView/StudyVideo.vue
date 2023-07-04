<template>
  <h1 style="text-align: center">Video</h1>


  <br><br><br><br><br>

  <el-button style="position: absolute;right: 5%;top: 15%" size="large" @click="uploadVisible=true">添加</el-button>

  <div style="display: flex;width: 100%;flex-flow: row wrap;background-color: #181818">
    <div v-for="video in videoInfoList" style="width: 33.3%;height: 200px">
      <el-card style="height: 100%;width: 100%">
        <MyVideo :url="video.videoUrl" :videoName="video.videoName" style="width: 80%;height: 80%" />
      </el-card>
    </div>
  </div>

  <el-dialog
      v-model="uploadVisible"
      width="30%"
      title="添加视频"
      style="text-align: center"
  >
    <el-form label-width="100px">
      <el-form-item label="视频名称">
        <el-input v-model="updateVideo.videoName"></el-input>
      </el-form-item>
      <el-upload
          v-model:file-list="fileList"
          class="upload-demo"
          :http-request="uploadVideo"
          :limit="1"
          :before-upload="beforeUpload"
      >
        <el-tag>点击上传</el-tag>
      </el-upload>
    </el-form>
  </el-dialog>
</template>

<script setup lang="ts">


import {inject, onMounted, reactive, ref} from "vue";
import request from "@/request/request";
import {ElMessage, UploadUserFile} from "element-plus";
import {client} from "@/utils/myoss";
import MyVideo from "@/components/MyVideo.vue";

interface Video {
  videoId: string,
  videoName: string,
  videoUrl: string,
  schoolName: string,
}
interface userInfo {
  coachId: string,
  coachName: string,
  email: string,
  gender: string,
  introduction: string,
  password: string,
  phone: string,
  schoolName: string,
  teachingAge: string,
  type: string,
  username: string,
  headPhoto: string,
}

let coachInfo = reactive({}) as userInfo

const peopleId = inject("peopleId")
const videoInfoList: Video[] = reactive([])
onMounted(() => {
  request.get("/coach-entity/getCoachById/" + peopleId).then(res => {
    coachInfo = res.data
    request.get("/video-entity/getVideoBySchoolName/"+coachInfo.schoolName).then(resp => {
      videoInfoList.splice(0, videoInfoList.length)
      videoInfoList.push(...resp.data)
    })
  })
})

// 上传视频
const uploadVisible = ref(false)
const fileList = ref<UploadUserFile[]>([])
let updateVideo = reactive({})as Video
const uploadVideo = (file) => {
  const aliName = updateVideo.videoName+ ".mp4"
  client.put("/video/"+coachInfo.schoolName+"/"+aliName,file.file).then(res =>{
    console.log(res)
    updateVideo.videoUrl = res.url
    updateVideo.schoolName = coachInfo.schoolName
    request.post("/video-entity/addVideo",updateVideo).then(resp =>{
      ElMessage.success("上传成功")
      uploadVisible.value = false
        videoInfoList.splice(0, videoInfoList.length)
        videoInfoList.push(...resp.data)
    })
  })
}

const beforeUpload = () => {
  if (updateVideo.videoName == null || updateVideo.videoName == "") {
    ElMessage.error("请填写视频名称")
    return false
  }
}


</script>

<style scoped>

</style>