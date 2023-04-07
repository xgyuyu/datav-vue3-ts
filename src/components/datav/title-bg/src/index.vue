<template>
  <div class="datav-wrapper" :style="wraperStyle">
    <div class="bg-inner" style="background: none; width: 100%; height: 100%;"></div>
  </div>
</template>

<script lang='ts' setup>
import { computed, toRef } from 'vue'
import { useDataCenter, getFieldMap } from '@/components/_mixins/use-data-center'
import { useApiStore } from '@/store/api'
import { TitleBg } from './title-bg'

const props = defineProps<{
  com: TitleBg
}>()

const apiStore = useApiStore()
useDataCenter(props.com)

const config = toRef(props.com, 'config')
const attr = toRef(props.com, 'attr')

const wraperStyle = computed(() => {
  const style = {
    transform: 'translateZ(0px)',
    width: `${attr.value.w}px`,
    height: `${attr.value.h}px`,
    background: `url(${config.value.img})`,
    'background-size': '100% 100%',
    'background-repeat': 'no-repeat',
    'background-position': 'center',
  }
  return style
})

</script>
