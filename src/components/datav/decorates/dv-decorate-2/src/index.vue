<template>
  <div
      class="datav-wrapper"
      :style="wraperStyle"
  >
    <svg :width="attrVal.w" :height="option.lineHeight" :style="`margin-top: ${attrVal.rectY}`">
      <polyline :stroke="option.color1" :points="`0, 2.5 ${attrVal.w}, 2.5`" :stroke-width="option.lineHeight" />
      <polyline
          :stroke="option.color2"
          :stroke-width="option.lineHeight"
          stroke-dasharray="20, 80"
          stroke-dashoffset="-30"
          :points="`0, 2.5 ${attrVal.w}, 2.5`"
      />
    </svg>
  </div>
</template>

<script lang='ts' setup>
import { computed, toRef } from 'vue'
import { useDataCenter, getFieldMap } from '@/components/_mixins/use-data-center'
import { useApiStore } from '@/store/api'
import { VDvDecorate2 } from './dv-decorate-2'

const props = defineProps<{
  com: VDvDecorate2
}>()

const apiStore = useApiStore()
useDataCenter(props.com)

const config = toRef(props.com, 'config')
const attr = toRef(props.com, 'attr')

// const rectX = computed(() => 0)
// const rectY = computed(() => )
// const w = computed(() => attr.value.w)

const option = computed(() => config.value.option)

const wraperStyle = computed(() => {
  return {
    width: `${attr.value.w}px`,
    height: `${attr.value.h}px`,
    animationDuration: `${option.dur}s`
  }
})
const attrVal = computed(() => {
  return {
    rectX: 0,
    rectY: attr.value.h / 2,
    w: attr.value.w
  }
})

</script>
