<template>
  <div class="datav-wrapper" :style="wraperStyle">
    <svg :width="wraperStyle.width" :height="wraperStyle.height">
      <defs>
        <path :id="path" :d="pathD" fill="transparent" />
        <radialGradient :id="gradient" cx="50%" cy="50%" r="50%">
          <stop offset="0%" stop-color="#fff" stop-opacity="1" />
          <stop offset="100%" stop-color="#fff" stop-opacity="0" />
        </radialGradient>

        <mask :id="mask">
          <circle cx="0" cy="0" r="150" :fill="`url(#${gradient})`">
            <animateMotion
                :dur="`${option.dur}s`"
                :path="pathD"
                rotate="auto"
                repeatCount="indefinite"
            />
          </circle>
        </mask>
      </defs>

      <polygon
          fill="transparent"
          :points="`5, 5 ${attrVal.w - 5}, 5 ${attrVal.w - 5} ${attrVal.h - 5} 5, ${attrVal.h - 5}`"
      />

      <use :stroke="option.color1" stroke-width="1" :xlink:href="`#${path}`" />

      <use
          :stroke="option.color2"
          stroke-width="3"
          :xlink:href="`#${path}`"
          :mask="`url(#${mask})`"
      >
        <animate
            attributeName="stroke-dasharray"
            :from="`0, ${length}`"
            :to="`${length}, 0`"
            :dur="`${option.dur}s`"
            repeatCount="indefinite"
        />
      </use>
    </svg>

  </div>
</template>

<script lang='ts' setup>
import { computed, toRef } from 'vue'
import { useDataCenter, getFieldMap } from '@/components/_mixins/use-data-center'
import { VDvBorder8 } from './dv-border-8'
import {getUUID} from "@/utils/util";

const props = defineProps<{
  com: VDvBorder8
}>()

useDataCenter(props.com)

const path = `border-box-08-path-${getUUID()}`
const gradient = `border-box-08-gradient-${getUUID()}`
const mask = `border-box-08-mask-${getUUID()}`

const config = toRef(props.com, 'config')
const attr = toRef(props.com, 'attr')
const wraperStyle = computed(() => {
  return {
    width: `${attr.value.w}px`,
    height: `${attr.value.h}px`,
  }
})
const length = computed(() => {
  return (attr.value.w + attr.value.h - 5) * 2
})
const pathD = computed(() => {
  if (config.value.option.reverse)
    return `M 2.5, 2.5 L 2.5, ${attr.value.h - 2.5} L ${attr.value.w - 2.5}, ${attr.value.h - 2.5} L ${attr.value.w - 2.5}, 2.5 L 2.5, 2.5`
  return `M2.5, 2.5 L${attr.value.w - 2.5}, 2.5 L${attr.value.w - 2.5}, ${attr.value.h - 2.5} L2.5, ${attr.value.h - 2.5} L2.5, 2.5`
})
const option = computed(() => config.value.option)

const attrVal = computed(() => {
  return {
    w: attr.value.w,
    h: attr.value.h,
  }
})

</script>