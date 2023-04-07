import { DatavComponent } from '@/components/_models/datav-component'
import {
  ApiConfigMap, ApiDataConfigMap,
  setApiConfig, setApiData,
} from '@/components/_models/data-source'
import { createField } from '@/components/_models/data-field'
import { DataEventConfig } from '@/components/_models/data-event'
import { getStaticData } from '@/api/data'

/**
 * Semicircle
 */
export class Semicircle extends DatavComponent {
  config = {
    dataList: [
      ['Social Democratic Party', 153, 'SPD'],
      ['Alliance 90/The Greens', 67, 'GRÜNE'],
      ['Free Democratic Party', 80, 'FDP'],
      ['Christian Democratic Union', 200, 'CDU'],
      ['Christian Social Union in Bavaria', 46, 'CSU'],
      ['Alternative for Germany', 94, 'AfD']
    ],
    option: {
      center: [50, 88],
      size: 80,
      startAngle: -100,
      endAngle: 100
    }
  }

  apis: Partial<ApiConfigMap>
  apiData: Partial<ApiDataConfigMap>
  events: Record<string, DataEventConfig>
  actions: Record<string, DataEventConfig>

  constructor() {
    super('Semicircle', { w: 300, h: 300 })

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

export default Semicircle
