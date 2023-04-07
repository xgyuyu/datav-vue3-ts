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
import VChart from 'vue-echarts'
import { use, graphic } from 'echarts/core'
import { CanvasRenderer } from 'echarts/renderers'
import {FunnelChart} from 'echarts/charts'
import { GridComponent, TooltipComponent, LegendComponent, PolarComponent } from 'echarts/components'
import { useDataCenter, getFieldMap } from '@/components/_mixins/use-data-center'
import { useApiStore } from '@/store/api'
import { useEventStore } from '@/store/event'
import { Funnel } from './funnel'

use([
  CanvasRenderer,
  FunnelChart,
  GridComponent,
  TooltipComponent,
  LegendComponent,
  PolarComponent,
])

export default defineComponent({
  name: 'VFunnel',
  components: {
    VChart,
  },
  props: {
    com: {
      type: Object as PropType<Funnel>,
      required: true,
    },
  },
  setup(props) {
    const apiStore = useApiStore()
    useDataCenter(props.com)

    const dv_data = computed(() => {
      return apiStore.dataMap[props.com.id]?.source ?? {}
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
      const values = dv_data.value || {}
      if (!values.source) {
        return {}
      }
      const { tooltip, legend, animation, series } = config.value
      const [legendTop, legendLeft] = legend.position.split('-')
      const pointerLineStyle = {
        type: tooltip.pointer.line.type === 'dashed'
            ? [tooltip.pointer.line.dashedLength, tooltip.pointer.line.dashedSpace]
            : tooltip.pointer.line.type,
        width: tooltip.pointer.line.width,
        color: tooltip.pointer.line.color,
      }

      const opts = {
        tooltip: {
          show: tooltip.show,
          textStyle: {
            ...tooltip.textStyle,
          },
          padding: [tooltip.background.padding.v, tooltip.background.padding.h],
          backgroundColor: tooltip.background.color,
          trigger: tooltip.pointer.show ? 'axis' : 'item',
          axisPointer: {
            type: tooltip.pointer.show ? 'cross' : 'none',
            label: {
              show: false,
            },
            lineStyle: pointerLineStyle,
            crossStyle: pointerLineStyle,
          },
          borderWidth: 0,
        },
        legend: {
          show: legend.show,
          top: legendTop,
          left: legendLeft,
          orient: legend.orient,
          textStyle: {
            ...legend.textStyle,
          },
          icon: legend.symbol.show
              ? legend.symbol.icon === 'auto'
                  ? null : legend.symbol.icon
              : 'none',
          itemWidth: legend.symbol.width,
          itemHeight: legend.symbol.height,
          itemGap: legend.symbol.gap,
          type: legend.page.enabled ? 'scroll' : 'plain',
          width: legend.page.enabled ? legend.page.size.width: 'auto',
          height: legend.page.enabled ? legend.page.size.height: 'auto',
          pageIconSize: legend.page.button.size,
          pageIconColor: legend.page.button.color,
          pageIconInactiveColor: legend.page.button.inactiveColor,
          pageTextStyle: {
            color: legend.page.pageNumColor,
          },
        },
        animation: animation.enabled,
        animationDuration: animation.duration,
        animationEasing: animation.easing,
        animationDelay: animation.delay,
        dataset: values,
        series
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
