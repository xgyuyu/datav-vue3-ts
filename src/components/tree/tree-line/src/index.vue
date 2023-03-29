<template>
  <div class="datav-wrapper" :style="wrapperStyle">
    <v-chart
        :option="option"
        autoresize
    />
  </div>
</template>

<script lang='ts'>
import { defineComponent, PropType, computed, toRef } from 'vue'
import dayjs from 'dayjs'
import VChart from 'vue-echarts'
import { use, graphic } from 'echarts/core'
import { CanvasRenderer } from 'echarts/renderers'
import { TreeChart } from 'echarts/charts'
import { GridComponent, TooltipComponent, LegendComponent } from 'echarts/components'
import { useDataCenter, getFieldMap } from '@/components/_mixins/use-data-center'
import { useApiStore } from '@/store/api'
import { useEventStore } from '@/store/event'
import { TreeLine } from './tree-line'

use([
  CanvasRenderer,
  TreeChart,
  GridComponent,
  TooltipComponent,
  LegendComponent,
])

export default defineComponent({
  name: 'VTreeLine',
  components: {
    VChart,
  },
  props: {
    com: {
      type: Object as PropType<TreeLine>,
      required: true,
    },
  },
  setup(props) {
    const apiStore = useApiStore()
    const eventStore = useEventStore()
    useDataCenter(props.com)

    const dv_data = computed(() => {
      return apiStore.dataMap[props.com.id]?.source ?? []
    })

    const config = toRef(props.com, 'config')
    const attr = toRef(props.com, 'attr')

    const wrapperStyle = computed(() => {
      return {
        width: `${attr.value.w}px`,
        height: `${attr.value.h}px`,
      }
    })

    const option = computed(() => {
      const { global, series, animation } = config.value
      let series1: any = series;
      series1[0].data = dv_data
      const opts = {
        textStyle: {
          fontFamily: global.fontFamily,
        },
        grid: {
          ...global.margin,
        },
        animation: animation.enabled,
        animationDuration: animation.duration,
        animationEasing: animation.easing,
        animationDelay: animation.delay,
        series: series1,
      }
      return opts
    })

    return {
      wrapperStyle,
      option,
    }
  }
})

</script>
