<template>
  <div class="datav-wrapper" :style="wraperStyle">
    <svg :width="wraperStyle.width" :height="wraperStyle.height">
      <polygon
          fill="none"
          :points="`
        10, 22 ${attrVal.w - 22}, 22 ${attrVal.w - 22}, ${attrVal.h - 86} ${attrVal.w - 84}, ${attrVal.h - 24} 10, ${attrVal.h - 24}
      `"
      />

      <polyline
          fill="none"
          :stroke="option.color1"
          :points="`8, 5 ${attrVal.w - 5}, 5 ${attrVal.w - 5}, ${attrVal.h - 100}
          ${attrVal.w - 100}, ${attrVal.h - 5} 8, ${attrVal.h - 5} 8, 5`"
      />
      <polyline
          fill="none"
          :stroke="option.color2"
          :points="`3, 5 ${attrVal.w - 20}, 5 ${attrVal.w - 20}, ${attrVal.h - 60}
          ${attrVal.w - 74}, ${attrVal.h - 5} 3, ${attrVal.h - 5} 3, 5`"
      />
      <polyline
          fill="none"
          :stroke="option.color2"
          :points="`50, 13 ${attrVal.w - 35}, 13`"
      />
      <polyline
          fill="none"
          :stroke="option.color2"
          :points="`15, 20 ${attrVal.w - 35}, 20`"
      />
      <polyline
          fill="none"
          :stroke="option.color2"
          :points="`15, ${attrVal.h - 20} ${attrVal.w - 110}, ${attrVal.h - 20}`"
      />
      <polyline
          fill="none"
          :stroke="option.color2"
          :points="`15, ${attrVal.h - 13} ${attrVal.w - 110}, ${attrVal.h - 13}`"
      />
    </svg>
  </div>
</template>

<script lang='ts' setup>
import { computed, toRef } from 'vue'
import { useDataCenter, getFieldMap } from '@/components/_mixins/use-data-center'
import { VDvBorder11 } from './dv-border-11'

const props = defineProps<{
  com: VDvBorder11
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
