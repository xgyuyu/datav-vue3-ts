<template>
  <div class="datav-wrapper" :style="wraperStyle">
    <svg :width="wraperStyle.width" :height="wraperStyle.height">
      <polygon fill="transparent" :points="`10, 27 10, ${attrVal.h - 27} 13, ${attrVal.h - 24} 13, ${attrVal.h - 21} 24, ${attrVal.h - 11}
      38, ${attrVal.h - 11} 41, ${attrVal.h - 8} 73, ${attrVal.h - 8} 75, ${attrVal.h - 10} 81, ${attrVal.h - 10}
      85, ${attrVal.h - 6} ${attrVal.w - 85}, ${attrVal.h - 6} ${attrVal.w - 81}, ${attrVal.h - 10} ${attrVal.w - 75}, ${attrVal.h - 10}
      ${attrVal.w - 73}, ${attrVal.h - 8} ${attrVal.w - 41}, ${attrVal.h - 8} ${attrVal.w - 38}, ${attrVal.h - 11}
      ${attrVal.w - 24}, ${attrVal.h - 11} ${attrVal.w - 13}, ${attrVal.h - 21} ${attrVal.w - 13}, ${attrVal.h - 24}
      ${attrVal.w - 10}, ${attrVal.h - 27} ${attrVal.w - 10}, 27 ${attrVal.w - 13}, 25 ${attrVal.w - 13}, 21
      ${attrVal.w - 24}, 11 ${attrVal.w - 38}, 11 ${attrVal.w - 41}, 8 ${attrVal.w - 73}, 8 ${attrVal.w - 75}, 10
      ${attrVal.w - 81}, 10 ${attrVal.w - 85}, 6 85, 6 81, 10 75, 10 73, 8 41, 8 38, 11 24, 11 13, 21 13, 24`"/>
    </svg>
    <svg
        :width="attrVal.w"
        :height="attrVal.h"
        :key="item"
        v-for="item in borders"
        :class="`border-item ${item}`"
    >
      <polygon
          :stroke-width="option.lineHeight"
          :fill="option.color1"
          points="6,66 6,18 12,12 18,12 24,6 27,6 30,9 36,9 39,6 84,6 81,9 75,9 73.2,7 40.8,7 37.8,10.2 24,10.2 12,21 12,24 9,27 9,51 7.8,54 7.8,63"
      >
        <animate
            attributeName="fill"
            :values="`${option.color1};${option.color2};${option.color1}`"
            :dur="`${option.dur}s`"
            begin="0s"
            repeatCount="indefinite"
        />
      </polygon>
      <polygon
          :stroke-width="option.lineHeight"
          :fill="option.color2"
          points="27.599999999999998,4.8 38.4,4.8 35.4,7.8 30.599999999999998,7.8"
      >
        <animate
            attributeName="fill"
            :values="`${option.color2};${option.color1};${option.color2}`"
            :dur="`${option.dur}s`"
            begin="0s"
            repeatCount="indefinite"
        />
      </polygon>
      <polygon
          :stroke-width="option.lineHeight"
          :fill="option.color1"
          points="9,54 9,63 7.199999999999999,66 7.199999999999999,75 7.8,78 7.8,110 8.4,110 8.4,66 9.6,66 9.6,54"
      >
        <animate
            attributeName="fill"
            :values="`${option.color1};${option.color2};transparent`"
            :dur="`${option.dur + 1}s`"
            begin="0s"
            repeatCount="indefinite"
        />
      </polygon>
    </svg>
  </div>
</template>

<script lang='ts' setup>
import { computed, toRef } from 'vue'
import { useDataCenter, getFieldMap } from '@/components/_mixins/use-data-center'
import { useApiStore } from '@/store/api'
import { VDvBorder1 } from './dv-border-1'

const props = defineProps<{
  com: VDvBorder1
}>()

const apiStore = useApiStore()
useDataCenter(props.com)

const borders = ['left-top', 'right-top', 'left-bottom', 'right-bottom']


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
  .border-item {
    position: absolute;
    top: 0;
    left: 0;
  }
  .right-top {
    right: 0;
    transform: rotateY(180deg);
  }
  .left-bottom {
    bottom: 0;
    transform: rotateX(180deg);
  }
  .right-bottom {
    right: 0;
    bottom: 0;
    transform: rotateX(180deg) rotateY(180deg);
  }
}
</style>