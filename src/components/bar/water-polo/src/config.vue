<template>
  <div class="setting-panel-gui">
    <g-field
        :level="1"
        label="水球形状类型"
    >
      <g-select
          v-model="config.series[0].shape"
          :data="shapes"
      />
    </g-field>
    <g-field
        :level="1"
        label="颜色1"
    >
      <g-color-picker
          v-model="config.series[0].color[0].colorStops[0].color"
      />
    </g-field>
    <g-field
        :level="1"
        label="颜色2"
    >
      <g-color-picker
          v-model="config.series[0].color[0].colorStops[1].color"
      />
    </g-field>
    <g-field
        :level="1"
        label="背景"
    >
      <g-color-picker
          v-model="config.series[0].backgroundStyle.color"
      />
    </g-field>
    <g-field
        :level="1"
        label="数值"
    >
      <g-input-number
          v-model="config.series[0].data[0]" :step="0.01"
      />
    </g-field>
    <g-field
        :level="1"
        label="文字大小"
    >
      <g-input-number
          v-model="config.series[0].label.normal.textStyle.fontSize" :step="1"
      />
    </g-field>
    <g-field
        :level="1"
        label="文字颜色"
    >
      <g-color-picker
          v-model="config.series[0].label.normal.textStyle.color"
      />
    </g-field>
  </div>
</template>
<script lang='ts' setup>
import { toRef } from 'vue'
import WaterPolo, {shapes} from "./water-polo"


const props = defineProps<{
  com: WaterPolo
}>();
const config = toRef(props.com, 'config')
</script>