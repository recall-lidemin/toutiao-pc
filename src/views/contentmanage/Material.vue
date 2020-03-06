<template>
  <div>
    <!-- 面包屑 -->
    <el-breadcrumb separator-class="el-icon-arrow-right">
      <el-breadcrumb-item :to="{ path: '/home' }">首页</el-breadcrumb-item>
      <el-breadcrumb-item>内容管理</el-breadcrumb-item>
      <el-breadcrumb-item>素材管理</el-breadcrumb-item>
    </el-breadcrumb>
    <!-- 卡片 -->
    <el-card :body-style="{ paddingTop: '0px' }">
      <div slot="header" class="clearfix header">
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
            <el-card :body-style="{ padding: '0px' }" v-for="item in allImgList" :key="item.id">
              <img :src="item.url" class="image">
                <el-row type="flex" justify="space-around">
                  <i class="el-icon-star-on" @click="collectPic(item.id,item.is_collected)" v-if="item.is_collected"></i>
                  <i class="el-icon-star-off" @click="collectPic(item.id,item.is_collected)" v-else></i>
                  <i class="el-icon-delete-solid" @click="delPic"></i>
                </el-row>
            </el-card>
          </el-row>
        </el-tab-pane>
        <!-- 收藏页签 -->
        <el-tab-pane label="收藏" name="true" class="imglist">
          <el-row type="flex" justify="space-between">
            <el-card :body-style="{ padding: '0px' }" v-for="item in allImgList" :key="item.id">
              <img :src="item.url" class="image">
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
      target: ''
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
      await this.$axios.put(`user/images/${id}`, { collect: !collected })
      this.getImgList()
    },
    // 点击删除事件
    delPic() {}
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
    }

    .el-row{
      margin: 20px;
      font-size: 20px;
      i{
        cursor: pointer;
      }
    }

  }
}

.header {
  display: flex;
  justify-content: space-between;
  align-items: center;
}
</style>
