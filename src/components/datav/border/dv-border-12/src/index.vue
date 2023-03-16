<template>
  <div class="datav-wrapper" :style="wraperStyle">
    <svg :width="wraperStyle.width" :height="wraperStyle.height">
      <polygon
          fill="none"
          :points="`
        7, 7 ${attrVal.w - 7}, 7 ${attrVal.w - 7}, ${attrVal.h - 7} 7, ${attrVal.h - 7}
      `"
      />

      <polyline
          fill="none"
          :stroke="option.color1"
          :points="`2, 2 ${attrVal.w - 2} ,2 ${attrVal.w - 2}, ${attrVal.h - 2} 2, ${attrVal.h - 2} 2, 2`"
      />
      <polyline
          fill="none"
          :stroke="option.color2"
          :points="`6, 6 ${attrVal.w - 6}, 6 ${attrVal.w - 6}, ${attrVal.h - 6} 6, ${attrVal.h - 6} 6, 6`"
      />
      <circle :fill="option.color1" cx="11" cy="11" r="1" />
      <circle :fill="option.color1" :cx="attrVal.w - 11" cy="11" r="1" />
      <circle :fill="option.color1" :cx="attrVal.w - 11" :cy="attrVal.h - 11" r="1" />
      <circle :fill="option.color1" cx="11" :cy="attrVal.h - 11" r="1" />
    </svg>
  </div>
</template>

<script lang='ts' setup>
import { computed, toRef } from 'vue'
import { useDataCenter, getFieldMap } from '@/components/_mixins/use-data-center'
import { VDvBorder12 } from './dv-border-12'

const props = defineProps<{
  com: VDvBorder12
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
