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
      <el-form style="margin:20px 0 0 50px" :model="publishForm" :rules="publishFormRules"
        ref="publishFormRef">
        <el-form-item label="标题：" prop="title">
          <el-input placeholder="请输入标题" style="width:60%" v-model="publishForm.title"></el-input>
        </el-form-item>
        <el-form-item label="内容：" prop="content">
          <el-row>
            <el-col>
              <quill-editor v-model="publishForm.content"
                ref="myQuillEditor">
              </quill-editor>
            </el-col>
          </el-row>
        </el-form-item>
        <el-form-item label="封面：" prop="cover">
          <el-radio-group v-model="publishForm.cover.type">
            <el-radio :label="1">单图</el-radio>
            <el-radio :label="3">三图</el-radio>
            <el-radio :label="0">无图</el-radio>
            <el-radio :label="-1">自动</el-radio>
          </el-radio-group>
          <el-row type="flex">
          </el-row>
        </el-form-item>
        <el-form-item label="频道：" prop="channel_id">
          <!-- select选择器 -->
          <el-select clearable v-model="publishForm.channel_id" placeholder="请选择">
            <!-- label是显示的值，value是绑定的值 -->
            <el-option v-for="item in channelsList" :key="item.id" :label="item.name"
              :value="item.id">
            </el-option>
          </el-select>
        </el-form-item>
        <el-form-item>
          <el-button type="primary" @click="publish(false)">发表</el-button>
          <el-button type="warning" @click="publish(true)">存为草稿</el-button>
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
          type: 0,
          images: [] // 字符串数组，对应type，type为1有一个值，为3有三个值
        },
        channel_id: null
      },
      // 频道列表
      channelsList: [],
      // 发表表单校验
      publishFormRules: {
        title: [{ required: true, message: '请输入标题', trigger: 'blur' }],
        content: [{ required: true, message: '请输入内容', trigger: 'blur' }],
        cover: [{ required: true, message: '请上传图片', trigger: 'blur' }],
        channel_id: [{ required: true, message: '请选择频道', trigger: 'blur' }]
      }
    }
  },
  created() {
    const { id } = this.$route.params
    this.getChannelsList()
    id && this.getArticlesById(id)
  },
  methods: {
    // 获取频道列表
    async getChannelsList() {
      const res = await this.$axios.get('channels')
      this.channelsList = res.data.channels
    },
    publish(draft) {
      // 获取路由参数
      const { id } = this.$route.params
      this.$refs.publishFormRef.validate(async valid => {
        if (!valid) {
          return this.$message.info('请填写必填项')
        }
        // 根据id是否存在，调用不同的接口和方法
        await this.$axios({
          url: id ? `articles/${id}` : 'articles',
          method: id ? 'put' : 'post',
          params: {
            draft
          },
          data: this.publishForm
        })

        this.$message.success('发表成功')
        this.$router.push('/home/articles')
      })
    },
    // 根据id获取文章
    async getArticlesById(id) {
      const res = await this.$axios.get(`articles/${id}`)
      this.publishForm = res.data
    }
  }
}
</script>

<style lang="less" scoped>

</style>
