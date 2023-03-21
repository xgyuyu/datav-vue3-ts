<template>
  <div class="datav-wrapper" :style="wraperStyle">
    <svg :width="wraperStyle.width" :height="wraperStyle.height">
      <polyline
          :stroke="option.color1"
          :stroke-width="option.lineHeight"
          fill="transparent"
          :points="`${xPos(0)}, 0 ${xPos(30)}, ${attrVal.h / 2}`"
      />

      <polyline
          :stroke="option.color1"
          :stroke-width="option.lineHeight"
          fill="transparent"
          :points="`${xPos(20)}, 0 ${xPos(50)}, ${attrVal.h / 2} ${xPos(attrVal.w)}, ${attrVal.h / 2}`"
      />
    </svg>
  </div>
</template>

<script lang='ts' setup>
import { computed, toRef } from 'vue'
import { useDataCenter, getFieldMap } from '@/components/_mixins/use-data-center'
import { useApiStore } from '@/store/api'
import { VDvDecorate4 } from './dv-decorate-4'

const props = defineProps<{
  com: VDvDecorate4
}>()

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
const xPos = (pos: number) => {
  if (!config.value.option.reverse) return pos
  return attr.value.w - pos
}
const option = computed(() => config.value.option)
const attrVal = computed(() => {
  return {
    rectX: 0,
    rectY: attr.value.h / 2,
    w: attr.value.w,
    h: attr.value.h,
  }
})

</script>
