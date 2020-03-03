<template>
  <el-container>
    <!-- 侧边栏导航区域 -->
    <el-aside :width="isCollapseWidth">
      <!-- logo区域 -->
      <div class="logo">
        <img src="../../assets/img/logo_admin.png" alt="">
      </div>
      <!-- 侧边栏导航菜单区域 -->
      <el-menu background-color="#323745" text-color="#eee" :unique-opened="true"
        :collapse="isCollapse" :collapse-transition="false">
        <!-- 一级菜单 子菜单 -->
        <el-menu-item index="1">
          <i class="el-icon-s-home"></i>
          <span>首页</span>
        </el-menu-item>
        <!-- 内容管理 折叠菜单 -->
        <el-submenu index="2">
          <template slot="title">
            <i class="el-icon-menu"></i>
            <span>内容管理</span>
          </template>
          <!-- 二级菜单 -->
          <el-menu-item index="2-1">
            <span>发布文章</span>
          </el-menu-item>
          <el-menu-item index="2-2">
            <span>内容列表</span>
          </el-menu-item>
          <el-menu-item index="2-3">
            <span>评论列表</span>
          </el-menu-item>
          <el-menu-item index="2-4">
            <span>素材管理</span>
          </el-menu-item>
        </el-submenu>
        <!-- 粉丝管理 -->
        <el-submenu index="3">
          <template slot="title">
            <i class="el-icon-location"></i>
            <span>粉丝管理</span>
          </template>
          <el-menu-item index="3-1">
            <span slot="title">图文数据</span>
          </el-menu-item>
          <el-menu-item index="3-2">
            <span slot="title">粉丝概况</span>
          </el-menu-item>
          <el-menu-item index="3-3">
            <span slot="title">粉丝画像</span>
          </el-menu-item>
          <el-menu-item index="3-4">
            <span slot="title">粉丝列表</span>
          </el-menu-item>
        </el-submenu>

        <el-menu-item index="4">
          <i class="el-icon-user-solid"></i>
          <span>账户信息</span>
        </el-menu-item>
      </el-menu>

    </el-aside>
    <el-container>
      <!-- 主体头部区域 -->
      <el-header>
        <el-row type="flex" class="header" align="middle">
          <el-col :span="12">
            <i class="el-icon-s-fold" style="cursor: pointer" @click="showCollspse"></i>
            <span style="margin-left:5px">XXX股份有限公司</span>
          </el-col>
          <el-col :span="12" class="right">
            <el-row type="flex" justify="end" align="middle">
              <img :src="userInfo.photo" alt="">
              <!-- 点击下拉菜单项会触发command事件 -->
              <el-dropdown trigger="click" @command="handleCommand">
                <span>{{ userInfo.name }}</span>
                <el-dropdown-menu slot="dropdown">
                  <el-dropdown-item command="userinfo">个人信息</el-dropdown-item>
                  <el-dropdown-item command="git">git地址</el-dropdown-item>
                  <el-dropdown-item command="logout">退出</el-dropdown-item>
                </el-dropdown-menu>
              </el-dropdown>
            </el-row>
          </el-col>
        </el-row>
      </el-header>
      <el-main>Main</el-main>
    </el-container>
  </el-container>
</template>

<script>
export default {
  data() {
    return {
      userInfo: {},
      isCollapse: false
    }
  },
  created() {
    this.getUserInfo()
  },
  methods: {
    // 控制侧边栏的展开与关闭
    showCollspse() {
      this.isCollapse = !this.isCollapse
    },
    // 获取当前登录用户信息
    async getUserInfo() {
      const res = await this.$axios.get('user/profile')
      if (res.status !== 200) {
        return this.$message.error('获取信息失败')
      }
      this.userInfo = res.data.data
      console.log(this.userInfo)
    },
    handleCommand(command) {
      console.log(command)
      if (command === 'userinfo') {
        // 跳转到个人信息页面
      } else if (command === 'git') {
        window.location.href = 'https://github.com/recall-lidemin/toutiao-pc'
      } else {
        window.sessionStorage.removeItem('token')
        this.$router.push('/login')
      }
    }
  },
  computed: {
    isCollapseWidth() {
      return this.isCollapse ? '64px' : '200px'
    }
  }
}
</script>

<style lang="less" scoped>
.el-container {
  height: 100%;
  .el-aside {
    height: 100%;
    box-sizing: border-box;
    background-color: #2e2f32;
    .logo {
      text-align: center;
      padding: 15px 32px 15px 32px;

      img {
        width: 100%;
      }
    }
    .el-menu {
      border-right: none;
      color: #ccc;
    }
  }
}
.header {
  height: 60px;

  .right {
    img {
      width: 30px;
      border-radius: 50%;
      margin-right: 5px;
    }
    span {
      cursor: pointer;
    }
  }
}
</style>
