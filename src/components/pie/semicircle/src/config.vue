<template>
  <div class="setting-panel-gui">
    <g-field
        :level="2"
        label="半圆开始"
    >
      <g-input-number
          v-model="config.option.startAngle"
          :min="-180"
          :max="180"
          :step="1"
      />
    </g-field>
    <g-field
        :level="2"
        label="半圆结束"
    >
      <g-input-number
          v-model="config.option.endAngle"
          :min="-180"
          :max="180"
          :step="1"
      />
    </g-field>
    <g-field
        :level="2"
        label="大小"
    >
      <g-input-number
          v-model="config.option.size"
          :min="0"
          :max="360"
          :step="1"
      />
    </g-field>
    <g-field
        :level="2"
        label="位置调整"
    >
      <g-input-number
          v-model="config.option.center[0]"
          :min="0"
          :max="100"
          :step="1"
      />
      <g-input-number
          v-model="config.option.center[1]"
          :min="0"
          :max="100"
          :step="1"
      />
    </g-field>
    <g-field-collapse
        label="颜色配置"
    >
      <g-field
          :level="2"
          v-for="(v, i) in config.colorList"
          :label="`颜色${i+1}`"
      >
        <g-color-picker
            v-model="config.colorList[i]"
        />
      </g-field>
    </g-field-collapse>
  </div>
</template>
<script lang='ts' setup>
import { toRef } from 'vue'
import Semicircle from './semicircle'
const props = defineProps<{
  com: Semicircle
}>();
const config = toRef(props.com, 'config')
</script>