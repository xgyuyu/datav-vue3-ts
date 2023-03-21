import { DatavComponent } from '@/components/_models/datav-component'
import {
  ApiConfigMap, ApiDataConfigMap,
  setApiConfig, setApiData,
} from '@/components/_models/data-source'
import { createField } from '@/components/_models/data-field'
import { DataEventConfig } from '@/components/_models/data-event'
import { getStaticData } from '@/api/data'

export const shapes = [
  {
    value: '圆形',
    id: 'circle'
  },
  {
    value: '正方形',
    id: 'rect'
  },
  {
    value: '带圆角的正方形',
    id: 'roundRect'
  },
  {
    value: '正三角形',
    id: 'triangle'
  },
  {
    value: '菱形',
    id: 'diamond'
  },
  {
    value: '水滴',
    id: 'pin'
  },
  {
    value: '箭头',
    id: 'arrow'
  },
]

/**
 * WaterPolo
 */
export class WaterPolo extends DatavComponent {
  config = {
    dataset: 0.5,
    series: [
      {
        type: 'liquidFill',
        shape: shapes[0].id,
        radius: '90%',
        data: [0],
        center: ['50%', '50%'],
        color: [
          {
            type: 'linear',
            x: 0,
            y: 0,
            x2: 0,
            y2: 1,
            colorStops: [
              {
                offset: 0,
                color: '#446bf5',
              },
              {
                offset: 1,
                color: '#2ca3e2',
              },
            ],
            globalCoord: false,
          },
        ],
        backgroundStyle: {
          borderWidth: 1,
          color: 'rgba(51, 66, 127, 0.7)',
        },
        label: {
          normal: {
            textStyle: {
              fontSize: 50,
              color: '#fff',
            },
          },
        },
        outline: {
          show: false,
          borderDistance: 10,
          itemStyle: {
            borderWidth: 2,
            borderColor: '#112165'
          }
        }
      }
    ]
  }

  apis: Partial<ApiConfigMap>
  apiData: Partial<ApiDataConfigMap>
  events: Record<string, DataEventConfig>
  actions: Record<string, DataEventConfig>

  constructor() {
    super('WaterPolo', { w: 300, h: 300 })

    this.initData()
  }

  initData() {
    const fields: any = [
      createField('value', { description: '', optional: true }),
    ]

    setApiConfig(this, {
      fields: Object.assign({}, ...fields),
      description: '基本水位图接口',
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
      const path = 'bar/water-polo'
      const res = await getStaticData(this.id, path)
      this.apiData.source.config.data = JSON.stringify(res.data)
    } catch (error) {
      throw error
    }
  }
}

export default WaterPolo
