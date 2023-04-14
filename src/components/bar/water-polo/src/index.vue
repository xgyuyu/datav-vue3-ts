<template>
  <div class="datav-wrapper" :style="wrapperStyle">
    <v-chart :option="option" autoresize></v-chart>
  </div>
</template>

<script lang='ts'>
import {defineComponent, PropType, watch, toRef, computed} from 'vue'
import VChart from 'vue-echarts'
import { use } from 'echarts/core'
import 'echarts-liquidfill/src/liquidFill.js'
import { CanvasRenderer } from 'echarts/renderers'
import { GridComponent } from 'echarts/components'
import { useDataCenter, getFieldMap } from '@/components/_mixins/use-data-center'
import { useApiStore } from '@/store/api'
import { WaterPolo } from './water-polo'

use([CanvasRenderer, GridComponent])

export default defineComponent({
  name: 'VWaterPolo',
  components: {
    VChart,
  },
  props: {
    com: {
      type: Object as PropType<WaterPolo>,
      required: true,
    },
  },


  setup(props) {
    const apiStore = useApiStore()
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
      const { series } = config.value
      const series1 = series;
      series1[0].data = dv_data.value.data || [0]
      return {
        series: series1,
      }
    })
    return {
      wrapperStyle,
      option,
    }
  }
})

</script>
