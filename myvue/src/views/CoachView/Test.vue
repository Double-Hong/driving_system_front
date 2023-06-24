<template>
  <el-upload
      v-model:file-list="fileList"
      class="upload-demo"
      :http-request="myUpload"
      :limit="1"
  >
    <el-avatar :size="200" :src="url">

    </el-avatar>
    <template #tip>
      <div class="el-upload__tip">
        jpg/png files with a size less than 500KB.
      </div>
    </template>
  </el-upload>


  <el-image
      :src="url"
      :preview-src-list="srcList"
      :initial-index="0"
      @click="test"
  ></el-image>
</template>
<script lang="ts" setup>
import {ref} from 'vue'

import type {UploadProps, UploadUserFile} from 'element-plus'
import {client} from "@/utils/myoss";

const fileList = ref<UploadUserFile[]>([])


const myUpload = (file) => {
  console.log(file)
  client.put("/ourFile/" + file.file.name, file.file).then(res => {
    console.log(res)
  })
}

const url = ref("https://doublehong.oss-cn-chengdu.aliyuncs.com/ourFile/%E5%B1%8F%E5%B9%95%E6%88%AA%E5%9B%BE%283%29.png")
const srcList = [
  'https://doublehong.oss-cn-chengdu.aliyuncs.com/ourFile/%E5%B1%8F%E5%B9%95%E6%88%AA%E5%9B%BE%283%29.png',
]
const test = () => {
  srcList[0] = "https://doublehong.oss-cn-chengdu.aliyuncs.com/ourFile/timg.jpg"
}

</script>
