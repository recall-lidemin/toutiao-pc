<template>
  <div class="login">
    <el-card class="login-card">
      <div class="login-logo">
        <img src="../../assets/img/logo_index.png" alt="">
      </div>
      <!-- 登录表单 -->
      <el-form :model="loginForm" :rules="loginFormRules" ref="loginFormRef">
        <!-- 手机号 -->
        <el-form-item prop="mobile">
          <el-input placeholder="请输入手机号" clearable v-model="loginForm.mobile"></el-input>
        </el-form-item>
        <!-- 验证码 -->
        <el-form-item prop="checkCode">
          <el-input placeholder="请输入验证吗" style="width:60%" clearable v-model="loginForm.checkCode"></el-input>
          <el-button plain class="fr">发送验证码</el-button>
        </el-form-item>
        <el-form-item>
          <el-checkbox ref="checkBoxRef">我已阅读同意用户协议和隐私条款</el-checkbox>
        </el-form-item>
        <el-button style="width:100%" type="primary" @click="login">登录</el-button>
      </el-form>
    </el-card>
  </div>
</template>

<script>
export default {
  data () {
    // 自定义验证手机号
    const checkMobile = (rule, value, callback) => {
      const regMobile = /^1([38][0-9]|4[579]|5[0-3,5-9]|6[6]|7[0135678]|9[89])\d{8}$/
      if (regMobile.test(value)) return callback()
      callback(new Error('请输入正确的手机号'))
    }
    // 自定义校验验证码
    const checkNum = (rule, value, callback) => {
      const regCheckCode = /^\d{6}$/
      if (regCheckCode.test(value)) return callback()
      callback(new Error('验证码无效'))
    }
    return {
      loginForm: {
        mobile: '',
        checkCode: ''
      },
      loginFormRules: {
        mobile: [{ required: true, message: '请输入手机号', trigger: 'blur' }, { validator: checkMobile, trigger: 'blur' }],
        checkCode: [{ required: true, message: '请输入验证码', trigger: 'blur' }, { validator: checkNum, trigger: 'blur' }]
      }
    }
  },
  methods: {
    login () {
      console.log(this.$refs.loginFormRef)
      this.$refs.loginFormRef.validate(valid => {

      })
    }
  }
}
</script>

<style lang="less" scoped>
.login{
  height: 100%;
  background: url(../../assets/img/login_bg.jpg);
  background-size: cover;

  .login-card{
    position: absolute;
    left: 50%;
    top: 50%;
    transform: translate(-50%,-50%);
    width: 440px;
    height: 340px;

    .login-logo{
      margin-bottom: 20px;
      text-align: center;
      img{
        height: 40px;
      }
    }
  }
}
</style>
