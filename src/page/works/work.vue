<template>
  <div>
    <h1 class="page_head_h1">
      <Breadcrumb>
        <BreadcrumbItem to="/menu/works">作品列表</BreadcrumbItem>
        <BreadcrumbItem>评分详情</BreadcrumbItem>
      </Breadcrumb>
    </h1>
    <div style="background:rgba(50, 50, 50, 1);font-size: 16px;padding:20px;border-radius:5px;">
      <div style="font-family: '宋体 Bold', '宋体 常规', '宋体';
          font-weight: 700;
          font-style: normal;
          color: #FF9900;"><span v-if="curTypeInfo.c1name">{{curTypeInfo.c1name}}</span><span v-if="curTypeInfo.c2name">&nbsp;- {{curTypeInfo.c2name}}</span><span v-if="curTypeInfo.c3name">&nbsp;- {{curTypeInfo.c3name}}</span><span v-if="curTypeInfo.c4name">&nbsp;- {{curTypeInfo.c4name}}</span></div>
      <div style="margin-top:20px;color:white;">已评分/任务数量 ：<span style="color:#FFFF00;">{{curTypeInfo.taskfinish}} / {{curTypeInfo.taskall}}</span> </div>
    </div>
    <div style="margin-top:20px;position:relative;">
      <Spin
        size="large"
        fix
        v-if="spinShow"
      ></Spin>
      <Table
        border
        :columns="columns"
        :data="workShowList"
        @on-sort-change="handleSortChange"
      ></Table>
      <Page
        style="float:right;margin-tight:30px;margin-top:20px;"
        show-total
        @on-change="changePage"
        :current="pageNum"
        :page-size="pageSize"
        :total="workList.length"
      />
    </div>
  </div>
</template>

<script>
import { getMatchid } from '../../config/common'
export default {
  name: 'editWork',
  data () {
    return {
      workList: [],
      workListOrigin: [],
      workShowList: [],
      pageNum: 1,
      pageSize: 10,
      curTypeInfo: JSON.parse(localStorage.getItem('typeIdsInfo')),
      columns: [
        {
          title: '编号',
          width: 200,
          align: 'center',
          key: 'id',
          render: (h, params) => {
            return h('span', {}, `No.${params.row.id}`)
          }
        },
        {
          title: '作品名称',
          align: 'center',
          key: 'namechs'
        },
        {
          title: '评分',
          align: 'center',
          key: 'sort',
          'sortable': 'custom',
          render: (h, params) => {
            return h('span', {}, params.row.sort)
          }
        },
        {
          title: '操作',
          key: 'handel',
          align: 'center',
          render: (h, params) => {
            return h('div', [
              h('a', {
                attrs: {
                  class: 'blue-btn'
                },
                on: {
                  click: () => {
                    this.preview(params.row)
                  }
                }
              }, '评分')
            ])
          }
        }
      ],
      spinShow: true,
      scorebegin: '',
      editScorebeginTime: '',
      scorebeginPicker: '',
      scoreend: '',
      editScoreendTime: '',
      scoreendPicker: '',
      isEditJudge: false
    }
  },
  async created () {
    this.getWorkLists()
    this.getMatchTime()
  },
  methods: {
    // 获取某个分类评委负责的作品列表(c30202)
    getWorkLists () {
      this.spinShow = true
      this.$ajax(this, {
        data: {
          op: 'c30202',
          c1: this.curTypeInfo.c1,
          c2: this.curTypeInfo.c2,
          c3: this.curTypeInfo.c3,
          c4: this.curTypeInfo.c4
        }
      })
        .then(res => {
          this.workList = res.data
          this.workList.map(item => {
            item.s1 = item.s1 || 0
            item.s2 = item.s2 || 0
            item.s3 = item.s3 || 0
            item.s4 = item.s4 || 0
            item.s5 = item.s5 || 0
            item.s6 = item.s6 || 0
            item.s7 = item.s7 || 0
            item.s8 = item.s8 || 0
            item.s9 = item.s9 || 0
            item.s10 = item.s10 || 0
            item.sort = item.s1 + item.s2 + item.s3 + item.s4 + item.s5 + item.s6 + item.s7 + item.s8 + item.s8 + item.s9 + item.s10
          })
          this.workListOrigin = [...this.workList]
          this.changePage(1)
          this.spinShow = false
        })
        .catch(err => {
          this.spinShow = false
          this.$Message.error(err.message)
        })
    },
    changePage (val) {
      this.pageNum = val
      this.workShowList = this.workList.slice((this.pageNum - 1) * this.pageSize, this.pageNum * this.pageSize)
    },
    handleSortChange ({ key, order }) {
      // 降序
      let newList = JSON.parse(JSON.stringify(this.workList))
      if (order === 'desc') {
        newList.sort((v1, v2) => {
          return v2[key] - v1[key]
        })
        this.workList = [...newList]
      } else if (order === 'asc') {
        // 升序
        newList.sort((v1, v2) => {
          return v1[key] - v2[key]
        })
        this.workList = [...newList]
      } else {
        this.workList = [...this.workListOrigin]
      }
      this.changePage(1)
    },
    preview (info) {
      let url = this.$router.resolve({
        path: '/pre',
        query: { id: info.id }
      })
      window.open(url.href, '_blank')
    },
    // 获取评分开始结束时间
    getMatchTime () {
      this.$ajax(this, {
        data: {
          op: 'y20205',
          matchid: getMatchid()
        }
      })
        .then(res => {
          if (res.data) {
            let now = new Date().getTime()
            if (res.data.scoreend * 1000 > now && now > res.data.scorebegin * 1000) {
              this.isEditJudge = true
            } else {
              this.isEditJudge = false
            }
          }
        })
        .catch(err => {
          this.$Message.error(err.message)
        })
    }
  }
}
</script>

<style>
.disableds {
  pointer-events: none;
  cursor: not-allowed;
  opacity: 0.4;
}
</style>
