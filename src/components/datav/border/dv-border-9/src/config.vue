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
  </div>
</template>
<script lang='ts' setup>
import { toRef } from 'vue'
import DvBorder9 from "./dv-border-9"

const props = defineProps<{
  com: DvBorder9
}>();
const config = toRef(props.com, 'config')


</script>