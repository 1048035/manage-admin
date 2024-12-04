<template>
  <div :class="className" :style="{height:height,width:width}" />
</template>

<script>
import echarts from 'echarts'
require('echarts/theme/macarons') // echarts theme
import resize from './mixins/resize'

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
      default: '350px'
    },
    autoResize: {
      type: Boolean,
      default: true
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
        title: {
          text: '用户注册数量统计图', // 主标题文本，'\n'指定换行
          subtext: '', // 副标题文本，'\n'指定换行
          x: 'left', // 水平安放位置，默认为'left'，可选为：'center' | 'left' | 'right' | {number}（x坐标，单位px）
          y: 'top', // 垂直安放位置，默认为top，可选为：'top' | 'bottom' | 'center' | {number}（y坐标，单位px）
          textStyle: {
            color: '#333333'
          },
          top: 10
        },
        xAxis: {
          name: '时间',
          data: xDatas,
          boundaryGap: false,
          axisTick: {
            show: false
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
            }
          }
        },
        grid: {
          top: 70,
          left: '2%',
          right: '5%',
          bottom: '10%',
          containLabel: true
        },
        tooltip: {
          trigger: 'axis',
          axisPointer: {
            type: 'cross'
          },
          padding: [5, 10]
        },
        yAxis: {
          name: '数量（个）', // 给Y轴加单位
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
        },
        legend: {
          data: ['注册用户数量']
        },
        series: [{
          name: '注册用户数量',
          itemStyle: {
            normal: {
              color: '#FF005A',
              lineStyle: {
                // color: '#FF005A',
                width: 2
              },
              label: {
                show: true, // 开启显示
                // position: 'top', // 在上方显示
                textStyle: { // 数值样式
                  color: 'black',
                  fontSize: 14
                },
                formatter: '{c}'
              }
            }
          },
          smooth: true,
          type: 'line',
          data: yDatas,
          animationDuration: 2800,
          animationEasing: 'cubicInOut'
        }]
      })
    }
  }
}
</script>
