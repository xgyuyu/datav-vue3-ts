<template>
  <div class="datav-wrapper" :style="wraperStyle">
    <video
        autoplay
        ref="vVideoRef"
        preload="auto"
        crossOrigin="anonymous"
        playsinline
        style="width: 100%; height: 100%; filter: hue-rotate(51.8644deg) saturate(1) brightness(1.7);">
      <source :src="src" type="video/webm">
    </video>
  </div>
</template>

<script lang='ts' setup>
import { computed, toRef, ref, onMounted } from 'vue'
import { useDataCenter, getFieldMap } from '@/components/_mixins/use-data-center'
import { useApiStore } from '@/store/api'
import { TreeGif } from './tree-gif'

const props = defineProps<{
  com: TreeGif
}>()

const apiStore = useApiStore()
useDataCenter(props.com)

const config = toRef(props.com, 'config')
const attr = toRef(props.com, 'attr')
const vVideoRef = ref(null)

onMounted(() => {
  vVideoRef.value.addEventListener('timeupdate', function () { //结束
    if (Math.floor(vVideoRef.value.currentTime) === 8) {
      vVideoRef.value.currentTime = 3.45;
      vVideoRef.value.play()
    }
  });
})


const dv_data = computed(() => {
  return apiStore.dataMap[props.com.id]?.source ?? {}
})

const wraperStyle = computed(() => {
  return {
    width: `${attr.value.w}px`,
    height: `${attr.value.h}px`,
  }
})
const src = computed(() => {
  return config.value.src
})

</script>
