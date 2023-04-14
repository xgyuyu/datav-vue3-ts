<template>
  <div ref="chartRef" class="datav-wrapper" :style="wraperStyle"></div>
</template>

<script lang='ts' setup>
import { onMounted, computed, ref, toRef, watch } from 'vue'
import { useDataCenter, getFieldMap } from '@/components/_mixins/use-data-center'
import { useApiStore } from '@/store/api'
import { Model3d } from './model3d'
import Model3dConfig from './model3dConfig'
import throttle from "lodash-es/throttle";

const props = defineProps<{
  com: Model3d
}>()
const chartRef = ref<HTMLElement>()
let threeClassInstance: Model3dConfig;

const apiStore = useApiStore()
useDataCenter(props.com)

const config = toRef(props.com, 'config')
const attr = toRef(props.com, 'attr')
const wraperStyle = computed(() => {
  return {
    width: `${attr.value.w}px`,
    height: `${attr.value.h}px`,
  }
})
const dv_data = computed(() => {
  return apiStore.dataMap[props.com.id]?.source ?? {}
})

const init = () => {
  const dom: HTMLElement | undefined = chartRef.value
  if (dom) {
    threeClassInstance = new Model3dConfig({
      dom: dom,
      width: attr.value.w,
      height: attr.value.h
    })
  }
}
// DOM 渲染之后进行初始化
onMounted(() => {
  try {
    init()
  } catch (error) {
    console.log(error)
  }
})
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

</script>
