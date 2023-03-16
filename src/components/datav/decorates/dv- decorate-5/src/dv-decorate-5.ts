import { DatavComponent } from '@/components/_models/datav-component'
import {
  ApiConfigMap, ApiDataConfigMap,
  setApiConfig, setApiData,
} from '@/components/_models/data-source'
import { createField } from '@/components/_models/data-field'
import { DataEventConfig } from '@/components/_models/data-event'
import { getStaticData } from '@/api/data'

/**
 * DvBorder
 */
export class VDvDecorate5 extends DatavComponent {
  config = {
    global: {
      fontFamily: 'Microsoft Yahei',
      animation: true,
      duration: 1000,
      padding: 8,
      quantity: 5,
      loop: true,
      looptime: 5000,
      sort: {
        show: true,
        sort: 'desc',
      },
    },
    option: {
      color1: '#1DC1F533',
      color2: '#1DC1F5FF',
      lineHeight: 2,
      dataset: '我是标题',
      textColor: '#fff',
      textSize: 20
    }
  }

  apis: Partial<ApiConfigMap>
  apiData: Partial<ApiDataConfigMap>
  events: Record<string, DataEventConfig>
  actions: Record<string, DataEventConfig>

  constructor() {
    super('DvDecorate5', { w: 200, h: 200 })

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

export default VDvDecorate5
