
<template>
  <!-- eslint-disable vue/no-parsing-error -->
  <div class="layout">
    <Layout>
      <Sider
        breakpoint="md"
        collapsible
        :collapsed-width="78"
        v-model="isCollapsed"
        style="width:280px;min-width: 260px;"
      >
        <div style="color:white;padding:17px 0px 17px 20px;font-size:20px;background:rgba(51, 153, 51, 1);margin-bottom:30px;">REARD 评委评分系统</div>
        <Menu
          :active-name="activeName"
          :open-names="activeOpen"
          theme="dark"
          width="auto"
          :class="menuitemClasses"
          ref="mainMenu"
        >
          <!-- <MenuItem
            to="customer"
            name="customer"
          >
          <Icon
            style="vertical-align: text-bottom;"
            type="ios-contact"
          />
          <span>基础信息</span>
          </MenuItem> -->
          <MenuItem
            to="works"
            name="works"
          >
          <Icon
            style="vertical-align: text-bottom;"
            type="ios-keypad"
          ></Icon>
          <span>作品列表</span>
          </MenuItem>
          <MenuItem
            to="account"
            name="account"
          >
          <Icon
            style="vertical-align: text-bottom;"
            type="md-cog"
          />
          <span>账号设置</span>
          </MenuItem>
        </Menu>
        <div style="color:white;flex-direction: column;font-size:40px;height:calc(100% - 230px);display:flex;align-items: center;justify-content:center;">
          <img
            style="width:88px;height:auto;"
            src="../assets/menu_logo.png"
          >
          <div>2021</div>
        </div>
        <div slot="trigger"></div>
      </Sider>
      <Layout>
        <Header class="layout-header-bar">
          <Tooltip
            style="float: right;"
            content="退出登录"
          >
            <Icon
              @click="loginout"
              style="color:white;font-size:30px;"
              type="md-log-out"
            />
            <!-- <img
              @click="loginout"
              src="../assets/out.png"
              alt=""
              style="width:40px;margin-top:12px;"
            > -->
          </Tooltip>
        </Header>
        <Content :style="{ padding: '30px',overflow: 'auto', background: 'rgb(242, 242, 242)', minHeight: '220px' }">
          <router-view></router-view>
        </Content>
      </Layout>
    </Layout>
  </div>
</template>
<script>
export default {
  data () {
    return {
      isCollapsed: false,
      activeName: 'wxFiratPage',
      activeOpen: ['1']
    }
  },
  computed: {
    menuitemClasses: function () {
      return ['menu-item', this.isCollapsed ? 'collapsed-menu' : '']
    }
  },
  mounted () {
    this.getMenuActive()
  },
  methods: {
    // 退出登录
    loginout () {
      sessionStorage.clear()
      this.$router.push({
        path: 'login'
      })
      this.$ajax(this, {
        data: {
          op: 'p10102'
        }
      })
        .then(result => {
          if (result.result === 0) {
            this.$Message.success('退出成功!')
            sessionStorage.clear()
            this.$router.push({
              path: 'login'
            })
          }
        })
        .catch(err => {
          console.log(err)
        })
    },
    getMenuActive () {
      let path = this.$route.path.slice(6, this.$route.path.length)
      this.activeName = path
      if (path === 'editWork') {
        this.activeName = 'works'
      }
      if (path === 'editH5Page') {
        this.activeName = 'h5Page'
      }
      if (path === 'editPage') {
        this.activeName = 'page'
      }
      // 1 先折叠一级菜单
      this.$refs.mainMenu.$children.forEach(item => {
        item.opened = false
      })
      if (path !== 'account') {
        // 2 对应路由（二级菜单）高亮 打开当前一级菜单
        this.$nextTick(function () {
          this.$refs.mainMenu.updateActiveName()
          this.$refs.mainMenu.updateOpened()
        })
        if (path === 'wxFiratPage' || path === 'QrCode') {
          this.activeOpen = ['1']
        } else if (
          path === 'CourseManage' ||
          path === 'QrCodeShare' ||
          path === 'editCourse'
        ) {
          this.activeOpen = ['2']
        } else if (
          path === 'h5Page' ||
          path === 'editH5Page' ||
          path === 'page' ||
          path === 'editPage'
        ) {
          this.activeOpen = ['3']
        }
      }
    }
  },
  watch: {
    $route (to, from) {
      this.getMenuActive()
    }
  }
}
</script>
<style scoped>
.layout {
  position: relative;
  border-radius: 4px;
  overflow: hidden;
  height: 100%;
  margin: -1px;
}
.ivu-layout {
  background: white;
}
/* .layout-header-bar {
  display: none;
} */
.menu-item span {
  display: inline-block;
  overflow: hidden;
  width: 69px;
  text-overflow: ellipsis;
  white-space: nowrap;
  vertical-align: bottom;
  transition: width 0.2s ease 0.2s;
}
.menu-item i {
  transform: translateX(0px);
  transition: font-size 0.2s ease, transform 0.2s ease;
  vertical-align: middle;
  font-size: 16px;
}
.collapsed-menu span {
  width: 0px;
  transition: width 0.2s ease;
}
.collapsed-menu i {
  transform: translateX(5px);
  transition: font-size 0.2s ease 0.2s, transform 0.2s ease 0.2s;
  vertical-align: middle;
  font-size: 22px;
}
.ivu-layout.ivu-layout-has-sider {
  height: 100%;
}
.ivu-menu-dark.ivu-menu-vertical .ivu-menu-item-active:not(.ivu-menu-submenu),
.ivu-menu-dark.ivu-menu-vertical
  .ivu-menu-submenu-title-active:not(.ivu-menu-submenu) {
  color: rgba(51, 153, 51, 1);
}
.ivu-menu-dark.ivu-menu-vertical .ivu-menu-item-active:not(.ivu-menu-submenu),
.ivu-menu-dark.ivu-menu-vertical
  .ivu-menu-item-active:not(.ivu-menu-submenu):hover,
.ivu-menu-dark.ivu-menu-vertical
  .ivu-menu-submenu-title-active:not(.ivu-menu-submenu),
.ivu-menu-dark.ivu-menu-vertical
  .ivu-menu-submenu-title-active:not(.ivu-menu-submenu):hover {
  background: rgb(242, 242, 242);
  text-align: center;
  color: rgba(51, 153, 51, 1);
}
.ivu-menu-dark.ivu-menu-vertical .ivu-menu-item,
.ivu-menu-dark.ivu-menu-vertical .ivu-menu-submenu-title {
  text-align: center;
  font-size: 16px;
}
</style>
<style>
.ivu-modal-header p,
.ivu-modal-header-inner {
  font-size: 18px;
}
.ivu-menu-dark {
  background: #323232;
}
.ivu-layout-sider {
  background: #323232;
}
.ivu-layout-header {
  background: rgba(51, 153, 51, 1);
}
.ivu-menu-dark.ivu-menu-vertical:hover .ivu-menu-item:hover,
.ivu-menu-dark.ivu-menu-vertical:hover .ivu-menu-submenu-title:hover {
  background: #323232;
}
</style>
