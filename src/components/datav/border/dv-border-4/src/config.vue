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
        label="文字内容"
    >
      <g-input
          v-model="config.option.borderTitle"
      />
    </g-field>
    <g-field
        :level="1"
        label="文字颜色"
    >
      <g-color-picker
          v-model="config.option.borderTitleColor"
      />
    </g-field>
    <g-field
        :level="1"
        label="文字大小"
    >
      <g-input-number
          v-model="config.option.borderTitleSize"
          :min="14"
          :max="30"
          :step="1"
          inline="inline"
      />
    </g-field>
  </div>
</template>
<script lang='ts' setup>
import { toRef } from 'vue'
import VDvBorder4 from "./dv-border-4"

const props = defineProps<{
  com: VDvBorder4
}>();
const config = toRef(props.com, 'config')


</script>