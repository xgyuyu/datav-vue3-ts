<template>
  <div class="datav-wrapper" :style="wrapperStyle">
    <v-chart
        :option="option"
        autoresize
        @click="onClick"
    />
  </div>
</template>

<script lang='ts' setup>
import { PropType, computed, toRef, watch } from 'vue'
import { groupBy } from 'lodash-es'
import dayjs from 'dayjs'
import VChart from 'vue-echarts'
import { use } from 'echarts/core'
import { CanvasRenderer } from 'echarts/renderers'
import { PieChart } from 'echarts/charts'
import { GridComponent, TooltipComponent, LegendComponent } from 'echarts/components'
import { useDataCenter, getFieldMap } from '@/components/_mixins/use-data-center'
import { useApiStore } from '@/store/api'
import { useEventStore } from '@/store/event'
import { getAutoValue, getLimitValue, valueFormater } from '@/components/_utils/echarts-util'
import { BasicPie } from './basic-pie'

use([
  CanvasRenderer,
  PieChart,
  GridComponent,
  TooltipComponent,
  LegendComponent,
])

const props = defineProps({
  com: {
    type: Object as PropType<BasicPie>,
    required: true,
  },
})

const apiStore = useApiStore()
const eventStore = useEventStore()
useDataCenter(props.com)

const config = toRef(props.com, 'config')
const attr = toRef(props.com, 'attr')

const wrapperStyle = computed(() => {
  return {
    transform: 'translateZ(0)',
    width: `${attr.value.w}px`,
    height: `${attr.value.h}px`,
  }
})
const dv_data = computed(() => {
  return apiStore.dataMap[props.com.id]?.source ?? {}
})
const dv_field = computed(() => {
  return getFieldMap(props.com.apis.source.fields)
})

const chartData = computed(() => {
  const groups = groupBy(dv_data.value, item => item[dv_field.value.x])
  return {
    keys: Object.keys(groups),
    values: Object.values(groups),
  }
})

const getSeries = () => {
  const { series } = config.value
  const { values } = chartData.value
  return series.map((item, idx) => {
    return {
      type: 'pie',
      itemStyle: item.itemStyle,
      label: item.label,
      emphasis: item.emphasis,
      radius: item.radius,
      roseType: item.roseType,
      data: values.map(v => {
        const obj = v[idx]
        return {
          value: obj ? obj[dv_field.value.y] : null,
          name: obj[dv_field.value.x],
        }
      }),
    }
  })
}

const option = computed(() => {
  const { global, tooltip, legend, animation } = config.value
  const [legendTop, legendLeft] = legend.position.split('-')

  const opts = {
    textStyle: {
      fontFamily: global.fontFamily,
    },
    grid: {
      ...global.margin,
    },
    tooltip: {
      show: tooltip.show,
      textStyle: {
        ...tooltip.textStyle,
      },
      padding: [tooltip.background.padding.v, tooltip.background.padding.h],
      backgroundColor: tooltip.background.color,
      triggerOn: tooltip.triggerOn,
      trigger: tooltip.pointer.show ? 'axis' : 'item',
      borderWidth: tooltip.background.borderWidth,
      borderColor: tooltip.background.borderColor,
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
    series: getSeries(),
  }
  return opts
})

const type = computed(() => config.value.type)

watch(() => type, newData => {
      try {
        if (newData.value === 'normal') {
          config.value.series[0].radius = '70%'
          config.value.series[0].roseType = false
        } else if (newData.value === 'ring') {
          console.log('222=====', 222);
          config.value.series[0].radius = ['40%', '65%']
          config.value.series[0].roseType = false
        } else {
          config.value.series[0].radius = '70%'
          config.value.series[0].roseType = true
        }
      } catch (error) {
        console.log(error)
      }
    },
    { deep: true, immediate: true }
)

const onClick = (params: any) => {
  eventStore.handleSubVariablesChange(
      props.com.id,
      'click',
      {
        ...params.data.dataRef,
        x: params.name,
        y: params.value,
        s: params.seriesName,
      })
}
</script>
