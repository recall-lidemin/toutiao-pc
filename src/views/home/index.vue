<template>
  <el-container>
    <el-aside width="200px">
      <!-- logo区域 -->
      <div class="logo">
        <img src="../../assets/img/logo_admin.png" alt="">
      </div>
      <!-- 侧边栏区域 -->
      <el-menu
      default-active="2"
      class="el-menu-vertical-demo"
      @open="handleOpen"
      @close="handleClose"
      background-color="#545c64"
      text-color="#fff"
      active-text-color="#ffd04b">
      <!-- 一级菜单 -->
        <el-menu-item index="4">
          <i class="el-icon-location"></i>
          <span slot="title">首页</span>
        </el-menu-item>

        <el-submenu index="2">
          <template slot="title">
            <i class="el-icon-location"></i>
            <span>内容管理</span>
          </template>
          <!-- 二级菜单 -->
          <el-menu-item index="2-1">
            <i class="el-icon-menu"></i>
            <span slot="title">发布文章</span>
          </el-menu-item>
          <el-menu-item index="2-2">
            <i class="el-icon-menu"></i>
            <span slot="title">内容列表</span>
          </el-menu-item>
          <el-menu-item index="2-3">
            <i class="el-icon-menu"></i>
            <span slot="title">评论列表</span>
          </el-menu-item>
          <el-menu-item index="2-4">
            <i class="el-icon-menu"></i>
            <span slot="title">素材管理</span>
          </el-menu-item>
        </el-submenu>
        <!-- 粉丝管理 -->
        <el-submenu index="3">
          <template slot="title">
            <i class="el-icon-location"></i>
            <span>粉丝管理</span>
          </template>
          <el-menu-item index="3-1">
            <i class="el-icon-menu"></i>
            <span slot="title">图文数据</span>
          </el-menu-item>
          <el-menu-item index="3-2">
            <i class="el-icon-menu"></i>
            <span slot="title">粉丝概况</span>
          </el-menu-item>
          <el-menu-item index="3-3">
            <i class="el-icon-menu"></i>
            <span slot="title">粉丝画像</span>
          </el-menu-item>
          <el-menu-item index="3-4">
            <i class="el-icon-menu"></i>
            <span slot="title">粉丝列表</span>
          </el-menu-item>
        </el-submenu>

        <el-menu-item index="4">
            <i class="el-icon-location"></i>
            <span slot="title">账户信息</span>
        </el-menu-item>
      </el-menu>
    </el-aside>
    <el-container>
      <el-header>Header</el-header>
      <el-main>Main</el-main>
    </el-container>
  </el-container>
</template>

<script>
export default {
}
</script>

<style lang="less" scoped>
.el-container{
  height: 100%;
box-sizing: border-box;
  .el-aside{

    height: 100%;
    background-color: #2e2f32;

    .logo{
      text-align: center;
      padding: 15px;

      img{
        width: 120px;
      }
    }
  }
}
</style>
