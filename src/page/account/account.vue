<template>
  <div>
    <div style="padding:10px;font-size:18px;background:#323232;color:white;">修改登录密码</div>
    <Card class="account">
      <!-- <h1 class="page_head_h1">修改登录密码</h1> -->
      <ul>
        <li><span>旧密码：</span><Input
            v-model="oldPassword"
            placeholder="请输入旧密码"
            style="width: 200px;margin-right:30px;"
          /></li>
        <li><span>新密码：</span><Input
            v-model="newPassword"
            placeholder="请输入新密码"
            style="width: 200px;margin-right:30px;"
          /></li>
        <li><span>确认新密码：</span><Input
            @on-blur="confirmBtn"
            v-model="confirmPassword"
            placeholder="请输入新密码"
            style="width: 200px;margin-right:30px;"
          /></li>
      </ul>
      <Button
        @click="editOk"
        type="error"
      >确认修改</Button>
      <!-- <div style="margin-top:30px;"><Button
        @click="loginout"
        type="primary"
      >退出账号</Button></div> -->
    </Card>
  </div>
</template>
<script>
import { hex_md5 } from '@/config/md5.js'
import { getMatchid } from '../../config/common'
export default {
  data () {
    return {
      oldPassword: '',
      newPassword: '',
      confirmPassword: ''
    }
  },
  computed: {},
  methods: {
    confirmBtn () {
      if (this.confirmPassword.length > 0 && this.confirmPassword !== this.newPassword) {
        return this.$Message.error('输入的密码与新密码不一样，请检查')
      }
    },
    editOk () {
      console.log(this.confirmPassword)
      if (this.confirmPassword.trim().length === 0) {
        return this.$Message.error('请确认新密码')
      }
      if (this.confirmPassword !== this.newPassword) {
        return this.$Message.error('输入的密码与新密码不一样，请检查')
      }
      this.$ajax(this, {
        data: {
          op: 'p10303',
          matchid: getMatchid(),
          oldpasswd: hex_md5(this.oldPassword),
          newpasswd: hex_md5(this.confirmPassword)
        }
      })
        .then(result => {
          this.$Message.success('修改密码成功')
        })
        .catch(err => {
          this.$Message.error(err.message)
        })
    },
    loginout () {
      this.$ajax(this, {
        data: {
          op: 'c40103'
        }
      })
        .then(result => {
          this.$router.push({ path: '/login' })
        })
        .catch(err => {
          this.$Message.error(err.message)
        })
    }
  }
}
</script>
<style scoped>
.account ul {
  margin: 30px 0;
}
.account ul li {
  margin-top: 20px;
}
.account ul li span {
  text-align: right;
  width: 100px;
}
</style>
