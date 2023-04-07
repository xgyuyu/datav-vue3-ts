<template>
  <div class="setting-panel-gui">
    <g-field-collapse
        label="漏斗图"
    >
      <g-field
          label="排序"
          :level="2"
      >
        <n-select v-model:value="config.series[0].sort" :options="FunnelOrderEnumList" size="small" />
      </g-field>

    </g-field-collapse>
    <g-field-collapse
        label="区块"
    >
      <g-field
          label="边框大小"
          :level="2"
      >
        <n-input-number v-model:value="config.series[0].itemStyle.borderWidth" :min="0" :max="10" size="small" />
      </g-field>
      <g-field
          label="边框颜色"
          :level="2"
      >
        <n-color-picker v-model:value="config.series[0].itemStyle.borderColor" :modes="['hex']" size="small" />
      </g-field>
      <g-field
          label="间隔"
          :level="2"
      >
        <n-input-number v-model:value="config.series[0].gap" :min="0" :max="20" size="small" />
      </g-field>
    </g-field-collapse>
    <g-field-collapse
        label="标签"
    >
      <g-field
          label="是否显示"
          :level="2"
      >
        <n-checkbox v-model:checked="config.series[0].label.show" size="small">标签</n-checkbox>
      </g-field>
      <g-field
          label="位置"
          :level="2"
      >
        <n-select v-model:value="config.series[0].label.position" :options="FunnelLabelPositionEnumList" size="small" />
      </g-field>
      <g-field
          label="大小"
          :level="2"
      >
        <n-input-number v-model:value="config.series[0].label.fontSize" :min="0" size="small" />
      </g-field>
      <g-field
          label="悬停时大小"
          :level="2"
      >
        <n-input-number v-model:value="config.series[0].emphasis.label.fontSize" :min="0" size="small" />
      </g-field>
    </g-field-collapse>
  </div>
</template>
<script lang='ts'>
import { defineComponent, PropType, toRef, reactive, computed } from 'vue'
import Funnel, {FunnelOrderEnumList, FunnelLabelPositionEnumList} from './funnel'

export default defineComponent({
  name: 'VFunnelProp',
  props: {
    com: {
      type: Object as PropType<Funnel>,
      required: true,
    },
  },
  setup(props) {
    const config = toRef(props.com, 'config')

    return{
      config,
      FunnelOrderEnumList,
      FunnelLabelPositionEnumList
    }
  }
})
</script>