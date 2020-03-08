<template>
  <div>
    <!-- 卡片 -->
    <el-card>
      <!-- 面包屑 -->
      <el-breadcrumb separator-class="el-icon-arrow-right">
        <el-breadcrumb-item :to="{ path: '/home' }">首页</el-breadcrumb-item>
        <el-breadcrumb-item>内容管理</el-breadcrumb-item>
        <el-breadcrumb-item>发布文章</el-breadcrumb-item>
      </el-breadcrumb>
      <!-- 发布表单 -->
      <el-form style="margin:20px 0 0 50px">
        <el-form-item label="标题：">
          <el-input placeholder="请输入标题" style="width:60%"></el-input>
        </el-form-item>
        <el-form-item label="内容：">

        </el-form-item>
        <el-form-item label="封面：">
          <el-radio-group v-model="publishForm.cover.type">
            <el-radio :label="1">单图</el-radio>
            <el-radio :label="3">三图</el-radio>
            <el-radio :label="0">无图</el-radio>
            <el-radio :label="-1">自动</el-radio>
          </el-radio-group>
          <el-row type="flex">
            <el-upload
            v-for="item in publishForm.cover.type"
            :key="item"
            action="https://jsonplaceholder.typicode.com/posts/"
            list-type="picture-card">
            <i class="el-icon-plus"></i>
          </el-upload>
          </el-row>
        </el-form-item>
        <el-form-item label="频道：">
          <!-- select选择器 -->
          <el-select clearable v-model="publishForm.channel_id" placeholder="请选择">
            <!-- label是显示的值，value是绑定的值 -->
            <el-option v-for="item in channelsList" :key="item.id" :label="item.name"
              :value="item.id">
            </el-option>
          </el-select>
        </el-form-item>
        <el-form-item>
          <el-button type="primary">发表</el-button>
          <el-button type="warning">存为草稿</el-button>
        </el-form-item>
      </el-form>
    </el-card>
  </div>
</template>

<script>
export default {
  data() {
    return {
      publishForm: {
        title: '',
        content: '',
        cover: {
          type: '',
          img: ''
        },
        channel_id: ''
      },
      // 频道列表
      channelsList: []
    }
  },
  created() {
    this.getChannelsList()
  },
  methods: {
    // 获取频道列表
    async getChannelsList() {
      const res = await this.$axios.get('channels')
      this.channelsList = res.data.channels
    }
  }
}
</script>

<style>
</style>
