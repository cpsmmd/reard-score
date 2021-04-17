<template>
  <div style="position:relative;">
    <h1 class="page_head_h1">
      海报二维码
      <span style="color:#FA795E;margin-left:20px;font-size:14px;">提示： 微信群二维码每隔7天会变化一次，务必记得及时更新</span>
    </h1>
    <file-upload
      accept="image/*"
      :multiple="false"
      :drop="true"
      v-model="files"
      @input-filter="inputFilter"
    >
      <Button
        type="primary"
        icon="md-add"
      >{{
        mapInfo ? "更新图片" : "新增图片"
      }}</Button>
    </file-upload>
    <div
      v-if="mapInfo"
      class="map-contain"
      :style="{ backgroundImage: 'url(' + mapInfo + ')' }"
    ></div>
    <div
      v-else
      class="uploader-tips"
    >
      <img src="../images/addImage.png" />
      <p>
        将图片拖拽致此，或
        <label
          for="file"
          class="upload-label-ljy"
        >点此上传</label>
      </p>
    </div>
  </div>
</template>
<script>
import FileUpload from 'vue-upload-component'
import { v4 as uuidv4 } from 'uuid'
export default {
  components: {
    FileUpload
  },
  data () {
    return {
      mapInfo: null,
      files: null,
      mapFile: null
    }
  },
  created () {
    this.getCode()
  },
  methods: {
    getCode () {
      this.$ajax(this, {
        data: {
          op: 'c40402'
        }
      })
        .then(result => {
          this.mapInfo = result.data.image
        })
        .catch(err => {
          this.$Message.error(err.message)
        })
    },
    updateCode () {
      this.$ajax(this, {
        data: {
          op: 'c40401',
          image: this.mapInfo
        }
      })
        .then(result => {
          this.$Message.success('更新成功')
        })
        .catch(err => {
          this.$Message.error(err.message)
        })
    },
    inputFilter (newFile) {
      this.mapFile = newFile.file
      let data = new FormData()
      data.append('uid', uuidv4())
      data.append('xbimage', newFile.file)
      data.append('name', newFile.name)
      data.append('type', 'image')
      this.$ajax(this, {
        url: process.env.UPLOAD_API,
        data: data
      })
        .then(result => {
          // this.$Message.success('上传成功,请点击确定添加此图片')
          this.mapInfo = result.data.url
          this.updateCode()
        })
        .catch(err => {
          this.$Message.error(err.message)
        })
    }
  }
}
</script>
<style scoped>
.map-contain {
  background-repeat: no-repeat;
  background-size: contain;
  width: 320px;
  height: 350px;
  background-position: center;
  border: dotted 1px #cacaca;
  margin-top: 20px;
}
.uploader-tips {
  width: 320px;
  height: 350px;
  position: relative;
  border: dotted 1px #cacaca;
  border-radius: 3px;
  margin-top: 20px;
}
.uploader-tips img {
  width: 50px;
  height: 40px;
  position: absolute;
  top: 30%;
  left: 44%;
}
.uploader-tips p {
  position: absolute;
  width: 100%;
  text-align: center;
  top: 60%;
  font-size: 14px;
  font-weight: 500;
}
</style>
