<template>
  <div class="datav-wrapper" :style="wraperStyle">
    <svg :width="20" :height="20">
      <polyline
          stroke-width="4"
          fill="transparent"
          :stroke="option.color1"
          points="10, 0 19, 10 10, 20"
      />
      <polyline
          stroke-width="2"
          fill="transparent"
          :stroke="option.color2"
          points="2, 0 11, 10 2, 20"
      />
    </svg>
    <span :style="`color: ${option.textColor};font-size: ${option.textSize}px;line-height: 20px;vertical-align: super;`">
      {{ option.dataset }}</span
    >
    <svg :width="20" :height="20">
      <polyline
          stroke-width="4"
          fill="transparent"
          :stroke="option.color1"
          points="11, 0 2, 10 11, 20"
      />
      <polyline
          stroke-width="2"
          fill="transparent"
          :stroke="option.color2"
          points="19, 0 10, 10 19, 20"
      />
    </svg>
  </div>
</template>

<script lang='ts' setup>
import { computed, toRef } from 'vue'
import { useDataCenter, getFieldMap } from '@/components/_mixins/use-data-center'
import { useApiStore } from '@/store/api'
import { VDvDecorate3 } from './dv-decorate-3'

const props = defineProps<{
  com: VDvDecorate3
}>()

const apiStore = useApiStore()
useDataCenter(props.com)

const config = toRef(props.com, 'config')
const attr = toRef(props.com, 'attr')

const wraperStyle = computed(() => {
  return {
    width: `${attr.value.w}px`,
    height: `${attr.value.h}px`,
    'text-align': 'center',
    'line-height': `${attr.value.h}px`,
  }
})

const option = computed(() => config.value.option)
const attrVal = computed(() => {
  return {
    rectX: 0,
    rectY: attr.value.h / 2,
    w: attr.value.w
  }
})

</script>
