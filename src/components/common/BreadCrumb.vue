<template>
  <div>
    <el-breadcrumb separator-class="el-icon-arrow-right">
      <el-breadcrumb-item :to="{ path: '/home' }">首页</el-breadcrumb-item>
      <el-breadcrumb-item>
        <!-- 使用具名插槽接收标签 -->
        <slot name="title"></slot>
      </el-breadcrumb-item>
      <el-breadcrumb-item>
        <slot name="list"></slot>
      </el-breadcrumb-item>
    </el-breadcrumb>
  </div>
</template>

<script>
export default {}
</script>

<style>
</style>
