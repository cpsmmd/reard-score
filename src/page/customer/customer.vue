<template>
  <div>
    <div style="padding:10px;font-size:18px;background:#323232;color:white;">比赛通知</div>
    <Card style="margin-bottom:20px;">
      <div
        v-html="matchInfo.notice"
        class="customer_Ul"
        style="line-height:60px;font-size:18px;padding:10px;"
      >
        <!-- <img
          src="../../images/notice.png"
          alt=""
          style="width:30px;margin:16px;float:left;"
        >{{matchInfo.notice}} -->
      </div>
    </Card>
    <div style="padding:10px;font-size:18px;background:#323232;color:white;">客户信息</div>
    <Card>
      <div v-if="!isEdit">
        <Form
          :model="accountInfo"
          :label-width="120"
        >
          <FormItem
            label="公司名称："
            prop="name"
          >
            {{accountInfo.name || '-'}}
          </FormItem>
          <FormItem
            prop="logo"
            label="公司LOGO："
          >
            <img
              v-if="accountInfo.logo"
              style="max-width:160px;"
              :src="accountInfo.logo"
            />
            <span v-else>-</span>
          </FormItem>
          <FormItem label="公司网址：">
            {{accountInfo.homepage || '-'}}
          </FormItem>
          <FormItem
            prop="intro"
            label="简介："
          >
            {{accountInfo.intro || '-'}}
          </FormItem>
          <FormItem
            prop="intro"
            label="创建作品上限："
          >
            <span>{{accountInfo.postmax}}</span>
          </FormItem>
          <FormItem label="公众号二维码：">
            <img
              style="max-width:160px;"
              v-if="accountInfo.gongzhonghao"
              :src="accountInfo.gongzhonghao"
              alt="无"
              srcset=""
            >
            <span v-else>-</span>
          </FormItem>
          <Divider />
          <FormItem>
            <Button
              @click="isEdit = true"
              type="error"
            >编辑</Button>
          </FormItem>
        </Form>
      </div>
      <div
        style="width:600px;font-size:16px;"
        v-else
      >
        <Form
          :model="accountInfo"
          :label-width="120"
          ref="formValidate"
          :rules="ruleValidate"
        >
          <FormItem
            label="公司名称："
            prop="name"
          >
            <i-input
              v-model="accountInfo.name"
              placeholder="请输入公司名称"
            ></i-input>
            <span class="remark_info">
              <Icon type="ios-information-circle-outline" /> 用于对外宣传，建议填写宣传名
            </span>
          </FormItem>
          <FormItem
            prop="logo"
            label="公司LOGO："
          >
            <div style="display:flex;align-items: center;">
              <img
                v-if="accountInfo.logo"
                :src="accountInfo.logo"
                style="max-width:160px;"
              />
              <div style="margin-left:20px;">
                <Upload
                  multiple
                  :before-upload="inputFilter1"
                  action="//jsonplaceholder.typicode.com/posts/"
                >
                  <Button
                    type="primary"
                    icon="ios-cloud-upload-outline"
                    class="reard_btn_b"
                  >{{
              accountInfo.logo ? "更新LOGO" : "上传LOGO"
            }}</Button>
                </Upload>
                <span class="remark_info">
                  <Icon type="ios-information-circle-outline" /> 300DPI,100KB以上
                </span>
              </div>
            </div>
          </FormItem>
          <FormItem label="公司网址：">
            <i-input
              v-model="accountInfo.homepage"
              placeholder="请输入公司网址"
            ></i-input>
          </FormItem>
          <FormItem
            prop="intro"
            label="简介："
          >
            <i-input
              type="textarea"
              v-model="accountInfo.intro"
              placeholder="请输入公司简介"
            ></i-input>
            <span class="remark_info">
              <Icon type="ios-information-circle-outline" /> 200字以内
            </span>
          </FormItem>
          <FormItem
            prop="postmax"
            label="创建作品上限："
          >
            <i-input
              disabled
              v-model="accountInfo.postmax"
              placeholder="创建作品上限"
            ></i-input>
          </FormItem>
          <FormItem label="公众号二维码：">
            <div style="display:flex;align-items: center;">
              <img
                v-if="accountInfo.gongzhonghao"
                :src="accountInfo.gongzhonghao"
                style="max-width:160px;"
              />
              <div style="margin-left:20px;">
                <Upload
                  multiple
                  :before-upload="inputFilter2"
                  action="//jsonplaceholder.typicode.com/posts/"
                >
                  <Button
                    type="primary"
                    class="reard_btn_b"
                    icon="ios-cloud-upload-outline"
                  >{{
              accountInfo.gongzhonghao ? "更新二维码" : "上传二维码"
            }}</Button>
                </Upload>
                <span class="remark_info">
                  <Icon type="ios-information-circle-outline" /> 300DPI，用于会刊宣传中
                </span>
              </div>
            </div>
          </FormItem>
          <Divider />
          <FormItem>
            <Button
              type="error"
              @click="handleSubmit('formValidate')"
            >保存</Button>
            <Button
              @click="getAccount()"
              style="margin-left: 8px"
            >取消</Button>
          </FormItem>
        </Form>
      </div>
    </Card>
  </div>
</template>

<script>
import { getMatchid } from '../../config/common'
import FileUpload from 'vue-upload-component'
export default {
  name: 'customer',
  components: {
    FileUpload
  },
  data () {
    return {
      accountInfo: {},
      ruleValidate: {
        name: [
          { required: true, message: '请输入名称', trigger: 'blur' }
        ],
        // logo: [
        //   { required: true, message: '请上传logo', trigger: 'blur' }
        // ],
        intro: [
          { required: true, message: '请输入简介', trigger: 'blur' }
        ]
      },
      files: null,
      files2: null,
      formItem: {
        input: '',
        select: '',
        radio: 'male',
        checkbox: [],
        switch: true,
        date: '',
        time: '',
        slider: [20, 50],
        textarea: ''
      },
      matchInfo: {},
      isEdit: false
    }
  },
  created () {
    this.getAccount()
    this.getMatchInfo()
  },
  methods: {
    // 获取比赛信息
    getMatchInfo () {
      this.$ajax(this, {
        data: {
          op: 'p10201',
          matchid: getMatchid()
        }
      })
        .then(res => {
          this.matchInfo = res.data
        })
        .catch(err => {
          this.$Message.error(err.message)
        })
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
          console.log(this.accountInfo)
        })
        .catch(err => {
          this.$Message.error(err.message)
        })
    },
    inputFilter1 (file) {
      this.files = file
      setTimeout(() => {
        this.inputFilter()
      }, 500)
      return false
    },
    inputFilter () {
      let data = new FormData()
      data.append('op', 'p10501')
      data.append('image', this.files)
      // data.append('name', newFile.name)
      // data.append('type', 'image')
      this.$ajax(this, {
        url: process.env.UPLOAD_API,
        data: data
      })
        .then(result => {
          this.accountInfo.logo = result.data.url
          this.files = null
        })
        .catch(err => {
          this.$Message.error(err.message)
        })
    },
    inputFilter2 (file) {
      this.files2 = file
      setTimeout(() => {
        this.inputFilter22()
      }, 500)
      return false
    },
    inputFilter22 () {
      let data = new FormData()
      data.append('op', 'p10501')
      data.append('image', this.files2)
      this.$ajax(this, {
        url: process.env.UPLOAD_API,
        data: data
      })
        .then(result => {
          console.log(result)
          this.accountInfo.gongzhonghao = result.data.url
          console.log(this.accountInfo.gongzhonghao)
          this.files2 = null
        })
        .catch(err => {
          this.$Message.error(err.message)
        })
    },
    handleSubmit (name) {
      this.$refs[name].validate((valid) => {
        if (valid) {
          this.$ajax(this, {
            data: {
              op: 'p10302',
              matchid: getMatchid(),
              name: this.accountInfo.name,
              logo: this.accountInfo.logo,
              homepage: this.accountInfo.homepage,
              intro: this.accountInfo.intro,
              gongzhonghao: this.accountInfo.gongzhonghao
            }
          })
            .then(res => {
              this.$Message.success('修改成功!');
              this.getAccount()
            })
            .catch(err => {
              this.$Message.error(err.message)
            })
        } else {
          this.$Message.error('Fail!');
        }
      })
    }
  }
}
</script>

<style>
.ivu-form-item {
  margin-bottom: 10px;
}
.ivu-form .ivu-form-item-label {
  font-size: 14px;
}
.ivu-form-item-content {
  font-size: 14px;
}
.remark_info {
  color: #ff5062;
  font-size: 12px;
  padding-left: 4px;
}
br {
  line-height: 150%;
}
.customer_Ul ul li {
  line-height: 40px;
}
br {
  display: block; /* makes it have a width */
  content: ''; /* clears default height */
  margin-top: 0; /* change this to whatever height you want it */
  margin-top: -30px;
}
</style>
