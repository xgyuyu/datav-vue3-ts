<template>
  <div class="datav-wrapper" :style="wrapperStyle">
    <v-chart
        :option="option"
        autoresize
    />
  </div>
</template>
<script lang='ts'>
import {computed, defineComponent, PropType, toRef} from 'vue'
import { useDataCenter, getFieldMap } from '@/components/_mixins/use-data-center'
import { useApiStore } from '@/store/api'
import VChart from 'vue-echarts'
import { use, graphic } from 'echarts/core'
import { CanvasRenderer } from 'echarts/renderers'
import { GaugeChart } from 'echarts/charts'
import { Gauge } from './gauge'
import {GridComponent, LegendComponent, TooltipComponent} from "echarts/components";

use([
  CanvasRenderer,
  GaugeChart,
  GridComponent,
  TooltipComponent,
  LegendComponent,
])

export default defineComponent({
  name: 'VGauge',
  components: {
    VChart,
  },
  props: {
    com: {
      type: Object as PropType<Gauge>,
      required: true,
    },
  },
  setup(props) {
    const apiStore = useApiStore()
    useDataCenter(props.com)

    const config = toRef(props.com, 'config')
    const attr = toRef(props.com, 'attr')

    const dv_data = computed(() => {
      return apiStore.dataMap[props.com.id]?.source ?? {}
    })
    const wrapperStyle = computed(() => {
      return {
        width: `${attr.value.w}px`,
        height: `${attr.value.h}px`,
      }
    })

    const option = computed(() => {
      const { seriesData } = config.value
      const opt = {
        series: [{
          type: 'gauge',
          center: [`${seriesData.center[0]}%`, `${seriesData.center[1]}%`],
          startAngle: seriesData.startAngle,
          endAngle: seriesData.endAngle,
          min: seriesData.min,
          max: seriesData.max,
          splitNumber: seriesData.splitNumber,
          itemStyle: {
            color: seriesData.itemStyle.color.type === 'gradient'
                ? new graphic.LinearGradient(0, 0, 0, 1, [{
                  offset: 0,
                  color: seriesData.itemStyle.color.from,
                }, {
                  offset: 1,
                  color: seriesData.itemStyle.color.to,
                }])
                : seriesData.itemStyle.color.value,
          },
          progress: {
            show: true,
            width: seriesData.progress.width
          },
          pointer: {
            show: seriesData.pointer.show,
            icon: 'path://M12.8,0.7l12,40.1H0.7L12.8,0.7z',
            length: `${seriesData.pointer.length}%`,
            width: seriesData.pointer.width,
            // offsetCenter: [0, '-60%'],
            offsetCenter: [`${seriesData.pointer.offsetCenter[0]}`, `${seriesData.pointer.offsetCenter[1]}`],
            itemStyle: {
              color: seriesData.pointer.itemStyle.color
            }
          },
          axisLine: {
            show: seriesData.axisLine.show,
            lineStyle: {
              width: seriesData.axisLine.lineStyle.width,
              color: seriesData.axisLine.lineStyle.color
            }
          },
          axisTick: {
            show: seriesData.axisTick.show,
            distance: seriesData.axisTick.distance,
            splitNumber: seriesData.axisTick.splitNumber,
            lineStyle: {
              width: seriesData.axisTick.lineStyle.width,
              color: seriesData.axisTick.lineStyle.color
            }
          },
          splitLine: {
            show: seriesData.splitLine.show,
            distance: seriesData.splitLine.distance,
            length: seriesData.splitLine.length,
            lineStyle: {
              width: seriesData.splitLine.lineStyle.width,
              color: seriesData.splitLine.lineStyle.color
            }
          },
          axisLabel: {
            show: seriesData.axisLabel.show,
            distance: seriesData.axisLabel.distance,
            fontSize: seriesData.axisLabel.fontSize,
            color: seriesData.axisLabel.color
          },
          detail: {
            valueAnimation: true,
            width: `${seriesData.detail.width}%`,
            show: seriesData.detail.show,
            lineHeight: seriesData.detail.lineHeight,
            fontSize: seriesData.detail.fontSize,
            fontWeight: 'bolder',
            formatter: '{value} °C',
            color: seriesData.detail.color,
            offsetCenter: [`${seriesData.detail.offsetCenter[0]}`, `${seriesData.detail.offsetCenter[1]}`],
          },
          data: [
            {
              value: 20
            }
          ]
        }]
      }
      console.log('opt=====', opt);
      return opt
    })
    return{
      wrapperStyle,
      option
    }
  }
})




</script>
