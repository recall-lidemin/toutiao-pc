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
          <!-- 文章状态，0-草稿，1-待审核，2-审核通过，3-审核失败，4-已删除，不传为全部 -->
          <el-radio-group v-model="searchForm.status" @change="currentStatus">
            <el-radio :label="5">全部</el-radio>
            <el-radio :label="0">草稿</el-radio>
            <el-radio :label="1">待审核</el-radio>
            <el-radio :label="2">审核通过</el-radio>
            <el-radio :label="3">审核失败</el-radio>
          </el-radio-group>
        </el-form-item>

        <el-form-item style="padding-left:50px" label="频道类别：">
          <!-- select选择器 -->
          <el-select @clear="clearChannel" clearable @change="currentSelected" v-model="searchForm.channel_id" placeholder="请选择">
            <!-- label是显示的值，value是绑定的值 -->
            <el-option v-for="item in channelsList" :key="item.id" :label="item.name"
              :value="item.id">
            </el-option>
          </el-select>
        </el-form-item>

        <el-form-item style="padding-left:50px" label="日期范围：">
          <!-- 时间选择器 -->
          <el-date-picker @change="dateChanged" value-format="yyyy-MM-dd" v-model="searchForm.dateRange" type="daterange" range-separator="至"
            start-placeholder="开始日期" end-placeholder="结束日期">
          </el-date-picker>
        </el-form-item>
      </el-form>
      <!-- 内容主体区域 -->
      <el-row class="title">
        <span>共找到100条符合条件的内容</span>
      </el-row>
      <div class="articles_item" v-for="item in articleList" :key="item.id.toString()">
        <div class="left">
          <img
            :src="item.cover.images.length > 0 ? item.cover.images[0] : defaultImg"
            alt="">

          <div class="info">
            <span>{{ item.title }}</span>
            <span>
              <el-tag :type="item.status | tag">{{ item.status | filterStatus }}</el-tag>
            </span>
            <span class="date">{{ item.pubdate }}</span>
          </div>
        </div>
        <div class="right">
          <span><i class="el-icon-edit"></i>修改</span>
          <span><i class="el-icon-delete"></i>删除</span>
        </div>
      </div>

      <!-- 分页区域 -->
      <el-pagination
      @size-change="handleSizeChange"
      @current-change="handleCurrentChange"
      :current-page="searchForm.page"
      :page-sizes="[10, 20, 30, 40,50]"
      :page-size="searchForm.per_page"
      layout="total, sizes, prev, pager, next, jumper"
      :total="total">
    </el-pagination>
    </el-card>
  </div>
</template>

<script>
export default {
  data() {
    return {
      searchForm: {
        status: 5,
        channel_id: null,
        // 日期范围
        dateRange: []
      },
      // 频道数据数组
      channelsList: [],
      // 全部文章列表
      articleList: [],
      defaultImg: require('../../assets/img/avatar.jpg'),
      total: 0

    }
  },
  created() {
    this.getChannelsList()

    this.getArticlesList()
  },
  methods: {
    // 获取全部文章列表
    async getArticlesList() {
      const query = {
        status: this.searchForm.status === 5 ? null : this.searchForm.status,
        channel_id: this.searchForm.channel_id,
        begin_pubdate: this.searchForm.dateRange && this.searchForm.dateRange.length ? this.searchForm.dateRange[0] : null,
        end_pubdate: this.searchForm.dateRange && this.searchForm.dateRange.length > 1 ? this.searchForm.dateRange[1] : null,
        page: 1,
        per_page: 10
      }
      const res = await this.$axios.get('articles', { params: query })
      console.log(res)
      this.total = res.data.total_count
      this.articleList = res.data.results
    },
    // 获取频道列表
    async getChannelsList() {
      const res = await this.$axios.get('channels')
      this.channelsList = res.data.channels
    },
    // 监听当前选中的频道
    currentSelected() {
      this.getArticlesList()
      console.log(this.searchForm.channel_id)
    },
    // 监听单选按钮组当前选中的项
    currentStatus() {
      this.getArticlesList()
    },
    // 监听每页条数
    handleSizeChange(newSize) {
      this.query.per_page = newSize
      this.getArticlesList()
    },
    // 监听当前页码
    handleCurrentChange(newPage) {
      this.query.page = newPage
      this.getArticlesList()
    },
    clearChannel() {
      this.searchForm.channel_id = null
      this.getArticlesList()
    },
    dateChanged() {
      this.getArticlesList()
    }
  },
  filters: {
    // 过滤审核状态
    filterStatus(value) {
      switch (value) {
        case 0:
          return '草稿'
        case 1:
          return '待审核'
        case 2:
          return '已发表'
        case 3:
          return '审核失败'
      }
    },

    // 根据状态显示不同类型标签
    tag(value) {
      switch (value) {
        case 0:
          return 'warning'
        case 1:
          return 'info'
        case 2:
          return 'primary'
        case 3:
          return 'danger'
      }
    }
  }
}
</script>

<style lang="less" scoped>
.el-card {
  .title {
    height: 60px;
    line-height: 60px;
    border-bottom: 1px dashed #eee;
  }

  .articles_item {
    width: 100%;
    display: flex;
    justify-content: space-between;
    padding: 20px;
    border-bottom: 1px solid #eee;

    .left {
      display: flex;

      img {
        border-radius: 4px;
        width: 300px;
        height: 200px;
      }

      .info {
        display: flex;
        flex-direction: column;
        justify-content: space-around;
        height: 200px;
        margin-left: 10px;

        .date {
          color: #999;
          font-size: 12px;
        }
      }
    }

    .right {
      width: 120px;
      display: flex;
      justify-content: space-around;

      span {
        font-size: 14px;
        cursor: pointer;
      }
    }
  }
}
</style>
