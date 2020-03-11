<template>
  <div class="login">
    <div class="box">
      <div class="public left"></div>
      <div class="public right"></div>
      <div class="public top"></div>
      <div class="public bottom"></div>
      <div class="public before"></div>
      <div class="public after"></div>
    </div>
    <el-card class="login-card">
      <div class="login-logo">
        <img src="../../assets/img/logo_index.png" alt="">
      </div>
      <!-- 登录表单 -->
      <el-form :model="loginForm" status-icon :rules="loginFormRules" ref="loginFormRef">
        <!-- 手机号 -->
        <el-form-item prop="mobile">
          <el-input placeholder="请输入手机号" v-model="loginForm.mobile"></el-input>
        </el-form-item>
        <!-- 验证码 -->
        <el-form-item prop="code">
          <el-input placeholder="请输入验证吗" style="width:60%" v-model="loginForm.code"></el-input>
          <el-button plain class="fr">发送验证码</el-button>
        </el-form-item>
        <el-form-item prop="checked">
          <el-checkbox v-model="loginForm.checked">我已阅读同意用户协议和隐私条款</el-checkbox>
        </el-form-item>
        <el-button style="width:100%" type="primary" @click="login">登录</el-button>
      </el-form>
    </el-card>
  </div>
</template>

<script>
export default {
  data() {
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
    // 自定义验证是否选择协议
    const checked = (rule, value, callback) => {
      value ? callback() : callback(new Error('必须勾选同意用户协议'))
    }
    return {
      // 登录表单
      loginForm: {
        // mobile: '13911111111',
        mobile: '18660946037',
        code: '246810',
        chaeckd: false // 是否同意协议
      },
      // 登录表单校验规则
      loginFormRules: {
        mobile: [
          { required: true, message: '请输入手机号', trigger: 'blur' },
          { validator: checkMobile, trigger: 'blur' }
        ],
        code: [
          { required: true, message: '请输入验证码', trigger: 'blur' },
          { validator: checkNum, trigger: 'blur' }
        ],
        checked: [{ validator: checked }]
      }
    }
  },
  methods: {
    login() {
      // 获取 登录表单 实例，调用validate方法
      this.$refs.loginFormRef.validate(async valid => {
        if (!valid) return this.$message.error('校验不通过')
        // this.$axios({
        //   url: 'authorizations', // 请求地址
        //   // params: {}, // url参数(get)
        //   data: this.loginForm, // body请求体参数
        //   method: 'post' // 请求类型 ：get(可以省略) put post delete
        // }).then(res => {
        //   // 返回 token 存储到本地，然后在之后的请求中，每次都要携带该token
        // }).catch(() => {

        // })
        const { data: res } = await this.$axios
          .post('authorizations', this.loginForm)
          .catch(() => {
            this.$message.error('登录失败')
          })
        this.$message.success('登录成功')
        // 保存token到本地，关闭浏览器token就会被清除
        window.sessionStorage.setItem('token', res.token)
        this.$router.push('/home')
      })
    }
  }
}
</script>

<style lang="less" scoped>
.login {
  position: relative;
  height: 100%;
  background: url(../../assets/img/login_bg.jpg);
  background-size: cover;
  overflow: hidden;
  background: radial-gradient(
    100% 100% at top center,
    rgb(218, 50, 50),
    rgb(75, 75, 197)
  );

  @keyframes move {
    0% {
      transform-origin: center;
      transform: rotateX(30deg) rotateY(45deg) translate(-999px,-999px);
    }

    50% {
      transform: rotateX(180deg) rotateY(180deg) translate(200px, 200px);
    }

    100% {
      transform: rotateX(360deg) rotateY(300deg) translate(400px, 400px);
    }
  }

  .box {
    width: 300px;
    height: 300px;
    margin: 100px auto;
    position: relative;
    /* perspective: 1000px; */
    /* 将平面图形转化为立体图形 */
    transform-style: preserve-3d;
    animation: move 5s infinite alternate;
  }

  .public {
    width: 100%;
    height: 100%;
    position: absolute;
  }
  .left {
    background: radial-gradient(
      100% 100% at center,
      rgb(218, 50, 50),
      rgb(67, 207, 67),
      rgb(75, 75, 197)
    );
    transform: rotateY(90deg) translateZ(-150px);
  }
  .right {
    background-color: rgb(78, 78, 163);
    transform: rotateY(90deg) translateZ(150px);
  }
  .top {
    background-color: rgb(207, 32, 61);
    transform: rotateX(90deg) translateZ(150px);
  }
  .bottom {
    background-color: rgb(52, 170, 52);
    transform: rotateX(90deg) translateZ(-150px);
  }
  .before {
    background-color: rgb(223, 223, 57);
    transform: translateZ(150px);
  }
  .after {
    background-color: #000;
    transform: translateZ(-150px);
  }

  @keyframes show {
    0% {
      transform: scale(0) rotate(0) ;
    }
    100% {
      transform: scale(1) rotateX(360deg) translate(-50%, -50%);;
    }
  }

  .login-card {
    position: absolute;
    left: 50%;
    top: 50%;
    transform: translate(-50%, -50%);
    width: 440px;
    height: 340px;
    background: transparent;
    animation: show 2s;

    .login-logo {
      margin-bottom: 20px;
      text-align: center;
      img {
        height: 40px;
      }
    }
  }
}
.el-checkbox {
  color: #eee;
}
</style>
