<template>
  <div id="course">
    <h1 class="page_head_h1">课程列表</h1>
    <div class="content">
      <div>
        <span class="title">VIP条件：</span>
        <RadioGroup
          @on-change="setLimit"
          v-model="limitValue"
        >
          <Radio label="同时满足以下条件"></Radio>
          <Radio label="满足以下任意一条"></Radio>
        </RadioGroup>
        <div style="color:#777777;margin-top:15px;padding-left:60px;">
          <span style="margin:0 30px;">1，关注“香爸香妈”公众号；</span>
          2，分享过机构课程内容
        </div>
      </div>
    </div>
    <div class="content">
      <div>
        状态：
        <Select
          v-model="statusValue"
          @on-change="changeStatus"
          style="width:120px"
        >
          <Option
            v-for="item in statusList"
            :value="item.value"
            :key="item.value"
          >{{ item.label }}</Option>
        </Select>
        <Button
          style="float:right;"
          type="primary"
          icon="md-add"
          @click="goToEditCourse"
        >新建</Button>
      </div>
      <div style="position:relative;">
        <Spin
          size="large"
          fix
          v-if="spinShow"
        ></Spin>
        <div class="_list">
          <div
            class="lesson_li"
            v-for="item in lessonShow"
            :key="item.id"
          >
            <Card>
              <div class="_content1">
                <img
                  class="_icon"
                  :src="item.icon"
                />
                <div style="padding-left:20px;flex:6">
                  <div style="color:black;font-size:16px;">{{ item.name }}</div>
                  <div
                    :title="item.intro"
                    class="shengnue"
                    style="margin-top:5px;"
                  >
                    {{ item.intro }}
                  </div>
                </div>
                <div style="min-width:300px;padding-right:10px;line-height:70px;text-align:right;flex:3">
                  <Button
                    @click="goToEditCourse(item)"
                    type="primary"
                  >编辑</Button>
                  <Button
                    v-if="item.onsale === 1"
                    style="margin:0 10px;"
                    type="warning"
                    @click="upOrDownCourse(0, item.id)"
                  >下架</Button>
                  <Button
                    v-else
                    style="margin:0 10px;"
                    type="success"
                    @click="upOrDownCourse(1, item.id)"
                  >上架</Button>
                  <Icon
                    @click="delCourse(item.id)"
                    style="font-size:22px;cursor:pointer;"
                    type="ios-trash"
                  />
                </div>
              </div>
              <div class="_content2">
                <div style="flex:5;">
                  <span style="color:black;margin-left:70px;">内容： </span>
                  <span style="margin:0 16px;">
                    <span style="color:#FF7E5E;">{{ item.video }}&nbsp;</span>视频</span>
                  <span><span style="color:#FF7E5E;">{{ item.audio }}&nbsp;</span>音频</span>
                </div>
                <div style="flex:4;">
                  <span style="color:black;margin-right:10px;">排序权重：</span>{{ item.sortweight }}
                </div>
                <div style="flex:3;">
                  <span style="color:black;margin-right:10px;">创建时间：</span>{{getLocalTime(item.createtime)}}
                </div>
              </div>
            </Card>
          </div>
          <div
            style="text-align:center;margin-top:50px;"
            v-show="lessonShow.length === 0"
          >
            当前状态下无课程，请添加
          </div>
        </div>
      </div>
    </div>
  </div>
</template>
<script>
export default {
  data () {
    return {
      limitValue: '同时满足以下条件',
      statusValue: -1,
      statusList: [
        {
          value: -1,
          label: '全部课程'
        },
        {
          value: 1,
          label: '已上架'
        },
        {
          value: 0,
          label: '未上架'
        }
      ],
      lesson: [],
      lessonShow: [],
      spinShow: false
    }
  },
  created () {
    this.getLimit()
    this.getCourse()
  },
  methods: {
    getLimit () {
      this.$ajax(this, {
        data: {
          op: 'c40301'
        }
      })
        .then(result => {
          this.limitValue = result.data.rule === 0 ? '同时满足以下条件' : '满足以下任意一条'
        })
        .catch(err => {
          this.$Message.error(err.message)
        })
    },
    setLimit () {
      this.$ajax(this, {
        data: {
          op: 'c40309',
          rule: this.limitValue === '同时满足以下条件' ? 0 : 1
        }
      })
        .then(result => {
          this.$Message.success('设置成功')
        })
        .catch(err => {
          this.$Message.error(err.message)
        })
    },
    getCourse () {
      this.spinShow = true
      this.$ajax(this, {
        data: {
          op: 'c40302'
        }
      })
        .then(result => {
          this.lesson = result.data.lesson
          this.changeStatus(-1)
        })
        .catch(err => {
          this.$Message.error(err.message)
        })
    },
    changeStatus (value) {
      if (value === -1) {
        this.lessonShow = this.lesson
      } else {
        this.lessonShow = this.lesson.filter(item => item.onsale === value)
      }
      this.spinShow = false
    },
    delCourse (id) {
      this.$Modal.confirm({
        title: '温馨提示',
        content: `您确认删除该课程吗？`,
        onOk: () => {
          this.$ajax(this, {
            data: {
              op: 'c40303',
              id: id
            }
          })
            .then(result => {
              this.$Message.success('删除成功')
              this.getCourse()
            })
            .catch(err => {
              this.$Message.error(err.message)
            })
        },
        onCancel: () => { }
      })
    },
    upOrDownCourse (onsale, id) {
      this.$Modal.confirm({
        title: '温馨提示',
        content: `您确认${onsale === 0 ? '下架' : '上架'}该课程吗？`,
        onOk: () => {
          this.$ajax(this, {
            data: {
              op: 'c40304',
              id,
              onsale
            }
          })
            .then(result => {
              this.$Message.success(`${onsale === 0 ? '下架' : '上架'}成功`)
              this.getCourse()
            })
            .catch(err => {
              this.$Message.error(err.message)
            })
        },
        onCancel: () => { }
      })
    },
    goToEditCourse (info) {
      this.$router.push({
        path: 'editCourse'
      })
      sessionStorage.setItem('courseInfo', info ? JSON.stringify(info) : {})
    },
    getLocalTime (second) {
      var date = new Date(parseInt(second) * 1000) // 时间戳为10位(到秒)需*1000，时间戳为13位（到毫秒）的话不需乘1000
      var d =
        date.getFullYear() +
        '-' +
        (date.getMonth() + 1 < 10
          ? '0' + (date.getMonth() + 1)
          : date.getMonth() + 1) +
        '-' +
        (date.getDate() < 10 ? '0' + date.getDate() : date.getDate()) +
        ' ' +
        (date.getHours() < 10 ? '0' + date.getHours() : date.getHours()) +
        ':' +
        (date.getMinutes() < 10 ? '0' + date.getMinutes() : date.getMinutes())
      return d
    }
  }
}
</script>
<style lang="stylus" scoped>
#course
  position relative
  .content
    padding 14px 0
    border-top 1px solid #bcbcbc
    .title
      color #666666
      margin-right 10px
    ._list
      border-top 1px solid #bcbcbc
      margin-top 15px
  .lesson_li
    width 100%
    margin-top 20px
    ._content1
      display flex
      padding-bottom 16px
      border-bottom 1px solid #dcdee2
      ._icon
        max-width 70px
        max-height 70px
        flex 1
      .shengnue
        overflow hidden
        text-overflow ellipsis
        display -webkit-box
        -webkit-line-clamp 2
        overflow hidden
        -webkit-box-orient vertical
    ._content2
      display flex
      padding 16px 16px 0 16px
      font-size 16px
</style>
