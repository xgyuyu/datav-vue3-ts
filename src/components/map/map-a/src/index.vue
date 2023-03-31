<template>
  <div ref="vChartRef" class="datav-wrapper" :style="wraperStyle"></div>
</template>

<script lang='ts' setup>
import {ref, PropType, toRef, watch, computed, onMounted} from 'vue';
import AMapLoader from '@amap/amap-jsapi-loader';
import { useDataCenter, getFieldMap } from '@/components/_mixins/use-data-center';
import { useApiStore } from '@/store/api';
import { MapA, MarkerEnum } from './map-a';
import {isArray} from '@/utils/util'

const props = defineProps({
  com: {
    type: Object as PropType<MapA>,
    required: true,
  },
})

const apiStore = useApiStore()
useDataCenter(props.com)

const config = toRef(props.com, 'config')
const attr = toRef(props.com, 'attr')

const wrapperStyle = computed(() => {
  return {
    transform: 'translateZ(0)',
    width: `${attr.value.w}px`,
    height: `${attr.value.h}px`,
  }
})

const dv_data = computed(() => {
  return apiStore.dataMap[props.com.id]?.source ?? {}
})

const dv_field = computed(() => {
  return getFieldMap(props.com.apis.source.fields)
})

let option = computed(() => config.value.mapOptions)
let dataset = computed(() => config.value.dataset)
const wraperStyle = computed(() => {
  return {
    width: `${attr.value.w}px`,
    height: `${attr.value.h}px`,
  }
})
let mapIns: null = null
let markers: any = []
let AMapIns: any = null
const vChartRef = ref<HTMLElement>()

const initMap = (newData: any) => {
  // 初始化
  const AMapLoader1 = AMapLoader.load({
    key: option.value.amapKey, //api服务key--另外需要在public中使用安全密钥！！！
    version: '1.4.8', // 指定要加载的 JSAPI 的版本，缺省时默认为 1.4.15
    plugins: ['AMap.PlaceSearch', 'AMap.AutoComplete'] // 需要使用的的插件列表
  })
  AMapLoader1.then(AMap => {
    AMapIns = AMap
    mapIns = new AMap.Map(vChartRef.value, {
      resizeEnable: true,
      zoom: option.value.amapZindex, // 地图显示的缩放级别
      center: [option.value.amapLon, option.value.amapLat],
      mapStyle: `amap://styles/${option.value.amapStyleKey}`, //自定义地图的显示样式
      lang: option.value.lang,
      features: option.value.features,
      pitch: option.value.pitch, // 地图俯仰角度，有效范围 0 度- 83 度
      skyColor: option.value.skyColor,
      viewMode: option.value.viewMode, // 地图模式
      willReadFrequently: true
    })
    dataHandle(dataset)
  }).catch(e => {})
}

const dataHandle = (newData: any) => {
  if (!mapIns && !AMapIns) {
    initMap(option.value)
    return
  }
  if (isArray(newData.value.markers)) {
    // 先清除旧标记
    mapIns.remove(markers)
    markers = []
    // 记录新标记
    if (option.value.mapMarkerType === MarkerEnum.MARKER) {
      newData.value.markers.forEach((markerItem: any) => {
        const markerInstance = new AMapIns.Marker({
          position: [markerItem.position[0], markerItem.position[1]],
          offset: new AMapIns.Pixel(-13, -30),
        })
        markers.push(markerInstance)
        markerInstance.setMap(mapIns)
      })
    } else if (option.value.mapMarkerType === MarkerEnum.CIRCLE_MARKER) {
      newData.value.markers.forEach((markerItem: any) => {
        const markerInstance = new AMapIns.CircleMarker({
          center: [markerItem.position[0], markerItem.position[1]],
          radius: markerItem.value,
          ...option.value.marker
        })
        markers.push(markerInstance)
        markerInstance.setMap(mapIns)
      })
    }
  }
}
// DOM 渲染之后进行初始化
onMounted(() => {
  try {
    initMap()
  } catch (error) {
    console.log(error)
  }
})
watch(
    () => dataset,
    newData => {
      try {
        dataHandle(newData)
      } catch (error) {
        console.log(error)
      }
    },
    {
      deep: false
    }
)
watch(
    () => option,
    option => {
      initMap(option)
    },
    {
      immediate: true,
      deep: true
    }
)



</script>
