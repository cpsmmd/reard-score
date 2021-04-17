<template>
  <div id="edit_course">
    <h1
      class="page_head_h1"
      style="position:relative;"
    >
      <Breadcrumb>
        <BreadcrumbItem style="cursor:pointer;"><span @click="goBack">课程列表</span></BreadcrumbItem>
        <BreadcrumbItem>{{
          isEdit ? "编辑课程信息" : "新建课程"
        }}</BreadcrumbItem>
      </Breadcrumb>
      <span
        @click="goBack"
        style="position:absolute;right:0;top:0;cursor:pointer;"
      >返回</span>
    </h1>
    <!-- 基本信息 -->
    <div class="course_info">
      <div class="title">课程信息</div>
      <div
        v-if="isInfoEdit"
        style="padding-left: 10px;"
      >
        <div class="_icon">
          <span class="_title">图标：</span>
          <img :src="infoEdit.icon" />
          <file-upload
            accept="image/*"
            :multiple="false"
            :drop="true"
            v-model="files"
            @input-filter="inputFilter"
          >
            <Button
              style="margin:34px 0 0 20px;"
              type="primary"
              icon="md-add"
            >上传图片</Button>
          </file-upload>
        </div>
        <div style="margin:16px 0;">
          <span class="_title">名称：</span><Input
            v-model="infoEdit.name"
            placeholder="输入名称"
            style="width: 200px;"
          />
        </div>
        <div style="display:flex;">
          <span class="_title">简介：</span><Input
            style="margin-left:1px;width:400px;"
            v-model="infoEdit.intro"
            type="textarea"
            :autosize="{ minRows: 2, maxRows: 5 }"
            placeholder="请输入课程描述"
          />
        </div>
        <div style="margin:16px 0;">
          <span class="_title">排序权重：</span>
          <InputNumber
            v-model="infoEdit.sortweight"
            placeholder="输入名称"
            style="width: 200px;"
          /><span style="font-size:14px;color:#999999;margin-left:20px;vertical-align: bottom;">默认是新建的课程排在列表最前面，有权重数值的课程会优先排在更前面</span>
        </div>
        <div style="margin:16px 0;">
          <span class="_title">上架状态：</span>
          <RadioGroup v-model="infoEdit.onsale">
            <Radio label="上架"></Radio>
            <Radio label="下架"></Radio>
          </RadioGroup>
        </div>
        <div class="_operate">
          <Button
            @click="saveBaseOk"
            type="primary"
          >保存</Button>
          <Button
            @click="saveBaseCancle"
            style="margin-left:15px;"
          >取消</Button>
        </div>
      </div>
      <div
        v-else
        style="padding-left: 10px;"
      >
        <div class="_icon">
          <span class="_title">图标：</span>
          <img :src="baseInfo.icon" />
        </div>
        <div style="margin:16px 0;">
          <span class="_title">名称：</span>{{ baseInfo.name }}
        </div>
        <div style="display:flex;">
          <span class="_title">简介：</span>{{ baseInfo.intro }}
        </div>
        <div style="margin:16px 0;">
          <span class="_title">排序权重：</span>
          {{ baseInfo.sortweight
        }}<span style="font-size:14px;color:#999999;margin-left:20px;vertical-align: bottom;">默认是新建的课程排在列表最前面，有权重数值的课程会优先排在更前面</span>
        </div>
        <div style="margin:16px 0;">
          <span class="_title">上架状态：</span>
          {{baseInfo.onsale}}
        </div>
        <div class="_operate">
          <Button
            @click="editInfoBtn"
            type="primary"
          >编辑</Button>
        </div>
      </div>
    </div>
    <!-- 多媒体 -->
    <div
      v-if="courseId !== null"
      class="video_content"
    >
      <div class="title">多媒体资源</div>
      <!-- 编辑保存 -->
      <div class="operate">
        <span v-show="videoIsEdit">
          <Button
            @click="saveVideoOk"
            type="primary"
          >保存</Button>
          <Button
            @click="saveVideoCancle"
            style="margin-left:15px;"
          >取消</Button>
        </span>
        <file-upload
          :multiple="true"
          :drop="true"
          v-model="videoFile"
          @input-filter="videoFileUp"
          :disabled="isUpload"
        >
          <Button
            v-show="!videoIsEdit"
            type="primary"
            icon="md-add"
            style="margin-right:20px;"
            :disabled="isUpload"
          >上传多媒体</Button>
        </file-upload>
        <Button
          v-show="!videoIsEdit && lesson.length>0"
          @click="editVideoBtn"
          type="primary"
          :disabled="isUpload"
        >编辑</Button>
      </div>
      <!-- 内容区 -->
      <div>
        <div v-if="videoIsEdit">
          <draggable v-model="editLesson">
            <transition-group>
              <div
                class="video_li"
                v-for="(item, index) in editLesson"
                :key="item.media_id"
              >
                <Card style="width:341px;height:250px;text-align:center;">
                  <div style="height:190px;">
                    <video
                      style="width:100%;"
                      controls
                      v-if="item.type === 1"
                      :src="item.url"
                    ></video>
                    <audio
                      v-else
                      controls
                      style="margin-top:50px;"
                      :src="item.url"
                    ></audio>
                  </div>
                  <div class="_operate">
                    <Badge
                      :count="index + 1"
                      type="primary"
                      style="float:left;"
                    >
                    </Badge>
                    <Checkbox
                      style="float:left;margin-left:20px;"
                      v-model="item.rule"
                    >免费</Checkbox>
                    <Icon
                      @click="delCourse(item)"
                      style="font-size:22px;float:right;cursor:pointer;"
                      type="ios-trash"
                    />
                  </div>
                </Card>
              </div>
            </transition-group>
          </draggable>
        </div>
        <div
          class="clearfix"
          v-else
        >
          <div
            class="video_li"
            v-for="(item, index) in lesson"
            :key="index"
          >
            <Card
              v-if="item.process === 100"
              style="width:341px;height:250px;text-align:center;"
            >
              <div style="height:190px;">
                <video
                  style="width:100%;"
                  controls
                  v-if="item.type === 1"
                  :src="item.url"
                ></video>
                <audio
                  v-else
                  controls
                  style="margin-top:50px;"
                  :src="item.url"
                ></audio>
              </div>
              <div>
                <Badge
                  :count="index + 1"
                  type="primary"
                  style="float:left;"
                >
                </Badge>
                <Checkbox
                  style="float:left;margin-left:20px;"
                  v-model="item.rule"
                  disabled
                >免费</Checkbox>
                <Icon
                  @click="delCourse(item)"
                  style="font-size:22px;float:right;cursor:pointer;"
                  type="ios-trash"
                />
              </div>
            </Card>
            <Card
              v-else
              style="width:341px;height:250px;background:rgba(55,55,55,.1);text-align:center;"
            >
              <div style="margin:50px 0 20px 0;">正在上传中.....</div>
              <Progress
                :percent="item.process"
                :stroke-width="20"
                :stroke-color="['#108ee9', '#87d068']"
                :text-inside="false"
              />
            </Card>
          </div>
          <div
            style="text-align:center;margin:50px;"
            v-show="lesson.length===0"
          >
            当前无课程....请上传
          </div>
        </div>
      </div>
    </div>
  </div>
</template>
<script>
import FileUpload from 'vue-upload-component'
import { v4 as uuidv4 } from 'uuid'
import draggable from 'vuedraggable'
export default {
  components: {
    FileUpload,
    draggable
  },
  data () {
    return {
      isEdit: false,
      isInfoEdit: true,
      mapInfo: require('../images/addImage.png'),
      files: null,
      videoFile: null,
      getInfo: {},
      baseInfo: {
        icon: require('../images/addImage.png'),
        name: '',
        intro: '',
        onsale: '上架',
        sortweight: 0
      },
      infoEdit: {
        icon: require('../images/addImage.png'),
        name: '',
        intro: '',
        onsale: '上架',
        sortweight: 0
      },
      // 多媒体
      videoIsEdit: false,
      courseId: null,
      lesson: [],
      editLesson: [],
      processTimer: null,
      isUpload: false
    }
  },
  created () {
    console.log(Math.random() * 0.2)
    this.isEdit = !JSON.parse(sessionStorage.getItem('courseInfo')).isTrusted
    this.getInfo = JSON.parse(sessionStorage.getItem('courseInfo'))
    if (this.isEdit) {
      this.isInfoEdit = false
      this.baseInfo = JSON.parse(JSON.stringify(this.getInfo))
      if (!isNaN(this.baseInfo.onsale)) {
        this.baseInfo.onsale = this.baseInfo.onsale === 0 ? '下架' : '上架'
      }
      this.courseId = this.getInfo.id
      this.getVideo()
      this.updateProcess()
    }
  },
  methods: {
    goBack () {
      if (this.isUpload) {
        this.$Modal.confirm({
          title: '温馨提示',
          content: `当前正在上传文件，若离开此页面，则取消上传`,
          onOk: () => {
            this.$router.go(-1)
          },
          onCancel: () => { }
        })
      } else {
        this.$router.go(-1)
      }
    },
    updateProcess () {
      clearInterval(this.processTimer)
      this.processTimer = setInterval(() => {
        this.isUpload = false
        this.lesson.map(item => {
          if (item.process !== 100) {
            this.isUpload = true
            let M = item.size / (1024 * 1024)
            if (item.process < 90) {
              if (M > 400) {
                item.process += Math.random() * 0.06
              } else if (M > 300) {
                item.process += Math.random() * 0.1
              } else if (M > 200) {
                item.process += Math.random() * 0.2
              } else if (M > 100) {
                item.process += Math.random() * 0.26
              } else if (M > 80) {
                item.process += Math.random() * 0.4
              } else if (M > 70) {
                item.process += Math.random() * 0.5
              } else if (M > 60) {
                item.process += 0.5
              } else if (M > 50) {
                item.process += 0.5
              } else if (M > 40) {
                item.process += 0.6
              } else if (M > 30) {
                item.process += 1.5
              } else if (M > 20) {
                item.process += 2.3
              } else if (M > 10) {
                item.process += 10
              } else if (M > 5) {
                item.process += 13
              } else if (M > 4) {
                item.process += 15
              } else if (M > 3) {
                item.process += 25
              } else if (M > 2) {
                item.process += 35
              } else if (M > 1) {
                item.process += 40
              } else {
                item.process += 43
              }
            } else if (item.process < 99) {
              item.process += 0.1
            }
            item.process = Number(item.process.toFixed(3))
            if (item.process > 99) {
              item.process = 99
            }
          }
        })
      }, 1000)
    },
    editInfoBtn () {
      this.isInfoEdit = true
      this.infoEdit = JSON.parse(JSON.stringify(this.baseInfo))
    },
    saveBaseOk () {
      let { icon, name, intro, onsale, sortweight } = this.infoEdit
      if (name.length === 0) {
        return this.$Message.warning('请填写名称')
      }
      if (this.isEdit) {
        this.$ajax(this, {
          data: {
            op: 'c40308',
            id: +this.getInfo.id,
            icon,
            name,
            intro,
            onsale: onsale === '下架' ? 0 : 1,
            sortweight
          }
        })
          .then(result => {
            this.$Message.success('更新信息成功')
            this.isInfoEdit = false
            this.baseInfo = JSON.parse(JSON.stringify(this.infoEdit))
          })
          .catch(err => {
            this.$Message.error(err.message)
          })
      } else {
        this.$ajax(this, {
          data: {
            op: 'c40306',
            icon,
            name,
            intro,
            onsale: onsale === '下架' ? 0 : 1,
            sortweight
          }
        })
          .then(result => {
            this.courseId = result.data.id
            this.$Message.success('更新信息成功')
            this.baseInfo = JSON.parse(JSON.stringify(this.infoEdit))
            this.isInfoEdit = false
          })
          .catch(err => {
            this.$Message.error(err.message)
          })
      }
      sessionStorage.setItem('courseInfo', JSON.stringify(this.infoEdit))
      this.isInfoEdit = false
    },
    saveBaseCancle () {
      this.isInfoEdit = false
    },
    // 多媒体
    getVideo () {
      this.$ajax(this, {
        data: {
          op: 'c40305',
          id: +this.getInfo.id
        }
      })
        .then(result => {
          this.videoFile = null
          this.lesson = []
          result.data.lesson.map(item => {
            item.process = 100
            item.rule = item.rule === 1
            this.lesson.push(item)
          })
        })
        .catch(err => {
          this.$Message.error(err.message)
        })
    },
    editVideoBtn () {
      console.log(this.lesson)
      this.editLesson = JSON.parse(JSON.stringify(this.lesson))
      console.log(this.editLesson)
      this.videoIsEdit = true
    },
    saveVideoOk () {
      this.lesson = JSON.parse(JSON.stringify(this.editLesson))
      this.updateVideo()
      this.videoIsEdit = false
    },
    saveVideoCancle () {
      this.videoIsEdit = false
    },
    delCourse (info) {
      if (this.isUpload) {
        return this.$Message.warning('当前正常上传文件种，请勿操作')
      }
      this.$Modal.confirm({
        title: '温馨提示',
        content: `您确认删除该条多媒体吗？`,
        onOk: () => {
          this.lesson.map((item, index) => {
            if (item.media_id === info.media_id) {
              this.lesson.splice(index, 1)
            }
          })
          this.updateVideo()
        },
        onCancel: () => { }
      })
    },
    inputFilter (newFile) {
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
          this.infoEdit.icon = result.data.url
        })
        .catch(err => {
          this.$Message.error(err.message)
        })
    },
    videoFileUp (newFile) {
      let data = new FormData()
      let uid = uuidv4()
      data.append('uid', uid)
      data.append('name', newFile.name)
      if (newFile.type.startsWith('video')) {
        data.append('xbvideo', newFile.file)
        data.append('type', 'video')
      } else {
        data.append('xbaudio', newFile.file)
        data.append('type', 'audio')
      }
      console.log(newFile.size / (1024 * 1024))
      this.lesson.push({
        type: newFile.type.startsWith('video') ? 1 : 2,
        rule: 0,
        url: '',
        process: 1,
        uid,
        size: newFile.size
      })
      this.$ajax(this, {
        url: process.env.UPLOAD_API,
        data: data
      })
        .then(result => {
          this.lesson.map(item => {
            if (item.uid && item.uid === result.data.uid) {
              item.url = result.data.url
              item.process = 100
            }
          })
          this.updateVideo()
        })
        .catch(err => {
          this.$Message.error(err.message)
        })
    },
    updateVideo () {
      let newArr = []
      this.lesson.map(item => {
        if (item.rule === false) {
          item.rule = 0
        }
        if (item.rule === true) {
          item.rule = 1
        }
        if (item.process === 100) {
          newArr.unshift({
            type: item.type,
            url: item.url,
            rule: item.rule
          })
        }
      })
      this.$ajax(this, {
        data: {
          op: 'c40307',
          id: this.courseId,
          lesson: newArr
        }
      })
        .then(result => {
          this.$Message.success('多媒体更新成功')
          if (!this.isUpload) {
            this.getVideo()
          }
        })
        .catch(err => {
          this.$Message.error(err.message)
        })
    }
  },
  beforeDestroy () {
    clearInterval(this.processTimer)
  }
}
</script>
<style lang="stylus" scoped>
.ivu-breadcrumb
  color #515a6e
  font-size 26px
  font-weight 400
._operate
  padding 14px
  border-top 1px solid #bcbcbc
.title
  color #666666
  font-size 18px
  border-bottom 1px solid #bcbcbc
  padding-bottom 14px
  margin-bottom 14px
.course_info
  padding 14px
  border 1px solid #bcbcbc
  margin-bottom 20px
  ._title
    width 80px
  ._icon
    display flex
    img
      width 90px
      heiht 90px
.video_content
  padding 14px
  border 1px solid #bcbcbc
  margin-bottom 50px
  .operate
    padding 0 14px 14px 20px
    display flex
    border-bottom 1px solid #bcbcbc
  .video_li
    margin 20px 20px 0 0
    float left
</style>
