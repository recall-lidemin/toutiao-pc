<template>
  <div>
    <!-- 公告卡片 -->
    <el-card class="box-card">
      <el-row type="flex" align="middle">
        <el-col :span="4">
          <span>公告</span>
        </el-col>
        <el-col :span="8">
          <span>内容一</span>
        </el-col>
        <el-col :span="8">
          <span>内容二</span>
        </el-col>
        <el-col :span="4">
          <el-row type="flex" justify="end" align="middle">
            <span>更多</span>
            <i class="el-icon-d-arrow-right"></i>
          </el-row>
        </el-col>
      </el-row>
    </el-card>
    <!-- 数据统计区域 -->
    <el-row type="flex" justify="space-between">
      <el-col :span="18">
        <el-card></el-card>
      </el-col>
      <el-col :span="6" class="reg">
        <el-card></el-card>
      </el-col>
    </el-row>
    <!-- 走马灯 -->
  </div>
</template>

<script>
export default {
  data() {
    return {
      imgData: [
        {
          index: 1,
          src: 'http://p9.pstatp.com/origin/2f88b000cfc8cf37876b8'
        },
        {
          index: 2,
          src: 'http://p3.pstatp.com/origin/2f882000c3349f1bd14d1'
        },
        {
          index: 3,
          src: 'http://p3.pstatp.com/origin/2e574000d751f01790a1f'
        }
      ]

    }
  }
}
</script>

<style lang="less" scoped>
.box-card{
  margin-bottom: 20px;
}

.reg{
  margin-left: 20px;
}

.count{
  height: 100px;
}
</style>
