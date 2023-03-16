<template>
  <div class="datav-wrapper" :style="wraperStyle">
    <svg :width="wraperStyle.width" :height="wraperStyle.height">
      <polygon fill="transparent" :points="`
        4, 0 ${attrVal.w - 4}, 0 ${attrVal.w}, 4 ${attrVal.w}, ${attrVal.h - 4} ${attrVal.w - 4}, ${attrVal.h}
        4, ${attrVal.h} 0, ${attrVal.h - 4} 0, 4
      `"/>
    </svg>

    <svg
        :width="attrVal.w"
        :height="attrVal.h"
        :key="item"
        v-for="item in borders"
        :class="`border-item ${item}`"
    >
      <polygon
          :fill="option.color2"
          points="40, 0 5, 0 0, 5 0, 16 3, 19 3, 7 7, 3 35, 3"
      />
    </svg>
  </div>
</template>

<script lang='ts' setup>
import { computed, toRef } from 'vue'
import { useDataCenter, getFieldMap } from '@/components/_mixins/use-data-center'
import { useApiStore } from '@/store/api'
import { VDvBorder5 } from './dv-border-5'

const props = defineProps<{
  com: VDvBorder5
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
    'box-shadow': `inset 0 0 25px 3px ${config.value.option.color1}`
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