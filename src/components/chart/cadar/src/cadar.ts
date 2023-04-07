import { DatavComponent } from '@/components/_models/datav-component'
import {
  ApiConfigMap, ApiDataConfigMap,
  setApiConfig, setApiData,
} from '@/components/_models/data-source'
import { createField } from '@/components/_models/data-field'
import { DataEventConfig } from '@/components/_models/data-event'
import { getStaticData } from '@/api/data'
import {EChartEasing} from "@/components/_models/echarts-animation";

// 雷达形状
export const RadarShapeEnumList = [
  { label: '多边形', value: 'polygon' },
  { label: '圆形', value: 'circle' }
]

/**
 * Cadar
 */
export class Cadar extends DatavComponent {
  config = {
    animation: {
      enabled: true,
      duration: 1000,
      easing: EChartEasing.cubicOut,
      delay: 0,
    },
    tooltip: {
      show: true,
      textStyle: {
        fontSize: 14,
        color: '#fff',
        fontWeight: 'normal',
      },
      background: {
        padding: {
          h: 5,
          v: 5,
        },
        color: 'rgba(0, 0, 0, 0.65)',
      },
      pointer: {
        show: true,
        line: {
          type: 'dashed',
          width: 1,
          color: '#f5dc69',
          dashedLength: 4,
          dashedSpace: 4,
        },
      },
    },
    legend: {
      show: true,
      position: 'top-center',
      orient: 'horizontal',
      textStyle: {
        fontSize: 12,
        color: '#90a0ae',
        fontWeight: 'normal',
      },
      symbol: {
        show: true,
        icon: 'auto',
        width: 25,
        height: 14,
        gap: 10,
      },
      page: {
        enabled: false,
        size: {
          width: 100,
          height: 100,
        },
        button: {
          size: 15,
          color: '#000',
          inactiveColor: '#000',
        },
        pageNumColor: '#90a0ae',
      },
    },
    radar: {
      shape: 'polygon',
      radius: ['0%', '60%'],
      center: ['50%', '55%'],
      splitArea: { show: true },
      splitLine: { show: true },
      axisName: { show: true, color: '#eee', fontSize: 12 },
      axisLine: { show: true },
      axisTick: { show: true },
      // indicator: dataJson.radarIndicator
    },
    series: [
      {
        name: 'radar',
        type: 'radar',
        areaStyle: {
          opacity: 0.1
        },
      }
    ]
  }

  apis: Partial<ApiConfigMap>
  apiData: Partial<ApiDataConfigMap>
  events: Record<string, DataEventConfig>
  actions: Record<string, DataEventConfig>

  constructor() {
    super('Cadar', { w: 300, h: 300 })

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
      const path = 'chart/cadar'
      const res = await getStaticData(this.id, path)
      this.apiData.source.config.data = JSON.stringify(res.data)
    } catch (error) {
      throw error
    }
  }
}

export default Cadar
