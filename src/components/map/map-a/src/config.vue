<template>
  <div class="setting-panel-gui">
    <g-field-collapse
        label="基础"
    >
<!--      <g-field-->
<!--          :level="2"-->
<!--          label="语言类型"-->
<!--      >-->
<!--        <g-select-->
<!--            v-model="config.mapOptions.lang"-->
<!--            :data="langOptions"-->
<!--        />-->
<!--      </g-field>-->
      <g-field
          :level="2"
          label="Key"
      >
        <g-input
            v-model="config.mapOptions.amapKey"
            label="请务必使用自己的高德应用 key"
        />
      </g-field>
    </g-field-collapse>
    <g-field-collapse
        label="地图"
    >
      <g-field
          :level="2"
          label="主题"
      >
        <g-select
            v-model="config.mapOptions.amapStyleKey"
            :data="themeOptions"
        />
      </g-field>
      <g-field
          :level="2"
          label="内容"
      >
        <n-checkbox-group v-model:value="config.mapOptions.features">
          <n-space item-style="display: flex;">
            <n-checkbox :value="item.id" :label="item.value" v-for="(item, index) in featuresOptions" :key="index" />
          </n-space>
        </n-checkbox-group>
      </g-field>
      <g-field
          :level="2"
          label="位置"
      >
        <g-input-number
            label="经度"
            v-model="config.mapOptions.amapLon"
            :step="0.1"
            suffix="度"
        />
        <g-input-number
            label="纬度"
            v-model="config.mapOptions.amapLat"
            :step="0.1"
            suffix="度"
        />
      </g-field>
      <g-field
          :level="2"
          label="初始缩放"
      >
        <g-input-number
            v-model="config.mapOptions.amapZindex"
            :min="0"
        />
      </g-field>
      <g-field
          :level="2"
          label="模式"
      >
        <n-radio-group v-model:value="config.mapOptions.viewMode" name="radiogroup">
          <n-space>
            <n-radio v-for="song in viewModeOptions" :key="song.id" :value="song.id">
              {{ song.value }}
            </n-radio>
          </n-space>
        </n-radio-group>
      </g-field>
      <template v-if="config.mapOptions.viewMode === '3D'">
        <g-field
            :level="2"
            label="天空色"
        >
          <g-color-picker
              v-model="config.mapOptions.skyColor"
              label="颜色"
          />
        </g-field>
        <g-field
            :level="2"
            label="俯仰角"
        >
          <g-input-number
              v-model="config.mapOptions.pitch"
              :min="0"
              :max="100"
              :step="1"
          />
        </g-field>
      </template>
    </g-field-collapse>
    <g-field-collapse
        label="标记"
    >
      <g-field
          :level="2"
          label="样式"
      >
        <g-select
            v-model="config.mapOptions.mapMarkerType"
            :data="MarkerOptions"
        />
      </g-field>
      <g-field
          v-if="config.mapOptions.mapMarkerType === MarkerEnum.CIRCLE_MARKER"
          :level="2"
          label="颜色"
      >
        <g-color-picker
            v-model="config.mapOptions.marker.fillColor"
        />
      </g-field>
    </g-field-collapse>
  </div>
</template>
<script lang='ts'>
import { defineComponent, PropType, toRef } from 'vue'
import { MarkerEnum, ThemeEnum, LangEnum, ViewModeEnum, FeaturesEnum, MapA } from './map-a'
const themeOptions = [
  {
    id: ThemeEnum.NORMAL,
    value: '标准'
  },
  {
    id: ThemeEnum.DARK,
    value: '幻影黑'
  },
  {
    id: ThemeEnum.LIGHT,
    value: '月光银'
  },
  {
    id: ThemeEnum.WHITES_MOKE,
    value: '远山黛'
  },
  {
    id: ThemeEnum.FRESH,
    value: '草色青'
  },
  {
    id: ThemeEnum.GREY,
    value: '雅士灰'
  },
  {
    id: ThemeEnum.GRAFFITI,
    value: '涂鸦'
  },
  {
    id: ThemeEnum.MACARON,
    value: '马卡龙'
  },
  {
    id: ThemeEnum.BLUE,
    value: '靛青蓝'
  },
  {
    id: ThemeEnum.DARKBLUE,
    value: '极夜蓝'
  },
  {
    id: ThemeEnum.WINE,
    value: '酱籽'
  }
]

const langOptions = [
  {
    id: LangEnum.ZH_CN,
    value: '中文简体'
  },
  {
    id: LangEnum.EN,
    value: '英文'
  },
  {
    id: LangEnum.ZH_EN,
    value: '中英文对照'
  }
]

const viewModeOptions = [
  {
    id: ViewModeEnum.PLANE,
    value: '2D'
  },
  {
    id: ViewModeEnum.STEREOSCOPIC,
    value: '3D'
  }
]

const featuresOptions = [
  {
    id: FeaturesEnum.BG,
    value: '显示地图背景'
  },
  {
    id: FeaturesEnum.POINT,
    value: '显示标识'
  },
  {
    id: FeaturesEnum.ROAD,
    value: '显示道路'
  },
  {
    id: FeaturesEnum.BUILDING,
    value: '显示建筑'
  }
]

const MarkerOptions = [
  {
    id: MarkerEnum.CIRCLE_MARKER,
    value: '圆形标点'
  },
  {
    id: MarkerEnum.MARKER,
    value: '定位标点'
  },
  {
    id: MarkerEnum.NONE,
    value: '隐藏标点'
  }
]
export default defineComponent({
  name: 'VMapAProp',
  props: {
    com: {
      type: Object as PropType<MapA>,
      required: true,
    },
  },
  setup(props) {
    const config = toRef(props.com, 'config')
    return {
      config,
      langOptions,
      themeOptions,
      viewModeOptions,
      featuresOptions,
      MarkerOptions,
      MarkerEnum,
    }
  }
})

</script>