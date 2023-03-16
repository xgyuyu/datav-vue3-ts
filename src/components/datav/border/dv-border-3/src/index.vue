<template>
  <div class="datav-wrapper" :style="wraperStyle">
    <svg :width="wraperStyle.width" :height="wraperStyle.height">
      <defs>
        <filter :id="filterId" height="150%" width="150%" x="-25%" y="-25%">
          <feMorphology
              operator="dilate"
              radius="1"
              in="SourceAlpha"
              result="thicken"
          />
          <feGaussianBlur in="thicken" stdDeviation="2" result="blurred" />
          <feFlood :flood-color="option.color2" result="glowColor">
            <animate
                attributeName="flood-color"
                :values="option.color2"
                dur="3s"
                begin="0s"
                repeatCount="indefinite"
            />
          </feFlood>
          <feComposite
              in="glowColor"
              in2="blurred"
              operator="in"
              result="softGlowColored"
          />
          <feMerge>
            <feMergeNode in="softGlowColored" />
            <feMergeNode in="SourceGraphic" />
          </feMerge>
        </filter>
      </defs>

      <path
          v-if="attrVal.w && attrVal.h"
          fill="transparent"
          :stroke-width="option.lineHeight"
          :stroke="option.color1"
          :d="`
          M15 5 L ${attrVal.w - 15} 5 Q ${attrVal.w - 5} 5, ${attrVal.w - 5} 15
          L ${attrVal.w - 5} ${attrVal.w - 15} Q ${attrVal.w - 5} ${attrVal.w - 5}, ${attrVal.w - 15} ${attrVal.w - 5}
          L 15, ${attrVal.w - 5} Q 5 ${attrVal.w - 5} 5 ${attrVal.w - 15} L 5 15
          Q 5 5 15 5
        `"
      />

      <path
          :stroke-width="option.lineHeight"
          fill="transparent"
          stroke-linecap="round"
          :filter="`url(#${filterId})`"
          :stroke="option.color2"
          :d="`M 20 5 L 15 5 Q 5 5 5 15 L 5 20`"
      />

      <path
          :stroke-width="option.lineHeight"
          fill="transparent"
          stroke-linecap="round"
          :filter="`url(#${filterId})`"
          :stroke="option.color2"
          :d="`M ${attrVal.w - 20} 5 L ${attrVal.w - 15} 5 Q ${attrVal.w - 5} 5 ${attrVal.w - 5} 15 L ${attrVal.w - 5} 20`"
      />

      <path
          :stroke-width="option.lineHeight"
          fill="transparent"
          stroke-linecap="round"
          :filter="`url(#${filterId})`"
          :stroke="option.color2"
          :d="`
          M ${attrVal.w - 20} ${attrVal.w - 5} L ${attrVal.w - 15} ${attrVal.w - 5}
          Q ${attrVal.w - 5} ${attrVal.w - 5} ${attrVal.w - 5} ${attrVal.w - 15}
          L ${attrVal.w - 5} ${attrVal.w - 20}
        `"
      />

      <path
          :stroke-width="option.lineHeight"
          fill="transparent"
          stroke-linecap="round"
          :filter="`url(#${filterId})`"
          :stroke="option.color2"
          :d="`
          M 20 ${attrVal.w - 5} L 15 ${attrVal.w - 5}
          Q 5 ${attrVal.w - 5} 5 ${attrVal.w - 15}
          L 5 ${attrVal.w - 20}
        `"
      />
    </svg>
  </div>
</template>

<script lang='ts' setup>
import { computed, toRef } from 'vue'
import { useDataCenter, getFieldMap } from '@/components/_mixins/use-data-center'
import { VDvBorder3 } from './dv-border-3'
import { getUUID } from '@/utils/util'

const props = defineProps<{
  com: VDvBorder3
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
const filterId = `border-box-03-filterId-${getUUID()}`
const option = computed(() => config.value.option)
const attrVal = computed(() => {
  return {
    w: attr.value.w,
    h: attr.value.h,
  }
})

</script>