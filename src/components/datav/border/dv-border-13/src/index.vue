<template>
  <div class="datav-wrapper" :style="wraperStyle">
    <div class="bg-inner" style="background: none; width: 100%; height: 100%;"></div>
  </div>
</template>

<script lang='ts'>
import { defineComponent, PropType, computed, toRef } from 'vue'
import { VDvBorder13, presetImages } from './dv-border-13'

export default defineComponent({
  name: 'DvBorder13',
  props: {
    com: {
      type: Object as PropType<VDvBorder13>,
      required: true,
    },
  },
  setup(props) {
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

    return {
      wraperStyle,
    }
  },
})
</script>
