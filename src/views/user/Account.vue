<template>
  <div>
    <!-- 卡片 -->
    <el-card>
      <!-- 面包屑 -->
      <el-breadcrumb separator-class="el-icon-arrow-right">
        <el-breadcrumb-item :to="{ path: '/home' }">首页</el-breadcrumb-item>
        <el-breadcrumb-item>账户信息</el-breadcrumb-item>
      </el-breadcrumb>

      <!-- 账号信息区域 -->
      <el-form :model="userForm" :rules="userFormRules" ref="userFormRef" label-width="100px">
        <el-form-item label="用户名：" prop="name">
          <el-input v-model="userForm.name" style="width:30%"></el-input>
        </el-form-item>
        <el-form-item label="简介：" prop="intro">
          <el-input v-model="userForm.intro" style="width:30%"></el-input>
        </el-form-item>
        <el-form-item label="邮箱：" prop="email">
          <el-input v-model="userForm.email" style="width:30%"></el-input>
        </el-form-item>
        <el-form-item label="手机号：" prop="mobile">
          <el-input v-model="userForm.mobile" disabled style="width:30%"></el-input>
        </el-form-item>
      </el-form>
      <el-button type="primary" style="margin-left:100px" @click="saveUserInfo">保存</el-button>
      <!-- 头像 -->
      <div class="advatar">
        <img :src="userForm.photo ? userForm.photo : defaultImg " alt="">
        <el-upload action="" :http-request="uploadImg" :show-file-list="false">
          <a href="javascript:;">更换头像</a>
        </el-upload>
      </div>
    </el-card>
  </div>
</template>

<script>
import eventBus from '../../utils/eventBus.js'
export default {
  data() {
    return {
      userForm: {
        name: '',
        intro: '',
        photo: '',
        email: '',
        mobile: ''
      },
      userFormRules: {
        name: [{ required: true, message: '用户名不能为空', trigger: 'blur' }],
        email: [
          { required: true, message: '邮箱不能为空', trigger: 'blur' },
          { pattern: /^[a-zA-Z0-9_.-]+@[a-zA-Z0-9-]+(\.[a-zA-Z0-9-]+)*\.[a-zA-Z0-9]{2,6}$/, message: '邮箱格式不正确', trigger: 'blur' }
        ]
      },
      defaultImg: require('../../assets/img/avatar.jpg')
    }
  },
  created() {
    this.getUserInfo()
  },
  methods: {
    async getUserInfo() {
      const res = await this.$axios.get('user/profile')
      this.userForm = res.data
    },
    async uploadImg(params) {
      // params.file
      const fd = new FormData()
      fd.append('photo', params.file)

      const res = await this.$axios.patch('user/photo', fd)

      this.userForm.photo = res.data.photo

      eventBus.$emit('userUpdate')
    },
    // 保存用户修改信息
    saveUserInfo() {
      this.$refs.userFormRef.validate(async valid => {
        if (!valid) {
          return this.$message.info('请检查必填项')
        }

        await this.$axios.patch('user/profile', this.userForm)

        this.$message.success('修改成功')
        // 利用eventBus方案，监听用户信息改变，改变后触发userUpdate事件
        eventBus.$emit('userUpdate')
      })
    }
  }
}
</script>

<style lang="less" scoped>
.el-card {
  position: relative;
  .advatar {
    position: absolute;
    top: 50%;
    right: 200px;
    width: 200px;
    height: 200px;
    text-align: center;
    transform: translate(0, -50%);
    img {
      width: 100%;
      height: 100%;
      border-radius: 50%;
      border: 1px solid #ccc;
    }
  }
}
</style>
