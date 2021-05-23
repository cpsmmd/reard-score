<template>
  <div>
    <div style="display:flex;">
      <div class="head_flex">
        <div class="_content">
          <div class="_title">{{this.matchInfo.postendtime?getLocalTime(this.matchInfo.postendtime):''}}</div>
          <div class="_text">评分起始时间</div>
        </div>
        <div class="_img"><img src="../../assets/time.png"></div>
      </div>
      <div class="head_flex">
        <div class="_content">
          <div class="_title">{{this.list.length}}</div>
          <div class="_text">负责评分作品总数</div>
        </div>
        <div class="_img"><img src="../../assets/over.png"></div>
      </div>
      <div class="head_flex">
        <div class="_content">
          <div class="_title">{{this.list.length - this.completeNum}}</div>
          <div class="_text">已评分作品数量</div>
        </div>
        <div class="_img"><img src="../../assets/edit.png"></div>
      </div>
    </div>
    <Card style="margin:20px 0;">
      <h3>使用说明：</h3>
      <div style="margin:16px 0 10px 10px;">* 到达评分开始时间时，作品才会被平均分配到评委，在这之前作品不会被分配。</div>
      <div style="margin-left:10px;">* 评分一旦开始，将不能新增或删除评委</div>
    </Card>
    <div style="position:relative;">
      <Spin
        size="large"
        fix
        v-if="spinShow"
      ></Spin>
      <div
        v-if="list.length > 0"
        style="margin-top:30px;"
      >
        <Card
          v-for="item in list"
          :key="item.id"
          style="margin-bottom: 10px;border-left:5px solid #323232;"
        >
          <div
            class="box"
            style="min-height:60px;"
          >
            <div class="content_left">
              <div style="color:black;font-size:18px;"><span v-if="item.c1name">{{item.c1name}}</span><span v-if="item.c2name">&nbsp;- {{item.c2name}}</span><span v-if="item.c3name">&nbsp;- {{item.c3name}}</span><span v-if="item.c4name">&nbsp;- {{item.c4name}}</span></div>
              <div style="margin-top:20px;">已评分/任务数量 ：{{item.taskall}} / {{item.taskfinish}}</div>
            </div>
            <div class="content_right">
              <div>
                <Button
                  @click="jump(item)"
                  type="primary"
                  class="reard_btn_b"
                  style="width:100px;height:80px;font-size:18px;"
                >开始评分</Button>
              </div>
            </div>
          </div>
        </Card>
        <Page
          style="float:right;margin-tight:30px;margin-top:20px;margin-bottom:100px;"
          show-total
          @on-change="changePage"
          :current="pageNum"
          :page-size="pageSize"
          :total="list.length"
        />
      </div>
      <div
        v-else
        style="text-align:center;margin-top:100px;"
      >
        <svg
          t="1612617691008"
          class="icon"
          viewBox="0 0 1024 1024"
          version="1.1"
          xmlns="http://www.w3.org/2000/svg"
          p-id="9902"
          width="200"
          height="200"
        >
          <path
            d="M743.68 176.61952h-448l-220.16 240.52736v345.6c0 56.54528 45.85472 102.4 102.4 102.4h683.52c56.54528 0 102.4-45.85472 102.4-102.4v-345.6l-220.16-240.52736z m-416.43008 71.68h384.8704l176.52736 192.8704h-193.87392c0 0.28672 0.04096 0.57344 0.04096 0.84992 0 94.57664-76.94336 171.52-171.52 171.52-94.5664 0-171.52-76.94336-171.52-171.52 0-0.27648 0.04096-0.5632 0.0512-0.84992h-201.12384l176.54784-192.8704z m534.19008 545.16736h-683.52c-16.93696 0-30.72-13.78304-30.72-30.72v-249.89696h143.4112c30.33088 99.75808 123.02336 172.36992 232.69376 172.36992 109.68064 0 202.36288-72.61184 232.69376-172.36992h136.17152v249.89696a30.7712 30.7712 0 0 1-30.73024 30.72z"
            fill="#cdcdcd"
            p-id="9903"
          ></path>
        </svg>
        <div>暂无数据</div>
      </div>
    </div>
  </div>
</template>

<script>
import { getMatchid, getLocalTime } from "../../config/common"
export default {
  name: 'list',
  data () {
    return {
      list: [{}],
      showLists: [],
      pageNum: 1,
      pageSize: 6,
      completeNum: 0,
      matchInfo: {},
      accountInfo: {},
      isOverTime: false,
      c1Lists: [],
      c1Value: 0,
      c2Lists: [],
      c2List: [],
      c2Value: 0,
      c3Lists: [],
      c3List: [],
      c3Value: 0,
      c4Lists: [],
      c4List: [],
      c4Value: 0,
      spinShow: true,
      // 删除
      modalDel: {
        show: false,
        value: 0,
      },
    }
  },
  async created () {
    await this.getlevelC4()
    await this.getlevelC3()
    await this.getlevelC2()
    await this.getlevelC1()
    this.getWorkList()
    // this.getProcessInfo()
    // this.getAccount()
  },
  methods: {
    // 获取评分的工作进度
    getProcessInfo () {
      this.$ajax(this, {
        data: {
          op: 'c30207',
          c1: 0,
          c2: 0,
          c3: 0,
          c4: 0,
        }
      })
        .then(res => {
          // console.log(res)
        })
        .catch(err => {
          this.$Message.error(err.message)
        })
    },
    // 获取负责的作品分类(c30201)
    getWorkList () {
      this.spinShow = true
      this.$ajax(this, {
        data: {
          op: 'c30201'
        }
      })
        .then(async res => {
          console.log(res)
          let newList = res.data || []
          newList.map(item => {
            let c1Name = this.c1Lists.find(v => v.c1 === item.c1) ? this.c1Lists.find(v => v.c1 === item.c1).name : ''
            let c2Name = this.c2Lists.find(v => v.c2 === item.c2) ? this.c2Lists.find(v => v.c2 === item.c2).name : ''
            let c3Name = this.c3Lists.find(v => v.c3 === item.c3) ? this.c3Lists.find(v => v.c3 === item.c3).name : ''
            let c4Name = this.c4Lists.find(v => v.c4 === item.c4) ? this.c4Lists.find(v => v.c4 === item.c4).name : ''
            item.c1name = c1Name
            item.c2name = c2Name
            item.c3name = c3Name
            item.c4name = c4Name
            let str = c1Name
            if (c2Name) {
              str = str + c2Name
            }
            if (c3Name) {
              str = str + c3Name
            }
            if (c4Name) {
              str = str + c4Name
            }
            item.name = str
          })
          let queue = []
          newList.map(async item => {
            queue.push(this.getTypeProcess(item))
          })
          let processList = await Promise.all(queue)
          console.log(processList)
          newList.map(item => {
            let info = processList.find(v => v.c1 === item.c1 && v.c2 === item.c2 && v.c3 === item.c3 && v.c4 === item.c4)
            item.taskall = info.taskall
            item.taskfinish = info.taskfinish
          })
          this.list = [...newList]
          this.spinShow = false
          // this.changePage(1)
          // this.completeNum = this.list.filter(v => v.completion === 1).length
        })
        .catch(err => {
          this.$Message.error(err.message)
        })
    },
    // 获取分类进度
    getTypeProcess (info) {
      return new Promise(resolve => {
        this.$ajax(this, {
          data: {
            op: 'c30207',
            c1: info.c1,
            c2: info.c2,
            c3: info.c3,
            c4: info.c4,
          }
        }).then(result => {
          let list = result.data || {}
          list.c1 = info.c1
          list.c2 = info.c2
          list.c3 = info.c3
          list.c4 = info.c4
          resolve(list)
        })
          .catch(err => {
            this.$Message.error(err.message)
          })
      })
    },
    changePage (val) {
      this.pageNum = val
      this.showLists = this.list.slice((this.pageNum - 1) * this.pageSize, this.pageNum * this.pageSize)
    },
    editWork (item) {
      // 判断时间是否过期
      let now = new Date().getTime() / 1000
      if (now > this.matchInfo.postendtime) {
        return this.$Message.error('当前已经超过提交作品最晚时间，无法创建！')
      }
      if (item !== 'add') {
        this.$router.push({
          path: 'editWork',
          query: {
            id: item.id
          }
        })
      } else {
        if (this.list.length > this.accountInfo.postmax || this.list.length === this.accountInfo.postmax) {
          return this.$Message.error('作品数量超过上限，无法创建！')
        }
        this.$router.push({
          path: 'editWork'
        })
      }
    },
    delBtn (item) {
      this.modalDel.value = item.id
      this.modalDel.show = true
    },
    delWork () {
      this.$ajax(this, {
        data: {
          op: 'p10409',
          id: this.modalDel.value
        }
      })
        .then(result => {
          this.$Message.success('删除成功！')
          this.modalDel.show = false
          this.getWorkList()
        })
        .catch(err => {
          this.$Message.error(err.message)
        })
    },
    preview (info) {
      let url = this.$router.resolve({
        path: '/pre',
        query: { id: info.id }
      })
      window.open(url.href, '_blank');
    },
    jump (info) {
      console.log(info)
      localStorage.setItem('typeIdsInfo', JSON.stringify(info))
      this.$router.push({
        path: 'editWork',
      })
    },
    getLocalTime (second) {
      let date = new Date(parseInt(second) * 1000) // 时间戳为10位(到秒)需*1000，时间戳为13位（到毫秒）的话不需乘1000
      let d = `${date.getFullYear()}-${(date.getMonth() + 1).toString().padStart(2, '0')}-${date.getDate().toString().padStart(2, '0')} ${date.getHours().toString().padStart(2, '0')}:${date.getMinutes().toString().padStart(2, '0')}:${date.getSeconds().toString().padStart(2, '0')}`
      return d
    },
    // 获取账号信息
    getAccount () {
      this.isEdit = false
      this.$ajax(this, {
        data: {
          op: 'p10301',
        }
      })
        .then(res => {
          this.accountInfo = res.data
        })
        .catch(err => {
          this.$Message.error(err.message)
        })
    },
    // 获取一级分类
    getlevelC1 () {
      return new Promise(resolve => {
        this.$ajax(this, {
          data: {
            op: 'p10401',
            matchid: getMatchid()
          }
        })
          .then(res => {
            this.c1Lists = res.data.menu
            this.c1mLists = JSON.parse(JSON.stringify(res.data.menu))
            this.c1Lists.unshift({
              c1: 0,
              matchid: 1,
              name: "全部",
              remark: "",
            })
            this.c1Value = this.c1Lists[0].c1
            this.c1mValue = this.c1mLists[0].c1
            resolve('ok')
          })
      })
    },
    getlevelC2 () {
      return new Promise(resolve => {
        this.$ajax(this, {
          data: {
            op: 'p10402',
            matchid: getMatchid()
          }
        })
          .then(res => {
            this.c2Lists = res.data.menu
            this.c2mLists = JSON.parse(JSON.stringify(res.data.menu))
            this.c2Lists.unshift({
              c2: 0,
              matchid: 1,
              name: "全部",
              remark: "",
            })
            resolve('ok')
          })
      })
    },
    getlevelC3 () {
      return new Promise(resolve => {
        this.$ajax(this, {
          data: {
            op: 'p10403',
            matchid: getMatchid()
          }
        })
          .then(res => {
            this.c3Lists = res.data.menu
            this.c3mLists = JSON.parse(JSON.stringify(res.data.menu))
            resolve('ok')
          })
      })
    },
    getlevelC4 () {
      return new Promise(resolve => {
        this.$ajax(this, {
          data: {
            op: 'p10411',
            matchid: getMatchid()
          }
        })
          .then(res => {
            this.c4Lists = res.data.menu
            this.c4mLists = JSON.parse(JSON.stringify(res.data.menu))
            resolve('ok')
          })
      })
    }
  }
}
</script>
<style scoped>
.box {
  display: flex;
  flex-wrap: nowrap;
}
.content_left {
  flex: 1;
}
.content_right {
  margin-left: auto;
  min-width: 100px;
}
.work_status {
  margin-top: 6px;
  margin-bottom: 30px;
}
.head_flex {
  width: calc(33.3% - 14px);
  height: 110px;
  border-radius: 10px;
  margin-right: 20px;
  color: white;
  display: flex;
  min-width: 260px;
  padding: 20px;
  background: #323232;
}
.head_flex ._img {
  width: 45px;
  height: 45px;
  margin-left: auto;
}
.head_flex ._content {
  width: 200px;
  font-size: 18px;
}
.head_flex ._content ._title {
  font-size: 20px;
  margin-top: 6px;
}
.head_flex ._content ._text {
  font-size: 14px;
  margin-top: 20px;
}
.head_flex ._img img {
  width: 100%;
  display: inline-block;
  margin-top: 30px;
}
</style>

