import { DatavComponent } from '@/components/_models/datav-component'
import {
  ApiConfigMap, ApiDataConfigMap,
  setApiConfig, setApiData,
} from '@/components/_models/data-source'
import { createField } from '@/components/_models/data-field'
import { DataEventConfig } from '@/components/_models/data-event'
import { getStaticData } from '@/api/data'
import dataJson from './data.json'

export enum ThemeEnum {
  NORMAL = 'normal',
  DARK = 'dark',
  LIGHT = 'light',
  WHITES_MOKE = 'whitesmoke',
  FRESH = 'fresh',
  GREY = 'grey',
  GRAFFITI = 'graffiti',
  MACARON = 'macaron',
  BLUE = 'blue',
  DARKBLUE = 'darkblue',
  WINE = 'wine'
}

export enum LangEnum {
  ZH_CN = 'zh_cn',
  EN = 'en',
  ZH_EN = 'zh_en'
}

export enum ViewModeEnum {
  PLANE = '2D',
  STEREOSCOPIC = '3D'
}

export enum FeaturesEnum {
  BG = 'bg',
  POINT = 'point',
  ROAD = 'road',
  BUILDING = 'building'
}

export enum MarkerEnum {
  // 圆圈
  CIRCLE_MARKER = 'CircleMarker',
  // 定位标点
  MARKER = 'Marker',
  // 暂无
  NONE = 'none'
}

/**
 * MapA
 */
export class MapA extends DatavComponent {
  config = {
    dataset: dataJson,
    mapOptions: {
      pitch: 60,
      skyColor: '#53A9DE',
      amapKey: '391781be07ab35605123a845a1702268',
      amapStyleKey: ThemeEnum.DARK,
      amapStyleKeyCustom: '',
      amapLon: 116.397428,
      amapLat: 39.90923,
      amapZindex: 11,
      marker: {
        fillColor: '#E98984FF',
        fillOpacity: 0.5,
        strokeColor: 'white',
        strokeWeight: 2,
        strokeOpacity: 0.5,
        zIndex: 10,
        bubble: true,
        cursor: 'pointer',
        clickable: true
      },
      mapMarkerType: MarkerEnum.CIRCLE_MARKER,
      viewMode: ViewModeEnum.PLANE,
      lang: LangEnum.ZH_CN,
      features: [FeaturesEnum.BG, FeaturesEnum.POINT, FeaturesEnum.ROAD, FeaturesEnum.BUILDING]
    }
  }

  apis: Partial<ApiConfigMap>
  apiData: Partial<ApiDataConfigMap>
  events: Record<string, DataEventConfig>
  actions: Record<string, DataEventConfig>

  constructor() {
    super('MapA', { w: 600, h: 400 })

    this.initData()
  }

  initData() {
    const fields: any = [
      createField('value', { description: '', optional: true }),
    ]

    setApiConfig(this, {
      fields: Object.assign({}, ...fields),
    })

    setApiData(this)

    this.events = {}
    this.actions = {}

    return this
  }

  async loadData() {
    try {
      // 组件静态数据来源，当前项目统一管理目录：public/data/*
      // 如：public/data/demo/data.json 简写为 => demo/data
      // const path = ''
      // const res = await getStaticData(this.id, path)
      // this.apiData.source.config.data = JSON.stringify(res.data)
    } catch (error) {
      throw error
    }
  }
}

export default MapA
