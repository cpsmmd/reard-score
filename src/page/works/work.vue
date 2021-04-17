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
          color: #FF9900;">居住 - 建筑规划 - 建成</div>
      <div style="margin-top:20px;color:white;">已评分/任务数量 ：<span style="color:#FFFF00;">17 / 43</span> </div>
    </div>
    <div style="margin-top:20px;">
      <Table
        border
        :columns="columns"
        :data="workShowList"
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
      workShowList: [],
      pageNum: 1,
      pageSize: 10,
      columns: [
        {
          title: '编号',
          width: 200,
          align: 'center',
          key: 'id'
        },
        {
          title: '项目名称',
          align: 'center',
          key: 'namechs'
        },
        {
          title: '上传账号',
          align: 'center',
          key: 'account'
        },
        {
          title: '提交时间',
          align: 'center',
          key: 'sceneNames',
          render: (h, params) => {
            let str = getLocalTime(params.row.modifytime)
            return h('span', {}, str)
          }
        },
        {
          title: '完整度',
          align: 'center',
          key: 'completion',
          render: (h, params) => {
            return h('div', [
              h('Tag', {
                props: {
                  color: params.row.completion === 1 ? 'green' : 'volcano'
                },
              }, params.row.completion === 1 ? '成功提交' : '资料不完整'),
            ]);
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
              }, '预览')
            ])
          }
        }
      ],
    }
  },
  async created () {
  },
  methods: {
    changePage (val) {
      this.pageNum = val
      this.workShowList = this.workList.slice((this.pageNum - 1) * this.pageSize, this.pageNum * this.pageSize)
    },

  },
}
</script>

<style  scoped>
</style>