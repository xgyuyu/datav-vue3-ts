import { DatavComponent } from '@/components/_models/datav-component'
import {
  ApiConfigMap, ApiDataConfigMap,
  setApiConfig, setApiData,
} from '@/components/_models/data-source'
import { createField } from '@/components/_models/data-field'
import { DataEventConfig } from '@/components/_models/data-event'
import { getStaticData } from '@/api/data'
import {EChartEasing} from "@/components/_models/echarts-animation";

// 排序枚举
export const FunnelOrderEnumList = [
  { label: '倒三角', value: 'descending' },
  { label: '正三角', value: 'ascending' }
]
// 标签位置枚举
export const FunnelLabelPositionEnumList = [
  { label: '内部', value: 'inside' },
  { label: '外部', value: 'outside' },
  { label: '内部左侧', value: 'insideLeft' },
  { label: '内部右侧', value: 'insideRight' }
]

/**
 * Funnel
 */
export class Funnel extends DatavComponent {
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
    series: [
      {
        name: 'Funnel',
        type: 'funnel',
        top: 70,
        left: '10%',
        width: '80%',
        min: 0,
        minSize: '0%',
        maxSize: '100%',
        sort: 'descending', // descending | ascending
        gap: 5,
        label: {
          show: true,
          position: 'inside',
          fontSize: 12
        },
        itemStyle: {
          borderColor: '#fff',
          borderWidth: 0
        },
        emphasis: {
          label: {
            fontSize: 20
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
    super('Funnel', { w: 400, h: 400 })

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
      const path = 'chart/funnel'
      const res = await getStaticData(this.id, path)
      this.apiData.source.config.data = JSON.stringify(res.data)
    } catch (error) {
      throw error
    }
  }
}

export default Funnel
