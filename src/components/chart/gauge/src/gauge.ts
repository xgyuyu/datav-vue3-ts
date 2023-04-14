import { DatavComponent } from '@/components/_models/datav-component'
import {
  ApiConfigMap, ApiDataConfigMap,
  setApiConfig, setApiData,
} from '@/components/_models/data-source'
import { createField } from '@/components/_models/data-field'
import { DataEventConfig } from '@/components/_models/data-event'
import { getStaticData } from '@/api/data'

/**
 * Gauge
 */
export class Gauge extends DatavComponent {
  config = {
    seriesData: {
      center: [50, 60],
      startAngle: 180,
      endAngle: -0,
      min: 0,
      max: 60,
      splitNumber: 12,
      itemStyle: {
        color: {
          type: 'solid',
          value: '#00baff',
          from: '#fff',
          to: '#000',
        }
      },
      progress: {
        width: 30
      },
      pointer: {
        show: true,
        offsetCenter: [0 , -60],
        length: 12,
        width: 10,
        itemStyle: {
          color: '#000'
        }
      },
      axisLine: {
        show: true,
        lineStyle: {
          width: 30,
          color: '#e6ebf8'
        }
      },
      axisTick: {
        show: true,
        distance: -45,
        splitNumber: 6,
        lineStyle: {
          width: 2,
          color: '#999'
        }
      },
      splitLine: {
        show: true,
        distance: -52,
        length: 14,
        lineStyle: {
          width: 3,
          color: '#999'
        }
      },
      axisLabel: {
        show: true,
        distance: -20,
        color: '#999',
        fontSize: 20
      },
      title: {
        show: false
      },
      detail: {
        show: true,
        offsetCenter: [0 , -15],
        width: 60,
        lineHeight: 40,
        fontSize: 60,
        color: '#000'
      },
      data: [
        {
          value: 20
        }
      ]
    }
  }

  apis: Partial<ApiConfigMap>
  apiData: Partial<ApiDataConfigMap>
  events: Record<string, DataEventConfig>
  actions: Record<string, DataEventConfig>

  constructor() {
    super('Gauge', { w: 400, h: 300 })

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

export default Gauge
