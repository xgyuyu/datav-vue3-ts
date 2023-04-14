import { DatavComponent } from '@/components/_models/datav-component'
import {
  ApiConfigMap, ApiDataConfigMap,
  setApiConfig, setApiData,
} from '@/components/_models/data-source'
import { createField } from '@/components/_models/data-field'
import { DataEventConfig } from '@/components/_models/data-event'
import { getStaticData } from '@/api/data'

/**
 * Pie3d
 */
export class Pie3d extends DatavComponent {
  config = {
    dataList: [
      {
        name: "红草莓",
        y: 120,
        h: 16,
        bfb: 29,
      },
      {
        name: "白草莓",
        y: 150,
        h: 12,
        bfb: 8,
      },
      {
        name: "红颜草莓",
        y: 80,
        h: 5,
        bfb: 11,
      },
      {
        name: "甜宝草莓",
        y: 100,
        h: 9,
        bfb: 11,
      },
      {
        name: "红颜草莓",
        y: 60,
        h: 8,
        bfb: 13,
      },
      {
        name: "甜宝草莓",
        y: 200,
        h: 36,
        bfb: 18,
      },
    ],
    colorList: ['#BE3075', '#EB001F', '#64A12D', '#FFED00', '#000000', '#008AC5', '#009EE0'],
    plotOptions: {
      alpha: 58, //延y轴向内的倾斜角度
      depth: 45,
      size: 65,
      innerSize: 95,
      center: [50, 50],
    },
  }

  apis: Partial<ApiConfigMap>
  apiData: Partial<ApiDataConfigMap>
  events: Record<string, DataEventConfig>
  actions: Record<string, DataEventConfig>

  constructor() {
    super('Pie3d', { w: 400, h: 400 })

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
      const path = 'pie/pie3d'
      const res = await getStaticData(this.id, path)
      this.apiData.source.config.data = JSON.stringify(res.data)
    } catch (error) {
      throw error
    }
  }
}

export default Pie3d
