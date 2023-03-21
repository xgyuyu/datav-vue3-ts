<template>
  <div class="setting-panel-gui">
    <g-field-collapse
        label="进度圆环"
    >
      <g-field
          :level="2"
          label="数值"
      >
        <g-input-number
            v-model="config.dataset"
            :min="0"
            :max="100"
            :step="1"
        />
      </g-field>
      <g-field
          :level="2"
          label="单位"
      >
        <g-input
            v-model="config.unit"
        />
      </g-field>
    </g-field-collapse>
    <g-field-collapse
        label="轨道"
    >
      <g-field
          :level="2"
          label="形状"
      >
        <g-select v-model="config.type" :data="types" placeholder="选择形状" />
      </g-field>
      <g-field
          :level="2"
          label="进度条颜色"
      >
        <g-color-picker v-model="config.color"/>
      </g-field>
      <g-field
          :level="2"
          label="轨道颜色"
      >
        <g-color-picker v-model="config.railColor"/>
      </g-field>
      <g-field
          :level="2"
          label="轨道偏移"
          v-if="config.type !== types[0].id"
      >
        <g-input-number
            v-model="config.offsetDegree"
            :min="0"
            :max="100"
            :step="1"
        />
      </g-field>
    </g-field-collapse>
    <g-field-collapse
        label="指标"
    >
      <g-field
          :level="2"
          label="文本颜色"
      >
        <g-color-picker v-model="config.indicatorTextColor"/>
      </g-field>
      <g-field
          :level="2"
          label="文本大小"
      >
        <g-input-number v-model="config.indicatorTextSize"/>
      </g-field>
    </g-field-collapse>
  </div>
</template>
<script lang='ts' setup>
import { toRef } from 'vue'
import Process, {types} from "./process"

const props = defineProps<{
  com: Process
}>();
const config = toRef(props.com, 'config')


</script>