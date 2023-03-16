<template>
  <div class="datav-wrapper" :style="wraperStyle">
    <svg :width="wraperStyle.width" :height="wraperStyle.height">
      <polygon
          fill="transparent"
          :points="`
        ${attrVal.w - 15}, 22 170, 22 150, 7 40, 7 28, 21 32, 24
        16, 42 16, ${attrVal.h - 32} 41, ${attrVal.h - 7} ${attrVal.w - 15}, ${attrVal.h - 7}
      `"
      />

      <polyline
          class="border-line-1"
          :stroke="option.color1"
          :points="`145, ${attrVal.h - 5} 40, ${attrVal.h - 5} 10, ${attrVal.h - 35}
          10, 40 40, 5 150, 5 170, 20 ${attrVal.w - 15}, 20`"
      />
      <polyline
          :stroke="option.color2"
          class="border-line-2"
          :points="`245, ${attrVal.h - 1} 36, ${attrVal.h - 1} 14, ${attrVal.h - 23}
          14, ${attrVal.h - 100}`"
      />

      <polyline
          class="border-line-3"
          :stroke="option.color1"
          :points="`7, ${attrVal.h - 40} 7, ${attrVal.h - 75}`"
      />
      <polyline
          class="border-line-4"
          :stroke="option.color1"
          :points="`28, 24 13, 41 13, 64`"
      />
      <polyline
          class="border-line-5"
          :stroke="option.color1"
          :points="`5, 45 5, 140`"
      />
      <polyline
          class="border-line-6"
          :stroke="option.color2"
          :points="`14, 75 14, 180`"
      />
      <polyline
          class="border-line-7"
          :stroke="option.color2"
          :points="`55, 11 147, 11 167, 26 250, 26`"
      />
      <polyline
          class="border-line-8"
          :stroke="option.color2"
          :points="`158, 5 173, 16`"
      />
      <polyline
          class="border-line-9"
          :stroke="option.color1"
          :points="`200, 17 ${attrVal.w - 10}, 17`"
      />
      <polyline
          class="border-line-10"
          :stroke="option.color2"
          :points="`385, 17 ${attrVal.w - 10}, 17`"
      />
    </svg>
  </div>
</template>

<script lang='ts' setup>
import { computed, toRef } from 'vue'
import { useDataCenter, getFieldMap } from '@/components/_mixins/use-data-center'
import { VDvBorder9 } from './dv-border-9'
import {getUUID} from "@/utils/util";

const props = defineProps<{
  com: VDvBorder9
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
<style lang="scss" scoped>
.datav-wrapper {
  polyline {
    fill: none;
  }
  .border-line-1,
  .border-line-2,
  .border-line-3,
  .border-line-6,
  .border-line-7,
  .border-line-10 {
    stroke-width: 1;
  }
  .border-line-3,
  .border-line-4,
  .border-line-8,
  .border-line-9 {
    stroke-width: 3px;
    stroke-linecap: round;
  }
  .border-line-9 {
    stroke-dasharray: 100 250;
  }
  .border-line-10 {
    stroke-dasharray: 80 270;
  }
}
</style>
