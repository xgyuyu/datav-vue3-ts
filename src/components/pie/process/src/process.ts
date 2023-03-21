import { DatavComponent } from '@/components/_models/datav-component'
import {
  ApiConfigMap, ApiDataConfigMap,
  setApiConfig, setApiData,
} from '@/components/_models/data-source'
import { createField } from '@/components/_models/data-field'
import { DataEventConfig } from '@/components/_models/data-event'
import { getStaticData } from '@/api/data'

export const types = [
  {
    value: '线形',
    id: 'line'
  },
  {
    value: '圆形',
    id: 'circle'
  },
  {
    value: '仪表盘',
    id: 'dashboard'
  },
]


/**
 * Process
 */
export class Process extends DatavComponent {
  config = {
    dataset: 36,
    // 默认类型
    type: types[2].id,
    // 进行时效果
    processing: true,
    // 主颜色
    color: '#4992FFFF',
    // 轨道颜色
    railColor: '#3e3e3f',
    // 指标
    unit: '%',
    // 指标大小
    indicatorTextSize: 34,
    // 指标位置（线条时可用）
    indicatorPlacement: 'outside',
    // 指标颜色
    indicatorTextColor: '#FFFFFFFF',
    // 偏移角度
    offsetDegree: 0
  }

  apis: Partial<ApiConfigMap>
  apiData: Partial<ApiDataConfigMap>
  events: Record<string, DataEventConfig>
  actions: Record<string, DataEventConfig>

  constructor() {
    super('Process', { w: 200, h: 200 })

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
      const path = 'pie/process'
      const res = await getStaticData(this.id, path)
      this.config.dataset = res.data.data
    } catch (error) {
      throw error
    }
  }
}

export default Process
