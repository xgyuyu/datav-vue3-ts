<template>
  <div id="semicircle" class="datav-wrapper"></div>
</template>

<script lang='ts' setup>
import { computed, toRef, onMounted, watch } from 'vue'
import highcharts from "highcharts";
import { useDataCenter, getFieldMap } from '@/components/_mixins/use-data-center'
import { useApiStore } from '@/store/api'
import { Semicircle } from './semicircle'
import highchartsMore from 'highcharts/modules/item-series'

highchartsMore(highcharts)
const props = defineProps<{
  com: Semicircle
}>()

const apiStore = useApiStore()
useDataCenter(props.com)

const config = toRef(props.com, 'config')
const attr = toRef(props.com, 'attr')

const dv_data = computed(() => {
  return apiStore.dataMap[props.com.id]?.source ?? {}
})

// 初始化
const init = (dataList) => {
  const { option } = config.value
  highcharts.chart('semicircle', {
    chart: {
      type: 'item',
      backgroundColor: "none",
      margin: [0, 0, 0, 0],
      height: attr.value.h,
      width: attr.value.w,
    },
    legend: {
      enabled: true, // 关闭图例
      align: "right", //水平方向位置
      verticalAlign: "top", //垂直方向位置
      layout: "vertical",
      itemStyle: {
        color: "#f4f4f6",
        fontSize: 12,
      },
    },
    title: {
      text: "",
    },
    subtitle: {
      text: "",
    },
    credits: {
      enabled: false, // 禁用版权信息
    },

    series: [
      {
        type: 'item',
        name: 'Representatives',
        keys: ['name', 'y', 'label'],
        data: dataList,
        dataLabels: {
          enabled: true,
          format: '{point.label}'
        },
        center: [`${option.center[0]}%`, `${option.center[1]}%`],
        size: `${option.size}%`,
        startAngle: option.startAngle,
        endAngle: option.endAngle
      },
    ],
  })
}

// DOM 渲染之后进行初始化
onMounted(() => {
  try {
    init(config.value.dataList)
  } catch (error) {
    console.log(error)
  }
})

// 修改了数据源
watch(
    () => dv_data.value,
    (newData: any) => {
      console.log('newData=====', newData);
      // init(newData)
    },
    {
      deep: false
    }
)

// 修改了配置
watch(
    () => config.value.option,
    (newData: any) => {
      init(config.value.dataList)
    },
    {
      deep: true
    }
)

// 改变大小
watch(
    () => [attr.value.w, attr.value.h],
    ()=>{
      init(config.value.dataList)
    },
    {
      deep: true
    }
)

</script>
