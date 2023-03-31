<template>
  <div class="datav-wrapper" :style="wrapperStyle">
    <n-carousel
        :autoplay="config.autoplay"
        :interval="config.interval"
        :centered-slides="config.centeredSlides"
        :direction="config.direction"
        :dot-placement="config.dotPlacement"
        :dot-type="config.dotType"
        :draggable="config.draggable"
        :effect="config.effect"
        :slides-per-view="config.slidesPerview"
        :show-arrow="config.showArrow"
        :show-dots="config.showDots"
    >
      <n-image
          v-for="(url, index) in config.dataset"
          preview-disabled
          :key="index"
          :object-fit="config.fit"
          :src="url"
          :width="attr.w"
          :height="attr.h"
      ></n-image>
    </n-carousel>
  </div>
</template>

<script lang='ts' setup>
import {computed, PropType, toRef} from 'vue'
import { useDataCenter, getFieldMap } from '@/components/_mixins/use-data-center'
import { useApiStore } from '@/store/api'
import { ImgCarousel } from './img-carousel'

const props = defineProps({
  com: {
    type: Object as PropType<ImgCarousel>,
    required: true,
  },
})

const apiStore = useApiStore()
useDataCenter(props.com)

const config = toRef(props.com, 'config')
const attr = toRef(props.com, 'attr')

const dv_data = computed(() => {
  return apiStore.dataMap[props.com.id]?.source ?? {}
})

const dv_field = computed(() => {
  return getFieldMap(props.com.apis.source.fields)
})

const wrapperStyle = computed(() => {
  return {
    width: `${attr.value.w}px`,
    height: `${attr.value.h}px`,
  }
})




</script>
