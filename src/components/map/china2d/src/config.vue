<template>
  <div class="setting-panel-gui">
    <g-field-collapse
      label="全局配置"
    >
      <g-field
        :level="2"
        label="地图背景"
      >
        <g-color-picker
          v-model="config.global.bgColor"
        />
      </g-field>
      <g-field
        :level="2"
        label="地图缩放"
        :is-flat="true"
      >
        <g-slider-range
          v-model="config.global.zoom.range"
          :min="0"
          :max="20"
          :step="0.1"
          inline="inline-single"
          label="缩放范围 [0, 20]"
        />
        <g-slider
          v-model="config.global.zoom.value"
          :min="0"
          :max="20"
          :step="0.1"
          inline="inline-single"
          label="默认级别 [0, 20]"
        />
      </g-field>
      <g-field
        :level="2"
        label="地图中心"
        :is-flat="true"
      >
        <g-slider
          v-model="config.global.center.lng"
          :min="-180"
          :max="180"
          :step="0.1"
          inline="inline-single"
          label="经度"
        />
        <g-slider
          v-model="config.global.center.lat"
          :min="-90"
          :max="90"
          :step="0.1"
          inline="inline-single"
          label="纬度"
        />
      </g-field>
    </g-field-collapse>
    <g-field-collapse
      label="弹框设置"
    >
      <g-field
        :level="2"
        label="文本样式"
        :is-flat="true"
      >
        <g-select
          v-model="config.tooltip.textStyle.fontFamily"
          :data="fontFamilys"
          inline="inline"
          label="字体"
        />
        <g-select
          v-model="config.tooltip.textStyle.fontWeight"
          :data="fontWeights"
          inline="inline"
          label="文字粗细"
        />
        <g-input-number
          v-model="config.tooltip.textStyle.fontSize"
          :min="0"
          :max="100"
          :step="1"
          suffix="px"
          inline="inline"
          label="字号"
        />
        <g-color-picker
          v-model="config.tooltip.textStyle.color"
          inline="inline"
          label="颜色"
        />
      </g-field>
      <g-field
        :level="2"
        label="行高比例"
      >
        <g-slider
          v-model="config.tooltip.lineHeight"
          :min="0.5"
          :max="5"
          :step="0.1"
        />
      </g-field>
      <g-field
        :level="2"
        label="圆角半径"
      >
        <g-slider
          v-model="config.tooltip.borderRadius"
          :min="0"
          :max="20"
          :step="1"
        />
      </g-field>
      <g-field
        :level="2"
        label="外边距"
        :is-flat="true"
      >
        <g-input-number
          v-model="config.tooltip.padding.top"
          :min="0"
          :max="100"
          :step="1"
          inline="inline"
          label="上"
        />
        <g-input-number
          v-model="config.tooltip.padding.bottom"
          :min="0"
          :max="100"
          :step="1"
          inline="inline"
          label="下"
        />
        <g-input-number
          v-model="config.tooltip.padding.left"
          :min="0"
          :max="100"
          :step="1"
          inline="inline"
          label="左"
        />
        <g-input-number
          v-model="config.tooltip.padding.right"
          :min="0"
          :max="100"
          :step="1"
          inline="inline"
          label="右"
        />
      </g-field>
      <g-field
        :level="2"
        label="背景色"
      >
        <g-color-picker
          v-model="config.tooltip.bgColor"
        />
      </g-field>
    </g-field-collapse>
    <g-field-collapse
      label="交互配置"
    >
      <g-field
        :level="2"
        label="开启拖拽"
      >
        <n-switch
          v-model:value="config.interactive.dragging"
        />
      </g-field>
      <g-field
        :level="2"
        label="开启缩放"
      >
        <n-switch
          v-model:value="config.interactive.scrollWheelZoom"
        />
      </g-field>
      <g-field
        :level="2"
        label="地图交互"
      >
        <n-switch
          v-model:value="config.interactive.isInteractive"
        />
      </g-field>
    </g-field-collapse>
  </div>
</template>

<script lang='ts'>
import { defineComponent, PropType, toRef } from 'vue'
import {
  fontFamilys,
  fontWeights,
} from '@/data/select-options'
import { China2d } from './china2d'

export default defineComponent({
  name: 'VChina2dProp',
  props: {
    com: {
      type: Object as PropType<China2d>,
      required: true,
    },
  },
  setup(props) {
    const config = toRef(props.com, 'config')

    return {
      config,

      fontFamilys,
      fontWeights,
    }
  },
})
</script>
