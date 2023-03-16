<template>
  <div class="setting-panel-gui">
    <g-field
        :level="1"
        label="颜色1"
    >
      <g-color-picker
          v-model="config.option.color1"
      />
    </g-field>
    <g-field
        :level="1"
        label="颜色2"
    >
      <g-color-picker
          v-model="config.option.color2"
      />
    </g-field>
    <g-field
        :level="1"
        label="速度(s)"
    >
      <g-input-number
          v-model="config.option.dur"
          :min="2"
          :max="10"
          :step="1"
          inline="inline"
      />
    </g-field>
    <g-field
        :level="1"
        label="线条宽度"
    >
      <g-input-number
          v-model="config.option.lineHeight"
          :min="2"
          :max="10"
          :step="1"
          inline="inline"
      />
    </g-field>
  </div>
</template>
<script lang='ts' setup>
import { toRef } from 'vue'
import DvBorder8 from "./dv-border-8"

const props = defineProps<{
  com: DvBorder8
}>();
const config = toRef(props.com, 'config')


</script>