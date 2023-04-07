<template>
  <div class="datav-wrapper" :style="wraperStyle">
    <div :style="imgBoxStyle"></div>
  </div>
</template>

<script lang='ts'>
import { defineComponent, PropType, computed, toRef } from 'vue'
import { VDvDecorate6 } from './dv-decorate-6'

export default defineComponent({
  name: 'VDvDecorate6',
  props: {
    com: {
      type: Object as PropType<VDvDecorate6>,
      required: true,
    },
  },
  setup(props) {
    const config = toRef(props.com, 'config')
    const attr = toRef(props.com, 'attr')

    const wraperStyle = computed(() => {
      return {
        transform: 'translateZ(0px)',
        width: `${attr.value.w}px`,
        height: `${attr.value.h}px`,
      }
    })

    const imgBoxStyle = computed(() => {
      return {
        width: '100%',
        height: '100%',
        opacity: config.value.global.opacity,
        'background-image': `url(${config.value.global.img})`,
        'background-size': '100%',
        'background-repeat': 'no-repeat',
        'background-position': 'center',
        transform: config.value.global.isRotate ? 'scale(1) perspective(500px) rotateX(0deg) rotateY(0deg) rotateZ(0deg)' : '',
        animation: config.value.global.isRotate ? `${config.value.global.dur}s rotating 0s linear infinite`: '',
        // ...gif.css,
      }
    })

    return {
      wraperStyle,
      imgBoxStyle,
    }
  },
})
</script>
