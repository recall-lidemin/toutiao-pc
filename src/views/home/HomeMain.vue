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
            <span style="cursor:pointer">更多
              <i class="el-icon-d-arrow-right"></i>
            </span>

          </el-row>
        </el-col>
      </el-row>
    </el-card>
    <!--  -->
    <el-card class="carousel" :body-style="{ padding: '0px' }">
      <el-carousel height="100px">
        <el-carousel-item v-for="item in imgData" :key="item.index">
          <img :src="item.src" alt="">
        </el-carousel-item>
      </el-carousel>
    </el-card>
    <!-- 数据统计区域 -->
    <el-row type="flex" justify="space-between">
      <el-col :span="14">
        <el-card style="height:600px">
          <div class="pre" ref="showRef"></div>
        </el-card>
      </el-col>
      <el-col :span="10" class="reg">
        <el-row>
          <el-col>
            <el-card style="height:300px">
              <div slot="header" class="clearfix">
                <span>卡片视图1</span>
                <el-button style="float: right; padding: 3px 0" type="text">操作按钮</el-button>
              </div>

            </el-card>
          </el-col>
        </el-row>

        <el-row>
          <el-col>
            <el-card style="height:250px;margin-top:15px">
              <div slot="header" class="clearfix">
                <span>卡片视图2</span>
                <el-button style="float: right; padding: 3px 0" type="text">操作按钮</el-button>
              </div>
            </el-card>
          </el-col>
        </el-row>
      </el-col>
    </el-row>

  </div>
</template>

<script>
import echarts from 'echarts'
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
  },
  mounted() {
    this.myCharts = echarts.init(this.$refs.showRef)

    const option = {
      title: {
        text: '南丁格尔玫瑰图',
        subtext: '纯属虚构',
        left: 'center'
      },
      tooltip: {
        trigger: 'item',
        formatter: '{a} <br/>{b} : {c} ({d}%)'
      },
      legend: {
        left: 'center',
        top: 'bottom',
        data: [
          'rose1',
          'rose2',
          'rose3',
          'rose4',
          'rose5',
          'rose6',
          'rose7',
          'rose8'
        ]
      },
      toolbox: {
        show: true,
        feature: {
          mark: { show: true },
          dataView: { show: true, readOnly: false },
          magicType: {
            show: true,
            type: ['pie', 'funnel']
          },
          restore: { show: true },
          saveAsImage: { show: true }
        }
      },
      series: [
        {
          name: '面积模式',
          type: 'pie',
          radius: [30, 110],
          center: ['75%', '50%'],
          roseType: 'area',
          data: [
            { value: 10, name: 'rose1' },
            { value: 5, name: 'rose2' },
            { value: 15, name: 'rose3' },
            { value: 25, name: 'rose4' },
            { value: 20, name: 'rose5' },
            { value: 35, name: 'rose6' },
            { value: 30, name: 'rose7' },
            { value: 40, name: 'rose8' }
          ]
        }
      ]
    }

    this.myCharts.setOption(option)
  }
}
</script>

<style lang="less" scoped>
.box-card {
  margin-bottom: 15px;
}

.reg {
  margin-left: 20px;
}

.count {
  height: 100px;
}

.carousel {
  margin-bottom: 15px;

  img {
    width: 100%;
    height: 100%;
  }
}

.pre {
  text-align: center;
  width: 300px;
  height: 400px;
}
</style>
