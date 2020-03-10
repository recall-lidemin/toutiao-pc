<template>
  <div>
    <!-- 选择素材和上传素材tab页签 -->
    <el-tabs v-model="activeName" type="card" @tab-click="handleClick">
      <el-tab-pane label="素材库" name="materies">
        <div class="img_list">
          <el-card v-for="(item,index) in imgList" :key="index" :body-style="{ padding: '0px' }">
            <img :src="item.url" alt="" @click="clickImg(item.url,index)">
          </el-card>
        </div>
        <!-- 分页区域 -->
        <el-pagination @size-change="handleSizeChange" @current-change="handleCurrentChange"
          :current-page="query.page" :page-sizes="[10, 20, 30, 40]" :page-size="query.per_page"
          layout="total, sizes, prev, pager, next, jumper" :total="total">
        </el-pagination>
      </el-tab-pane>
      <el-tab-pane label="上传图片" name="upload">
        <!-- 上传组件 -->
        <el-upload list-type="picture-card" action="" :http-request="uploadImg"
          :show-file-list="false">
          <i class="el-icon-plus"></i>
        </el-upload>
      </el-tab-pane>
    </el-tabs>
  </div>
</template>

<script>
export default {
  data() {
    return {
      activeName: 'materies',
      imgList: [],
      query: {
        collect: false,
        page: 1,
        per_page: 10
      },
      total: 0
    }
  },
  created() {
    this.getImgList()
  },
  methods: {
    handleClick() {},
    // 获取全部素材
    async getImgList() {
      const res = await this.$axios.get('user/images', { params: this.query })
      console.log(res)
      this.imgList = res.data.results
      this.total = res.data.total_count
    },
    handleSizeChange(newSize) {
      this.query.per_page = newSize
      this.getImgList()
    },
    handleCurrentChange(newPage) {
      this.query.page = newPage
      this.getImgList()
    },
    clickImg(url) {
      // 触发父组件selectimg事件，并把url传过去
      this.$emit('selectimg', url)
    },
    // 自定义上传函数
    async uploadImg(params) {
      const data = new FormData()
      data.append('image', params.file)

      const res = await this.$axios.post('user/images', data)

      this.$emit('selectimg', res.data.url)
      console.log(res.data.url)
    }
  }
}
</script>

<style lang="less" scoped>
.img_list {
  display: flex;
  flex-wrap: wrap;

  .el-card {
    width: 100px;
    margin: 20px 20px;
    img {
      width: 100px;
      height: 80px;
    }
  }
}

</style>
