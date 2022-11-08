<template>
  <div ref="myBox" class="box" />
</template>

<script>
// 引入 echarts 核心模块，核心模块提供了 echarts 使用必须要的接口。
import * as echarts from 'echarts/core'
// 引入柱状图图表，图表后缀都为 Chart
import { RadarChart } from 'echarts/charts'
// 引入提示框，标题，直角坐标系，数据集，内置数据转换器组件，组件后缀都为 Component
import {
  TitleComponent,
  TooltipComponent,
  DatasetComponent,
  TransformComponent,
  LegendComponent
} from 'echarts/components'
// 标签自动布局，全局过渡动画等特性
import { LabelLayout, UniversalTransition } from 'echarts/features'
// 引入 Canvas 渲染器，注意引入 CanvasRenderer 或者 SVGRenderer 是必须的一步
import { CanvasRenderer } from 'echarts/renderers'

// 注册必须的组件
echarts.use([
  TitleComponent,
  TooltipComponent,
  DatasetComponent,
  TransformComponent,
  RadarChart,
  LabelLayout,
  UniversalTransition,
  CanvasRenderer,
  LegendComponent
])
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
