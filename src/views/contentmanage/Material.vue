<template>
  <div>
    <!-- 卡片 -->
    <el-card :body-style="{ paddingTop: '0px' }">
      <bread-crumb slot="header">
        <template slot="title">
          内容管理
        </template>
        <template slot="list">
          评论列表
        </template>
      </bread-crumb>

      <div class="clearfix header">
        <span>图片管理</span>
        <!-- 上传组件 自定义上传方法 -->
        <el-upload :show-file-list="false" action="" :http-request="uploadImg">
          <el-button type="primary" style="float: right">上传素材</el-button>
        </el-upload>
      </div>

      <!-- tab页签 -->
      <el-tabs v-model="query.collect" @tab-click="handleClick">
        <!-- 全部素材页签 -->
        <el-tab-pane label="全部" name="false" class="imglist">
          <el-row type="flex" justify="space-between">
            <el-card :body-style="{ padding: '0px' }" v-for="(item,index) in allImgList"
              :key="item.id">
              <img :src="item.url" class="image" @click="showPreview(index)">
              <el-row type="flex" justify="space-around">
                <i class="el-icon-star-on" @click="collectPic(item.id,item.is_collected)"
                  v-if="item.is_collected"></i>
                <i class="el-icon-star-off" @click="collectPic(item.id,item.is_collected)"
                  v-else></i>
                <i class="el-icon-delete-solid" @click="delPic(item.id)"></i>
              </el-row>
            </el-card>
          </el-row>
        </el-tab-pane>
        <!-- 收藏页签 -->
        <el-tab-pane label="收藏" name="true" class="imglist">
          <el-row type="flex" justify="space-between">
            <el-card :body-style="{ padding: '0px' }" v-for="(item,index) in allImgList"
              :key="item.id">
              <img :src="item.url" class="image" @click="showPreview(index)">
            </el-card>
          </el-row>
        </el-tab-pane>
      </el-tabs>

      <!-- 分页组件 -->
      <el-row>
        <el-pagination @size-change="handleSizeChange" @current-change="handleCurrentChange"
          :current-page="query.page" :page-sizes="[5,10, 20, 30, 40]" :page-size="query.per_page"
          layout="total, sizes, prev, pager, next, jumper" :total="query.total">
        </el-pagination>
      </el-row>
    </el-card>

    <!-- 预览对话框 -->
    <el-dialog @opened="opend" title="图片预览" :visible.sync="previewDialogVisible" width="50%"
      @close="previewDialogColsed">
      <!-- 走马灯组件 -->
      <el-carousel ref="previewRef" :initial-index="currentIndex" :autoplay="false"
        indicator-position="none" type="card" height="200px">
        <el-carousel-item v-for="item in allImgList" :key="item.id">
          <img :src="item.url" alt="" class="preview">
        </el-carousel-item>
      </el-carousel>

    </el-dialog>
  </div>
</template>

<script>
export default {
  data() {
    return {
      // 全部素材列表
      allImgList: [],
      // 素材查询对象
      query: {
        total: 0,
        collect: 'false',
        page: 1,
        per_page: 5
      },
      target: '',
      // 控制预览对话框的显示与隐藏
      previewDialogVisible: false,
      currentIndex: 0
    }
  },
  methods: {
    // 获取图片素材
    async getImgList() {
      const res = await this.$axios.get('user/images', {
        params: this.query
      })
      this.query.total = res.data.total_count
      this.allImgList = res.data.results

      console.log(res)
    },
    // 监听页签切换事件
    handleClick() {
      this.query.page = 1
      this.getImgList()
    },
    // 监听每页总条数
    handleSizeChange(num) {
      this.query.per_page = num
      this.getImgList()
    },
    // 监听页码
    handleCurrentChange(newPage) {
      this.query.page = newPage
      this.getImgList()
    },
    // 自定义上传函数
    async uploadImg(params) {
      const data = new FormData()
      data.append('image', params.file)

      await this.$axios.post('user/images', data)

      this.getImgList()
    },
    // 点击收藏事件
    async collectPic(id, collected) {
      const res = await this.$axios.put(`user/images/${id}`, {
        collect: !collected
      })
      if (res.data.collect === false) {
        this.$message.info('取消收藏')
        this.getImgList()
      } else {
        this.getImgList()
        this.$message.success('收藏成功')
      }
    },
    // 点击删除事件
    async delPic(id) {
      const confirmResult = await this.$confirm(
        '此操作将永久删除该文件, 是否继续?',
        '删除图片',
        {
          confirmButtonText: '确定',
          cancelButtonText: '取消',
          type: 'warning'
        }
      ).catch(err => err)

      if (confirmResult !== 'confirm') {
        return this.$message.info('删除操作已取消')
      }

      await this.$axios.delete(`user/images/${id}`)
      this.getImgList()
      this.$message.success('删除成功')
    },
    // 预览对话框
    showPreview(index) {
      this.currentIndex = index
      this.previewDialogVisible = true
    },
    // 监听预览对话框的关闭
    previewDialogColsed() {
      this.currentIndex = 0
    },
    opend() {
      this.$refs.previewRef.setActiveItem(this.currentIndex)
    }
  },
  created() {
    // 获取全部图片素材
    this.getImgList()
  }
}
</script>

<style lang="less" scoped>
.imglist {
  display: flex;

  .el-row {
    flex-wrap: wrap;

    .el-card {
      margin: 15px;
      padding: 20px;
      width: 220px;
      // height: 240px;
      position: relative;

      img {
        width: 180px;
        height: 130px;
        cursor: pointer;
      }

      .el-row {
        margin: 20px;
        font-size: 20px;
        i {
          cursor: pointer;
        }
      }
    }
  }
}

.header {
  display: flex;
  justify-content: space-between;
  align-items: center;
}

.el-icon-delete-solid {
  color: #f56c6c;
}

.el-icon-star-on {
  font-size: 20px;
  color: #e6a23c;
}

.el-icon-star-off {
  font-size: 20px;
}

.preview {
  width: 100%;
  height: 100%;
}
</style>
