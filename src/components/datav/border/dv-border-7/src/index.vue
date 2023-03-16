<template>
  <div class="datav-wrapper" :style="wraperStyle">
    <svg :width="wraperStyle.width" :height="wraperStyle.height">
      <defs>
        <linearGradient :id="filterId" x1="0%" y1="0%" x2="100%" y2="100%">
          <animate
              attributeName="x1"
              values="0%;100%;0%"
              dur="10s"
              begin="0s"
              repeatCount="indefinite"
          />

          <animate
              attributeName="x2"
              values="100%;0%;100%"
              dur="10s"
              begin="0s"
              repeatCount="indefinite"
          />

          <stop offset="0%" :stop-color="option.color1">
            <animate
                attributeName="stop-color"
                :values="`${option.color1};${option.color2};${option.color1}`"
                dur="10s"
                begin="0s"
                repeatCount="indefinite"
            />
          </stop>
          <stop offset="100%" :stop-color="option.color2">
            <animate
                attributeName="stop-color"
                :values="`${option.color2};${option.color1};${option.color2}`"
                dur="10s"
                begin="0s"
                repeatCount="indefinite"
            />
          </stop>
        </linearGradient>

        <mask :id="maskId">
          <polyline
              stroke="#fff"
              stroke-width="3"
              fill="transparent"
              :points="`8, ${attrVal.h * 0.4} 8, 3, ${attrVal.w * 0.4 + 7}, 3`"
          />
          <polyline
              fill="#fff"
              :points="
              `8, ${attrVal.h * 0.15} 8, 3, ${attrVal.w * 0.1 + 7}, 3
              ${attrVal.w * 0.1}, 8 14, 8 14, ${attrVal.h * 0.15 - 7}
            `"
          />

          <polyline
              stroke="#fff"
              stroke-width="3"
              fill="transparent"
              :points="`${attrVal.w * 0.5}, 3 ${attrVal.w - 3}, 3, ${attrVal.w - 3}, ${attrVal.h * 0.25}`"
          />
          <polyline
              fill="#fff"
              :points="`
              ${attrVal.w * 0.52}, 3 ${attrVal.w * 0.58}, 3
              ${attrVal.w * 0.58 - 7}, 9 ${attrVal.w * 0.52 + 7}, 9
            `"
          />
          <polyline
              fill="#fff"
              :points="`
              ${attrVal.w * 0.9}, 3 ${attrVal.w - 3}, 3 ${attrVal.w - 3}, ${attrVal.h * 0.1}
              ${attrVal.w - 9}, ${attrVal.h * 0.1 - 7} ${attrVal.w - 9}, 9 ${attrVal.w * 0.9 + 7}, 9
            `"
          />

          <polyline
              stroke="#fff"
              stroke-width="3"
              fill="transparent"
              :points="`8, ${attrVal.h * 0.5} 8, ${attrVal.h - 3} ${attrVal.w * 0.3 + 7}, ${attrVal.h - 3}`"
          />
          <polyline
              fill="#fff"
              :points="`
              8, ${attrVal.h * 0.55} 8, ${attrVal.h * 0.7}
              2, ${attrVal.h * 0.7 - 7} 2, ${attrVal.h * 0.55 + 7}
            `"
          />

          <polyline
              stroke="#fff"
              stroke-width="3"
              fill="transparent"
              :points="`${attrVal.w * 0.35}, ${attrVal.h - 3} ${attrVal.w - 3}, ${attrVal.h - 3} ${attrVal.w - 3}, ${attrVal.h * 0.35}`"
          />
          <polyline
              fill="#fff"
              :points="`
              ${attrVal.w * 0.92}, ${attrVal.h - 3} ${attrVal.w - 3}, ${attrVal.h - 3} ${attrVal.w - 3}, ${attrVal.h * 0.8}
              ${attrVal.w - 9}, ${attrVal.h * 0.8 + 7} ${attrVal.w - 9}, ${attrVal.h - 9} ${attrVal.w * 0.92 + 7}, ${attrVal.h - 9}
            `"
          />
        </mask>
      </defs>

      <polygon fill="transparent" :points="`
        15, 9 ${attrVal.w * 0.1 + 1}, 9 ${attrVal.w * 0.1 + 4}, 6 ${attrVal.w * 0.52 + 2}, 6
        ${attrVal.w * 0.52 + 6}, 10 ${attrVal.w * 0.58 - 7}, 10 ${attrVal.w * 0.58 - 2}, 6
        ${attrVal.w * 0.9 + 2}, 6 ${attrVal.w * 0.9 + 6}, 10 ${attrVal.w - 10}, 10 ${attrVal.w - 10}, ${attrVal.h * 0.1 - 6}
        ${attrVal.w - 6}, ${attrVal.h * 0.1 - 1} ${attrVal.w - 6}, ${attrVal.h * 0.8 + 1} ${attrVal.w - 10}, ${attrVal.h * 0.8 + 6}
        ${attrVal.w - 10}, ${attrVal.h - 10} ${attrVal.w * 0.92 + 7}, ${attrVal.h - 10}  ${attrVal.w * 0.92 + 2}, ${attrVal.h - 6}
        11, ${attrVal.h - 6} 11, ${attrVal.h * 0.15 - 2} 15, ${attrVal.h * 0.15 - 7}
      `"/>

      <rect x="0" y="0" :width="attrVal.w" :height="attrVal.w" :fill="`url(#${filterId})`" :mask="`url(#${maskId})`"/>
    </svg>

  </div>
</template>

<script lang='ts' setup>
import { computed, toRef } from 'vue'
import { useDataCenter, getFieldMap } from '@/components/_mixins/use-data-center'
import { useApiStore } from '@/store/api'
import { VDvBorder7 } from './dv-border-7'
import { getUUID } from '@/utils/util'

const props = defineProps<{
  com: VDvBorder7
}>()

const apiStore = useApiStore()
useDataCenter(props.com)

const filterId = `border-box-07-filter-${getUUID()}`
const maskId = `border-box-07-mask-${getUUID()}`
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