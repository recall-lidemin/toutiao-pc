<template>
  <el-container>
    <!-- 侧边栏区域 -->
    <el-aside :width="isCollapseWidth">
      <!-- 侧边栏logo区域 -->
      <div class="logo">
        <img src="../../assets/img/logo_admin.png" alt="">
      </div>
      <!-- 侧边栏导航菜单区域 -->
      <el-menu background-color="#323745" text-color="#eee" :unique-opened="true"
        :collapse="isCollapse" :collapse-transition="false" router>
        <!-- 首页子菜单 -->
        <el-menu-item index="/home">
          <i class="el-icon-s-home"></i>
          <span>首页</span>
        </el-menu-item>
        <!-- 内容管理 折叠菜单 -->
        <el-submenu index="1">
          <template slot="title">
            <i class="el-icon-menu"></i>
            <span>内容管理</span>
          </template>
          <!-- 内容管理 二级菜单 -->
          <el-menu-item index="/home/publish">
            <span>发布文章</span>
          </el-menu-item>
          <el-menu-item index="/home/articles">
            <span>内容列表</span>
          </el-menu-item>
          <el-menu-item index="/home/comment">
            <span>评论列表</span>
          </el-menu-item>
          <el-menu-item index="/home/material">
            <span>素材管理</span>
          </el-menu-item>
        </el-submenu>
        <!-- 粉丝管理 折叠菜单-->
        <el-submenu index="2">
          <template slot="title">
            <i class="el-icon-location"></i>
            <span>粉丝管理</span>
          </template>
          <!-- 粉丝管理 二级菜单 -->
          <el-menu-item index="/home/graphic">
            <span slot="title">图文数据</span>
          </el-menu-item>
          <el-menu-item index="/home/survey">
            <span slot="title">粉丝概况</span>
          </el-menu-item>
          <el-menu-item index="/home/photo">
            <span slot="title">粉丝画像</span>
          </el-menu-item>
          <el-menu-item index="/home/list">
            <span slot="title">粉丝列表</span>
          </el-menu-item>
        </el-submenu>
        <!-- 账户信息子菜单 -->
        <el-menu-item index="/home/account">
          <i class="el-icon-user-solid"></i>
          <span>账户信息</span>
        </el-menu-item>
      </el-menu>
    </el-aside>
    <!-- 右侧主体区域 -->
    <el-container class="right">
      <!-- 主体头部区域 -->
      <el-header>
        <el-row type="flex" class="header" align="middle">
          <el-col :span="12">
            <i class="el-icon-s-fold" style="cursor: pointer" @click="showCollspse"></i>
            <span style="margin-left:5px">XXX股份有限公司</span>
          </el-col>
          <el-col :span="12" class="user">
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
      <!-- 主体内容区域 -->
      <el-main>
        <!-- 主体区域二级路由容器占位符 -->
        <router-view></router-view>
      </el-main>
    </el-container>
  </el-container>
</template>

<script>
import eventBus from '../../utils/eventBus.js'

export default {
  data() {
    return {
      // 用户信息对象
      userInfo: {},
      // 控制侧边栏是否折叠
      isCollapse: false
    }
  },
  created() {
    this.getUserInfo()
    // 利用eventBus方案，监听username的变化，然后重新获取
    eventBus.$on('userUpdate', () => {
      this.getUserInfo()
    })
  },
  methods: {
    // 控制侧边栏的展开与关闭
    showCollspse() {
      this.isCollapse = !this.isCollapse
    },
    // 获取当前登录用户信息
    async getUserInfo() {
      const res = await this.$axios.get('user/profile')
      if (res.message !== 'OK') {
        return this.$message.error('获取信息失败')
      }

      this.userInfo = res.data
    },
    // 监听下拉选择事件
    handleCommand(command) {
      if (command === 'userinfo') {
        // 跳转到个人信息页面
        this.$router.push('/home/account')
      } else if (command === 'git') {
        window.location.href = 'https://github.com/recall-lidemin/toutiao-pc'
      } else {
        // 清除token退出
        window.sessionStorage.removeItem('token')
        this.$router.push('/login')
      }
    }
  },
  computed: {
    // 计算折叠栏宽度
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
  .right {
    background-color: #eee;

    .el-header {
      background-color: #fff;
    }
  }
}
.header {
  height: 60px;

  .user {
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
