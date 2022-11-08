<template>
  <div ref="myBox" class="box" />
</template>

<script>
import * as echarts from 'echarts'
export default {
  mounted() {
    const myChart = echarts.init(this.$refs.myBox)
    // 绘制图表
    myChart.setOption({
      title: {
        text: '个人能力图'
      },
      legend: {
        data: ['平均水平', '个人价值'],
        right: 0,
        orient: 'vertical'
      },
      radar: {
        // shape: 'circle',
        indicator: [
          { name: '工作效率', max: 100 },
          { name: '考勤', max: 100 },
          { name: '积极性', max: 100 },
          { name: '帮助同事', max: 100 },
          { name: '自主学习', max: 100 },
          { name: '正确率', max: 100 }
        ]
      },
      series: [
        {
          name: '平均 vs 个人',
          type: 'radar',
          data: [
            {
              value: [80, 80, 80, 80, 80, 80],
              name: '平均水平'
            },
            {
              value: [90, 75, 95, 90, 95, 90],
              name: '个人价值'
            }
          ]
        }
      ]
    })
  }
}
</script>

<style lang="scss" scoped>
.box {
    width: 500px;
    height: 400px;
    border: 1px solid pink;
}
</style>
