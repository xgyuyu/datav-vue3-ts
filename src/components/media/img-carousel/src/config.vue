<template>
  <div class="setting-panel-gui">
    <g-field-collapse
        label="图片路径"
    >
      <g-field
          :level="2"
      >
        <template v-for="(item, index) in config.dataset" :key="index">
          <n-input-group>
            <n-input v-model:value="config.dataset[index]" size="small" placeholder="请输入图片地址"></n-input>
            <n-button ghost @click="config.dataset.splice(index, 1)"> - </n-button>
          </n-input-group>
        </template>
        <n-button size="small" @click="config.dataset.push('')"> + 新增</n-button>
      </g-field>
    </g-field-collapse>
    <g-field-collapse
        label="轮播属性"
    >
      <g-field
          :level="2"
          label="播放器"
      >
        <n-space>
          <n-switch v-model:value="config.autoplay" size="small" />
          <n-text>自动播放</n-text>
        </n-space>
      </g-field>
      <g-field
          :level="2"
          label="间隔时间"
      >
        <n-input-number v-model:value="config.interval" size="small" placeholder="">
          <template #suffix> 毫秒 </template>
        </n-input-number>
      </g-field>
      <g-field
          :level="2"
          label="间隔时间"
      >
        <n-select v-model:value="config.direction" :options="directions" placeholder="选择方向" />
      </g-field>
      <g-field
          :level="2"
          label="过渡效果"
      >
        <n-select v-model:value="config.effect" :options="effects" placeholder="选择方向" />
      </g-field>
      <g-field
          :level="2"
          label="居中显示"
      >
        <n-switch v-model:value="config.centeredSlides" size="small" />
      </g-field>
      <g-field
          :level="2"
          label="图片样式"
      >
        <n-select v-model:value="config.fit" :options="fitList" placeholder="样式" />
      </g-field>
    </g-field-collapse>
  </div>
</template>
<script lang='ts'>
import { defineComponent, PropType, toRef } from 'vue'
import ImgCarousel from "./img-carousel";

const directions = [
  {
    label: '水平方向',
    value: 'horizontal'
  },
  {
    label: '垂直方向',
    value: 'vertical'
  }
]
const effects = [
  {
    label: 'slide',
    value: 'slide'
  },
  {
    label: 'fade',
    value: 'fade'
  },
  {
    label: 'card',
    value: 'card'
  },
  {
    label: 'custom',
    value: 'custom'
  }
]
// 适应类型
const fitList = [
  {
    value: 'fill',
    label: 'fill'
  },
  {
    value: 'contain',
    label: 'contain'
  },
  {
    value: 'cover',
    label: 'cover'
  },
  {
    value: 'scale-down',
    label: 'scale-down'
  },
  {
    value: 'none',
    label: 'none'
  }
]

export default defineComponent({
  name: 'VMainImgProp',
  props: {
    com: {
      type: Object as PropType<ImgCarousel>,
      required: true,
    },
  },
  setup(props) {
    const config = toRef(props.com, 'config')
    return {
      config,
      directions,
      effects,
      fitList,
    }
  }
})
</script>