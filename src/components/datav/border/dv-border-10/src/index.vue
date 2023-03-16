<template>
  <div class="datav-wrapper" :style="wraperStyle">
    <svg :width="wraperStyle.width" :height="wraperStyle.height">
      <polygon
          fill="none"
          :points="`
        23, 23 ${attrVal.w - 24}, 23 ${attrVal.w - 24}, ${attrVal.h - 24} 23, ${attrVal.h - 24}
      `"
      />

      <polyline
          fill="none"
          stroke-width="1"
          :stroke="option.color1"
          :points="`4, 4 ${attrVal.w - 22} ,4 ${attrVal.w - 22}, ${attrVal.h - 22} 4, ${attrVal.h - 22} 4, 4`"
      />
      <polyline
          fill="none"
          stroke-width="3"
          :stroke="option.color2"
          :points="`10, 10 ${attrVal.w - 16}, 10 ${attrVal.w - 16}, ${attrVal.h - 16} 10, ${attrVal.h - 16} 10, 10`"
      />
      <polyline
          fill="none"
          stroke-width="3"
          :stroke="option.color2"
          :points="`16, 16 ${attrVal.w - 10}, 16 ${attrVal.w - 10}, ${attrVal.h - 10} 16, ${attrVal.h - 10} 16, 16`"
      />
      <polyline
          fill="none"
          stroke-width="3"
          :stroke="option.color2"
          :points="`22, 22 ${attrVal.w - 4}, 22 ${attrVal.w - 4}, ${attrVal.h - 4} 22, ${attrVal.h - 4} 22, 22`"
      />
    </svg>
  </div>
</template>

<script lang='ts' setup>
import { computed, toRef } from 'vue'
import { useDataCenter, getFieldMap } from '@/components/_mixins/use-data-center'
import { VDvBorder10 } from './dv-border-9'
import {getUUID} from "@/utils/util";

const props = defineProps<{
  com: VDvBorder10
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
