<template>
  <div class="datav-wrapper" :style="wraperStyle">
    <svg :width="wraperStyle.width" :height="wraperStyle.height">
      <defs>
        <filter :id="filterId" height="150%" width="150%" x="-25%" y="-25%">
          <feMorphology
              operator="dilate"
              radius="2"
              in="SourceAlpha"
              result="thicken"
          />
          <feGaussianBlur in="thicken" stdDeviation="3" result="blurred" />
          <feFlood :flood-color="option.color2" result="glowColor" />
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

      <polygon
          fill="transparent"
          :points="`
        20, 32 ${attrVal.w * 0.5 - option.borderTitleWidth / 2}, 32 ${attrVal.w * 0.5 - option.borderTitleWidth / 2 + 20}, 53
        ${attrVal.w * 0.5 + option.borderTitleWidth / 2 - 20}, 53 ${attrVal.w * 0.5 + option.borderTitleWidth / 2}, 32
        ${attrVal.w - 20}, 32 ${attrVal.w - 8}, 48 ${attrVal.w - 8}, ${attrVal.h - 25} ${attrVal.w - 20}, ${attrVal.h - 8}
        20, ${attrVal.h - 8} 8, ${attrVal.h - 25} 8, 50
      `"
      />

      <polyline
          fill="transparent"
          :stroke="option.color1"
          :filter="`url(#${filterId})`"
          :points="`
          ${(attrVal.w - option.borderTitleWidth) / 2}, 30
          20, 30 7, 50 7, ${50 + (attrVal.h - 167) / 2}
          13, ${55 + (attrVal.h - 167) / 2} 13, ${135 + (attrVal.h - 167) / 2}
          7, ${140 + (attrVal.h - 167) / 2} 7, ${attrVal.h - 27}
          20, ${attrVal.h - 7} ${attrVal.w - 20}, ${attrVal.h - 7} ${attrVal.w - 7}, ${attrVal.h - 27}
          ${attrVal.w - 7}, ${140 + (attrVal.h - 167) / 2} ${attrVal.w - 13}, ${135 + (attrVal.h - 167) / 2}
          ${attrVal.w - 13}, ${55 + (attrVal.h - 167) / 2} ${attrVal.w - 7}, ${50 + (attrVal.h - 167) / 2}
          ${attrVal.w - 7}, 50 ${attrVal.w - 20}, 30 ${(attrVal.w + option.borderTitleWidth) / 2}, 30
          ${(attrVal.w + option.borderTitleWidth) / 2 - 20}, 7 ${(attrVal.w - option.borderTitleWidth) / 2 + 20}, 7
          ${(attrVal.w - option.borderTitleWidth) / 2}, 30 ${(attrVal.w - option.borderTitleWidth) / 2 + 20}, 52
          ${(attrVal.w + option.borderTitleWidth) / 2 - 20}, 52 ${(attrVal.w + option.borderTitleWidth) / 2}, 30
        `"
      />

      <polygon
          :stroke="option.color1"
          fill="transparent"
          :points="`
          ${(attrVal.w + option.borderTitleWidth) / 2 - 5}, 30 ${(attrVal.w + option.borderTitleWidth) / 2 - 21}, 11
          ${(attrVal.w + option.borderTitleWidth) / 2 - 27}, 11 ${(attrVal.w + option.borderTitleWidth) / 2 - 8}, 34
        `"
      />

      <polygon
          :stroke="option.color1"
          fill="transparent"
          :points="`
          ${(attrVal.w - option.borderTitleWidth) / 2 + 5}, 30 ${(attrVal.w - option.borderTitleWidth) / 2 + 22}, 49
          ${(attrVal.w - option.borderTitleWidth) / 2 + 28}, 49 ${(attrVal.w - option.borderTitleWidth) / 2 + 8}, 26
        `"
      />

      <polygon
          :stroke="option.color1"
          :fill="option.color2"
          :filter="`url(#${filterId})`"
          :points="`
          ${(attrVal.w + option.borderTitleWidth) / 2 - 11}, 37 ${(attrVal.w + option.borderTitleWidth) / 2 - 32}, 11
          ${(attrVal.w - option.borderTitleWidth) / 2 + 23}, 11 ${(attrVal.w - option.borderTitleWidth) / 2 + 11}, 23
          ${(attrVal.w - option.borderTitleWidth) / 2 + 33}, 49 ${(attrVal.w + option.borderTitleWidth) / 2 - 22}, 49
        `"
      />

      <polygon
          :filter="`url(#${filterId})`"
          :fill="option.color1"
          opacity="1"
          :points="`
          ${(attrVal.w - option.borderTitleWidth) / 2 - 10}, 37 ${(attrVal.w - option.borderTitleWidth) / 2 - 31}, 37
          ${(attrVal.w - option.borderTitleWidth) / 2 - 25}, 46 ${(attrVal.w - option.borderTitleWidth) / 2 - 4}, 46
        `"
      >
        <animate
            attributeName="opacity"
            values="1;0.7;1"
            dur="2s"
            begin="0s"
            repeatCount="indefinite"
        />
      </polygon>

      <polygon
          :filter="`url(#${filterId})`"
          :fill="option.color1"
          opacity="0.7"
          :points="`
          ${(attrVal.w - option.borderTitleWidth) / 2 - 40}, 37 ${(attrVal.w - option.borderTitleWidth) / 2 - 61}, 37
          ${(attrVal.w - option.borderTitleWidth) / 2 - 55}, 46 ${(attrVal.w - option.borderTitleWidth) / 2 - 34}, 46
        `"
      >
        <animate
            attributeName="opacity"
            values="0.7;0.4;0.7"
            dur="2s"
            begin="0s"
            repeatCount="indefinite"
        />
      </polygon>

      <polygon
          :filter="`url(#${filterId})`"
          :fill="option.color1"
          opacity="0.5"
          :points="`
          ${(attrVal.w - option.borderTitleWidth) / 2 - 70}, 37 ${(attrVal.w - option.borderTitleWidth) / 2 - 91}, 37
          ${(attrVal.w - option.borderTitleWidth) / 2 - 85}, 46 ${(attrVal.w - option.borderTitleWidth) / 2 - 64}, 46
        `"
      >
        <animate
            attributeName="opacity"
            values="0.5;0.2;0.5"
            dur="2s"
            begin="0s"
            repeatCount="indefinite"
        />
      </polygon>

      <polygon
          :filter="`url(#${filterId})`"
          :fill="option.color1"
          opacity="1"
          :points="`
          ${(attrVal.w + option.borderTitleWidth) / 2 + 30}, 37 ${(attrVal.w + option.borderTitleWidth) / 2 + 9}, 37
          ${(attrVal.w + option.borderTitleWidth) / 2 + 3}, 46 ${(attrVal.w + option.borderTitleWidth) / 2 + 24}, 46
        `"
      >
        <animate
            attributeName="opacity"
            values="1;0.7;1"
            dur="2s"
            begin="0s"
            repeatCount="indefinite"
        />
      </polygon>

      <polygon
          :filter="`url(#${filterId})`"
          :fill="option.color1"
          opacity="0.7"
          :points="`
          ${(attrVal.w + option.borderTitleWidth) / 2 + 60}, 37 ${(attrVal.w + option.borderTitleWidth) / 2 + 39}, 37
          ${(attrVal.w + option.borderTitleWidth) / 2 + 33}, 46 ${(attrVal.w + option.borderTitleWidth) / 2 + 54}, 46
        `"
      >
        <animate
            attributeName="opacity"
            values="0.7;0.4;0.7"
            dur="2s"
            begin="0s"
            repeatCount="indefinite"
        />
      </polygon>

      <polygon
          :filter="`url(#${filterId})`"
          :fill="option.color1"
          opacity="0.5"
          :points="`
          ${(attrVal.w + option.borderTitleWidth) / 2 + 90}, 37 ${(attrVal.w + option.borderTitleWidth) / 2 + 69}, 37
          ${(attrVal.w + option.borderTitleWidth) / 2 + 63}, 46 ${(attrVal.w + option.borderTitleWidth) / 2 + 84}, 46
        `"
      >
        <animate
            attributeName="opacity"
            values="0.5;0.2;0.5"
            dur="2s"
            begin="0s"
            repeatCount="indefinite"
        />
      </polygon>

      <text
          :x="`${attrVal.w / 2}`"
          :y="option.borderTitleHeight"
          :fill="option.borderTitleColor"
          :font-size="option.borderTitleSize"
          text-anchor="middle"
          dominant-baseline="middle"
      >
        {{ option.borderTitle }}
      </text>

      <polygon
          :fill="option.color1"
          :filter="`url(#${filterId})`"
          :points="`
          7, ${53 + (attrVal.h - 167) / 2} 11, ${57 + (attrVal.h - 167) / 2}
          11, ${133 + (attrVal.h - 167) / 2} 7, ${137 + (attrVal.h - 167) / 2}
        `"
      />

      <polygon
          :fill="option.color1"
          :filter="`url(#${filterId})`"
          :points="`
          ${attrVal.w - 7}, ${53 + (attrVal.h - 167) / 2} ${attrVal.w - 11}, ${57 + (attrVal.h - 167) / 2}
          ${attrVal.w - 11}, ${133 + (attrVal.h - 167) / 2} ${attrVal.w - 7}, ${137 + (attrVal.h - 167) / 2}
        `"
      />
    </svg>
  </div>
</template>

<script lang='ts' setup>
import { computed, toRef } from 'vue'
import { useDataCenter, getFieldMap } from '@/components/_mixins/use-data-center'
import { useApiStore } from '@/store/api'
import { VDvBorder4 } from './dv-border-4'
import { getUUID } from '@/utils/util'

const props = defineProps<{
  com: VDvBorder4
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
const filterId = `border-box-03-filterId-${getUUID()}`
const option = computed(() => config.value.option)
const attrVal = computed(() => {
  return {
    w: attr.value.w,
    h: attr.value.h,
  }
})

</script>