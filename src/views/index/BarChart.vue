<template>
  <div :class="className" :style="{height:height,width:width}" />
</template>

<script>
import echarts from 'echarts'
require('echarts/theme/macarons') // echarts theme
import resize from './mixins/resize'

const animationDuration = 2000
export default {
  mixins: [resize],
  props: {
    className: {
      type: String,
      default: 'chart'
    },
    width: {
      type: String,
      default: '100%'
    },
    height: {
      type: String,
      default: '360px'
    },
    chartData: {
      type: Object,
      required: true
    }
  },
  data() {
    return {
      chart: null
    }
  },
  watch: {
    chartData: {
      deep: true,
      handler(val) {
        this.setOptions(val)
      }
    }
  },
  mounted() {
    this.$nextTick(() => {
      this.initChart()
    })
  },
  beforeDestroy() {
    if (!this.chart) {
      return
    }
    this.chart.dispose()
    this.chart = null
  },
  methods: {
    initChart() {
      this.chart = echarts.init(this.$el, 'macarons')
      this.setOptions(this.chartData)
    },
    setOptions({ xDatas, yDatas } = {}) {
      this.chart.setOption({
        // 标题
        title: {
          text: '任务发布数量统计图', // 主标题文本，'\n'指定换行
          subtext: '', // 副标题文本，'\n'指定换行
          x: 'left', // 水平安放位置，默认为'left'，可选为：'center' | 'left' | 'right' | {number}（x坐标，单位px）
          y: 'top', // 垂直安放位置，默认为top，可选为：'top' | 'bottom' | 'center' | {number}（y坐标，单位px）
          textStyle: {
            color: '#333333'
          },
          top: 10
        },
        tooltip: {
          trigger: 'axis',
          axisPointer: { // 坐标轴指示器，坐标轴触发有效
            type: 'shadow' // 默认为直线，可选为：'line' | 'shadow'
          },
          padding: [5, 10]
        },
        grid: {
          top: 70,
          left: '2%',
          right: '5%',
          bottom: '10%',
          containLabel: false
        },
        xAxis: [{
          name: '时间', // 给X轴加单位
          type: 'category',
          nameLocation: 'end',
          data: xDatas,
          axisTick: {
            alignWithLabel: true
          },
          // 改变x轴颜色
          axisLine: {
            lineStyle: {
              // color: '#999999'
            }
          },
          // 改变x轴字体颜色和大小
          axisLabel: {
            textStyle: {
              // color: '#666666',
              fontSize: '14'
            },
            showMaxLabel: true,
            interval: 0,
            rotate: 0
          }
        }],
        legend: {
          data: ['任务发布数量'],
          top: 10
        },
        yAxis: [{
          name: '数量（个）', // 给Y轴加单位
          type: 'value',
          axisTick: {
            show: false
          },
          // 改变y轴颜色
          axisLine: {
            lineStyle: {
              // color: '#999999'
            }
          },
          // 改变y轴字体颜色和大小
          axisLabel: {
            textStyle: {
              // color: '#666666',
              fontSize: '14'
            }
          }
        }],
        series: [{
          name: '任务发布数量',
          type: 'bar',
          stack: 'vistors',
          barWidth: '60%',
          itemStyle: {
            normal: {
              color: '#3888fa',
              label: {
                show: true, // 开启显示
                position: 'top', // 在上方显示
                textStyle: { // 数值样式
                  color: 'black',
                  fontSize: 14
                },
                formatter: '{c}'
              }
            }
          },
          data: yDatas,
          animationDuration
        }]
      })
    }
  }
}
</script>
