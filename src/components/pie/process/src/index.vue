<template>
  <div class="datav-wrapper" :style="wraperStyle">
    <n-progress
        :style="wraperStyle"
        :type="option.type"
        :height="wraperStyle.h"
        :processing="option.processing"
        :percentage="option.dataset"
        :indicator-placement="option.indicatorPlacement"
        :color="option.color"
        :rail-color="option.railColor"
        :offset-degree="option.offsetDegree"
        :gap-degree="option.offsetDegree"
    >
      <n-text :style="{color: option.indicatorTextColor,fontSize: `${option.indicatorTextSize}px`}">
        {{ option.dataset }} {{ option.unit }}
      </n-text>
    </n-progress>
  </div>
</template>

<script lang='ts' setup>
import { computed, toRef } from 'vue'
import { useDataCenter, getFieldMap } from '@/components/_mixins/use-data-center'
import { useApiStore } from '@/store/api'
import { Process } from './process'

const props = defineProps<{
  com: Process
}>()

const apiStore = useApiStore()
useDataCenter(props.com)

const config = toRef(props.com, 'config')
const attr = toRef(props.com, 'attr')

const dv_data = computed(() => {
  return apiStore.dataMap[props.com.id]?.source ?? {}
})

const dv_field = computed(() => {
  return getFieldMap(props.com.apis.source.fields)
})

const wraperStyle = computed(() => {
  return {
    width: `${attr.value.w}px`,
    height: `${attr.value.h}px`,
  }
})

const option = computed(() => config.value)


</script>
