<template>
  <div class="datav-wrapper" :style="wraperStyle">
    <svg :width="wraperStyle.width" :height="wraperStyle.height">
      <polyline
          :stroke-width="option.lineHeight"
          :fill="option.color1"
          :stroke="option.color2"
          :points="`15.5 6.5 20.5 0.5 50.5 0.5 55.5 6.5 15.5 6.5`"
      />
      <polygon
          :stroke-width="option.lineHeight"
          :fill="option.color1"
          :stroke="option.color2"
          :points="`15.5 ${attrVal.h - 6.5} 20.5 ${attrVal.h - 0.5} 50.5 ${attrVal.h - 0.5} 55.5 ${attrVal.h - 6.5} 15.5 ${attrVal.h - 6.5}`"
      />
      <polygon
          :stroke-width="option.lineHeight"
          :fill="option.color1"
          :stroke="option.color2"
          :points="`${attrVal.w - 15.5} 6.5 ${attrVal.w - 20.5} 0.5 ${attrVal.w - 50.5} 0.5 ${attrVal.w - 55.5} 6.5 ${attrVal.w - 15.5} 6.5`"
      />
      <polygon
          :stroke-width="option.lineHeight"
          :fill="option.color1"
          :stroke="option.color2"
          :points="`${attrVal.w - 15.5} ${attrVal.h - 6.5} ${attrVal.w - 20.5} ${attrVal.h - 0.5} ${attrVal.w - 50.5} ${attrVal.h - 0.5} ${attrVal.w - 55.5} ${attrVal.h - 6.5} ${attrVal.w - 15.5} ${attrVal.h - 6.5}`"
      />
      <polygon
          :stroke-width="option.lineHeight"
          :fill="option.color1"
          :stroke="option.color2"
          :points="`15.5 6.5 0.5 ${attrVal.h / 2} 15.5 ${attrVal.h - 6.5} ${attrVal.w - 15.5} ${attrVal.h - 6.5} ${attrVal.w - 0.5} ${attrVal.h / 2} ${attrVal.w - 15.5} 6.5 15.5 6.5`"
      />
      <polyline
          fill="transparent"
          :stroke="option.color2"
          :points="`20.5 14.5 8.5 ${attrVal.h / 2} 20.5 ${attrVal.h - 14.5}`" />
      <polyline
          fill="transparent"
          :stroke="option.color2"
          :points="`${attrVal.w - 20.5} 14.5 ${attrVal.w - 8.5} ${attrVal.h / 2} ${attrVal.w - 20.5} ${attrVal.h - 14.5}`" />
    </svg>
    <span :style="`color: ${option.textColor};font-size: ${option.textSize}px;line-height: 20px;vertical-align: super;`">
      {{ option.dataset }}
    </span>
  </div>
</template>

<script lang='ts' setup>
import { computed, toRef } from 'vue'
import { useDataCenter, getFieldMap } from '@/components/_mixins/use-data-center'
import { useApiStore } from '@/store/api'
import { VDvDecorate5 } from './dv-decorate-5'

const props = defineProps<{
  com: VDvDecorate5
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
    w: attr.value.w,
    h: attr.value.h,
  }
})

</script>
<style lang="scss" scoped>
.datav-wrapper{
  position: relative;
  display: flex;
  justify-content: center;
  align-items: center;

  svg {
    position: absolute;
    z-index: -1;
  }
}
</style>