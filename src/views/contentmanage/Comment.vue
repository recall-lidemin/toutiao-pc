<template>
  <div>

    <!-- <el-breadcrumb separator-class="el-icon-arrow-right">
      <el-breadcrumb-item :to="{ path: '/home' }">首页</el-breadcrumb-item>
      <el-breadcrumb-item>内容管理</el-breadcrumb-item>
      <el-breadcrumb-item>评论列表</el-breadcrumb-item>
    </el-breadcrumb> -->

    <!-- 卡片视图区域 -->
    <el-card>
      <!-- 使用自己封装的面包屑导航 -->
      <!-- 大量使用具名插槽，传入标签 -->
      <bread-crumb slot="header">
        <template slot="title">
          内容管理
        </template>
        <template slot="list">
          评论列表
        </template>
      </bread-crumb>

      <!-- 搜索区域 -->
      <el-row>
        <el-col :span="5">
          <el-input placeholder="请输入内容" v-model="queryInfo.query" class="input-with-select" clearable>
            <el-button slot="append" icon="el-icon-search"></el-button>
          </el-input>
        </el-col>
      </el-row>

      <!-- 表格区域 -->
      <el-table :data="commentLit" border stripe>
        <el-table-column type="index"></el-table-column>
        <el-table-column label="标题" prop="title"></el-table-column>
        <el-table-column label="评论状态" prop="comment_status" width="100">
          <template slot-scope="scope">
            <el-switch disabled v-model="scope.row.comment_status" active-color="#13ce66"
              inactive-color="#ff4949">
            </el-switch>
          </template>
        </el-table-column>
        <el-table-column label="总评论数" prop="total_comment_count" width="120"></el-table-column>
        <el-table-column label="粉丝评论数" prop="fans_comment_count" width="120"></el-table-column>
        <el-table-column label="操作" width="300">
          <template slot-scope="scope">
            <el-button type="primary" icon="el-icon-edit" size="mini">修改</el-button>
            <el-button type="primary" icon="el-icon-edit" size="mini"
              @click="commentClosed(scope.row)">{{ scope.row.comment_status ? '关闭评论' : '打开评论' }}
            </el-button>
          </template>
        </el-table-column>
      </el-table>

      <!-- 分页区域 -->
      <el-pagination @size-change="handleSizeChange" @current-change="handleCurrentChange"
        :current-page="queryInfo.page" :page-sizes="[10, 20, 30, 40,50]"
        :page-size="queryInfo.per_page" layout="total, sizes, prev, pager, next, jumper"
        :total="total">
      </el-pagination>
    </el-card>
  </div>
</template>

<script>
export default {
  data() {
    return {
      commentLit: [],
      // 评论列表查询对象
      queryInfo: {
        query: '',
        page: 1,
        per_page: 10,
        response_type: 'comment'
      },
      total: 0
    }
  },
  created() {
    this.getCommentList()
  },
  methods: {
    async getCommentList() {
      const res = await this.$axios.get('articles', { params: this.queryInfo })
      this.commentLit = res.data.results
      this.total = res.data.total_count
    },
    // 查询
    async getArticles() {
      const res = await this.$axios.get('search', { params: this.queryInfo })
      this.commentLit = res.data.results
    },
    // 监听关闭评论事件
    async commentClosed(info) {
      const mess = info.comment_status ? '打开' : '关闭'
      const confirmResults = await this.$confirm(
        `您是否${mess}该文章评论功能?`,
        '提示',
        {
          confirmButtonText: '确定',
          cancelButtonText: '取消',
          type: 'warning'
        }
      ).catch(err => err)
      if (confirmResults !== 'confirm') {
        return this.$message.info('当前关闭操作已取消')
      }

      await this.$axios
        .put(`comments/status?article_id=${info.id}`, {
          allow_comment: !info.comment_status
        })
        .catch(() => {
          this.$message.error('操作失败')
        })

      this.getCommentList()
      this.$message.success('更新状态成功')
    },
    // 监听每页数据条数
    handleSizeChange(newPage) {
      this.queryInfo.per_page = newPage
      this.getCommentList()
    },
    // 监听当前页码
    handleCurrentChange(num) {
      this.queryInfo.page = num
      this.getCommentList()
    }
  }
}
</script>

<style lang="less" scoped>
.el-table{
  margin-top: 20px;
}
</style>
