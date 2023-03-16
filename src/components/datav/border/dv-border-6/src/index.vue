<template>
  <div class="datav-wrapper" :style="wraperStyle">
    <svg :width="wraperStyle.width" :height="wraperStyle.height">
      <polyline
          fill="transparent"
          stroke-width="2"
          :stroke="option.color1"
          :points="`0, 25 0, 0 25, 0`"
      />
      <polyline
          fill="transparent"
          stroke-width="2"
          :stroke="option.color1"
          :points="`${attrVal.w - 25}, 0 ${attrVal.w}, 0 ${attrVal.w}, 25`"
      />
      <polyline
          fill="transparent"
          stroke-width="2"
          :stroke="option.color1"
          :points="`${attrVal.w - 25}, ${attrVal.h} ${attrVal.w}, ${attrVal.h} ${attrVal.w}, ${attrVal.h - 25}`"
      />
      <polyline
          fill="transparent"
          stroke-width="2"
          :stroke="option.color1"
          :points="`0, ${attrVal.h - 25} 0, ${attrVal.h} 25, ${attrVal.h}`"
      />

      <polyline
          fill="transparent"
          stroke-width="5"
          :stroke="option.color2"
          :points="`0, 10 0, 0 10, 0`"
      />
      <polyline
          fill="transparent"
          stroke-width="5"
          :stroke="option.color2"
          :points="`${attrVal.w - 10}, 0 ${attrVal.w}, 0 ${attrVal.w}, 10`"
      />
      <polyline
          fill="transparent"
          stroke-width="5"
          :stroke="option.color2"
          :points="`${attrVal.w - 10}, ${attrVal.h} ${attrVal.w}, ${attrVal.h} ${attrVal.w}, ${attrVal.h - 10}`"
      />
      <polyline
          fill="transparent"
          stroke-width="5"
          :stroke="option.color2"
          :points="`0, ${attrVal.h - 10} 0, ${attrVal.h} 10, ${attrVal.h}`"
      />
    </svg>

  </div>
</template>

<script lang='ts' setup>
import { computed, toRef } from 'vue'
import { useDataCenter, getFieldMap } from '@/components/_mixins/use-data-center'
import { useApiStore } from '@/store/api'
import { VDvBorder6 } from './dv-border-6'

const props = defineProps<{
  com: VDvBorder6
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
    border: `1px solid ${config.value.option.color1}`,
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