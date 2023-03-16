<template>
  <div class="datav-wrapper" :style="wraperStyle">
    <svg :width="wraperStyle.width" :height="wraperStyle.height">
      <path
          fill="transparent"
          :stroke="option.color1"
          :stroke-width="option.lineHeight"
          :d="`
          M 5 20 L 5 10 L 12 3  L 60 3 L 68 10
          L ${attrVal.w - 20} 10 L ${attrVal.w - 5} 25
          L ${attrVal.w - 5} ${attrVal.h - 5} L 20 ${attrVal.h - 5}
          L 5 ${attrVal.h - 20} L 5 20
        `"
      />

      <path
          fill="transparent"
          :stroke-width="option.lineHeight"
          stroke-linecap="round"
          stroke-dasharray="10, 5"
          :stroke="option.color1"
          :d="`M 16 9 L 61 9`"
      />

      <path
          :stroke-width="option.lineHeight"
          fill="transparent"
          :stroke="option.color2"
          :d="`M 5 20 L 5 10 L 12 3  L 60 3 L 68 10`"
      />

      <path
          :stroke-width="option.lineHeight"
          fill="transparent"
          :stroke="option.color2"
          :d="`M ${attrVal.w - 5} ${attrVal.h - 30} L ${attrVal.w - 5} ${attrVal.h - 5} L ${attrVal.w - 30} ${attrVal.h - 5}`"
      />
    </svg>
  </div>
</template>

<script lang='ts' setup>
import { computed, toRef } from 'vue'
import { useDataCenter, getFieldMap } from '@/components/_mixins/use-data-center'
import { VDvBorder2 } from './dv-border-2'

const props = defineProps<{
  com: VDvBorder2
}>()

useDataCenter(props.com)

const config = toRef(props.com, 'config')
const attr = toRef(props.com, 'attr')

const wraperStyle = computed(() => {
  return {
    width: `${attr.value.w}px`,
    height: `${attr.value.h}px`,
  }
})

const option = computed(() => config.value.option)
const attrVal = computed(() => {
  return {
    w: attr.value.w,
    h: attr.value.h,
  }
})

</script>