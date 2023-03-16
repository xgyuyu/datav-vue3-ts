<template>
  <div ref="chartRef" class="datav-wrapper" :style="wraperStyle"></div>
</template>

<script lang='ts' setup>
import { onMounted, computed, ref, toRef, watch } from 'vue'
import { useDataCenter, getFieldMap } from '@/components/_mixins/use-data-center'
import { VThreeEarth } from './three-earth'
import World from '../code/world/Word'
import throttle from 'lodash-es/throttle'
import {useApiStore} from "@/store/api";
import {useEventStore} from "@/store/event";

const chartRef = ref<HTMLElement>()
const apiStore = useApiStore()
const eventStore = useEventStore()
const props = defineProps<{
  com: VThreeEarth
}>()

useDataCenter(props.com)
const dv_data = computed(() => {
  return apiStore.dataMap[props.com.id]?.source ?? []
})

const config = toRef(props.com, 'config')
const attr = toRef(props.com, 'attr')
const wraperStyle = computed(() => {
  return {
    width: `${attr.value.w}px`,
    height: `${attr.value.h}px`,
  }
})
const option = computed(() => config.value.option)
let threeClassInstance: World

// 初始化
const init = () => {
  const dom: HTMLElement | undefined = chartRef.value
  if (dom) {
    threeClassInstance = new World({
      dom: dom,
      data: config.value.option.dataset,
      width: attr.value.w,
      height: attr.value.h
    })
  }
}
const updateData = (data: any) => {
  try {
    threeClassInstance.updateData(data)
  } catch (error) {
    console.log(error)
  }
}

// 改变大小
watch(
    () => [attr.value.w, attr.value.h],
    throttle(([newWidth], [newHeight]) => {
      threeClassInstance.updateSize(newWidth, newHeight)
    }, 100),
    {
      deep: true
    }
)

// 修改了数据源
watch(
    () => dv_data.value,
    (newData: any) => {
      console.log('newData=====', newData);
      updateData(newData)
    },
    {
      deep: false
    }
)
// DOM 渲染之后进行初始化
onMounted(() => {
  try {
    init()
  } catch (error) {
    console.log(error)
  }
})


</script>
