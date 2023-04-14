<template>
  <div class="setting-panel-gui">
    <g-field
        :level="2"
        label="倾斜角度"
    >
      <g-input-number
          v-model="config.plotOptions.alpha"
          :min="0"
          :max="360"
          :step="1"
      />
    </g-field>
    <g-field
        :level="2"
        label="基础高度"
    >
      <g-input-number
          v-model="config.plotOptions.depth"
          :min="0"
          :max="100"
          :step="1"
      />
    </g-field>
    <g-field
        :level="2"
        label="外圈直径"
    >
      <g-input-number
          v-model="config.plotOptions.size"
          :min="0"
          :max="100"
          :step="1"
      />
    </g-field>
    <g-field
        :level="2"
        label="内圈直径"
    >
      <g-input-number
          v-model="config.plotOptions.innerSize"
          :min="0"
          :max="100"
          :step="1"
      />
    </g-field>
    <g-field
        :level="2"
        label="位置调整"
    >
      <g-input-number
          v-model="config.plotOptions.center[0]"
          :min="0"
          :max="100"
          :step="1"
      />
      <g-input-number
          v-model="config.plotOptions.center[1]"
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
import Pie3d from './pie3d'
const props = defineProps<{
  com: Pie3d
}>();
const config = toRef(props.com, 'config')
</script>