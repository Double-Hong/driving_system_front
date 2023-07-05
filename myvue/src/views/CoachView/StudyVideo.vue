<template>
  <h1 style="text-align: center">学习视频管理</h1>


  <br><br><br><br><br>
  <div style="width: 100%;position: absolute;right: 0;top: 15%;">
    <el-input v-model="search" style="width: 20%" clearable placeholder="搜索关键词" />
    <el-select v-model="search2">
      <el-option label="无" value=""/>
      <el-option label="C1" value="C1"/>
      <el-option label="C2" value="C2" />
    </el-select>
  </div>

  <el-button style="position: absolute;right: 5%;top: 15%" size="large" @click="uploadVisible=true">添加</el-button>

  <div style="display: flex;width: 100%;flex-flow: row wrap;">
    <div v-for="video in filterVideo" style="width: 33.3%;height: 100%;text-align: center">
      <el-card style="height: 100%;width: 100%;position: relative">
        <MyVideo v-show="flash" :url="video.videoUrl" :videoName="video.videoName"/>
        <span style="font-size: large">{{ video.videoName }}</span>
        <el-tag size="large" style="position: absolute;right: 20%">{{ video.videoType }}</el-tag>
        <el-button style="position: absolute;right: 0" @click="openDeleteDialog(video)" icon="Delete" type="danger"></el-button>
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
      <el-form-item label="视频类型">
        <el-select v-model="updateVideo.videoType">
          <el-option label="无" value=""/>
          <el-option label="C1" value="C1"/>
          <el-option label="C2" value="C2" />
        </el-select>
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

  <el-dialog
      title="确认删除"
      width="30%"
      v-model="deleteVisible"
      style="text-align: center"
  >
    <h1>{{deleteVideoEntity.videoName}}</h1>

    <br>
    <el-button icon="Select" @click="deleteVideo" type="success" />
    <el-button icon="Close" @click="deleteVisible=false" type="danger" />
  </el-dialog>
</template>

<script setup lang="ts">


import {computed, inject, onMounted, reactive, ref} from "vue";
import request from "@/request/request";
import {ElMessage, UploadUserFile} from "element-plus";
import {client} from "@/utils/myoss";
import MyVideo from "@/components/MyVideo.vue";
import router from "@/router";
import {indexOf} from "lodash";

interface Video {
  videoId: string,
  videoName: string,
  videoUrl: string,
  schoolName: string,
  videoType: string,
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

//刷新
const flash = ref(true)

let coachInfo = reactive({}) as userInfo

const peopleId = inject("peopleId")
const videoInfoList: Video[] = reactive([])
onMounted(() => {
  request.get("/coach-entity/getCoachById/" + peopleId).then(res => {
    coachInfo = res.data
    request.get("/video-entity/getVideoBySchoolName/" + coachInfo.schoolName).then(resp => {
      videoInfoList.splice(0, videoInfoList.length)
      videoInfoList.push(...resp.data)

    })
  })
})

// 上传视频
const uploadVisible = ref(false)
const fileList = ref<UploadUserFile[]>([])
let updateVideo = reactive({}) as Video
const uploadVideo = (file) => {
  const aliName = updateVideo.videoName + ".mp4"
  client.put("/video/" + coachInfo.schoolName + "/" + aliName, file.file).then(res => {
    console.log(res)
    updateVideo.videoUrl = res.url
    updateVideo.schoolName = coachInfo.schoolName
    videoInfoList.push(updateVideo)
    request.post("/video-entity/addVideo", updateVideo).then(resp => {
      ElMessage.success("上传成功")
      // videoInfoList.splice(0, videoInfoList.length)
      // videoInfoList.push(...resp.data)
      updateVideo.videoName = ""
      updateVideo.videoType = ""
      fileList.value = []
      uploadVisible.value = false
    })
  })
}

const beforeUpload = () => {
  if (updateVideo.videoName == null || updateVideo.videoName == "") {
    ElMessage.error("请填写视频名称")
    return false
  }
}

//删除视频
const deleteVisible = ref(false)
let deleteVideoEntity = reactive({})as Video
const openDeleteDialog = (video:Video) => {
  deleteVideoEntity= video
  deleteVisible.value = true
}
const deleteVideo = () => {
  request.get("/video-entity/deleteVideo/" + deleteVideoEntity.videoId).then(res => {
    ElMessage.success("删除成功")
    videoInfoList.splice(indexOf(videoInfoList,deleteVideoEntity),1)
    // videoInfoList.splice(0, videoInfoList.length)
    // videoInfoList.push(...res.data)
  })
  client.delete("/video/" + coachInfo.schoolName + "/" + deleteVideoEntity.videoName + ".mp4").then(res => {
    console.log(res)
    deleteVisible.value = false
  })
}


//搜索
const search = ref('')
const search2 = ref('')
const filterVideo =computed(()=>{
  return videoInfoList.filter((video:Video)=>{
    return (video.videoName.includes(search.value) ||video.videoType.includes(search.value)) &&video.videoType.includes(search2.value)
  })
})

</script>

<style scoped>

</style>