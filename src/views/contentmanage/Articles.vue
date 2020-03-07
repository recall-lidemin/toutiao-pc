<template>
  <div>

    <!-- 卡片 -->
    <el-card>
      <!-- 面包屑 -->
      <bread-crumb slot="header">
        <template slot="title">
          内容管理
        </template>
        <template slot="list">
          内容列表
        </template>
      </bread-crumb>
      <!-- 搜索区域 -->
      <el-form>
        <el-form-item style="padding-left:50px" label="文章状态：">
          <!-- 单选按钮组 -->
          <el-radio-group v-model="radio">
            <el-radio :label="3">全部</el-radio>
            <el-radio :label="6">草稿</el-radio>
            <el-radio :label="9">待审核</el-radio>
            <el-radio :label="9">审核通过</el-radio>
            <el-radio :label="9">审核失败</el-radio>
          </el-radio-group>
        </el-form-item>

        <el-form-item style="padding-left:50px" label="频道类别：">
          <!-- select选择器 -->
          <el-select v-model="value" placeholder="请选择">
            <el-option v-for="item in options" :key="item.value" :label="item.label"
              :value="item.value">
            </el-option>
          </el-select>
        </el-form-item>

        <el-form-item style="padding-left:50px" label="日期范围：">
          <!-- 时间选择器 -->
          <el-date-picker v-model="value1" type="daterange" range-separator="至"
            start-placeholder="开始日期" end-placeholder="结束日期">
          </el-date-picker>
        </el-form-item>
      </el-form>
    </el-card>
  </div>
</template>

<script>
export default {
  data() {
    return {

    }
  },
  created() {},
  methods: {}
}
</script>

<style>
</style>
