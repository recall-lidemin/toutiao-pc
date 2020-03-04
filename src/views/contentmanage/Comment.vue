<template>
  <div>

    <!-- <el-breadcrumb separator-class="el-icon-arrow-right">
      <el-breadcrumb-item :to="{ path: '/home' }">首页</el-breadcrumb-item>
      <el-breadcrumb-item>内容管理</el-breadcrumb-item>
      <el-breadcrumb-item>评论列表</el-breadcrumb-item>
    </el-breadcrumb> -->

    <!-- 卡片视图区域 -->
    <el-card>
      <!-- 使用封装的面包屑导航 -->
      <!-- 大量使用具名插槽，传入标签 -->
      <bread-crumb slot="header">
        <template slot="title">
          内容管理
        </template>
        <template slot="list">
          评论列表
        </template>
      </bread-crumb>
    </el-card>
  </div>
</template>

<script>
export default {}
</script>

<style>
</style>
