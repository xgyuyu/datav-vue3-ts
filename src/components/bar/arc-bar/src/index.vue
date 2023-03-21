<template>
  <div class="datav-wrapper" :style="wrapperStyle">
    <v-chart
        :option="option"
        autoresize
        @click="onClick"
    />
  </div>
</template>

<script lang='ts'>
import { defineComponent, PropType, computed, toRef } from 'vue'
import { groupBy } from 'lodash-es'
import dayjs from 'dayjs'
import VChart from 'vue-echarts'
import { use, graphic } from 'echarts/core'
import { CanvasRenderer } from 'echarts/renderers'
import { BarChart } from 'echarts/charts'
import { GridComponent, TooltipComponent, LegendComponent, PolarComponent } from 'echarts/components'
import { useDataCenter, getFieldMap } from '@/components/_mixins/use-data-center'
import { useApiStore } from '@/store/api'
import { useEventStore } from '@/store/event'
import { getAutoValue, getLimitValue, valueFormater } from '@/components/_utils/echarts-util'
import { ArcBar } from './Arc-bar'

use([
  CanvasRenderer,
  BarChart,
  GridComponent,
  TooltipComponent,
  LegendComponent,
  PolarComponent,
])

export default defineComponent({
  name: 'VArcBar',
  components: {
    VChart,
  },
  props: {
    com: {
      type: Object as PropType<ArcBar>,
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

    const dv_field = computed(() => {
      return getFieldMap(props.com.apis.source.fields)
    })

    const config = toRef(props.com, 'config')
    const attr = toRef(props.com, 'attr')

    const wrapperStyle = computed(() => {
      return {
        width: `${attr.value.w}px`,
        height: `${attr.value.h}px`,
      }
    })

    const chartData = computed(() => {
      const groups = groupBy(dv_data.value, item => item[dv_field.value.x])
      return {
        keys: Object.keys(groups),
        values: Object.values(groups),
      }
    })

    const getSeries = () => {
      const { global, label, series } = config.value
      const { values } = chartData.value
      return series.map((item, idx) => {
        return {
          type: item.type,
          name: item.name,
          label: {
            show: label.show,
            position: label.position,
            ...label.textStyle,
            offset: [label.offsetX, label.offsetY],
          },
          coordinateSystem: 'polar',
          itemStyle: {
            color: item.color.type === 'gradient'
                ? new graphic.LinearGradient(0, 0, 0, 1, [{
                  offset: 0,
                  color: item.color.from,
                }, {
                  offset: 1,
                  color: item.color.to,
                }])
                : item.color.value,
          },
          showBackground: global.background.show,
          backgroundStyle: {
            color: global.background.color,
          },
          data: values.map(v => {
            const obj = v[idx]
            return obj[dv_field.value.y]
          }),
        }
      })
    }

    const option = computed(() => {
      const { global, tooltip, legend, animation, angleAxis, radiusAxis } = config.value
      const [legendTop, legendLeft] = legend.position.split('-')
      const pointerLineStyle = {
        type: tooltip.pointer.line.type === 'dashed'
            ? [tooltip.pointer.line.dashedLength, tooltip.pointer.line.dashedSpace]
            : tooltip.pointer.line.type,
        width: tooltip.pointer.line.width,
        color: tooltip.pointer.line.color,
      }

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
        polar: {},
        angleAxis: {
          ...angleAxis,
          min: getLimitValue(angleAxis.min),
          max: getLimitValue(angleAxis.max),
        },
        radiusAxis,
        series: getSeries(),
      }
      return opts
    })

    const onClick = (params: any) => {
      eventStore.handleSubVariablesChange(
          props.com.id,
          'click',
          {
            ...params.data.dataRef,
            x: params.name,
            y: params.value,
          })
    }

    return {
      wrapperStyle,
      option,
      onClick,
    }
  },
})

</script>
