<template>
  <div
    id="loginOrRegister"
    :style="{ backgroundImage: 'url(' + logoBg + ')' }"
    style="width: 100%;height: 100%;float:left;"
  >
    <div class="login_box">
      <div style="text-align: center;font-size:24px;margin-bottom:30px;">
        2021REARD评选系统
      </div>
      <Form
        style="text-align: center;"
        ref="formInline"
        :model="formInline"
        :rules="ruleInline"
        inline
      >
        <div>
          <FormItem prop="user">
            <i-input
              type="text"
              v-model="formInline.user"
              placeholder="Username"
            >
              <Icon
                type="ios-person-outline"
                style="font-size:20px;"
                slot="prepend"
              ></Icon>
            </i-input>
          </FormItem>
        </div>
        <div>
          <FormItem prop="password">
            <i-input
              type="password"
              v-model="formInline.password"
              placeholder="Password"
            >
              <Icon
                type="ios-lock-outline"
                style="font-size:20px;"
                slot="prepend"
              ></Icon>
            </i-input>
          </FormItem>
        </div>
        <div style="margin-top:10px;">
          <FormItem>
            <Button
              type="primary"
              long
              @click="handleSubmit('formInline')"
            >登录</Button>
          </FormItem>
        </div>
      </Form>
    </div>
  </div>
</template>
<script>
// eslint-disable-next-line camelcase
import { hex_md5 } from '@/config/md5.js'
export default {
  data () {
    return {
      formInline: {
        user: '',
        password: ''
      },
      logoBg: require('./common/img/logo_bg.jpg'),
      ruleInline: {
        user: [{ required: true, message: '请输入账号', trigger: 'blur' }],
        password: [{ required: true, message: '请输入密码.', trigger: 'blur' }]
      }
    }
  },
  computed: {},
  created () { },
  methods: {
    handleSubmit (name) {
      this.$ajax(this, {
        data: {
          op: 'p10101',
          account: this.formInline.user,
          passwd: hex_md5(this.formInline.password)
        }
      })
        .then(result => {
          console.log(result)
          if (result.result === 0) {
            this.$Message.success('登录成功!')
            sessionStorage.setItem('matchid', result.data.matchid)
            this.$router.push({
              path: 'menu'
            })
          } else {
            this.$Message.error('请输入正确的账号密码!')
          }
        })
        .catch(err => {
          console.log(err)
        })
    }
  }
}
</script>
<style>
#loginOrRegister {
  box-sizing: border-box;
  background: #fff;
  background-repeat: no-repeat;
  background-attachment: fixed;
  background-position: center;
  height: 100%;
  width: 100%;
  background-size: cover;
  position: relative;
}
.login_box {
  width: 400px;
  height: 340px;
  padding: 30px;
  position: absolute;
  left: 56%;
  top: 70%;
  transform: translate(-50%, -50%);
  background: rgba(255, 255, 255, 0.7);
}
#loginOrRegister .ivu-btn-primary {
  padding: 5px 80px;
}
.login_box .ivu-input-group {
  width: 240px;
}
.login_box .ivu-form-inline .ivu-form-item {
  width: 240px;
}
</style>
