<template>
  <div class="cover">
    <div class="cover_item" v-for="(item,index) in list" :key="index" @click="showDiag(index)">
      <img :src="item ? item : defaultImg" alt="">
    </div>
    <!-- 选择素材对话框 -->
    <el-dialog title="选择封面" :visible.sync="coverDialogVisible" width="50%">
      <!-- 选择和上传组件 -->
      <select-image @selectimg="showImg"></select-image>
    </el-dialog>
  </div>
</template>

<script>
export default {
  props: ['list'],
  data() {
    return {
      coverDialogVisible: false,
      defaultImg: require('../../assets/img/pic_bg.png'),
      // 监听记录下当前点击的图片弹窗的索引，保证点哪个就给哪个长传图片
      currentIndex: -1
    }
  },
  methods: {
    // 控制弹层的显示
    showDiag(index) {
      this.coverDialogVisible = true
      this.currentIndex = index
    },
    showImg(url) {
      this.$emit('saveImg', url, this.currentIndex)
      this.coverDialogVisible = false
    }

  }
}
</script>

<style lang="less" scoped>
.cover {
  display: flex;
  margin: 20px 100px;
  .cover_item {
    border: 1px solid #ccc;
    width: 250px;
    height: 250px;
    padding: 20px;
    img {
      width: 100%;
      height: 100%;
    }
  }
}
</style>
