<template>
  <div class="datav-wrapper" :style="wraperStyle">
    <svg :width="wraperStyle.width" :height="wraperStyle.height">
      <rect :x="attrVal.rectX" :y="attrVal.rectY" :width="wraperStyle.width" :height="option.lineHeight" :fill="option.color1">
        <animate
            attributeName="width"
            from="0"
            :to="attrVal.w"
            :dur="`${option.dur}s`"
            calcMode="spline"
            keyTimes="0;1"
            keySplines=".42,0,0.58,1"
            repeatCount="indefinite"
        />
      </rect>

      <rect :x="attrVal.rectX" :y="attrVal.rectY" :width="option.endWidth" :height="option.lineHeight" :fill="option.color2">
        <animate
            attributeName="x"
            from="0"
            :to="attrVal.w"
            :dur="`${option.dur}s`"
            calcMode="spline"
            keyTimes="0;1"
            keySplines="0.42,0,0.58,1"
            repeatCount="indefinite"
        />
      </rect>
    </svg>
  </div>
</template>

<script lang='ts' setup>
import { computed, toRef } from 'vue'
import { useDataCenter, getFieldMap } from '@/components/_mixins/use-data-center'
import { useApiStore } from '@/store/api'
import { VDvDecorate1 } from './dv-decorate-1'

const props = defineProps<{
  com: VDvDecorate1
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

// const rectX = computed(() => 0)
// const rectY = computed(() => )
// const w = computed(() => attr.value.w)

const option = computed(() => config.value.option)
const attrVal = computed(() => {
  return {
    rectX: 0,
    rectY: attr.value.h / 2,
    w: attr.value.w
  }
})

</script>
